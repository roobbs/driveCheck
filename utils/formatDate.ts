import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";

export default function formatDate(date: string, language: string): string {
  const parsedDate = new Date(date);

  const locale = language === "esp" ? es : enUS;
  const dateFormat = language === "esp" ? "dd MMM yy" : "MMM dd, yy";

  return format(parsedDate, dateFormat, { locale });
}

// const dbDate = "2024-01-06";
// console.log(formatDatabaseDate(dbDate, "eng")); // Jan 06, 24
// console.log(formatDatabaseDate(dbDate, "esp")); // 06 ene 24
