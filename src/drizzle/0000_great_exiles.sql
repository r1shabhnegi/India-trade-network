CREATE TABLE `kpi_target_links` (
	`link_id` int NOT NULL,
	`target_type` varchar(50) NOT NULL,
	`link_url` varchar(500) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`kpi_id` int,
	CONSTRAINT `kpi_target_links_link_id` PRIMARY KEY(`link_id`)
);
--> statement-breakpoint
CREATE TABLE `port_green_initiatives` (
	`initiative_id` int NOT NULL,
	`initiative` text NOT NULL,
	`initiative_url` varchar(200) NOT NULL,
	`kpi` varchar(500),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`kpi_id` int,
	`portId` int NOT NULL,
	CONSTRAINT `port_green_initiatives_initiative_id` PRIMARY KEY(`initiative_id`)
);
--> statement-breakpoint
CREATE TABLE `port_kpis` (
	`kpi_id` int NOT NULL,
	`kpi_category` varchar(500) NOT NULL,
	`kpi` varchar(500) NOT NULL,
	`kpi_international_target` varchar(500) NOT NULL,
	`kpi_national_target` varchar(500) NOT NULL,
	`current_status` varchar(500),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `port_kpis_kpi_id` PRIMARY KEY(`kpi_id`)
);
--> statement-breakpoint
CREATE TABLE `port_master` (
	`port_id` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`country` varchar(100) NOT NULL,
	`city` varchar(100) NOT NULL,
	`image_url` varchar(200) NOT NULL,
	`number_of_berths` int NOT NULL,
	`port_type` varchar(100) NOT NULL,
	`average_tat` decimal(6,3) NOT NULL,
	`port_capacity` int NOT NULL,
	`dominant_cargo` varchar(200) NOT NULL,
	`lat` decimal(6,3) NOT NULL,
	`lng` decimal(6,3) NOT NULL,
	`status` varchar(10) NOT NULL,
	`ind_port_name` varchar(100),
	`ind_port_lat` decimal(6,3),
	`ind_port_lng` decimal(6,3),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `port_master_port_id` PRIMARY KEY(`port_id`)
);
--> statement-breakpoint
ALTER TABLE `kpi_target_links` ADD CONSTRAINT `kpi_target_links_kpi_id_port_kpis_kpi_id_fk` FOREIGN KEY (`kpi_id`) REFERENCES `port_kpis`(`kpi_id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `port_green_initiatives` ADD CONSTRAINT `port_green_initiatives_kpi_id_port_kpis_kpi_id_fk` FOREIGN KEY (`kpi_id`) REFERENCES `port_kpis`(`kpi_id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `port_green_initiatives` ADD CONSTRAINT `port_green_initiatives_portId_port_master_port_id_fk` FOREIGN KEY (`portId`) REFERENCES `port_master`(`port_id`) ON DELETE cascade ON UPDATE no action;