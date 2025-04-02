import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export async function getPorts() {
  try {
    const response = await axios.get(`${baseUrl}/port/all`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching ports:", error);
    throw error;
  }
}

export async function getKpis() {
  try {
    const response = await axios.get(`${baseUrl}/kpi/all`);
    return response.data.data;
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
    const url = `${baseUrl}/kpi/initiatives?portId=${portId}&kpiId=${kpiId}`;
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching kpi-initiatives:", error);
    throw error;
  }
}
