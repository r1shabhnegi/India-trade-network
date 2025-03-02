import { Port } from "./types";

export const getPortPaths = (
  port: Port | null,
  allPorts: Port[]
): Array<
  [
    {
      lat: number;
      lng: number;
      ind_port_name: string;
      country: string;
    },
    {
      lat: number;
      lng: number;
      name: string;
    }
  ]
> => {
  if (!port) return [];
  if (!port.ind_port_name) {
    return allPorts
      ?.filter((p: Port) => p.ind_port_name === port.name)
      .map((p: Port) => [
        {
          lat: +p.ind_port_lat,
          lng: +p.ind_port_lng,
          ind_port_name: p.ind_port_name,
          country: p.country,
        },
        {
          lat: +p.lat,
          lng: +p.lng,
          name: p.name,
        },
      ]);
  } else {
    return [
      [
        {
          lat: +port.ind_port_lat,
          lng: +port.ind_port_lng,
          ind_port_name: port.ind_port_name,
          country: port.country,
        },
        {
          lat: +port.lat,
          lng: +port.lng,
          name: port.name,
        },
      ],
    ];
  }
};
