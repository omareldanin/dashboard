import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
const useTranslate = () => {
  const lang = useSelector((state) => state.ui.lang);
  const [t, i18n] = useTranslation();
  useEffect(() => {
    if (lang === "en") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ar");
    }
  }, [lang, i18n]);
  return {
    t,
    i18n,
  };
};
export default useTranslate;
