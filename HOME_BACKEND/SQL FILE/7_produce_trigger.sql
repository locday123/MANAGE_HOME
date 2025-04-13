DELIMITER //

CREATE TRIGGER before_insert_produce
BEFORE INSERT ON PRODUCE
FOR EACH ROW
BEGIN
    IF NEW.produce_Coverage < NEW.produce_Purchase THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Ngày bảo hành không được nhỏ hơn ngày mua!';
    END IF;
END;
//

DELIMITER ;