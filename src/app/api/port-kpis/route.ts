import { db } from "@/db";
import { kpiTargetsLinks, portKpis } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all KPIs
    const kpisData = await db.select().from(portKpis);

    // Get all KPI IDs
    const kpiIds = kpisData.map((kpi) => kpi.kpi_id);

    // Fetch all target links in a single query
    const allTargetLinks = await db
      .select()
      .from(kpiTargetsLinks)
      .where(inArray(kpiTargetsLinks.kpi_id, kpiIds));

    // Group the target links by KPI
    const kpisWithTargets = kpisData.map((kpiData) => {
      const kpiTargets = allTargetLinks.filter(
        (target) => target.kpi_id === kpiData.kpi_id
      );

      const nationalTargetsLinks = kpiTargets.filter(
        (t) => t.target_type === "national"
      );
      const internationalTargetsLinks = kpiTargets.filter(
        (t) => t.target_type === "international"
      );

      return {
        kpiData,
        targetsLinks: {
          national: nationalTargetsLinks,
          international: internationalTargetsLinks,
        },
      };
    });

    return NextResponse.json({ data: kpisWithTargets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching port KPIs data:", error);
    return NextResponse.json(
      { error: "Failed to fetch port KPIs data" },
      { status: 500 }
    );
  }
}
