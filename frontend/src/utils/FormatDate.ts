export function formatDate(oldDate: string): string {
  const date = new Date(oldDate);

  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
