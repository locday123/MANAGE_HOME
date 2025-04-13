DELIMITER $$

CREATE TRIGGER tao_phong_sau_khi_them_tang
AFTER INSERT ON FLOOR
FOR EACH ROW
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE ten_phong VARCHAR(20);

    WHILE i <= NEW.floor_TotalRooms DO
        SET ten_phong = CONCAT('Phòng ', i);

        INSERT INTO ROOM (room_ID, floor_ID, room_Name, room_Area, room_Status)
        VALUES (
            CONCAT(NEW.floor_ID, '_R', i),
            NEW.floor_ID,
            ten_phong,
            '20m2',  -- Hoặc có thể random diện tích nếu cần
            'AVAILABLE'
        );

        SET i = i + 1;
    END WHILE;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER cap_nhat_phong_sau_khi_sua_tang
AFTER UPDATE ON FLOOR
FOR EACH ROW
BEGIN
    DECLARE so_phong_can_tai_su_dung INT DEFAULT 0;
    DECLARE so_phong_can_tao_moi INT DEFAULT 0;
    DECLARE so_phong_can_vo_hieu INT DEFAULT 0;
    DECLARE i INT;

    -- Đếm số phòng INACTIVE có thể kích hoạt lại
    SELECT COUNT(*) INTO so_phong_can_tai_su_dung
    FROM ROOM 
    WHERE floor_ID = NEW.floor_ID 
    AND room_Status = 'INACTIVE';

    -- Xác định số phòng cần tạo mới
    SET so_phong_can_tao_moi = GREATEST(NEW.floor_TotalRooms - OLD.floor_TotalRooms - so_phong_can_tai_su_dung, 0);

    -- Kích hoạt lại phòng INACTIVE nếu có
    IF so_phong_can_tai_su_dung > 0 THEN
        UPDATE ROOM 
        SET room_Status = 'AVAILABLE' 
        WHERE room_ID IN (
            SELECT room_ID FROM (
                SELECT room_ID FROM ROOM 
                WHERE floor_ID = NEW.floor_ID 
                AND room_Status = 'INACTIVE'
                ORDER BY room_ID ASC
                LIMIT so_phong_can_tai_su_dung
            ) AS subquery
        );
    END IF;

    -- Nếu vẫn thiếu phòng, tạo phòng mới
    IF so_phong_can_tao_moi > 0 THEN
        SET i = OLD.floor_TotalRooms + so_phong_can_tai_su_dung + 1;
        WHILE i <= NEW.floor_TotalRooms DO
            INSERT INTO ROOM (room_ID, floor_ID, room_Name, room_Area, room_Status)
            VALUES (
                CONCAT(NEW.floor_ID, '_R', i),
                NEW.floor_ID,
                CONCAT('Phòng ', i),
                '20m²',
                'AVAILABLE'
            );
            SET i = i + 1;
        END WHILE;
    END IF;

    -- Xác định số phòng cần vô hiệu hóa nếu giảm số phòng
    SET so_phong_can_vo_hieu = OLD.floor_TotalRooms - NEW.floor_TotalRooms;

    -- Nếu số phòng giảm, chuyển trạng thái các phòng dư thành INACTIVE
    IF so_phong_can_vo_hieu > 0 THEN
        UPDATE ROOM 
        SET room_Status = 'INACTIVE' 
        WHERE room_ID IN (
            SELECT room_ID FROM (
                SELECT room_ID FROM ROOM 
                WHERE floor_ID = NEW.floor_ID 
                AND room_Status = 'AVAILABLE'
                ORDER BY room_ID DESC
                LIMIT so_phong_can_vo_hieu
            ) AS subquery
        );
    END IF;

END$$
