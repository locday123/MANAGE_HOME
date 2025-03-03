INSERT INTO BANK(bank_ID, bank_Abbreviated, bank_Name)
VALUES 
("NH-ACB", "ACB", "Ngân Hàng Á Châu"),
("NH-VCB", "ACB", "Ngân Hàng Vietcombank"),
("NH-AGRIBANK", "AGRIBANK", "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam"),
("NH-VIETINBANK", "VIETINBANK", "Ngân hàng TMCP Công thương Việt Nam"),
("NH-BIDV", "BIDV", "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam"),
("NH-CASH", "CASH", "Tiền mặt");

INSERT INTO FINANCE(bankAccount_ID, bankAccount_Number, bankAccount_Name, bank_ID)
VALUES
("NH-ACB-197322197", "197322197", "Hoàng Xuân Lộc", "NH-ACB"),
("NH-VCB-197322197", "197322197", "Hoàng Xuân Lộc", "NH-VCB"),
("NH-AGRIBANK-197322197", "197322197", "Hoàng Xuân Lộc", "NH-AGRIBANK"),
("NH-VIETINBANK-197322197", "197322197", "Hoàng Xuân Lộc", "NH-VIETINBANK"),
("NH-BIDV-197322197", "197322197", "Hoàng Xuân Lộc", "NH-BIDV"),
("NH-CASH-TM", "TM", "Hoàng Xuân Lộc", "NH-CASH");

INSERT INTO CUSTOMER(customer_ID, customer_Name, customer_PhoneNumber, customer_Address, customer_Date, customer_Status)
VALUES
("197322197", "Hoàng Xuân Lộc",	"374536393", "672 Lê Hồng Phòng", 06/03/1993, FALSE),
("197322198", "Thúy", "374536392", "672 Lê Hồng Phòng", 06/03/1993, FALSE),
("197322199", "Thúy2", "374536392", "672 Lê Hồng Phòng", 06/03/1993, FALSE),
("197322200", "Thúy3", "374536392", "672 Lê Hồng Phòng", 06/03/1993, TRUE);

INSERT INTO HOME(home_ID, home_Address, home_RentalPrice, home_HostID, home_HostName, home_HostPhoneNumber, home_ContractFrom, home_ContractTo)
VALUES
("H672-LHP", "672 Lê Hồng Phòng", 7000000, "197197197",	"Nguyễn Văn A",	"0988000011", 02/03/2025, 02/03/2025),
("H127A-LLQ", "127A Lạc Long Quân", 7000000, "197197199", "Nguyễn Văn B", "988000012",	26/02/2025,	26/08/2026),
("H129-LLQ", "127A Lạc Long Quân", 7000000, "197197199", "Nguyễn Văn B", "988000012",	26/02/2025,	26/08/2026),
("H140A-LLQ", "127A Lạc Long Quân", 7000000, "197197199", "Nguyễn Văn B", "988000012",	26/02/2025,	26/08/2026);

INSERT INTO FLOOR(home_ID, floor_ID, floor_Name)
VALUES
("H672-LHP", "H672-LHP-T1", "Tầng 1"),
("H127A-LLQ", "H127A-LLQ-T1", "Tầng 1"),
("H129-LLQ", "H129-LLQ-T1", "Tầng 1"),
("H140A-LLQ", "H140A-LLQ-T1", "Tầng 1");

INSERT INTO ROOM(floor_ID, room_ID, room_Name, room_Area)
VALUES
("H672-LHP-T1", "H672-LHP-T1-A101", "A101", "20m2"),
("H127A-LLQ-T1", "H127A-LLQ-T1-A101", "A101", "20m2"),
("H129-LLQ-T1", "H129-LLQ-T1-A101", "A101", "20m2"),
("H140A-LLQ-T1", "H140A-LLQ-T1-A101", "A101", "20m2");


