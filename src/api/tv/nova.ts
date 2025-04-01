import { fetchHtml } from "../../utils/api.utils";

const HOST = "https://play.nova.bg";
const MEDIA_URL = `${HOST}/live/nova-play`;

export class Nova {
  static tvName = "Nova";

  static getTvUrl = async (): Promise<string> => {
    const mediaHtml = await fetchHtml(MEDIA_URL);

    const tvUrl = mediaHtml.split('"links":{"play":{"href":"')[1].split('"')[0];
    return tvUrl;
  };
}
