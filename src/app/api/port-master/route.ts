// import pool from "@/lib/db";
import { db } from "@/db";
import { portMaster } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const result = await pool.query("SELECT * FROM port_master");

    const result = await db.select().from(portMaster);

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch port data" },
      { status: 500 }
    );
  }
}
