import { CHANGE_LOCALE } from "../types";

export default function changeLocale(locale) {
  return { type: CHANGE_LOCALE, locale };
}
