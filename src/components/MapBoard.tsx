import { useEffect, useMemo, useState, useCallback } from "react";
import { Map, useMap } from "@vis.gl/react-google-maps";
import Marker from "@/components/Marker/Marker";
import { getKpis, getPorts } from "@/api";
import { KPIS, Port } from "@/lib/types";
import { polylinesColor } from "@/lib/PolylinesColor";
import ModalWindow from "./ModalWindow/ModalWindow";
import { polylinesCurve, createCurvePath } from "@/lib/polylinesCurves";
import { getPortPaths } from "@/lib/getPortPath";

const DEFAULT_COORDS = { lat: 22.5638, lng: 78.7861 }; // India center
const DEFAULT_ZOOM = 4.8;

const MapBoard = () => {
  const [ports, setPorts] = useState<Port[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalPortData, setModalPortData] = useState<Port>({} as Port);
  const [kpis, setKpis] = useState<KPIS[]>([]);
  const [clickedPort, setClickedPort] = useState<Port | null>(null);
  const [hoveredPort, setHoveredPort] = useState<Port | null>(null);
  const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);
  const [defaultCenter, setDefaultCenter] = useState(DEFAULT_COORDS);
  const [clickedPortCard, setClickedPortCard] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);
  const [hoveredPortCard, setHoveredPortCard] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);

  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.setZoom(zoom);
    map.setCenter(defaultCenter);
  }, [map, zoom, defaultCenter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portsData, kpisData] = await Promise.all([
          getPorts(),
          getKpis(),
        ]);
        setPorts(portsData);
        setKpis(kpisData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const polylinePaths = useMemo(() => {
    const clickedPaths = getPortPaths(clickedPort, ports);
    const hoveredPaths = getPortPaths(hoveredPort, ports);
    return [...clickedPaths, ...hoveredPaths];
  }, [clickedPort, hoveredPort, ports]);

  const handleMapClick = useCallback(() => {
    setClickedPortCard(null);
    setClickedPort(null);
  }, []);

  useEffect(() => {
    if (!map) return;

    if ((!clickedPort && !hoveredPort) || polylinePaths.length === 0) return;

    const polylines = polylinePaths.map((polylinePath) => {
      const [sourcePort, targetPort] = polylinePath;
      const curveFactor =
        polylinesCurve[targetPort.name as keyof typeof polylinesCurve] || 10;
      const curvedPath = createCurvePath(sourcePort, targetPort, curveFactor);

      const colorInfo = polylinesColor.find(
        (c) =>
          c.ind_port_name.toLowerCase() ===
          sourcePort.ind_port_name.toLowerCase()
      );
      const color = colorInfo?.color || "#000000";

      const polyline = new google.maps.Polyline({
        path: curvedPath,
        strokeColor: color,
        strokeOpacity: 1,
        strokeWeight: 1.5,
      });

      polyline.setMap(map);
      return polyline;
    });

    return () => polylines.forEach((polyline) => polyline.setMap(null));
  }, [clickedPort, hoveredPort, map, polylinePaths]);

  return (
    <>
      <Map
        onClick={handleMapClick}
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
        defaultCenter={DEFAULT_COORDS}
        defaultZoom={DEFAULT_ZOOM}
        fullscreenControl={false}>
        <Marker
          clickedPortCard={clickedPortCard}
          setClickedPortCard={setClickedPortCard}
          hoveredPortCard={hoveredPortCard}
          setHoveredPortCard={setHoveredPortCard}
          setDefaultZoom={setZoom}
          ports={ports}
          setIsModal={setIsModal}
          setModalPortData={setModalPortData}
          setClickedPort={setClickedPort}
          clickedPort={clickedPort}
          setDefaultCenter={setDefaultCenter}
          setHoveredPort={setHoveredPort}
          hoveredPort={hoveredPort}
        />
      </Map>

      {isModal && (
        <ModalWindow
          setIsModal={setIsModal}
          port={modalPortData}
          kpis={kpis}
        />
      )}
    </>
  );
};

export default MapBoard;
