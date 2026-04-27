import { servicio } from "@/services/service";
import DynamicCategoryClientPage from "./pageClient";

interface Category {
  id: number;
  name: string;
  slug: string;
  section: string;
}

export async function generateStaticParams() {
  const res = await servicio.getCategorias();
  return res.map((cat: Category) => ({
    categoryName: cat.slug,
  }));
}

export default async function DynamicCategoryPage({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const pms = await params;
  return <DynamicCategoryClientPage params={pms.categoryName} />;
}
