import { createRenderer, Config as LightningConfig, loadFonts } from "@lightningtv/solid";
import { Route } from "@solidjs/router";
import { HashRouter, useFocusManager } from "@lightningtv/solid/primitives";
import App from "./pages/App";
import HelloWorld from "./pages/HelloWorld";
import TextPage from "./pages/Text";
import NotFound from "./pages/NotFound";
import fonts from "./fonts";
import { merge } from "lodash-es";
import { config } from "#devices/common";
import Shows from "./pages/Shows";
import ShowEpisodes from "./pages/ShowEpisodes";
import Tv from "./pages/Tv";
import Player from "./pages/Player";

merge(LightningConfig, config.lightning);

const { render } = createRenderer();
loadFonts(fonts);
render(() => {
  useFocusManager(config.keys, config.keyHoldOptions);
  return (
    // <FocusStackProvider>
    <HashRouter root={App}>
      <Route path="/" component={HelloWorld} />
      <Route path="/text" component={TextPage} />
      <Route path="/tv" component={Tv} />
      <Route path="/tv/:videoUrl" component={Player} />
      <Route path="/shows/:showName" component={Shows} />
      <Route path="/shows/:showName/:episodesUrl" component={ShowEpisodes} />
      <Route path="/shows/:showName/:episodesUrl/:videoUrl" component={Player} />
      <Route path="/*all" component={NotFound} />
    </HashRouter>
    // </FocusStackProvider>
  );
});
