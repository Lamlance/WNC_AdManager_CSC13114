CREATE TABLE IF NOT EXISTS "BaoCao" (
	"id_bao_cao" serial PRIMARY KEY NOT NULL,
	"ten_nguoi_gui" varchar(255) NOT NULL,
	"email" varchar(127),
	"dien_thoai" varchar(127),
	"noi_dung" varchar(511) NOT NULL,
	"id" integer,
	"id_loai_bc" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "DiaDiem" (
	"id_dia_diem" serial PRIMARY KEY NOT NULL,
	"id_ban_do" varchar(255),
	"ten_dia_diem" varchar(255) NOT NULL,
	"dia_chi" varchar(255) NOT NULL,
	"kinh_do" double precision NOT NULL,
	"vi_do" double precision NOT NULL,
	"id_phuong" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "HinhThucQC" (
	"id" serial PRIMARY KEY NOT NULL,
	"hinh_thuc_qc" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LoaiBangQC" (
	"id_loai_bang_qc" serial PRIMARY KEY NOT NULL,
	"loai_bang_qc" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LoaiBaoCao" (
	"id_loai_bc" serial PRIMARY KEY NOT NULL,
	"loai_bao_cao" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "LoaiViTri" (
	"id" serial PRIMARY KEY NOT NULL,
	"loai_vitri" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Phuong" (
	"id" serial PRIMARY KEY NOT NULL,
	"ten_phuong" varchar(255) NOT NULL,
	"id_quan" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Quan" (
	"id" serial PRIMARY KEY NOT NULL,
	"ten_quan" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "QuangCao" (
	"id" serial PRIMARY KEY NOT NULL,
	"quy_hoach" boolean DEFAULT false NOT NULL,
	"ngay_hieu_luc" date,
	"ngay_het_han" date,
	"hinh_1" varchar(255),
	"hinh_2" varchar(255),
	"so_luong" integer DEFAULT 1,
	"chieu_dai_m" real,
	"chieu_rong_m" real,
	"id_loai_bang_qc" integer NOT NULL,
	"id_dia_diem" integer NOT NULL,
	"id_hinh_thuc" integer NOT NULL,
	"id_loai_vitri" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "YeuCauCapPhep" (
	"id_yeu_cau" serial PRIMARY KEY NOT NULL,
	"id_diem_dat" serial NOT NULL,
	"noi_dung_qc" varchar(255) NOT NULL,
	"ten_cty" varchar(255) NOT NULL,
	"dien_thoai_cty" varchar(127) NOT NULL,
	"email_cty" varchar(127) NOT NULL,
	"dia_chi_cty" varchar(255) NOT NULL,
	"ngay_hieu_luc" date NOT NULL,
	"ngay_het_han" date NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BaoCao" ADD CONSTRAINT "BaoCao_id_QuangCao_id_fk" FOREIGN KEY ("id") REFERENCES "QuangCao"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BaoCao" ADD CONSTRAINT "BaoCao_id_loai_bc_LoaiBaoCao_id_loai_bc_fk" FOREIGN KEY ("id_loai_bc") REFERENCES "LoaiBaoCao"("id_loai_bc") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "DiaDiem" ADD CONSTRAINT "DiaDiem_id_phuong_Phuong_id_fk" FOREIGN KEY ("id_phuong") REFERENCES "Phuong"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Phuong" ADD CONSTRAINT "Phuong_id_quan_Quan_id_fk" FOREIGN KEY ("id_quan") REFERENCES "Quan"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "QuangCao" ADD CONSTRAINT "QuangCao_id_loai_bang_qc_LoaiBangQC_id_loai_bang_qc_fk" FOREIGN KEY ("id_loai_bang_qc") REFERENCES "LoaiBangQC"("id_loai_bang_qc") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "QuangCao" ADD CONSTRAINT "QuangCao_id_dia_diem_DiaDiem_id_dia_diem_fk" FOREIGN KEY ("id_dia_diem") REFERENCES "DiaDiem"("id_dia_diem") ON DELETE no action ON UPDATE no action;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "YeuCauCapPhep" ADD CONSTRAINT "YeuCauCapPhep_id_diem_dat_DiaDiem_id_dia_diem_fk" FOREIGN KEY ("id_diem_dat") REFERENCES "DiaDiem"("id_dia_diem") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
