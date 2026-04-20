export function resolveFileType(type?: string, filePath?: string): string {
  const labels: Record<string, string> = {
    pdf: "PDF",
    image: "Imagen",
    doc: "Documento",
    other: "Otro",
  };
  if (type && labels[type]) return labels[type];
  const ext = filePath?.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "PDF";
  if (ext && ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) return "Imagen";
  if (ext && ["doc", "docx"].includes(ext)) return "Documento";
  if (ext && ["xls", "xlsx", "csv"].includes(ext)) return "Planilla";
  return "Otro";
}
