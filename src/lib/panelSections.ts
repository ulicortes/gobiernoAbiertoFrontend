/** Valores sintéticos de `selectedCategory` para vistas del panel (no son categorías de contenido). */
export const PANEL_SECTION_PASSWORD = "__panel_password__";
export const PANEL_SECTION_USERS = "__panel_users__";

export function isPanelSyntheticCategory(name: string | null): boolean {
  return (
    name === PANEL_SECTION_PASSWORD ||
    name === PANEL_SECTION_USERS
  );
}
