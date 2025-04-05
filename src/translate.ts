import * as i18n from "@solid-primitives/i18n";
import en_dict from "/assets/lang/en.json?url";
import { createResource, createSignal } from "solid-js";

const [locale, setLocale] = createSignal("bg");
// const [locale, setLocale] = createSignal("en");

async function fetchDictionary(locale) {
  return fetch(`assets/lang/${locale}.json`)
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

const [dict] = createResource(locale, fetchDictionary, {
  initialValue: en_dict,
});

const $t = i18n.translator(dict);

export { $t, locale, setLocale };
