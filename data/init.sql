-- insert data into HinhThucQC
INSERT INTO "HinhThucQC" (hinh_thuc_qc)
VALUES 
('Cổ động chính trị'),
('Quảng cáo thương mại'),
('Xã hội hoá');

-- insert data into LoaiViTri
INSERT INTO "LoaiViTri" (loai_vitri)
VALUES
('Đất công'),
('Công viên'),
('Hành lang an toàn giao thông, Đất tư nhân'),
('Nhà ở riêng lẻ'),
('Trung tâm thương mại'),
('Chợ'),
('Cây xăng'),
('Nhà chờ xe buýt');

-- insert data into LoaiBangQC
INSERT INTO "LoaiBangQC" (loai_bang_qc)
VALUES
('Trụ bảng hiflex'),
('Trụ màn hình điện tử LED'),
('Trụ hộp đèn'),
('Bảng hiflex ốp tường'),
('Màn hình điện tử ốp tường'),
('Trụ treo băng rôn dọc'),
('Trụ treo băng rôn ngang'),
('Trụ/Cụm pano'),
('Cổng chào'),
('Trung tâm thương mại');

-- insert data into Quan
INSERT INTO "Quan" (ten_quan)
VALUES
('Quận Bình Chánh'),
('Quận Bình Tân'),
('Quận Bình Thạnh'),
('Quận Cần Giờ'),
('Quận Củ Chi'),
('Quận Gò Vấp'),
('Quận Hóc Môn'),
('Quận Nhà Bè'),
('Quận Phú Nhuận'),
('Quận 1'),
('Quận 2'),
('Quận 3'),
('Quận 4'),
('Quận 5'),
('Quận 6'),
('Quận 7'),
('Quận 8'),
('Quận 9'),
('Quận 9'),
('Quận 10'),
('Quận 11'),
('Quận 12'),
('Quận Tân Bình'),
('Quận Tân Phú');

