interface MapProps {
  maps: string[];
  onSelect: (map: string) => void;
}

export function MapList({ maps, onSelect }: MapProps) {
  return (
    <div>
      {maps.map((map) => (
        <li key={map} onClick={() => onSelect(map)}>
          {map}
        </li>
      ))}
    </div>
  );
}
