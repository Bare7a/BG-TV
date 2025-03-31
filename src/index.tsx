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

merge(LightningConfig, config.lightning);

const { render } = createRenderer();
loadFonts(fonts);
render(() => {
  useFocusManager(config.keys, config.keyHoldOptions);
  return (
    <HashRouter root={App}>
      <Route path="/" component={HelloWorld} />
      <Route path="/text" component={TextPage} />
      <Route path="/*all" component={NotFound} />
    </HashRouter>
  );
});
