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
  id_dia_diem: serial("id").primaryKey(),
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

  id_loai_bang_qc: integer("id_bang_loai_qc")
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

export { LoaiViTri, HinhThucQC, Phuong, Quan, DiaDiem, QuangCao, LoaiBangQC };
