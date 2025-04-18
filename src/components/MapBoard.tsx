import { useEffect, useMemo, useState, useCallback } from "react";
import { Map, useMap } from "@vis.gl/react-google-maps";
import Marker from "@/components/Marker/Marker";
import { getKpis, getPorts } from "@/api";
import { KPIS, Port } from "@/lib/types";
import { polylinesColor } from "@/lib/PolylinesColor";
import ModalWindow from "./ModalWindow/ModalWindow";
import { polylinesCurve, createCurvePath } from "@/lib/polylinesCurves";
import { getPortPaths } from "@/lib/getPortPath";
import Loader from "./Loader";

const DEFAULT_COORDS = { lat: 22.5638, lng: 78.7861 };

// India center
const DEFAULT_ZOOM = 4.5;

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
  const [isLoading, setIsLoading] = useState(true);

  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.setZoom(zoom);
    map.setCenter(defaultCenter);
  }, [map, zoom, defaultCenter]);

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const portsData = await getPorts();
        setPorts(portsData);
      } catch (error) {
        console.error("Error fetching ports data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPorts();
  }, []);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const kpisData = await getKpis();
        setKpis(kpisData);
      } catch (error) {
        console.error("Error fetching KPIs data:", error);
      }
    };

    fetchKpis();
  }, []);

  const polylinePaths = useMemo(() => {
    const clickedPaths = clickedPort ? getPortPaths(clickedPort, ports) : [];
    const hoveredPaths = hoveredPort ? getPortPaths(hoveredPort, ports) : [];
    return [...clickedPaths, ...hoveredPaths];
  }, [clickedPort, hoveredPort, ports]);

  const handleMapClick = useCallback(() => {
    setClickedPortCard(null);
    setClickedPort(null);
  }, []);

  useEffect(() => {
    if (!map || polylinePaths.length === 0) return;

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
  }, [map, polylinePaths]);

  if (isLoading) return <Loader />;
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
