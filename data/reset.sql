-- reset all data and sequence in db ---

TRUNCATE table "Quan" RESTART identity cascade;
TRUNCATE table "Phuong"  RESTART identity cascade;
TRUNCATE table "QuangCao"  RESTART identity cascade;
TRUNCATE table "YeuCauCapPhep"  RESTART identity cascade;
TRUNCATE table "HinhThucQC"  RESTART identity cascade;
TRUNCATE table "DiaDiem"  RESTART identity cascade;
TRUNCATE table "LoaiViTri"  RESTART identity cascade;
TRUNCATE table "LoaiBangQC"  RESTART identity cascade;
TRUNCATE table "LoaiBaoCao"  RESTART identity cascade;
truncate table "QuangCao" RESTART identity cascade;