-- insert data into Phuong
INSERT INTO "Phuong" (ten_phuong, id_quan)
VALUES
('Xã An Phú Tây', 1),
('Xã Bình Chánh', 1),
('Xã Bình Hưng', 1),
('Xã Bình Lợi', 1),
('Xã Đa Phước', 1),
('Xã Hưng Long', 1),
('Xã Lê Minh Xuân', 1),
('Xã Phạm Văn Hai', 1),
('Xã Phong Phú', 1),
('Xã Quy Đức', 1),
('Xã Tân Kiên', 1),
('Xã Tân Nhựt', 1),
('Xã Tân Quý Tây', 1),
('Thị trấn Tân Túc', 1),
('Xã Vĩnh Lộc A', 1),
('Xã Vĩnh Lộc B', 1),
('Phường An Lạc', 2),
('Phường An Lạc A', 2),
('Phường Bình Hưng Hòa', 2),
('Phường Bình Hưng Hòa A', 2),
('Phường Bình Hưng Hòa B', 2),
('Phường Bình Trị Đông', 2),
('Phường Bình Trị Đông A', 2),
('Phường Bình Trị Đông B', 2),
('Phường Tân Tạo', 2),
('Phường Tân Tạo A', 2),
('Phường 1', 3),
('Phường 11', 3),
('Phường 12', 3),
('Phường 13', 3),
('Phường 14', 3),
('Phường 15', 3),
('Phường 17', 3),
('Phường 19', 3),
('Phường 2', 3),
('Phường 21', 3),
('Phường 22', 3),
('Phường 24', 3),
('Phường 25', 3),
('Phường 26', 3),
('Phường 27', 3),
('Phường 28', 3),
('Phường 3', 3),
('Phường 5', 3),
('Phường 6', 3),
('Phường 7', 3),
('Xã An Thới Đông', 4),
('Xã Bình Khánh', 4),
('Phường Cần Thạnh', 4),
('Xã Long Hòa', 4),
('Xã Lý Nhơn', 4),
('Xã Tam Thôn Hiệp', 4),
('Xã Thạnh An', 4),
('Xã An Nhơn Tây', 5),
('Xã An Phú', 5),
('Xã An Phú Trung', 5),
('Xã Bình Mỹ', 5),
('Thị trấn Củ Chi', 5),
('Xã Hòa Phú', 5),
('Xã Nhuận Đức', 5),
('Xã Phạm Văn Cội', 5),
('Xã Phú Hòa Đông', 5),
('Xã Phú Mỹ Hưng', 5),
('Xã Phước Hiệp', 5),
('Xã Phước Thạnh', 5),
('Xã Phước Vĩnh An', 5),
('Xã Tân An Hội', 5),
('Xã Tân Phú Trung', 5),
('Xã Tân Thạnh Đông', 5),
('Xã Tân Thạnh Tây', 5),
('Xã Tân Thông Hội', 5),
('Xã Thái Mỹ', 5),
('Xã Trung An', 5),
('Xã Trung Lập Hạ', 5),
('Xã Trung Lập Hạ', 5),
('Xã Trung Lập Thượng', 5),
('Phường 1', 6),
('Phường 10', 6),
('Phường 11', 6),
('Phường 12', 6),
('Phường 13', 6),
('Phường 14', 6),
('Phường 15', 6),
('Phường 16', 6),
('Phường 17', 6),
('Phường 3', 6),
('Phường 4', 6),
('Phường 5', 6),
('Phường 6', 6),
('Phường 7', 6),
('Phường 8', 6),
('Phường 9', 6),
('Xã Đông Thạnh', 7),
('Phường Hóc Môn', 7),
('Phường Bà Điểm', 7),
('Xã Nhị Bình', 7),
('Xã Tân Hiệp', 7),
('Xã Tân Thới Nhì', 7),
('Xã Tân Xuân', 7),
('Xã Thới Tam Thôn', 7),
('Xã Trung Chánh', 7),
('Xã Xuân Thới Đông', 7),
('Xã Xuân Thới Sơn', 7),
('Xã Xuân Thới Thượng', 7),
('Phường Hiệp Phước', 8),
('Xã Long Thới', 8),
('Thị trấn Nhà Bè', 8),
('Xã Nhơn Đức', 8),
('Xã Phú Xuân', 8),
('Xã Phước Kiển', 8),
('Xã Phước Lộc', 8),
('Phường 1', 9),
('Phường 10', 9),
('Phường 11', 9),
('Phường 12', 9),
('Phường 13', 9),
('Phường 14', 9),
('Phường 15', 9),
('Phường 17', 9),
('Phường 2', 9),
('Phường 25', 9),
('Phường 3', 9),
('Phường 4', 9),
('Phường 5', 9),
('Phường 6', 9),
('Phường 7', 9),
('Phường 8', 9),
('Phường 9', 9),
('Phường Bến Nghé', 10),
('Phường Bến Thành', 10),
('Phường Cầu Kho', 10),
('Phường Cầu Ông Lãnh', 10),
('Phường Cô Giang', 10),
('Phường Đa Kao', 10),
('Phường Nguyễn Cư Trinh', 10),
('Phường Nguyễn Thái Bình', 10),
('Phường Phạm Ngũ Lão', 10),
('Phường Tân Định', 10),
('Phường 1', 11),
('Phường 10', 11),
('Phường 11', 11),
('Phường 12', 11),
('Phường 13', 11),
('Phường 14', 11),
('Phường 15', 11),
('Phường 2', 11),
('Phường 3', 11),
('Phường 4', 11),
('Phường 5', 11),
('Phường 6', 11),
('Phường 7', 11),
('Phường 8', 11),
('Phường 9', 11),
('Phường 1', 12),
('Phường 10', 12),
('Phường 11', 12),
('Phường 12', 12),
('Phường 13', 12),
('Phường 14', 12),
('Phường 15', 12),
('Phường 16', 12),
('Phường 2', 12),
('Phường 3', 12),
('Phường 4', 12),
('Phường 5', 12),
('Phường 6', 12),
('Phường 7', 12),
('Phường 8', 12),
('Phường 9', 12),
('Phường An Phú Đông', 13),
('Phường Đông Hưng Thuận', 13),
('Phường Hiệp Thành', 13),
('Phường Tân Chánh Hiệp', 13),
('Phường Tân Hưng Thuận', 13),
('Phường Tân Thới Hiệp', 13),
('Phường Tân Thới Nhất', 13),
('Phường Thạnh Lộc', 13),
('Phường Thạnh Xuân', 13),
('Phường Thới An', 13),
('Phường Trung Mỹ Tây', 13),
('Phường Thạnh Mỹ Lợi', 14),
('Phường An Khánh', 14),
('Phường An Lợi Đông', 14),
('Phường An Phú', 14),
('Phường Bình An', 14),
('Phường Bình Khánh', 14),
('Phường Bình Trưng Đông', 14),
('Phường Bình Trưng Tây', 14),
('Phường Cát Lái', 14),
('Phường Thảo Điền', 14),
('Phường Thủ Thiêm', 14),
('Phường 1', 15),
('Phường 10', 15),
('Phường 11', 15),
('Phường 12', 15),
('Phường 13', 15),
('Phường 14', 15),
('Phường 2', 15),
('Phường 3', 15),
('Phường 4', 15),
('Phường 5', 15),
('Phường 6', 15),
('Phường 7', 15),
('Phường 8', 15),
('Phường 9', 15),
('Phường 1', 16),
('Phường 10', 16),
('Phường 12', 16),
('Phường 13', 16),
('Phường 14', 16),
('Phường 15', 16),
('Phường 16', 16),
('Phường 18', 16),
('Phường 2', 16),
('Phường 3', 16),
('Phường 4', 16),
('Phường 5', 16),
('Phường 6', 16),
('Phường 8', 16),
('Phường 9', 16),
('Phường 1', 17),
('Phường 10', 17),
('Phường 11', 17),
('Phường 12', 17),
('Phường 13', 17),
('Phường 14', 17),
('Phường 15', 17),
('Phường 2', 17),
('Phường 3', 17),
('Phường 4', 17),
('Phường 5', 17),
('Phường 6', 17),
('Phường 7', 17),
('Phường 8', 17),
('Phường 9', 17),
('Phường 1', 18),
('Phường 10', 18),
('Phường 11', 18),
('Phường 12', 18),
('Phường 13', 18),
('Phường 14', 18);

