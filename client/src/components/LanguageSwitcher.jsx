import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select onChange={handleLanguageChange} defaultValue={i18n.language}>
      <option value="en">English</option>
      <option value="jp">日本語</option>
    </select>
  );
};

export default LanguageSwitcher;
