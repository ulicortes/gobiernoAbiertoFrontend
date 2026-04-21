export interface CategoryLike {
  id: number;
  name: string;
  section: string;
  slug?: string;
}

export function sortCategoriesAlphabetically<T extends CategoryLike>(categories: T[]): T[] {
  return [...categories].sort((a, b) =>
    a.name.localeCompare(b.name, "es", { sensitivity: "base" }),
  );
}

export function getCategoriesBySection<T extends CategoryLike>(
  categories: T[],
  section: "home" | "transparencia",
): T[] {
  return sortCategoriesAlphabetically(
    categories.filter((category) => category.section?.toLowerCase() === section),
  );
}

export function getFirstPanelCategory<T extends CategoryLike>(categories: T[]): T | undefined {
  return getCategoriesBySection(categories, "home")[0] ??
    getCategoriesBySection(categories, "transparencia")[0];
}

export function getPublicCategorySlug(category: CategoryLike): string {
  return category.slug || encodeURIComponent(category.name);
}
