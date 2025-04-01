import { fetchHtml } from "../../utils/api.utils";
import { Episode, Series } from "./types";

const HOST = "https://btvplus.bg";
const CDN_URL = `https://cdn.btv.bg/hls`;
const ALL_SERIES_URL = `${HOST}/predavaniya/`;

export class BtvSeries {
  static async getAllSeries(): Promise<Series[]> {
    const allSeriesHtml = await fetchHtml(ALL_SERIES_URL);
    const pageContent = document.createElement("div");
    pageContent.innerHTML = allSeriesHtml.replace(/href="\//gm, `href="${HOST}/`);

    const seriesElements = Array.from(pageContent.querySelectorAll(".swiper-slide"));

    const series: Series[] = [];
    for (const s of seriesElements) {
      const url = s.querySelector<HTMLAnchorElement>("a")?.href;
      const title = s.querySelector<HTMLSpanElement>(".title")?.innerText.trim();
      const imageUrl = s.querySelector<HTMLImageElement>("img")?.src;

      if (!url || !title || !imageUrl) continue;

      const id = Number(url.split("/produkt/predavaniya/")[0].split("/")[1] ?? 0);

      series.push({ id, url, imageUrl, title });
    }

    return series;
  }

  static async getAllEpisodes(url: string): Promise<Episode[]> {
    const allEpisodesHtml = await fetchHtml(url);
    const pageContent = document.createElement("div");
    pageContent.innerHTML = allEpisodesHtml;

    const episodesElements = Array.from(pageContent.querySelectorAll(".episode"));

    const episodes: Episode[] = [];
    for (const e of episodesElements) {
      const href = e.querySelector<HTMLAnchorElement>("a")?.href;
      const title = e.querySelector<HTMLSpanElement>(".title")?.innerText.trim();
      const imageUrl = e.querySelector<HTMLImageElement>("img")?.src;

      if (!href || !title || !imageUrl) continue;

      const id = Number(href.split("/produkt/predavaniya/")[1].split("/")[0] ?? 0);
      const url = `${HOST}/lbin/v3/btvplus/product_player.php?product_id=${id}`;
      const description = e.querySelector<HTMLDivElement>(".video-length")?.innerText.trim();

      episodes.push({ id, url, imageUrl, title, description });
    }

    return episodes;
  }

  static async getEpisodeUrl(url: string): Promise<string> {
    const episodeHtml = await fetchHtml(url);
    const episodeId = episodeHtml.split("https:\\/\\/cdn.btv.bg\\/hls\\/")[1].split("\\")[0];
    const episodeUrl = `${CDN_URL}/${episodeId}/master.m3u8`;

    return episodeUrl;
  }
}
