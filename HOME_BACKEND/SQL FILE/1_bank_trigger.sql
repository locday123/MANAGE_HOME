DELIMITER //

-- Trigger to generate bank ID before insert into BANK table
CREATE TRIGGER generate_bank_ID_before_insert
BEFORE INSERT ON BANK  -- Kích hoạt trigger trước khi chèn dữ liệu vào bảng BANK
FOR EACH ROW  
BEGIN  
    -- Biến lưu trữ ID ngân hàng mới
    DECLARE generated_bank_ID VARCHAR(20);  

    -- Biến đếm số lượng bản ghi hiện có trong bảng BANK
    DECLARE total_banks INT;  

    -- 1️⃣ Đếm số lượng ngân hàng hiện có trong bảng BANK
    -- Điều này giúp chúng ta tạo một bank_ID với số thứ tự tăng dần
    SELECT COUNT(*) INTO total_banks FROM BANK;

    -- 2️⃣ Tạo giá trị bank_ID theo định dạng "BANK00001", "BANK00002", ...
    -- CONCAT('BANK', LPAD(total_banks + 1, 5, '0')) có nghĩa là:
    --    - 'BANK': Tiền tố cố định để xác định ID thuộc bảng BANK
    --    - total_banks + 1: Tăng số lượng ngân hàng hiện có lên 1 để tạo ID mới
    --    - LPAD(..., 5, '0'): Đảm bảo phần số của ID có ít nhất 5 chữ số (ví dụ: 00001, 00002, ...)
    SET generated_bank_ID = CONCAT('BANK', LPAD(total_banks + 1, 5, '0'));

    -- 3️⃣ Gán giá trị bank_ID mới cho bản ghi đang được chèn vào
    SET NEW.bank_ID = generated_bank_ID;
END;
//

DELIMITER ;
