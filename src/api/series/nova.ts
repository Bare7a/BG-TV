import { $t } from "../../translate";
import { fetchHtml, fetchJson } from "../../utils/api.utils";
import { Episode, NovaEpisodesAPI, NovaSeriesAPI, NovaTokenAPI, Series } from "./types";

const HOST = "https://play.nova.bg";
const HOST_API = "https://nbg-api.fite.tv/api/v2";
const ALL_SERIES_URL = `${HOST}/allshows`;
const HOST_TOKEN_URL = `${HOST}/api/token`;

export class NovaSeries {
  static async getAllSeries(): Promise<Series[]> {
    const allSeriesHtml = await fetchHtml(ALL_SERIES_URL);
    const seriesStr = allSeriesHtml.split('{"props":')[1].split(',"page"')[0];
    const seriesObj: NovaSeriesAPI = JSON.parse(seriesStr);

    const series: Series[] = seriesObj.pageProps.programsToDisplay.flatMap(p =>
      p.shows.flatMap(s => ({
        id: s.id,
        url: `${HOST_API}/tv_shows/${s.id}?offset=0&limit=100`,
        title: s.title,
        imageUrl: s.links.image.href.replace("{width}x{height}", "310x176"),
        description: s.description,
      })),
    );

    return series;
  }

  static async getAllEpisodes(url: string): Promise<Episode[]> {
    const token = await this.getToken();
    const episodesObj = await fetchJson<NovaEpisodesAPI>(url, token);

    const episodes: Episode[] = episodesObj.selected_season.episodes.map(e => ({
      id: e.id,
      url: `${HOST}/video/${e.slug}/${e.id}`,
      title: e.title,
      imageUrl: e.links.image.href.replace("{width}x{height}", "310x176"),
      description: `${$t("season")} ${e.season_number} ${$t("episode")} ${e.episode_number}`,
    }));

    return episodes;
  }

  static async getEpisodeUrl(url: string): Promise<string> {
    const episodeHtml = await fetchHtml(url);
    const episodeUrl = episodeHtml.split('"links":{"play":{"href":"')[1].split('"')[0];

    return episodeUrl;
  }

  static async getToken(): Promise<string> {
    const token = await fetchJson<NovaTokenAPI>(HOST_TOKEN_URL);
    return token.accessToken;
  }
}
