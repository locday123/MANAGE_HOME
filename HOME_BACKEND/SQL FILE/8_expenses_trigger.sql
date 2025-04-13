DELIMITER $$

CREATE EVENT Update_OldIndex_EveryMonth
ON SCHEDULE EVERY 1 MONTH
STARTS TIMESTAMP(CURRENT_DATE + INTERVAL (5 - DAY(CURRENT_DATE)) DAY) -- Chạy vào ngày 5 mỗi tháng
DO
BEGIN
    UPDATE EXPENSES
    SET expenses_OldIndex = expenses_NewIndex
    WHERE expenses_NewIndex > expenses_OldIndex;
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_after_expenses_insert_update
AFTER INSERT ON EXPENSES
FOR EACH ROW
BEGIN
    UPDATE PAYMENT_SCHEDULE ps
    SET ps.payment_ScheduleTotal = (
        SELECT COALESCE(SUM(e.expenses_Price), 0)
        FROM EXPENSES e
        WHERE e.payment_ScheduleID = ps.payment_ScheduleID
    )
    WHERE ps.payment_ScheduleID = NEW.payment_ScheduleID;
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_after_expenses_delete
AFTER DELETE ON EXPENSES
FOR EACH ROW
BEGIN
    UPDATE PAYMENT_SCHEDULE ps
    SET ps.payment_ScheduleTotal = (
        SELECT COALESCE(SUM(e.expenses_Price), 0)
        FROM EXPENSES e
        WHERE e.payment_ScheduleID = OLD.payment_ScheduleID
    )
    WHERE ps.payment_ScheduleID = OLD.payment_ScheduleID;
END $$

DELIMITER ;