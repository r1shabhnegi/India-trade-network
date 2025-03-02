import { AdvancedMarker } from "@vis.gl/react-google-maps";
import React, { useCallback, useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MarkerCard from "./MarkerCard";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { Port } from "@/lib/types";
import HoveredCardPortal from "./HoveredCardPortal";

interface PortLocation {
  lat: number;
  lng: number;
  name: string;
}

interface PortalInfo {
  port: Port | null;
  position: { x: number; y: number } | null;
}

interface MarkersProps {
  ports: Port[];
  setIsModal: (isModal: boolean) => void;
  setModalPortData: (port: Port) => void;
  setClickedPort: (port: Port | null) => void;
  setDefaultZoom: (defaultZoom: number) => void;
  clickedPort: Port | null;
  setHoveredPort: (port: Port | null) => void;
  hoveredPort: Port | null;
  setDefaultCenter: (defaultCenter: { lat: number; lng: number }) => void;
  clickedPortCard: PortLocation | null;
  setClickedPortCard: (clickedPortCard: PortLocation | null) => void;
  hoveredPortCard: PortLocation | null;
  setHoveredPortCard: (hoveredPortCard: PortLocation | null) => void;
}

const Markers: React.FC<MarkersProps> = ({
  ports,
  setIsModal,
  setModalPortData,
  setClickedPort,
  setDefaultZoom,
  clickedPort,
  setHoveredPort,
  hoveredPort,
  setDefaultCenter,
  clickedPortCard,
  setClickedPortCard,
  setHoveredPortCard,
}) => {
  const [hoveredPortalInfo, setHoveredPortalInfo] = useState<PortalInfo>({
    port: null,
    position: null,
  });

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const portZoomSettings = useMemo(
    () => ({
      "Jawaharlal Nehru Port Authority": {
        center: { lat: 42.1877, lng: 44.0107 },
        zoom: 3.5,
      },
      "Vishakhapatnam Port Authority": {
        center: { lat: 33.6868, lng: 9.5375 },
        zoom: 3,
      },
      "V.O. Chidambaranar Port Authority": {
        center: { lat: 18.0339, lng: 1.6596 },
        zoom: 3,
      },
      "Deendayal Port Authority": {
        center: { lat: 29.4893, lng: 60.864 },
        zoom: 5,
      },
    }),
    []
  );

  const handleClickMarker = useCallback(
    (port: Port) => {
      setClickedPortCard({ lat: +port.lat, lng: +port.lng, name: port.name });

      setClickedPort(port);

      if (!isMobile && port && !port.ind_port_name) {
        const settings =
          portZoomSettings[port.name as keyof typeof portZoomSettings];
        if (settings) {
          setDefaultCenter(settings.center);
          setDefaultZoom(settings.zoom);
        }
      }
    },
    [
      setClickedPortCard,
      setClickedPort,
      isMobile,
      portZoomSettings,
      setDefaultCenter,
      setDefaultZoom,
    ]
  );

  const handleHoverMarker = useCallback(
    (port: Port | null, event?: React.MouseEvent) => {
      setHoveredPort(port);

      if (port) {
        setHoveredPortCard({
          lat: +port.lat,
          lng: +port.lng,
          name: port.name,
        });

        if (event) {
          setHoveredPortalInfo({
            port,
            position: { x: event.clientX, y: event.clientY },
          });
        }
      } else {
        setHoveredPortCard(null);
        setHoveredPortalInfo({ port: null, position: null });
      }
    },
    [setHoveredPort, setHoveredPortCard]
  );

  return (
    <>
      <HoveredCardPortal
        port={hoveredPortalInfo.port}
        position={hoveredPortalInfo.position}
        clickedPort={clickedPort}
      />

      {ports?.map((port) => {
        const position = { lat: +port.lat, lng: +port.lng };
        const isActive =
          clickedPort?.port_id === port.port_id ||
          hoveredPort?.port_id === port.port_id;

        return (
          <AdvancedMarker
            key={port.port_id + port.lat}
            position={position}
            zIndex={isActive ? 100 : 1}
            onClick={() => handleClickMarker(port)}>
            <FontAwesomeIcon
              icon={faLeaf}
              onMouseEnter={(e) => handleHoverMarker(port, e)}
              onMouseLeave={() => handleHoverMarker(null)}
              size='3x'
              className='opacity-80 hover:opacity-100 hover:text-green-600 text-green-800'
              // opacity={0.8}
            />
            {clickedPortCard?.name === port.name && (
              <MarkerCard
                port={port}
                clickedPort={clickedPortCard}
                setIsModal={setIsModal}
                setModalPortData={setModalPortData}
              />
            )}
          </AdvancedMarker>
        );
      })}
    </>
  );
};

export default React.memo(Markers);
