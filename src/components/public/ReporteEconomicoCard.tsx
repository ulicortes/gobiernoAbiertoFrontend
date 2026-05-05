'use client'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '@/services/api';
import { servicio } from '@/services/service';

export interface Archivo {
    id: string;
    name?: string;
    title?: string;
    trimester?: string;
    year?: number;
    filePath?: string;
    isAnnualBudget?: boolean;
}

interface ReporteEconomicoCardProps {
    anio: number;
    archivos: Archivo[];
}

function toAbsoluteFileUrl(filePath: string): string {
    if (/^https?:\/\//i.test(filePath)) return filePath;
    const base = (api.defaults.baseURL || '').replace(/\/$/, '');
    const rel = filePath.replace(/^\/+/, '');
    return base ? `${base}/${rel}` : `/${rel}`;
}

export default function ReporteEconomicoCard({ anio, archivos }: ReporteEconomicoCardProps) {
    const annualBudgetFile = archivos.find(
        (archivo) => archivo.isAnnualBudget === true && archivo.year === anio
    );
    // const annualBudgetHref = annualBudgetFile?.filePath
    //     ? toAbsoluteFileUrl(annualBudgetFile.filePath)
    //     : undefined;

    async function downloadFile(id?: string, title?: string) {
        try {
            const response = await servicio.descargarArchivo(id||'');

            const url = window.URL.createObjectURL(new Blob([response?.data]));
            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', title||'');

            document.body.appendChild(link);
            link.click();

            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar:", error);
        }
    }

    const renderTrimestre = (trimestre: string) => {
        const archivosTrimestre = archivos.filter(a => a.trimester === trimestre);

        return (
            <div className="w-full flex flex-col mb-4">
                <h2 className="w-5/6 self-start text-xl text-blue-light font-bold mb-2">{trimestre}</h2>
                <div className="w-5/6 self-center flex flex-col items-start font-sans">
                    {archivosTrimestre.length > 0 ? (
                        archivosTrimestre.map((archivo) => {
                            const fileHref = archivo.filePath
                                ? toAbsoluteFileUrl(archivo.filePath)
                                : undefined;
                            return (
                                <Typography
                                    key={archivo.id}
                                    component={'a'}
                                    onClick={() => downloadFile(archivo?.id, archivo?.title)}
                                    sx={{
                                        py: 0.5,
                                        fontFamily: "sans-serif",
                                        cursor: 'pointer',
                                        color: 'var(--color-black-base)',
                                        '&:hover': { textDecoration: 'underline' },
                                    }}
                                >
                                    {archivo.title || archivo.name}
                                </Typography>
                            );
                        })
                    ) : (
                        <p className="py-1 text-sm text-gray-500 italic">No hay documentos para este trimestre.</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="mb-4 w-11/12 md:w-5/6">
            <Accordion
                sx={{
                    borderRadius: '24px !important',
                    overflow: 'hidden',
                    border: '1px solid var(--color-black-base)',
                    boxShadow: 'none',
                    '&:before': { display: 'none' },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'white', fontSize: '2rem' }} />}
                    sx={{
                        backgroundColor: 'var(--color-black-base)',
                        color: 'white',
                        '& .MuiAccordionSummary-content': { margin: '16px 0' }
                    }}
                >
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 'bold', ml: 4 }}>
                        {anio}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', p: 4 }}>
                    <Typography
                        component={annualBudgetFile ? 'a' : 'span'}
                        onClick={annualBudgetFile ? () => downloadFile(annualBudgetFile?.id, annualBudgetFile?.title): undefined}
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            mb: 2,
                            cursor: annualBudgetFile ? 'pointer' : 'default',
                            color: annualBudgetFile ? 'inherit' : 'text.secondary',
                            '&:hover': { textDecoration: annualBudgetFile ? 'underline' : 'none' },
                        }}
                    >
                        PRESUPUESTO ANUAL
                    </Typography>

                    <hr className="w-3/4 h-1 bg-blue-light border-0 rounded-lg mb-6 self-center shrink-0" aria-hidden />

                    <Box sx={{ width: '100%', px: 2, maxHeight: '400px', overflowY: 'auto' }}>
                        {renderTrimestre("Primer trimestre")}
                        {renderTrimestre("Segundo trimestre")}
                        {renderTrimestre("Tercer trimestre")}
                        {renderTrimestre("Cuarto trimestre")}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
