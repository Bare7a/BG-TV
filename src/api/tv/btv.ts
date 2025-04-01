import { fetchHtml } from "../../utils/api.utils";

const HOST = "https://btvplus.bg";
const MEDIA_URL = `${HOST}/lbin/v3/btvplus/player_config.php?media_id=2110383625`;

export class BTV {
  static tvName = "bTV";

  static getTvUrl = async (): Promise<string> => {
    const mediaHtml = await fetchHtml(MEDIA_URL);
    const mediaUrl = mediaHtml.split('\\"application\\/x-mpegURL\\",\\n\\t\\tsrc: \\"')[1].split('\\"')[0];

    const tvUrl = mediaUrl.replace(/\\\//g, "/");
    return tvUrl;
  };
}
