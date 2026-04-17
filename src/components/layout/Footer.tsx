import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-teal-900 text-teal-200 py-8 text-center text-sm">
      <p>© {new Date().getFullYear()} Cenote Kin-Ha. {t("rights")}.</p>
    </footer>
  );
}
