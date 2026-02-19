interface ColorDividerProps {
  /** Clases CSS para el contenedor del divisor */
  className?: string;
  /** Altura de cada franja (ej: "h-1", "h-1.5"). Por defecto "h-1" */
  barHeight?: string;
}

const DEFAULT_HEIGHT = "h-1";

export default function ColorDivider({ className = "", barHeight = DEFAULT_HEIGHT }: ColorDividerProps) {
  return (
    <div className={`w-full flex flex-row ${className}`.trim()}>
      <span className={`flex-1 bg-green-base ${barHeight}`} />
      <span className={`flex-1 bg-blue-base ${barHeight}`} />
      <span className={`flex-1 bg-red-base ${barHeight}`} />
      <span className={`flex-1 bg-yellow-base ${barHeight}`} />
    </div>
  );
}
