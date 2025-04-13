-- Thay đổi delimiter để viết block code (trigger)
DELIMITER $$

-- Tạo trigger trước khi chèn dữ liệu vào bảng HOME
CREATE TRIGGER before_insert_home
BEFORE INSERT ON HOME
FOR EACH ROW
BEGIN
    -- Khai báo biến để lưu ID mới
    DECLARE new_id INT;

    -- Thêm một bản ghi mới vào bảng đếm HOME_ID_COUNTER để tăng giá trị AUTO_INCREMENT
    INSERT INTO HOME_ID_COUNTER VALUES ();

    -- Lấy ID vừa được tạo từ AUTO_INCREMENT
    SET new_id = LAST_INSERT_ID();

    -- Gán giá trị home_ID cho bản ghi mới theo định dạng: HOME + số đếm, lấp đầy 0 đến 4 chữ số (VD: HOME0001)
    SET NEW.home_ID = CONCAT('HOME', LPAD(new_id, 4, '0'));
END$$

-- Trả lại delimiter mặc định
DELIMITER ;




DELIMITER $$
CREATE TRIGGER tao_tang_sau_khi_them_nha
AFTER INSERT ON HOME
FOR EACH ROW
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE ten_tang VARCHAR(20);
    
    WHILE i <= NEW.home_TotalFloors DO
        IF i = 1 THEN
            SET ten_tang = 'Tầng Trệt';
        ELSE
            SET ten_tang = CONCAT('Tầng ', i - 1);
        END IF;
        
        INSERT INTO FLOOR (floor_ID, home_ID, floor_Name, floor_Status, floor_TotalRooms)
        VALUES (
            CONCAT(NEW.home_ID, '_F', i),
            NEW.home_ID,
            ten_tang,
            'AVAILABLE',
            1
        );
        
        SET i = i + 1;
    END WHILE;
END$$
DELIMITER ;

DELIMITER $$

CREATE TRIGGER cap_nhat_so_tang_sau_khi_sua
AFTER UPDATE ON HOME
FOR EACH ROW
BEGIN
    DECLARE i INT;
    DECLARE ten_tang VARCHAR(20);
    DECLARE so_tang_can_kich_hoat INT;
    DECLARE so_tang_hien_tai INT;

    -- Lấy số tầng đang có (bao gồm cả INACTIVE)
    SET so_tang_hien_tai = (SELECT COUNT(*) FROM FLOOR WHERE home_ID = NEW.home_ID);

    -- Lấy số tầng 'INACTIVE' có thể kích hoạt lại
    SET so_tang_can_kich_hoat = (SELECT COUNT(*) FROM FLOOR WHERE home_ID = NEW.home_ID AND floor_Status = 'INACTIVE');

    IF OLD.home_TotalFloors < NEW.home_TotalFloors THEN
        -- Kích hoạt lại các tầng 'INACTIVE' trước nếu có
        UPDATE FLOOR 
        SET floor_Status = 'AVAILABLE' 
        WHERE home_ID = NEW.home_ID 
        AND floor_Status = 'INACTIVE'
        AND CAST(SUBSTRING_INDEX(floor_Name, ' ', -1) AS UNSIGNED) < NEW.home_TotalFloors;

        -- Nếu số tầng hiện có (bao gồm cả kích hoạt lại) vẫn chưa đủ, tạo tầng mới
        SET i = so_tang_hien_tai + 1;

        WHILE i <= NEW.home_TotalFloors DO
            IF i = 1 THEN
                SET ten_tang = 'Tầng Trệt';
            ELSE
                SET ten_tang = CONCAT('Tầng ', i - 1);
            END IF;
            
            -- Chỉ thêm tầng nếu chưa tồn tại (để tránh lỗi Duplicate)
            IF NOT EXISTS (SELECT 1 FROM FLOOR WHERE floor_ID = CONCAT(NEW.home_ID, '_F', i)) THEN
                INSERT INTO FLOOR (floor_ID, home_ID, floor_Name, floor_Status, floor_TotalRooms)
                VALUES (
                    CONCAT(NEW.home_ID, '_F', i),
                    NEW.home_ID,
                    ten_tang,
                    'AVAILABLE',
                    1
                );
            END IF;
            
            SET i = i + 1;
        END WHILE;

    ELSEIF OLD.home_TotalFloors > NEW.home_TotalFloors THEN
        -- Chuyển trạng thái các tầng dư thành 'INACTIVE'
        UPDATE FLOOR 
        SET floor_Status = 'INACTIVE' 
        WHERE home_ID = NEW.home_ID 
        AND floor_Name <> 'Tầng Trệt'
        AND CAST(SUBSTRING_INDEX(floor_Name, ' ', -1) AS UNSIGNED) >= NEW.home_TotalFloors;
    END IF;
END$$

DELIMITER ;
