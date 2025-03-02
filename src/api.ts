export async function getPorts() {
  try {
    const response = await fetch("/api/port-master");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching ports:", error);
    throw error;
  }
}

export async function getKpis() {
  try {
    const response = await fetch("/api/port-kpis");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching ports:", error);
    throw error;
  }
}

export async function getKpiInitiatives({
  portId,
  kpiId,
}: {
  portId: string;
  kpiId: string;
}) {
  try {
    const url = `/api/kpi-initiatives?port-id=${portId}&kpi-id=${kpiId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching kpi-initiatives:", error);
    throw error;
  }
}
