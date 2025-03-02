export interface Port {
  port_id: number;
  name: string;
  country: string;
  city: string;
  image_url: string;
  number_of_berths: number;
  port_type: string;
  average_tat: number;
  port_capacity: number;
  dominant_cargo: string;
  lat: number;
  lng: number;
  ind_port_name: string;
  ind_port_lat: number;
  ind_port_lng: number;
  status: string;
}

export interface KPIS {
  kpiData: {
    kpi_id: number;
    kpi_category: string;
    kpi: string;
    kpi_national_target: string;
    kpi_international_target: string;
  };
  targetsLinks: {
    international: {
      link_id: number;
      target_type: string;
      link_url: string;
      created_at: string;
      kpi_id: number;
    }[];
    national: {
      link_id: number;
      target_type: string;
      link_url: string;
      created_at: string;
      kpi_id: number;
    }[];
  };
}

export interface IInitiatives {
  created_at: string;
  initiative: string;
  initiative_id: number;
  initiative_url: string;
  kpi: string;
  kpi_id: number;
  port_id: number;
}

export interface TargetLinks {
  kpi_id: number;
  targets: {
    international: {
      link_id: number;
      target_type: string;
      link_url: string;
      created_at: string;
      kpi_id: number;
    }[];
    nation: {
      link_id: number;
      target_type: string;
      link_url: string;
      created_at: string;
      kpi_id: number;
    }[];
  };
}

export interface KpisByCategory {
  [category: string]: Array<{
    kpi_id: number;
    kpi: string;
    kpi_national_target: string;
    kpi_international_target: string;
    kpi_international_target_links: {
      link_id: number;
      target_type: string;
      link_url: string;
      created_at: string;
      kpi_id: number;
    }[];
    kpi_nation_target_links: {
      link_id: number;
      target_type: string;
      link_url: string;
      created_at: string;
      kpi_id: number;
    }[];
  }>;
}

export interface ITargetSection {
  label: string;
  targetText: string;
  links:
    | {
        link_id: number;
        target_type: string;
        link_url: string;
        created_at: string;
        kpi_id: number;
      }[]
    | undefined;
}
