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
CREATE TABLE IF NOT EXISTS "YeuCauCapPhep" (
	"id_yeu_cau" serial PRIMARY KEY NOT NULL,
	"id_diem_dat" serial NOT NULL,
	"noi_dung_qc" varchar(255) NOT NULL,
	"ten_cty" varchar(255) NOT NULL,
	"dien_thoai_cty" varchar(255) NOT NULL,
	"ngay_hieu_luc" date NOT NULL,
	"ngay_het_han" date NOT NULL
);
--> statement-breakpoint
ALTER TABLE "DiaDiem" DROP CONSTRAINT "DiaDiem_id_quan_Quan_id_fk";
--> statement-breakpoint
ALTER TABLE "QuangCao" DROP CONSTRAINT "QuangCao_id_dia_diem_DiaDiem_id_fk";
--> statement-breakpoint
ALTER TABLE "DiaDiem" ALTER COLUMN "dia_chi" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "HinhThucQC" ALTER COLUMN "hinh_thuc_qc" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "LoaiViTri" ALTER COLUMN "loai_vitri" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "Phuong" ALTER COLUMN "ten_phuong" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "Quan" ALTER COLUMN "ten_quan" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "QuangCao" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "QuangCao" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "QuangCao" ALTER COLUMN "id_dia_diem" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "QuangCao" ALTER COLUMN "id_hinh_thuc" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "QuangCao" ALTER COLUMN "id_loai_vitri" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "QuangCao" ALTER COLUMN "quy_hoach" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "DiaDiem" ADD COLUMN "id_dia_diem" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "DiaDiem" ADD COLUMN "id_ban_do" varchar(255);--> statement-breakpoint
ALTER TABLE "DiaDiem" ADD COLUMN "ten_dia_diem" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "Phuong" ADD COLUMN "id_quan" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "QuangCao" ADD COLUMN "ngay_hieu_luc" date;--> statement-breakpoint
ALTER TABLE "QuangCao" ADD COLUMN "ngay_het_han" date;--> statement-breakpoint
ALTER TABLE "QuangCao" ADD COLUMN "hinh_1" varchar(255);--> statement-breakpoint
ALTER TABLE "QuangCao" ADD COLUMN "hinh_2" varchar(255);--> statement-breakpoint
ALTER TABLE "QuangCao" ADD COLUMN "so_luong" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "QuangCao" ADD COLUMN "chieu_dai_m" real;--> statement-breakpoint
ALTER TABLE "QuangCao" ADD COLUMN "chieu_rong_m" real;--> statement-breakpoint
ALTER TABLE "QuangCao" ADD COLUMN "id_loai_bang_qc" integer NOT NULL;--> statement-breakpoint
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
ALTER TABLE "DiaDiem" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "DiaDiem" DROP COLUMN IF EXISTS "id_quan";--> statement-breakpoint
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
 ALTER TABLE "YeuCauCapPhep" ADD CONSTRAINT "YeuCauCapPhep_id_diem_dat_DiaDiem_id_dia_diem_fk" FOREIGN KEY ("id_diem_dat") REFERENCES "DiaDiem"("id_dia_diem") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
