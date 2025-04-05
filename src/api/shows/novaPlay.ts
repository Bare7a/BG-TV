import { $t } from "../../translate";
import { fetchHtml, fetchJson } from "../../utils/api.utils";
import { Episode, NovaEpisodesAPI, NovaPlayAPI, NovaTokenAPI, Shows } from "./types";

const HOST = "https://play.nova.bg";
const HOST_API = "https://nbg-api.fite.tv/api/v2";
const ALL_SHOWS_URL = `${HOST}/allshows`;
const HOST_TOKEN_URL = `${HOST}/api/token`;

export class NovaPlay {
  static showName = "NovaPlay";

  static async getAllShows(): Promise<Shows[]> {
    const allShowsHtml = await fetchHtml(ALL_SHOWS_URL);
    const showsStr = allShowsHtml.split('{"props":')[1].split(',"page"')[0];
    const showsObj: NovaPlayAPI = JSON.parse(showsStr);

    const shows: Shows[] = showsObj.pageProps.programsToDisplay.flatMap(p =>
      p.shows.flatMap(s => ({
        id: s.id,
        url: `${HOST_API}/tv_shows/${s.id}/videos?offset=0&limit=100`,
        title: s.title,
        imageUrl: s.links.image.href.replace("{width}x{height}", "310x176"),
        description: s.description,
      })),
    );

    return shows;
  }

  static async getAllEpisodes(url: string): Promise<Episode[]> {
    const token = await this.getToken();
    const episodesObj = await fetchJson<NovaEpisodesAPI>(url, token);

    const episodes: Episode[] = episodesObj.map(e => ({
      id: e.id,
      url: `${HOST}/video/${e.slug}/${e.id}`,
      title: e.title,
      imageUrl: e.links.image.href.replace("{width}x{height}", "310x176"),
      description:
        e.season_name && e.episode_number
          ? `${$t("season")} ${e.season_number} ${$t("episode")} ${e.episode_number}`
          : e.description,
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