-- insert data into DiaDiem
INSERT INTO "DiaDiem" (id_ban_do, ten_dia_diem, dia_chi, kinh_do, vi_do, id_phuong)
VALUES
(1, 'Địa điểm ảo', 'Địa chỉ ảo', 23.5, 24.1, 1),
(2, 'Địa điểm ảo 2', 'Địa chỉ ảo 2', 105.6, 24.7, 2);


-- insert data into LoaiBaoCao
INSERT INTO "LoaiBaoCao" (loai_bao_cao)
VALUES
('Tố giác sai phạm'),
('Đăng ký nội dung'),
('Đóng góp ý kiến'),
('Giải đáp thắc mắc');


-- insert data into QuangCao
INSERT INTO "QuangCao" (quy_hoach, ngay_hieu_luc, ngay_het_han, hinh_1, hinh_2, so_luong, chieu_dai_m, chieu_rong_m, id_loai_bang_qc, id_dia_diem, id_hinh_thuc, id_loai_vitri)
VALUES
(TRUE, '2023-12-17', '2024-12-16', 'hinh_73.jpg', 'hinh_95.jpg', 2, 32, 88, 2, 1, 1, 5),
(FALSE, '2024-01-10', '2024-06-09', 'video_27.mp4', 'audio_19.mp3', 3, 45, 27, 1, 1, 3, 7),
(TRUE, '2024-02-07', '2025-01-06', 'image_63.jpg', 'default_poster.png', 24, 72, 8, 3, 1, 3, 1),
(FALSE, '2024-05-15', '2024-10-14', 'animation_91.gif', 'interactive_08.html', 2, 36, 90, 4, 1, 2, 6);

-- insert data into YeuCauCapPhep
INSERT INTO "YeuCauCapPhep" (id_diem_dat, noi_dung_qc, ten_cty, email_cty, dien_thoai_cty, dia_chi_cty, ngay_hieu_luc, ngay_het_han)
VALUES
( 1,
'Nội dung quảng cáo hấp dẫn cho sản phẩm XYZ',
'Công ty TNHH ABC',
'abc@company.net',
'+84 912345678',
'225 Nguyen Van Cu, P4, Q5',
'2024-01-01',
'2024-12-31'),
(2,
'Khuyến mãi lớn, giảm giá 50% tất cả các mặt hàng!',
'Doanh nghiệp tư nhân DEF',
'def@org',
'+84 246813579',
'125 Dien Bien Phu, P15, BT',
'2024-02-14',
'2024-03-14'
);

-- insert data into BaoCao
INSERT INTO "BaoCao" (ten_nguoi_gui, email, dien_thoai, noi_dung, id_quang_cao, id_loai_bc)
VALUES
('Nguyễn Văn An', 'vanan@example.com', '+84 987654321', 'Báo cáo lỗi hệ thống trên trang chủ', 1, 1),
('Trần Thị Bích', 'bichtran@gmail.com', '+84 283746510', 'Góp ý cải thiện giao diện ứng dụng', NULL, 2),
('Lê Minh Cường', 'minhcuong.le@abc.com', '+84 369218045', 'Phản ánh sự cố thanh toán online', 3, 3),
('Đỗ Thị Dịu', 'diu.do@yahoo.com', '+84 725813906', 'Kiến nghị bổ sung tính năng mới', NULL, 2),
('Phạm Thị Hoa', 'hoapham@hotmail.com', '+84 812394057', 'Khen ngợi dịch vụ chăm sóc khách hàng', NULL, 1),
('Đỗ Minh Long', 'minhlong.do@company.com', '+84 125739864', 'Báo cáo vi phạm quy định cộng đồng',  2, 4),
('Nguyễn Thị Mai', 'mainguyen@web.net', '+84 654208731', 'Cảm ơn về trải nghiệm sử dụng dịch vụ', NULL, 1);