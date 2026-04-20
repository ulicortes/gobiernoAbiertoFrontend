'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { servicio } from "@/services/service";

export default function TransparenciaPage() {
    const router = useRouter();

    useEffect(() => {
        servicio.getCategorias()
            .then((cats) => {
                const first = (cats ?? [])
                    .filter((c: any) => c.section.toLowerCase() === "transparencia")
                    .sort((a: any, b: any) => a.name.localeCompare(b.name, "es"))[0];
                if (first) {
                    const slug = first.slug || encodeURIComponent(first.name);
                    router.replace(`/transparencia/${slug}`);
                }
            })
            .catch(console.error);
    }, [router]);

    return null;
}
