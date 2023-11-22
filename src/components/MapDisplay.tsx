import { useEffect, useState } from "react";
import axios from "axios";
import loadMap from "@/lib/MapLoader";
import { GameMap } from "@/schemas/MapSchema";

interface MapDisplayProps {
  name: string;
}

export function MapDisplay({ name }: MapDisplayProps) {
  const [map, setMap] = useState<GameMap | null>(null);
  useEffect(() => {
    async function fetchMap() {
      const response = await axios.post("/api/fetchMap", { name });
      setMap(loadMap(Buffer.from(response.data, "binary")));
    }
    fetchMap();
  }, []);

  if (!map) {
    return null;
  }

  return <canvas width={map.width * 16} height={map.height * 16}></canvas>;
}
