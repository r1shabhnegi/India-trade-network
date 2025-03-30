import { db } from "@/db";
import { portGreenInitiatives } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const portId = url.searchParams.get("port-id");
    const kpiId = url.searchParams.get("kpi-id");

    if (!portId && !kpiId) {
      return NextResponse.json(
        { data: "Port id and kpi id are not provided" },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(portGreenInitiatives)
      .where(
        and(
          eq(portGreenInitiatives.port_id, Number(portId)),
          eq(portGreenInitiatives.kpi_id, Number(kpiId))
        )
      );

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching port green initiatives data:", error);
    return NextResponse.json(
      { error: "Failed to fetch port green initiatives data" },
      { status: 500 }
    );
  }
}
