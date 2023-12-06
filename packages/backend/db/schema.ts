import { relations } from "drizzle-orm";
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
} from "drizzle-orm/pg-core";

const LoaiViTri = pgTable("LoaiViTri", {
  id_loai_vt: serial("id").primaryKey(),
  loai_vitri: varchar("loai_vitri", { length: 124 }).notNull(),
});

const HinhThucQC = pgTable("HinhThucQC", {
  id_htqc: serial("id").primaryKey(),
  hinh_thuc_qc: varchar("hinh_thuc_qc", { length: 124 }).notNull(),
});

const Quan = pgTable("Quan", {
  id_quan: serial("id").primaryKey(),
  ten_quan: varchar("ten_quan", { length: 124 }).notNull(),
});

const Phuong = pgTable("Phuong", {
  id_phuong: serial("id").primaryKey(),
  ten_phuong: varchar("ten_phuong", { length: 124 }).notNull(),
  id_quan: integer("id_quan")
    .notNull()
    .references(() => Quan.id_quan),
});

const DiaDiem = pgTable("DiaDiem", {
  id_dia_diem: serial("id").primaryKey(),
  ten_dia_diem: varchar("ten_dia_diem", { length: 256 }).notNull(),
  dia_chi: varchar("dia_chi", { length: 256 }).notNull(),
  lng: doublePrecision("kinh_do").notNull(),
  lat: doublePrecision("vi_do").notNull(),

  id_phuong: integer("id_phuong").references(() => Phuong.id_phuong),
  id_quan: integer("id_quan").references(() => Quan.id_quan),
});

const QuangCao = pgTable("QuangCao", {
  id_quang_cao: uuid("id").primaryKey().defaultRandom(),
  quy_hoach: boolean("quy_hoach").notNull().default(false),

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

// const Relation_QuangCao = relations(QuangCao, ({ one }) => ({
//   dia_diem: one(DiaDiem),
//   hinh_thuc: one(HinhThucQC),
//   loai_vt: one(LoaiViTri),
// }));

// const Relation_DiaDiem = relations(DiaDiem, ({ one, many }) => ({
//   dia_diem: many(DiaDiem),
// }));

// const Relation_Phuong = relations(Phuong, ({ one, many }) => ({
//   quan: one(Quan),
//   dia_diem: many(DiaDiem),
// }));

// const Relation_Quan = relations(Quan, ({ one, many }) => ({
//   phuong: one(Quan),
//   dia_diem: many(DiaDiem),
// }));

export {
  LoaiViTri,
  HinhThucQC,
  Phuong,
  Quan,
  DiaDiem,
  QuangCao,
  // Relation_QuangCao,
  // Relation_DiaDiem,
  //Relation_Phuong,
  //Relation_Quan,
};
