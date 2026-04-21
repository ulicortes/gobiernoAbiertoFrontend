'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { servicio } from "@/services/service";
import {
  CategoryLike,
  getCategoriesBySection,
  getPublicCategorySlug,
} from "@/lib/categoryUtils";

type Cat = CategoryLike;

export default function TransparenciaPage() {
    const router = useRouter();

    useEffect(() => {
        servicio.getCategorias()
            .then((cats) => {
                const first = getCategoriesBySection((cats ?? []) as Cat[], "transparencia")[0];
                if (first) {
                    const slug = getPublicCategorySlug(first);
                    router.replace(`/transparencia/${slug}`);
                }
            })
            .catch(console.error);
    }, [router]);

    return null;
}
