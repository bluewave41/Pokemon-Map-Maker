import { useEffect, useState, useRef } from "react";
import axios from "axios";
import loadMap from "@/lib/MapLoader";
import { GameMap } from "@/schemas/gameMapSchema";
import Canvas from "@/lib/Canvas";
import SpriteBank from "@/lib/SpriteBank";
import styles from "./MapDisplay.module.scss";
import cn from "classnames";

interface MapDisplayProps {
  name: string;
}

export function MapDisplay({ name }: MapDisplayProps) {
  const [map, setMap] = useState<GameMap | null>(null);
  const [tool, setTool] = useState(1);
  const canvasRef = useRef();
  const overlayCanvasRef = useRef();
  const mainCanvas = useRef<Canvas>();
  const [mouse, setMouse] = useState({ x: -1, y: -1, down: false });

  useEffect(() => {
    async function fetchMap() {
      const response = await axios.post("/api/fetchMap", { name });
      const fetchedMap = loadMap(Buffer.from(response.data, "binary"));
      setMap(fetchedMap);
      SpriteBank.loadSprites("maps/littleroot/main", fetchedMap.images);
    }
    fetchMap();
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }
    mainCanvas.current = new Canvas(canvasRef.current);
    mainCanvas.current.drawRect(0, 0, 50, 50);
    drawMap();
    drawOverlay();
  }, [map]);

  const drawMap = () => {
    if (!map) {
      return null;
    }
    for (var y = 0; y < map.height; y++) {
      for (var x = 0; x < map.width; x++) {
        const tileId = map.tiles[x][y].tileId;
        mainCanvas.current?.drawImage(
          x,
          y,
          SpriteBank.getSprite(`maps/littleroot/main/${tileId}`)
        );
      }
    }
  };

  const drawOverlay = () => {
    if (!map) {
      return null;
    }
    for (var y = 0; y < map.height; y++) {
      for (var x = 0; x < map.width; x++) {
        mainCanvas.current?.drawTransparentRect(x, y, 16, 16, {
          color: map.tiles[x][y].properties.impassable ? "red" : "blue",
        });
      }
    }
  };

  const setTile = (e, clicked: boolean) => {
    if (!mainCanvas.current || !map) {
      return null;
    }
    const box = e.target.getBoundingClientRect();
    const zoomFactor = mainCanvas.current?.getZoomFactor();
    const { pageX, pageY } = e;
    const x = Math.floor((pageX - box.left * zoomFactor) / (16 * zoomFactor));
    const y = Math.floor((pageY - box.top * zoomFactor) / (16 * zoomFactor));
    if (mouse.down || clicked) {
      const tiles = map.tiles;
      tiles[x][y].setProperties(getMask());
      setMap({ ...map, tiles });
    }
    setMouse({ ...mouse, x, y });
  };

  const mouseOver = (e) => {
    if (!mainCanvas.current || !map || !mouse.down) {
      return null;
    }
    setTile(e, false);
  };

  const getMask = () => {
    switch (tool) {
      case 1:
        return -0b00000001;
      case 2:
        return 0b00000001;
      case 3:
        return 0b00000010;
      default:
        return 0;
    }
  };

  const mouseDown = (e) => {
    setTile(e, true);
    setMouse({ ...mouse, down: true });
  };

  const mouseUp = (e) => {
    setMouse({ ...mouse, down: false });
  };

  const saveMap = async () => {
    const response = await axios.post("/api/saveMap", { map });
  };

  if (!map) {
    return null;
  }

  return (
    <div>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={map.width * 16}
        height={map.height * 16}
        onMouseMove={mouseOver}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
      />
      <canvas
        style={{ left: -map.width * 16 }}
        className={styles.overlayCanvas}
        ref={overlayCanvasRef}
        width={map.width * 16}
        height={map.height * 16}
      />
      <div className={styles.properties}>
        <div
          className={cn(styles.selector, styles.default)}
          onClick={() => setTool(1)}
        >
          1
        </div>
        <div
          className={cn(styles.selector, styles.impassable)}
          onClick={() => setTool(2)}
        >
          2
        </div>
        <div
          className={cn(styles.selector, styles.topLayer)}
          onClick={() => setTool(3)}
        >
          3
        </div>
      </div>
      <div>
        <p>{mouse.x}</p>
        <p>{mouse.y}</p>
        <p>Tool: {tool}</p>
        <button onClick={saveMap}>Save</button>
      </div>
    </div>
  );
}
