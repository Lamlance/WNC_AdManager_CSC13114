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

INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (6, '289 Hai Bà Trưng, Phường 8, Quận 3, Thành phố Hồ Chí Minh', 106.6907045481163, 10.788361134367696, 7, 'Nhà thờ Tân Định', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (7, '336 Hai Bà Trưng, Phường Tân Định, Quận 1, Thành phố Hồ Chí Minh', 106.68980332588731, 10.789963089539278, 8, 'Chợ tân định', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (8, '12 Trần Quốc Toản, Phường 8, Quận 3, Thành phố Hồ Chí Minh', 106.68880554413374, 10.789583679873315, 7, 'THPT Nguyễn Thị Diệu', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (9, '167 Pasteur, Phường 8, Quận 3, Thành phố Hồ Chí Minh', 106.68933125710065, 10.786348139095901, 7, 'Viện Pasteur Thành phố Hồ Chí Minh', NULL);
INSERT INTO public."DiaDiem" (id_dia_diem, dia_chi, kinh_do, vi_do, id_phuong, ten_dia_diem, id_ban_do) VALUES (10, 'QMQV+6GM, Đ. Võ Thị Sáu, Đa Kao, Quận 1, Thành phố Hồ Chí Minh', 106.69374081349183, 10.788340066532463, 9, 'Công viên Lê Văn Tám', NULL);


--
-- TOC entry 3434 (class 0 OID 16397)
-- Dependencies: 217
-- Data for Name: HinhThucQC; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."HinhThucQC" (id, hinh_thuc_qc) VALUES (4, 'Cổ động chính trị');
INSERT INTO public."HinhThucQC" (id, hinh_thuc_qc) VALUES (5, 'Quảng cáo thương mại');
INSERT INTO public."HinhThucQC" (id, hinh_thuc_qc) VALUES (6, 'Xã hội hoá');


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

INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (8, 'Đất công/Công viên/Hành lang an toàn giao thông');
INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (9, 'Đất tư nhân/Nhà ở riêng lẻ');
INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (10, 'Trung tâm thương mại');
INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (11, 'Chợ');
INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (12, 'Cây xăng');
INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (13, 'Nhà chờ xe buýt');
INSERT INTO public."LoaiViTri" (id, loai_vitri) VALUES (14, 'Đất tôn giáo');


--
-- TOC entry 3438 (class 0 OID 16411)
-- Dependencies: 221
-- Data for Name: Phuong; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (7, 'Vo Thi Sau', 5);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (8, 'Tan Dinh', 4);
INSERT INTO public."Phuong" (id, ten_phuong, id_quan) VALUES (9, 'Da Kao', 4);


--
-- TOC entry 3440 (class 0 OID 16418)
-- Dependencies: 223
-- Data for Name: Quan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Quan" (id, ten_quan) VALUES (4, 'Quan 1');
INSERT INTO public."Quan" (id, ten_quan) VALUES (5, 'Quan 3');


--
-- TOC entry 3441 (class 0 OID 16424)
-- Dependencies: 224
-- Data for Name: QuangCao; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('6f1ae1ac-cd0f-47e9-bf11-e2d77819c61b', 6, 6, 14, true, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('d34fcbab-ab29-471b-92e4-00a69468edba', 7, 5, 11, false, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('ddfd0907-36e7-406e-b5f2-6d2299b5c5d6', 8, 4, 8, true, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('e91ce15d-0558-4cae-b908-3b41e76e5c11', 9, 6, 8, true, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1);
INSERT INTO public."QuangCao" (id, id_dia_diem, id_hinh_thuc, id_loai_vitri, quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_bang_loai_qc) VALUES ('c6747331-4b35-453c-8949-1031e2f90efd', 10, 5, 8, false, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1);


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

