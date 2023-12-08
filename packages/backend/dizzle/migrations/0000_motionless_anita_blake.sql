CREATE TABLE IF NOT EXISTS "DiaDiem" (
	"id" serial PRIMARY KEY NOT NULL,
	"dia_chi" varchar(256) NOT NULL,
	"kinh_do" double precision NOT NULL,
	"vi_do" double precision NOT NULL,
	"id_phuong" integer,
	"id_quan" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "HinhThucQC" (
	"id" serial PRIMARY KEY NOT NULL,
	"hinh_thuc_qc" varchar(124) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LoaiViTri" (
	"id" serial PRIMARY KEY NOT NULL,
	"loai_vitri" varchar(124) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Phuong" (
	"id" serial PRIMARY KEY NOT NULL,
	"ten_phuong" varchar(124) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Quan" (
	"id" serial PRIMARY KEY NOT NULL,
	"ten_quan" varchar(124) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "QuangCao" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_dia_diem" integer,
	"id_hinh_thuc" integer,
	"id_loai_vitri" integer,
	"quy_hoach" boolean DEFAULT false
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "DiaDiem" ADD CONSTRAINT "DiaDiem_id_phuong_Phuong_id_fk" FOREIGN KEY ("id_phuong") REFERENCES "Phuong"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "DiaDiem" ADD CONSTRAINT "DiaDiem_id_quan_Quan_id_fk" FOREIGN KEY ("id_quan") REFERENCES "Quan"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "QuangCao" ADD CONSTRAINT "QuangCao_id_dia_diem_DiaDiem_id_fk" FOREIGN KEY ("id_dia_diem") REFERENCES "DiaDiem"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "QuangCao" ADD CONSTRAINT "QuangCao_id_hinh_thuc_HinhThucQC_id_fk" FOREIGN KEY ("id_hinh_thuc") REFERENCES "HinhThucQC"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "QuangCao" ADD CONSTRAINT "QuangCao_id_loai_vitri_LoaiViTri_id_fk" FOREIGN KEY ("id_loai_vitri") REFERENCES "LoaiViTri"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
