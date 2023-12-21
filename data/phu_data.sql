--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.1

-- Started on 2023-12-17 12:23:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3444 (class 0 OID 32840)
-- Dependencies: 227
-- Data for Name: BaoCao; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3432 (class 0 OID 16390)
-- Dependencies: 215
-- Data for Name: DiaDiem; Type: TABLE DATA; Schema: public; Owner: postgres
--


INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (1, '289 Hai Bà Trưng, Phường 8, Quận 3, Thành phố Hồ Chí Minh', 106.6907045481163, 10.788361134367696, 19, 'Nhà thờ Tân Định', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (2, '336 Hai Bà Trưng, Phường Tân Định, Quận 1, Thành phố Hồ Chí Minh', 106.68980332588731, 10.789963089539278, 1, 'Chợ tân định', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (3, '12 Trần Quốc Toản, Phường 8, Quận 3, Thành phố Hồ Chí Minh', 106.68880554413374, 10.789583679873315, 19, 'THPT Nguyễn Thị Diệu', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (4, '167 Pasteur, Phường 8, Quận 3, Thành phố Hồ Chí Minh', 106.68933125710065, 10.786348139095901, 19, 'Viện Pasteur Thành phố Hồ Chí Minh', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (5, 'QMQV+6GM, Đ. Võ Thị Sáu, Đa Kao, Quận 1, Thành phố Hồ Chí Minh', 106.69374081349183, 10.788340066532463, 2, 'Công viên Lê Văn Tám', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (6, '2 Bà Huyện Thanh Quan, Phường 6, Quận 3, Thành phố Hồ Chí Minh 72400, Việt Nam', 106.6903125, 10.7752899, 17, 'Bưu điện Quận 3', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (7, '275 Đ. Điện Biên Phủ, Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh, Việt Nam', 106.6824511, 10.7790508, 11, 'Trường THPT Nguyễn Thị Minh Khai', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (8, '284 Đ. Cống Quỳnh, Phường Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí Minh 700000, Việt Nam', 106.6827805, 10.7684262, 10, 'Bệnh viện Từ Dũ', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (9, '01 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 70000, Việt Nam', 106.696444, 10.7797908, 4, 'Nhà thờ Đức Bà', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (10, 'Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam', 106.6954459 , 10.7725221, 3, 'Chợ Bến Thành', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (11, '9B Võ Văn Tần, Phường 6, Quận 3, Thành phố Hồ Chí Minh, Việt Nam', 106.6782176 , 10.8017396, 17, 'Trường THCS Lê Quý Đôn', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (12, '25 Đ. Hoàng Sa, Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam', 106.6558776, 10.7988108, 2, 'Phở Phượng', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (13, '160 Pasteur, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',106.6782176, 10.8017396, 4, 'NHÀ HÀNG NGON', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (14, '97A P. Đức Chính, Phường Nguyễn Thái Bình, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',106.6965406, 10.7699385, 9, 'Bảo tàng Mỹ thuật Thành phố Hồ Chí Minh', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (15, '6 Võ Văn Tần, Phường 6, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',106.5928889, 10.8453367, 17, 'Trường Tiểu học Trần Quốc Thảo', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (16, '105 Bà Huyện Thanh Quan, Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',106.6841781, 10.7790189, 11, 'Trường Đại học Sài Gòn - Cơ Sở 1', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (17, '280 Đ. Điện Biên Phủ, Phường 7, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',106.6841781, 10.7790189, 18, 'Bệnh viện Mắt TP.HCM', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (18, '256 Đ. Điện Biên Phủ, Phường 7, Quận 3, Thành phố Hồ Chí Minh 70000, Việt Nam',106.6841781, 10.7790189, 18, 'The New Gym', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (19, '2 Hồ Xuân Hương, Phường 6, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',106.6848237, 10.7781353, 17, 'Nhà Thi Đấu Hồ Xuân Hương', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (20, '2 Đ. Nguyễn Thông, Phường 6, Quận 3, Thành phố Hồ Chí Minh 700000, Việt Nam',106.6837902, 10.7770386, 17, 'Bệnh viện Da Liễu TP.HCM', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (21, '284 Nguyễn Đình Chiểu, Phường 6, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',106.6838421, 10.7761962, 17, 'Hanuri Korean Fast Food', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (22, '185bis Đ. Võ Thị Sáu, Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh 700000, Việt Nam',106.6859607, 10.7816084, 11, 'THE WISELANDS Coffee', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (23, '81 Trần Quốc Thảo, Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh 700000, Việt Nam',106.6859607, 10.7816084, 11, 'Sân khấu Kịch QUỐC THẢO', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (24, '70 Đ, Bà Huyện Thanh Quan, Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh 70000, Việt Nam',106.6843979 , 10.7804384, 11, 'Trường THPT Nguyễn Thị Minh Khai', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (25, '16 Đ. Kỳ Đồng, Phường 9, Quận 3, Thành phố Hồ Chí Minh 70000, Việt Nam',106.6829988, 10.7839866, 20, 'Chả Cá Đế Vương', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (26, '116 Trần Quốc Thảo, Phường 14, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',106.6829988, 10.7839866, 25, 'Trung Tâm Y Tế Quận 3', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (27, '125A Trần Quốc Thảo, Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',106.6834119, 10.7835492, 11, 'Phổ Đình Trần Quốc Thảo - Uraetei Yakiniku', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (28, '4 Sư Thiện Chiếu, Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',106.6857025, 10.7785799, 11, 'Nhà hàng Mưa Rừng', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (29, '3A Võ Văn Tần, Phường 6, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',106.693174, 10.7810386, 17, 'Khách sạn Aristo', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (30, '192 Pasteur, Phường 6, Quận 3, Thành phố Hồ Chí Minh 700000, Việt Nam',106.6965911, 10.7815023, 17, 'Orchids Saigon Hotel', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (31, '76 78 Đ. Nguyễn Thị Minh Khai, St, Phường 6, Quận 3, Thành phố Hồ Chí Minh 070000, Việt Nam',106.6982614, 10.7832331, 17, 'Hotel des Arts Saigon MGallery Collection', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (32, '189C Đ. Cống Quỳnh, Phường Nguyễn Cư Trinh, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',106.6898401, 10.7665781, 8, 'Co.opmart Cống Quỳnh', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (33, '271 Đ. Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Thành phố Hồ Chí Minh 70000, Việt Nam',106.6885726, 10.7629783, 8, 'Cinestar Cinema Quốc Thanh', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (34, '107F Trương Định, Phường 6, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',106.6884957, 10.7798422, 17, 'Trung Tâm Thẩm Mỹ Sky Diamond', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (35, '17 Đ. Lê Duẩn, Bến Nghé, Ward, Thành phố Hồ Chí Minh 700000, Việt Nam',106.7029276, 10.7861958, 4, 'Khách sạn Sofitel Sài Gòn', NULL);

--
-- TOC entry 3434 (class 0 OID 16397)
-- Dependencies: 217
-- Data for Name: HinhThucQC; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."HinhThucQC" (id, hinh_thuc_qc) VALUES (1, 'Cổ động chính trị');
INSERT INTO public."HinhThucQC" (id, hinh_thuc_qc) VALUES (2, 'Quảng cáo thương mại');
INSERT INTO public."HinhThucQC" (id, hinh_thuc_qc) VALUES (3, 'Xã hội hoá');
INSERT INTO public."HinhThucQC" (id, hinh_thuc_qc) VALUES (4, 'Quảng cáo thương hiệu');
INSERT INTO public."HinhThucQC" (id, hinh_thuc_qc) VALUES (5, 'Quảng cáo hướng dẫn');

--
-- TOC entry 3443 (class 0 OID 24649)
-- Dependencies: 226
-- Data for Name: LoaiBangQC; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."LoaiBangQC" (id_loai_bang_qc, loai_bang_qc) VALUES (1, 'Trụ bảng hiflex');
INSERT INTO public."LoaiBangQC" (id_loai_bang_qc, loai_bang_qc) VALUES (2, 'Trụ màn hình điện tử LED');
INSERT INTO public."LoaiBangQC" (id_loai_bang_qc, loai_bang_qc) VALUES (3, 'Trụ hộp đèn');
INSERT INTO public."LoaiBangQC" (id_loai_bang_qc, loai_bang_qc) VALUES (4, 'Bảng hiflex ốp tường');
INSERT INTO public."LoaiBangQC" (id_loai_bang_qc, loai_bang_qc) VALUES (5, 'Màn hình điện tử ốp tường');
INSERT INTO public."LoaiBangQC" (id_loai_bang_qc, loai_bang_qc) VALUES (6, 'Trụ treo băng rôn dọc');
INSERT INTO public."LoaiBangQC" (id_loai_bang_qc, loai_bang_qc) VALUES (7, 'Trụ treo băng rôn ngang');
INSERT INTO public."LoaiBangQC" (id_loai_bang_qc, loai_bang_qc) VALUES (8, 'Trụ/Cụm pano');
INSERT INTO public."LoaiBangQC" (id_loai_bang_qc, loai_bang_qc) VALUES (9, 'Cổng chào');
INSERT INTO public."LoaiBangQC" (id_loai_bang_qc, loai_bang_qc) VALUES (10, 'Trung tâm thương mại');


--
-- TOC entry 3446 (class 0 OID 32849)
-- Dependencies: 229
-- Data for Name: LoaiBaoCao; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3436 (class 0 OID 16404)
-- Dependencies: 219
-- Data for Name: LoaiViTri; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (1, 'Đất công/Công viên/Hành lang an toàn giao thông');
INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (2, 'Đất tư nhân/Nhà ở riêng lẻ');
INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (3, 'Trung tâm thương mại');
INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (4, 'Chợ');
INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (5, 'Cây xăng');
INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (6, 'Nhà chờ xe buýt');
INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (7, 'Đất tôn giáo');


--
-- TOC entry 3438 (class 0 OID 16411)
-- Dependencies: 221
-- Data for Name: Phuong; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (1, 'Tân Định', 1);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (2, 'Đa Kao', 1);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (3, 'Bến Thành', 1);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (4, 'Bến Nghé', 1);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (5, 'Cầu Kho', 1);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (6, 'Cầu Ông Lãnh', 1);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (7, 'Cô Giang', 1);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (8, 'Nguyễn Cư Trinh', 1);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (9, 'Nguyễn Thái Bình', 1);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (10, 'Phạm Ngũ Lão', 1);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (11, 'Võ Thị Sáu', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (12, 'Phường 1', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (13, 'Phường 2', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (14, 'Phường 3', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (15, 'Phường 4', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (16, 'Phường 5', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (17, 'Phường 6', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (18, 'Phường 7', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (19, 'Phường 8', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (20, 'Phường 9', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (21, 'Phường 10', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (22, 'Phường 11', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (23, 'Phường 12', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (24, 'Phường 13', 3);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (25, 'Phường 14', 3);

--
-- TOC entry 3440 (class 0 OID 16418)
-- Dependencies: 223
-- Data for Name: Quan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Quan" (id, ten_quan) VALUES (1, 'Quan 1');
INSERT INTO public."Quan" (id, ten_quan) VALUES (3, 'Quan 3');


--
-- TOC entry 3441 (class 0 OID 16424)
-- Dependencies: 224
-- Data for Name: QuangCao; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('6f1ae1ac-cd0f-47e9-bf11-e2d77819c61b', 1, 1, 1, true, '2023-01-01', '2023-12-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 2, 3, 1);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('d34fcbab-ab29-471b-92e4-00a69468edba', 2, 2, 1, false, '2023-02-01', '2023-11-30', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 2, 3, 1);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('ddfd0907-36e7-406e-b5f2-6d2299b5c5d6', 3, 2, 3, true, '2023-03-01', '2023-10-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 4, 6, 2);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('e91ce15d-0558-4cae-b908-3b41e76e5c11', 4, 5, 6, true, '2023-04-01', '2023-09-30', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 4, 6, 3);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('c6747331-4b35-453c-8949-1031e2f90efd', 5, 1, 7, false, '2023-05-01', '2023-08-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 3, 5, 4);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('1b50cfc9-8de7-4b85-8100-7b52778bb013', 6, 3, 1, true, '2023-06-01', '2023-12-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 2, 2, 3, 5);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('6ae3a8c2-4bd4-4c90-8c82-9a47758624e5', 7, 4, 2, false, '2023-07-01', '2023-11-30', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 3, 4, 8);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('f05e2455-1585-4af4-862e-4dd636b51f76', 8, 1, 5, true, '2023-08-01', '2023-10-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 2, 3, 2);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('b942cd9c-bff9-4a4b-bf2a-8a87b493a067', 9, 2, 4, true, '2023-09-01', '2023-09-30', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 4, 6, 6);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('25579ed7-48f5-4159-84d1-78a25a11c4c1', 10, 5, 7, false, '2023-10-01', '2023-08-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 3, 5, 3);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('4e50e8cf-7723-40fe-bf7d-7e104c979144', 11, 3, 1, true, '2023-11-01', '2023-12-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 2, 2, 3, 4);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('f451a5cd-f8f5-45eb-b4ab-4a4057a7d68a', 12, 1, 5, false, '2023-12-01', '2023-12-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 2, 3, 7);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('31c12a01-15c7-4db9-bba2-17ce547d5471', 13, 2, 4, true, '2024-01-01', '2024-12-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 4, 6, 9);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('cb139993-1c07-4969-bf76-9db8a16ee2a8', 14, 4, 2, false, '2024-02-01', '2024-11-30', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 3, 4, 1);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('93d91d16-43b9-4baa-9063-0133d06d83b9', 15, 1, 6, true, '2024-03-01', '2024-10-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 2, 3, 10);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('736b9e8c-ec82-4bf7-950a-87a824a935ef', 16, 3, 1, true, '2024-04-01', '2024-09-30', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 2, 2, 3, 5);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('c23b7775-9a48-495a-88b7-5826d4c198d8', 17, 4, 2, false, '2024-05-01', '2024-08-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 3, 4, 8);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('dd6a14a8-39a1-4d3f-9f78-7d1c826a8d68', 18, 1, 5, true, '2024-06-01', '2024-07-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 2, 3, 2);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('08c2f3a6-5d8b-45ed-8d5a-78f4e1bfca62', 19, 2, 4, true, '2024-07-01', '2024-06-30', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 4, 6, 6);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('fe2f5049-ec78-47b3-84f2-d5e51b02baff', 20, 5, 7, false, '2024-08-01', '2024-05-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 3, 5, 3);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('69d91a3e-4a9f-4d89-8d92-6a6d20b36a7a', 21, 3, 1, true, '2024-09-01', '2024-04-30', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 2, 2, 3, 4);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('b0ad4f94-2a1c-496a-b056-63eac6141b94', 22, 1, 5, false, '2024-10-01', '2024-04-30', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 2, 3, 7);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('5820b92a-2f6f-4c5f-b5f5-d9090e63f442', 23, 2, 4, true, '2024-11-01', '2024-03-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 4, 6, 9);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('b014ab8d-21ab-49b2-9515-45b978a5472f', 24, 4, 2, false, '2024-12-01', '2024-03-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 3, 4, 1);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('bb9b07ec-312b-42ef-8c80-ec508a8a686c', 26, 3, 1, false, '2025-03-01', '2025-05-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 2, 2, 3, 3);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('90e8a299-30cc-4b68-8612-489913541768', 27, 4, 2, true, '2025-06-01', '2025-08-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 3, 4, 6);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('ac0382d1-8a9e-4d9b-93b5-0de3b8f3f285', 28, 1, 5, false, '2025-09-01', '2025-12-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 2, 3, 9);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('c916a234-1a33-4f8c-825d-b883fd6cb6e1', 29, 2, 4, true, '2026-01-01', '2026-03-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 4, 6, 2);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('23b9ecf0-74e3-4bfb-bd16-59bc3dd87126', 30, 5, 7, false, '2026-04-01', '2026-06-30', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 3, 5, 5);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('e67439d8-bc3b-4d32-a933-babf581b0d7c', 31, 3, 1, true, '2026-07-01', '2026-09-30', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 2, 2, 3, 4);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('a87dbb1c-9c7b-4f19-9e5d-4d370c440b31', 32, 1, 5, true, '2026-10-01', '2027-02-28', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 2, 3, 7);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('b2bc8d8a-17cd-487c-907b-d58123c54e5e', 33, 2, 4, false, '2027-03-01', '2027-05-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 4, 6, 8);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('6c5c201b-4764-429c-8e69-3c4c496ad5c8', 34, 4, 2, true, '2027-06-01', '2027-08-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 3, 4, 1);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('7f8f03c5-22b7-4f14-82ec-cf59d9fbb7a4', 35, 5, 7, false, '2027-09-01', '2027-12-31', 'hinh_1_path.jpg', 'hinh_2_path.jpg', 1, 3, 5, 9);

--
-- TOC entry 3451 (class 0 OID 32882)
-- Dependencies: 234
-- Data for Name: TableMoi; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3449 (class 0 OID 32857)
-- Dependencies: 232
-- Data for Name: YeuCauCapPhep; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 214
-- Name: DiaDiem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DiaDiem_id_seq"', 10, true);


--
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 216
-- Name: HinhThucQC_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HinhThucQC_id_seq"', 6, true);


--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 225
-- Name: LoaiBangQC_id_loai_qc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LoaiBangQC_id_loai_qc_seq"', 10, true);


--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 228
-- Name: LoaiBaoCao_id_loai_bc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LoaiBaoCao_id_loai_bc_seq"', 1, false);


--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 218
-- Name: LoaiViTri_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LoaiViTri_id_seq"', 14, true);


--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 220
-- Name: Phuong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Phuong_id_seq"', 9, true);


--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 222
-- Name: Quan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Quan_id_seq"', 5, true);


--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 233
-- Name: TableMoi_id_moi_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TableMoi_id_moi_seq"', 1, false);


--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 231
-- Name: YeuCauCapPhep_id_diem_dat_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."YeuCauCapPhep_id_diem_dat_seq"', 1, false);


--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 230
-- Name: YeuCauCapPhep_id_yeu_cau_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."YeuCauCapPhep_id_yeu_cau_seq"', 1, false);


-- Completed on 2023-12-17 12:23:22

--
-- PostgreSQL database dump complete
--

