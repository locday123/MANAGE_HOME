DELIMITER //

CREATE TRIGGER generate_bank_AccountID_before_insert
BEFORE INSERT ON FINANCE  -- Kích hoạt trigger trước khi chèn dữ liệu vào bảng FINANCE
FOR EACH ROW  
BEGIN  
    -- Kiểm tra nếu bank_Code hoặc bank_AccountNumber bị NULL, thì không tạo ID
    IF NEW.bank_Code IS NOT NULL AND NEW.bank_AccountNumber IS NOT NULL THEN
        -- Tạo bank_AccountID bằng cách ghép bank_Code + "_" + bank_AccountNumber
        SET NEW.bank_AccountID = CONCAT(NEW.bank_Code, '_', NEW.bank_AccountNumber);
    END IF;
END;
//

DELIMITER ;
