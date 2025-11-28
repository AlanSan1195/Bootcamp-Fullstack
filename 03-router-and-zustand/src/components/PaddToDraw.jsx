import { useRef, useState } from "react";

export default function PadToDraw({ width = 500, height = 300, onExport }) {
  const [paths, setPaths] = useState([]);     // todos los trazos
  const [currentPath, setCurrentPath] = useState([]); // trazo actual
  const isDrawing = useRef(false);

  const svgRef = useRef(null);

  // Convierte array de puntos a atributo d de un <path>
  const pointsToPath = (points) => {
    if (points.length === 0) return "";
    const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
    return d;
  };

  const startDraw = (x, y) => {
    isDrawing.current = true;
    setCurrentPath([{ x, y }]);
  };

  const draw = (x, y) => {
    if (!isDrawing.current) return;
    setCurrentPath((prev) => [...prev, { x, y }]);
  };

  const endDraw = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    setPaths((prev) => [...prev, currentPath]);
    setCurrentPath([]);
  };

  // Exportar SVG como texto
  const exportSVG = () => {
    const svgElement = svgRef.current;
    const svgString = new XMLSerializer().serializeToString(svgElement);
    if (onExport) onExport(svgString);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Área de dibujo */}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="border border-gray-400 bg-white touch-none"
        onMouseDown={(e) => startDraw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
        onMouseMove={(e) => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}

        onTouchStart={(e) => {
          const touch = e.touches[0];
          const rect = e.target.getBoundingClientRect();
          startDraw(touch.clientX - rect.left, touch.clientY - rect.top);
        }}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          const rect = e.target.getBoundingClientRect();
          draw(touch.clientX - rect.left, touch.clientY - rect.top);
        }}
        onTouchEnd={endDraw}
      >
        {/* Trazos ya dibujados */}
        {paths.map((p, i) => (
          <path
            key={i}
            d={pointsToPath(p)}
            stroke="black"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {/* Trazo actual */}
        {currentPath.length > 0 && (
          <path
            d={pointsToPath(currentPath)}
            stroke="black"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* Botón para exportar */}
      <button
        onClick={exportSVG}
        className="px-3 py-1 bg-black text-white rounded"
      >
        Exportar SVG
      </button>
    </div>
  );
}
