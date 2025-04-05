import { Text } from "@lightningtv/solid";
import { useParams } from "@solidjs/router";

export default () => {
  const videoUrl = decodeURIComponent(useParams().videoUrl);

  return <Text>{videoUrl}</Text>;
};
