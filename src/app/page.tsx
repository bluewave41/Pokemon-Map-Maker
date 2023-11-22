"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MapList } from "@/components/MapList";
import { MapDisplay } from "@/components/MapDisplay";

export default function Home() {
  const [maps, setMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState<string | null>(null);

  useEffect(() => {
    async function getMaps() {
      const response = await axios.get("/api/maps");
      setMaps(response.data);
    }
    getMaps();
  }, []);

  return (
    <div>
      <h1>Maps</h1>
      {!selectedMap && (
        <MapList maps={maps} onSelect={(map) => setSelectedMap(map)} />
      )}
      {selectedMap && <MapDisplay name={selectedMap} />}
    </div>
  );
}
