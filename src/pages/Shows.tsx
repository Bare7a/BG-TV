import { Index } from "@lightningtv/solid";
import { getShow } from "../api/shows";
import { Text, View } from "@lightningtv/solid";
import { Column } from "@lightningtv/solid/primitives";
import { useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";

export default () => {
  const params = useParams();
  const showName = params.showName;
  const show = getShow(showName);

  console.log(showName);
  console.log(show);

  if (!show) {
    return <Text>Invalid Url</Text>;
  }

  const [allShows] = createResource(show.getAllShows);

  return (
    <>
      <Text>Valid Show: {show.showName}</Text>
      <Show when={allShows()} fallback={<p>Loading...</p>}>
        <View clipping>
          <Column plinko>
            <Index each={allShows()}>
              {(item, i) => (
                <Text y={i * 50} autofocus={0}>
                  {item().title}
                </Text>
              )}
            </Index>
          </Column>
        </View>
      </Show>
    </>
  );

  // (async () => {
  //   const series = await NovaShows.getAllShows();
  //   const episodes = await NovaShows.getAllEpisodes(series[24].url);
  //   const url = await NovaShows.getEpisodeUrl(episodes[0].url);
  //   console.log({ series, episodes, url });

  //   // const series = await BtvShows.getAllShows();
  //   // const episodes = await BtvShows.getAllEpisodes(series[10].url);
  //   // const url = await BtvShows.getEpisodeUrl(episodes[0].url);
  //   // console.log({ series, episodes, url });
  // })();

  // return <Text>Show</Text>;
};
