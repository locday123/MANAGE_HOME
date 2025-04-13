DELIMITER //

-- Trigger khi thêm mới một bản ghi vào REVENUE_EXPENDITURE
CREATE TRIGGER trg_after_insert_revenue_expenditure
AFTER INSERT ON REVENUE_EXPENDITURE
FOR EACH ROW
BEGIN
    IF NEW.revenueExpenditure_Form = 'thu' THEN
        -- Nếu là thu, cộng số tiền vào tài khoản
        UPDATE FINANCE 
        SET total_Amount = total_Amount + NEW.amountReceived_Amount
        WHERE bank_AccountID = NEW.bank_AccountID;
    ELSEIF NEW.revenueExpenditure_Form = 'chi' THEN
        -- Nếu là chi, trừ số tiền khỏi tài khoản
        UPDATE FINANCE 
        SET total_Amount = total_Amount - NEW.amountReceived_Amount
        WHERE bank_AccountID = NEW.bank_AccountID;
    END IF;
END;
//

-- Trigger khi xóa một bản ghi khỏi REVENUE_EXPENDITURE
CREATE TRIGGER trg_after_delete_revenue_expenditure
AFTER DELETE ON REVENUE_EXPENDITURE
FOR EACH ROW
BEGIN
    IF OLD.revenueExpenditure_Form = 'thu' THEN
        -- Nếu là thu, trừ số tiền đã thêm trước đó
        UPDATE FINANCE 
        SET total_Amount = total_Amount - OLD.amountReceived_Amount
        WHERE bank_AccountID = OLD.bank_AccountID;
    ELSEIF OLD.revenueExpenditure_Form = 'chi' THEN
        -- Nếu là chi, cộng lại số tiền đã trừ trước đó
        UPDATE FINANCE 
        SET total_Amount = total_Amount + OLD.amountReceived_Amount
        WHERE bank_AccountID = OLD.bank_AccountID;
    END IF;
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER trg_after_update_revenue_expenditure
AFTER UPDATE ON REVENUE_EXPENDITURE
FOR EACH ROW
BEGIN
    -- Trả lại số tiền cũ trước khi cập nhật
    IF OLD.revenueExpenditure_Form = 'thu' THEN
        UPDATE FINANCE 
        SET total_Amount = total_Amount - OLD.amountReceived_Amount
        WHERE bank_AccountID = OLD.bank_AccountID;
    ELSEIF OLD.revenueExpenditure_Form = 'chi' THEN
        UPDATE FINANCE 
        SET total_Amount = total_Amount + OLD.amountReceived_Amount
        WHERE bank_AccountID = OLD.bank_AccountID;
    END IF;

    -- Cập nhật lại số tiền mới sau khi thay đổi
    IF NEW.revenueExpenditure_Form = 'thu' THEN
        UPDATE FINANCE 
        SET total_Amount = total_Amount + NEW.amountReceived_Amount
        WHERE bank_AccountID = NEW.bank_AccountID;
    ELSEIF NEW.revenueExpenditure_Form = 'chi' THEN
        UPDATE FINANCE 
        SET total_Amount = total_Amount - NEW.amountReceived_Amount
        WHERE bank_AccountID = NEW.bank_AccountID;
    END IF;
END;
//

DELIMITER ;