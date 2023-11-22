import { useEffect, useState, useRef } from "react";
import axios from "axios";
import loadMap from "@/lib/MapLoader";
import { GameMap } from "@/schemas/MapSchema";
import Canvas from "@/lib/Canvas";

interface MapDisplayProps {
  name: string;
}

export function MapDisplay({ name }: MapDisplayProps) {
  const [map, setMap] = useState<GameMap | null>(null);
  const canvasRef = useRef();
  const mainCanvas = useRef<Canvas>();

  useEffect(() => {
    async function fetchMap() {
      const response = await axios.post("/api/fetchMap", { name });
      setMap(loadMap(Buffer.from(response.data, "binary")));
    }
    fetchMap();
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }
    mainCanvas.current = new Canvas(canvasRef.current);
    mainCanvas.current.drawRect(0, 0, 50, 50, "#FFF");
  }, [map]);

  if (!map) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      width={map.width * 16}
      height={map.height * 16}
    ></canvas>
  );
}
