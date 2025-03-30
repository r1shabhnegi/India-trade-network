import { db } from "@/db";
import { kpiTargetsLinks, portKpis } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const kpisData = await db.select().from(portKpis);

    const kpisWithTargets = await Promise.all(
      kpisData.map(async (kpiData) => {
        const targets = await db
          .select()
          .from(kpiTargetsLinks)
          .where(eq(kpiTargetsLinks.kpi_id, kpiData.kpi_id));

        const nationalTargetsLinks = targets.filter(
          (t) => t.target_type === "national"
        );
        const internationalTargetsLinks = targets.filter(
          (t) => t.target_type === "international"
        );

        return {
          kpiData,
          targetsLinks: {
            national: nationalTargetsLinks,
            international: internationalTargetsLinks,
          },
        };
      })
    );

    return NextResponse.json({ data: kpisWithTargets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching port KPIs data:", error);
    return NextResponse.json(
      { error: "Failed to fetch port KPIs data" },
      { status: 500 }
    );
  }
}
