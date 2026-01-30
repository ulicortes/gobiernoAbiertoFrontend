'use client'
import TablaDescargas from "@/components/TablaDescargas";

export default function Page() {
    let haberes = [
        // 2017
        "haberes_agosto_2017.pdf",
        "haberes_septiembre_2017.pdf",
        "haberes_octubre_2017.pdf",
        "haberes_noviembre_2017.pdf",
        "totales_liquidados_diciembre_2017.pdf",

        // 2018
        "haberes_enero_2018.pdf",
        "haberes_febrero_2018_0.pdf",
        "haberes_marzo_2018_0.pdf",
        "haberes_abril_2018.pdf",
        "haberes_mayo_2018.pdf",
        "haberes_junio_2018.pdf",
        "haberes_julio_2018.pdf",
        "haberes_agosto_2018.pdf",
        "haberes_septiembre_2018.pdf",
        "haberes_diciembre_2018.pdf",

        // 2019
        "haberes_enero_2019.pdf",
        "haberes_febrero_2019.pdf",
        "haberes_marzo_2019.pdf",
        "haberes_abril_2019.pdf",
        "haberes_mayo_2019.pdf",
        "haberes_julio_2019.pdf",
        "haberes_agosto_2019.pdf",
        "haberes_septiembre_2019.pdf",
        "haberes_octubre_2019.pdf",
        "haberes_noviembre_2019.pdf",
        "haberes_diciembre_2019.pdf",

        // 2020
        "haberes_enero_2020.pdf",
        "haberes_febrero_2020.pdf",
        "haberes_marzo_2020.pdf",
        "haberes_abril_2020.pdf",
        "haberes_mayo_2020.pdf",
        "haberes_junio_2020.pdf",
        "haberes_julio_2020.pdf",
        "haberes_agosto_2020.pdf",
        "haberes_septiembre_2020.pdf",
        "haberes_octubre_2020.pdf",
        "haberes_noviembre_2020.pdf",
        "haberes_diciembre_2020.pdf",

        // 2021
        "haberes_enero_2021.pdf",
        "haberes_febrero_2021.pdf",
        "haberes_marzo_2021.pdf",
        "haberes_abril_2021.pdf",
        "haberes_mayo_2021.pdf",
        "haberes_julio_2021.pdf",
        "haberes_agosto_2021.pdf",
        "haberes_septiembre_2021.pdf",
        "haberes_octubre_2021_0.pdf",
        "haberes_noviembre_2021.pdf",
        "haberes_diciembre_2021.pdf",

        // 2022
        "haberes_enero_2022.pdf",
        "haberes_febrero_2022_0.pdf",
        "haberes_marzo_2022_0.pdf",
        "haberes_abril_2022.pdf",
        "haberes_mayo_2022.pdf",
        "haberes_julio_2022_2.pdf",
        "haberes_agosto_2022.pdf",
        "haberes_septiembre_2022.pdf",
        "haberes_octubre_2022.pdf",
        "haberes_noviembre_2022.pdf",
        "haberes_diciembre_2022.pdf",

        // 2023
        "haberes_enero_2023.pdf",
        "haberes_febrero_2023.pdf",
        "haberes_marzo_2023.pdf",
        "haberes_abril_2023.pdf",
        "haberes_mayo_2023.pdf",
        "haberes_junio_2023.pdf",
        "haberes_julio_2023.pdf",
        "haberes_agosto_2023.pdf",
        "haberes_septiembre_2023.pdf",
        "haberes_octubre_2023.pdf",
        "haberes_noviembre_2023.pdf",
        "haberes_diciembre_2023.pdf",

        // 2024
        "haberes_enero_2024.pdf",
        "haberes_febrero_2024.pdf",
        "haberes_marzo_2024.pdf",
        "haberes_abril_2024.pdf",
        "haberes_mayo_2024.pdf",
        "haberes_junio_2024.pdf",
        "haberes_julio_2024.pdf",
        "haberes_agosto_2024.pdf",
        "haberes_septiembre_2024.pdf",
        "haberes_octubre_2024.pdf",
        "haberes_noviembre_2024.pdf",
        "haberes_diciembre_2024.pdf",

        // 2025
        "haberes_enero_2025.pdf",
        "haberes_febrero_2025_1.pdf",
        "haberes_marzo_2025.pdf",
        "haberes_abril_2025.pdf",
        "haberes_mayo_2025.pdf",
        "haberes_junio_2025.pdf",
        "haberes_julio_2025.pdf",
        "haberes_agosto_2025.pdf",
        "haberes_septiembre_2025.pdf",
        "haberes_oct_2025.pdf",
        "haberes_noviembre_2025.pdf"
    ];
    return <div className="w-3/5 h-fit flex flex-col animate-fade items-center">
        <TablaDescargas selector={true} listado={haberes}  />
    </div>
}