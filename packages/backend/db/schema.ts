import { sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  uuid,
  boolean,
  doublePrecision,
  primaryKey,
  real,
  date,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
const LoaiViTri = pgTable("LoaiViTri", {
  id_loai_vt: serial("id").primaryKey(),
  loai_vitri: varchar("loai_vitri", { length: 255 }).notNull(),
});

const HinhThucQC = pgTable("HinhThucQC", {
  id_htqc: serial("id").primaryKey(),
  hinh_thuc_qc: varchar("hinh_thuc_qc", { length: 255 }).notNull(),
});

const LoaiBangQC = pgTable("LoaiBangQC", {
  id_loai_bang_qc: serial("id_loai_bang_qc").primaryKey(),
  loai_bang_qc: varchar("loai_bang_qc", { length: 255 }).notNull(),
});

const Quan = pgTable("Quan", {
  id_quan: serial("id").primaryKey(),
  ten_quan: varchar("ten_quan", { length: 255 }).notNull(),
});

const Phuong = pgTable("Phuong", {
  id_phuong: serial("id").primaryKey(),
  ten_phuong: varchar("ten_phuong", { length: 255 }).notNull(),
  id_quan: integer("id_quan")
    .notNull()
    .references(() => Quan.id_quan),
});

const DiaDiem = pgTable("DiaDiem", {
  id_dia_diem: serial("id_dia_diem").primaryKey(),
  place_id: varchar("id_ban_do", { length: 255 }),
  ten_dia_diem: varchar("ten_dia_diem", { length: 255 }).notNull(),
  dia_chi: varchar("dia_chi", { length: 255 }).notNull(),
  lng: doublePrecision("kinh_do").notNull(),
  lat: doublePrecision("vi_do").notNull(),

  id_phuong: integer("id_phuong").references(() => Phuong.id_phuong),
});

const QuangCao = pgTable("QuangCao", {
  id_quang_cao: uuid("id").primaryKey().defaultRandom(),
  quy_hoach: boolean("quy_hoach").notNull().default(false),

  ngay_hieu_luc: date("ngay_hieu_luc"),
  ngay_het_han: date("ngay_het_han"),

  hinh_1: varchar("hinh_1", { length: 255 }),
  hinh_2: varchar("hinh_2", { length: 255 }),

  so_luong: integer("so_luong").default(1),
  chieu_dai_m: real("chieu_dai_m"),
  chieu_rong_m: real("chieu_rong_m"),

  id_loai_bang_qc: integer("id_loai_bang_qc")
    .notNull()
    .references(() => LoaiBangQC.id_loai_bang_qc),

  id_dia_diem: integer("id_dia_diem")
    .notNull()
    .references(() => DiaDiem.id_dia_diem),

  id_hinh_thuc: integer("id_hinh_thuc")
    .notNull()
    .references(() => HinhThucQC.id_htqc),

  id_loai_vitri: integer("id_loai_vitri")
    .notNull()
    .references(() => LoaiViTri.id_loai_vt),
});

const LoaiBaoCao = pgTable("LoaiBaoCao", {
  id_loai_bc: serial("id_loai_bc").primaryKey(),
  loai_bao_cao: varchar("loai_bao_cao", { length: 255 }).notNull(),
});

const BaoCao = pgTable("BaoCao", {
  id_bao_cao: serial("id_bao_cao").primaryKey(),
  ten_nguoi_gui: varchar("ten_nguoi_gui", { length: 255 }).notNull(),
  email: varchar("email", { length: 127 }),
  dien_thoai: varchar("dien_thoai", { length: 127 }),
  noi_dung: varchar("noi_dung", { length: 511 }).notNull(),
  trang_thai: varchar("trang_thai", { length: 255 })
    .notNull()
    .default("Chưa xử lý"),
  thoi_diem_bc: timestamp("thoi_diem_bc").notNull().defaultNow(),

  dia_chi: varchar("dia_chi", { length: 255 }).notNull(),
  id_quang_cao: uuid("id_quang_cao").references(() => QuangCao.id_quang_cao),
  id_dia_diem: integer("id_dia_diem").references(() => DiaDiem.id_dia_diem),

  lng: doublePrecision("kinh_do").notNull(),
  lat: doublePrecision("vi_do").notNull(),

  hinh_1: varchar("hinh_1", { length: 255 }),
  hinh_2: varchar("hinh_2", { length: 255 }),

  id_loai_bc: integer("id_loai_bc")
    .notNull()
    .references(() => LoaiBaoCao.id_loai_bc),
});

const YeuCauCapPhep = pgTable("YeuCauCapPhep", {
  id_yeu_cau: serial("id_yeu_cau").primaryKey(),
  id_diem_dat: integer("id_diem_dat").references(() => DiaDiem.id_dia_diem),
  noi_dung_qc: varchar("noi_dung_qc", { length: 255 }).notNull(),

  ten_cty: varchar("ten_cty", { length: 255 }).notNull(),
  dien_thoai_cty: varchar("dien_thoai_cty", { length: 127 }).notNull(),
  email_cty: varchar("email_cty", { length: 127 }).notNull(),
  dia_chi_cty: varchar("dia_chi_cty", { length: 255 }).notNull(),

  ngay_hieu_luc: timestamp("ngay_hieu_luc").defaultNow().notNull(),
  ngay_het_han: timestamp("ngay_het_han").defaultNow().notNull(),
  trang_thai: varchar("trang_thai").notNull().default("Waiting"),
  hinh_anh: varchar("hinh_1", { length: 255 }),
  hinh_anh_2: varchar("hinh_2", { length: 255 }),
});

const YeuCauChinhSua = pgTable("YeuCauChinhSua", {
  id_yeu_cau: serial("id_yeu_cau").primaryKey(),
  ly_do_chinh_sua: varchar("ly_do_chinh_sua", { length: 255 }).notNull(),
  thoi_diem_chinh_sua: timestamp("thoi_diem_chinh_sua").defaultNow().notNull(),
  trang_thai: varchar("trang_thai", { length: 255 }).notNull(),
  id_quang_cao: uuid("id_quang_cao")
    .notNull()
    .references(() => QuangCao.id_quang_cao),

  thong_tin_sua: jsonb("thong_tin_sua").notNull(),
});
const YeuCauChinhSuaDiaDiem = pgTable("YeuCauChinhSuaDiaDiem", {
  id_yeu_cau: serial("id_yeu_cau").primaryKey(),
  id_dia_diem: integer("id_dia_diem").references(() => DiaDiem.id_dia_diem),
  lng: doublePrecision("kinh_do"),
  lat: doublePrecision("vi_do"),
  ten_dia_diem: varchar("ten_dia_diem", { length: 255 }),
  dia_chi: varchar("dia_chi", { length: 255 }),
  ly_do_chinh_sua: varchar("ly_do_chinh_sua", { length: 255 }).notNull(),
});

const TKNguoiDung = pgTable("TKNguoiDung", {
  id_tk: uuid("id_tk").primaryKey().defaultRandom(),
  ten_tk: varchar("ten_tk", { length: 255 }).notNull().unique(),
  mat_khau: varchar("mat_khau", { length: 255 }).notNull(),
  cap_tk: varchar("cap_tk", { length: 255 }).notNull(),
  thoi_diem_tao: date("thoi_diem_tao").notNull().default(sql`CURRENT_TIMESTAMP`)
})

export {
  LoaiViTri,
  HinhThucQC,
  Phuong,
  Quan,
  DiaDiem,
  QuangCao,
  LoaiBangQC,
  LoaiBaoCao,
  BaoCao,
  YeuCauCapPhep,
  YeuCauChinhSua,
  YeuCauChinhSuaDiaDiem,
  TKNguoiDung
};
