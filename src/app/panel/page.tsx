"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { servicio } from "@/services/service";
import { toSlug } from "@/lib/slugify";
import { CategoryLike, getFirstPanelCategory } from "@/lib/categoryUtils";

type Cat = CategoryLike;

export default function PanelPage() {
  const router = useRouter();

  useEffect(() => {
    servicio
      .getCategorias()
      .then((cats: Cat[] = []) => {
        const first = getFirstPanelCategory(cats);
        if (first) {
          router.replace(`/panel/archivos/${toSlug(first.name)}`);
          return;
        }

        router.replace("/panel/categorias");
      })
      .catch(() => {
        router.replace("/panel/categorias");
      });
  }, [router]);

  return null;
}
