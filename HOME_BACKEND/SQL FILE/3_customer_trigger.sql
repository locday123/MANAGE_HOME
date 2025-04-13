DELIMITER //

CREATE TRIGGER generate_customer_ID_before_insert
BEFORE INSERT ON CUSTOMER  -- Kích hoạt trigger trước khi chèn dữ liệu vào bảng CUSTOMER
FOR EACH ROW  
BEGIN  
    -- Biến lưu trữ ID khách hàng mới
    DECLARE generated_customer_ID VARCHAR(30);  

    -- Biến đếm số lượng khách hàng hiện có trong bảng CUSTOMER
    DECLARE total_customers INT;  

    -- 1️⃣ Đếm số lượng khách hàng hiện có
    SELECT COUNT(*) INTO total_customers FROM CUSTOMER;

    -- 2️⃣ Tạo giá trị customer_ID theo định dạng "CUS00001", "CUS00002", ...
    SET generated_customer_ID = CONCAT('CUS', LPAD(total_customers + 1, 5, '0'));

    -- 3️⃣ Gán giá trị customer_ID mới cho bản ghi đang được chèn vào
    SET NEW.customer_ID = generated_customer_ID;
END;
//

DELIMITER ;
