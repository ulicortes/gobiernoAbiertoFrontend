import { servicio } from "@/services/service";
import PageClient from "./pageClient";

interface Category {
  id: number;
  name: string;
  slug: string;
  section: string;
}

export async function generateStaticParams() {
  const res = await servicio.getCategorias();

  return res.map((cat: Category) => ({
    categorySlug: cat.slug,
  }));
}

export default async function ArchivosCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const pms = await params;
  // console.log(params);
  return <PageClient params={pms.categorySlug} />;
}
