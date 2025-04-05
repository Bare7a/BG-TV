import { fetchHtml, getPageContent } from "../../utils/api.utils";
import { Episode, Shows } from "./types";

const HOST = "https://btvplus.bg";
const CDN_URL = `https://cdn.btv.bg/hls`;
const ALL_SHOWS_URL = `${HOST}/predavaniya/`;

export class BTVPlus {
  static showName = "BTVPlus";

  static async getAllShows(): Promise<Shows[]> {
    const html = await fetchHtml(ALL_SHOWS_URL);
    const pageContent = getPageContent(html, HOST);

    const showsElements = Array.from(pageContent.querySelectorAll(".swiper-slide"));
    const shows: Shows[] = [];
    for (const s of showsElements) {
      const url = s.querySelector<HTMLAnchorElement>("a")?.href;
      const title = s.querySelector<HTMLSpanElement>(".title")?.innerText.trim();
      const imageUrl = s.querySelector<HTMLImageElement>("img")?.src;

      if (!url || !title || !imageUrl) continue;

      const id = Number(url.split("/produkt/predavaniya/")[0].split("/")[1] ?? 0);

      shows.push({ id, url, imageUrl, title });
    }

    return shows;
  }

  static async getAllEpisodes(url: string): Promise<Episode[]> {
    const html = await fetchHtml(url);
    const pageContent = getPageContent(html, HOST);

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
