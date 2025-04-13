INSERT INTO BANK (bank_Code, bank_shortName, bank_Name, bank_Logo) VALUES
('BIDV', 'BIDV', 'Ngân hàng Đầu tư và Phát triển Việt Nam', 'bidv_logo.png'),
('VCB', 'VCB', 'Ngân hàng Ngoại thương Việt Nam', 'vcb_logo.png'),
('TCB', 'Techcom', 'Ngân hàng Kỹ Thương Việt Nam', 'techcom_logo.png');

INSERT INTO FINANCE (bank_AccountNumber, bank_AccountName, bank_Code, total_Amount) VALUES
('123456789', 'Nguyễn Văn A', 'BIDV', 50000000),
('987654321', 'Trần Thị B', 'VCB', 75000000),
('567890123', 'Lê Văn C', 'TCB', 120000000);

INSERT INTO CUSTOMER (customer_Name, customer_PhoneNumber, customer_Address, customer_Date, customer_Status) VALUES
('Nguyễn Văn A', '0987654321', 'Hà Nội', '1990-05-15', 1),
('Trần Thị B', '0912345678', 'TP. HCM', '1985-08-22', 1),
('Lê Văn C', '0934567890', 'Đà Nẵng', '1992-11-10', 0),
('Phạm Thị D', '0967890123', 'Hải Phòng', '1988-03-05', 1),
('Hoàng Văn E', '0978901234', 'Cần Thơ', '1995-07-20', 1),
('Đặng Thị F', '0956789012', 'Nha Trang', '1991-02-25', 0),
('Bùi Văn G', '0923456789', 'Huế', '1987-06-30', 1),
('Ngô Thị H', '0945678901', 'Bắc Ninh', '1993-09-18', 0),
('Vũ Văn I', '0901234567', 'Nam Định', '1989-12-12', 1),
('Dương Thị J', '0989012345', 'Vũng Tàu', '1994-04-08', 1);

INSERT INTO HOME (home_Address, home_RentalPrice, home_HostID, home_HostName, home_HostPhoneNumber, home_ContractFrom, home_ContractTo, home_HostSignature, home_TotalFloors, home_Status) VALUES
('123 Nguyễn Trãi, Hà Nội', 10000000, 'H001', 'Nguyễn Văn A', '0987654321', '2024-01-01', '2026-01-01', 'Chữ ký A', 3, 1),
('456 Lê Lợi, TP. HCM', 15000000, 'H002', 'Trần Thị B', '0912345678', '2023-06-15', '2025-06-15', 'Chữ ký B', 2, 0),
('789 Phạm Văn Đồng, Đà Nẵng', 8000000, 'H003', 'Lê Văn C', '0934567890', '2024-03-20', '2026-03-20', 'Chữ ký C', 4, 1);

INSERT INTO PRODUCE (produce_ID, produce_Name, produce_Series, produce_Purchase, produce_Price, produce_Coverage, produce_Note, produce_Status) VALUES
('P001', 'Laptop Dell XPS 15', 'DELL123456', '2024-01-10', 35000000, '2026-01-10', 'Máy cấu hình cao, phù hợp lập trình', 'IN_USE'),
('P002', 'Máy in Canon LBP 2900', 'CANON789012', '2023-06-05', 3500000, '2025-06-05', 'Máy in laser đen trắng', 'NEW'),
('P003', 'Điện thoại iPhone 14 Pro', 'IPHONE987654', '2024-03-20', 28000000, '2026-03-20', 'Điện thoại chính hãng, còn bảo hành', 'MAINTENANCE');

INSERT INTO CONTRACT_RENT (
    contract_rentID, room_ID, customer_ID, contract_rentDeposit, 
    contract_rentPayment, contract_rentFrom, contract_rentTo, 
    contract_rentSignature, contract_rentStatus, discount_ID, created_at
) VALUES 
('CR00001', '123NTHN_F01_R01', 'CUS00001', 5000000, 2000000, '2024-01-01', '2025-01-01', NULL, 1, NULL, NOW()),
('CR00002', '123NTHN_F02_R01', 'CUS00002', 6000000, 2500000, '2024-02-01', '2025-02-01', NULL, 1, NULL, NOW()),
('CR00003', '456LLTH_F01_R01', 'CUS00003', 4500000, 1800000, '2024-03-01', '2025-03-01', NULL, 1, NULL, NOW()),
('CR00004', '789PVĐĐN_F01_R01', 'CUS00004', 7000000, 3000000, '2024-04-01', '2025-04-01', NULL, 1, NULL, NOW()),
('CR00005', '789PVĐĐN_F02_R01', 'CUS00005', 5500000, 2200000, '2024-05-01', '2025-05-01', NULL, 1, NULL, NOW());

INSERT INTO UTILITY (utility_Name) VALUES 
('Điện'), ('Nước'), ('Internet'), ('Thu gom rác'), ('Giữ xe');

INSERT INTO CONTRACT_UTILITY (contract_rentID, utility_ID, unit_Price, unit_Type) VALUES 
('CR0001', 1, 3500.00, 'kWh'),  
('CR0001', 2, 12000.00, 'm³'),  
('CR0002', 3, 250000.00, 'tháng'), 
('CR0002', 4, 60000.00, 'tháng'),  
('CR0003', 5, 120000.00, 'người');
