import {
  mysqlTable,
  int,
  varchar,
  decimal,
  timestamp,
  text,
} from "drizzle-orm/mysql-core";

export const portMaster = mysqlTable("port_master", {
  port_id: int("port_id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  image_url: varchar("image_url", { length: 200 }).notNull(),
  number_of_berths: int("number_of_berths").notNull(),
  port_type: varchar("port_type", { length: 100 }).notNull(),
  average_tat: decimal("average_tat", { precision: 6, scale: 3 }).notNull(),
  port_capacity: int("port_capacity").notNull(),
  dominant_cargo: varchar("dominant_cargo", { length: 200 }).notNull(),
  lat: decimal("lat", { precision: 6, scale: 3 }).notNull(),
  lng: decimal("lng", { precision: 6, scale: 3 }).notNull(),
  status: varchar("status", { length: 10 }).notNull(),
  ind_port_name: varchar("ind_port_name", { length: 100 }),
  ind_port_lat: decimal("ind_port_lat", { precision: 6, scale: 3 }),
  ind_port_lng: decimal("ind_port_lng", { precision: 6, scale: 3 }),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const portKpis = mysqlTable("port_kpis", {
  kpi_id: int("kpi_id").primaryKey(),
  kpi_category: varchar("kpi_category", { length: 500 }).notNull(),
  kpi: varchar("kpi", { length: 500 }).notNull(),
  kpi_international_target: varchar("kpi_international_target", {
    length: 500,
  }).notNull(),
  kpi_national_target: varchar("kpi_national_target", {
    length: 500,
  }).notNull(),
  current_status: varchar("current_status", { length: 500 }),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const kpiTargetsLinks = mysqlTable("kpi_target_links", {
  link_id: int("link_id").primaryKey(),
  target_type: varchar("target_type", { length: 50 }).notNull(),
  link_url: varchar("link_url", { length: 500 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  kpi_id: int("kpi_id").references(() => portKpis.kpi_id, {
    onDelete: "cascade",
  }),
});

export const portGreenInitiatives = mysqlTable("port_green_initiatives", {
  initiative_id: int("initiative_id").primaryKey(),
  initiative: text("initiative").notNull(),
  initiative_url: varchar("initiative_url", { length: 200 }).notNull(),
  kpi: varchar("kpi", { length: 500 }),
  created_at: timestamp("created_at").notNull().defaultNow(),
  kpi_id: int("kpi_id").references(() => portKpis.kpi_id, {
    onDelete: "cascade",
  }),
  port_id: int("portId")
    .references(() => portMaster.port_id, { onDelete: "cascade" })
    .notNull(),
});
