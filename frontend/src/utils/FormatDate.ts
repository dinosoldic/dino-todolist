export function formatDate(oldDate: Date): string {
  return oldDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
