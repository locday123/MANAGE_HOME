CREATE DATABASE MANAGE_HOME;
USE MANAGE_HOME;

-- Bảng BANK: Lưu trữ thông tin về các ngân hàng.
-- Chứa ID ngân hàng, mã ngân hàng, tên ngắn, tên đầy đủ và logo của ngân hàng.
CREATE TABLE BANK(
    bank_ID VARCHAR(20) PRIMARY KEY,  
    bank_Code VARCHAR(20) UNIQUE,  -- Mã ngân hàng cần là duy nhất
    bank_shortName VARCHAR(10),  
    bank_Name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,  
    bank_Logo VARCHAR(255),  
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP  
);

-- Bảng FINANCE: Lưu trữ thông tin tài khoản ngân hàng của khách hàng.
-- Chứa thông tin tài khoản ngân hàng, số tài khoản, tên chủ tài khoản và số dư tài khoản.
CREATE TABLE FINANCE(
    bank_AccountID VARCHAR(30) PRIMARY KEY,  
    bank_AccountNumber VARCHAR(30),  -- Tăng độ dài
    bank_AccountName VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,  
    bank_Code VARCHAR(20),  -- Khóa ngoại sửa đúng kiểu dữ liệu
    total_Amount BIGINT DEFAULT(0),  
    bank_Status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  
    CONSTRAINT FOREIGN_KEY_FINANCE_BANK FOREIGN KEY(bank_Code) REFERENCES BANK(bank_Code) ON DELETE CASCADE,  
    INDEX idx_bank_AccountNumber (bank_AccountNumber),  
    INDEX idx_bank_Code (bank_Code)  -- Tạo chỉ mục cho `bank_Code`
);

-- Bảng CUSTOMER: Lưu trữ thông tin khách hàng.
-- Chứa thông tin cá nhân của khách hàng, bao gồm tên, số điện thoại, địa chỉ và trạng thái khách hàng.
CREATE TABLE CUSTOMER(
    customer_ID VARCHAR(12),  -- ID khách hàng duy nhất.
    customer_Name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,  -- Tên khách hàng.
    customer_Sex BOOLEAN,
    customer_PhoneNumber VARCHAR(10) CHECK (customer_PhoneNumber REGEXP '^[0-9]{10}$'),  -- Số điện thoại khách hàng (kiểm tra định dạng).
    customer_Province VARCHAR(10),
    customer_District VARCHAR(10),
    customer_Ward VARCHAR(10),
    customer_Address VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,  -- Địa chỉ khách hàng.
    customer_Date DATE,  -- Ngày sinh khách hàng.
    customer_Front VARCHAR(255),
    customer_Back VARCHAR(255),
    customer_Status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',  -- Trạng thái khách hàng (INACTIVE: không hoạt động, ACTIVE: hoạt động).
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo thông tin khách hàng.
    CONSTRAINT PRIMARY_KEY_CUSTOMER PRIMARY KEY(customer_ID),  -- Khóa chính cho bảng CUSTOMER.
    INDEX idx_customer_PhoneNumber (customer_PhoneNumber),  -- Tạo chỉ mục cho số điện thoại khách hàng.
    INDEX idx_customer_Address (customer_Address)  -- Tạo chỉ mục cho địa chỉ khách hàng.
);

-- Bảng HOME: Lưu trữ thông tin về nhà cho thuê.
-- Chứa thông tin về địa chỉ, giá thuê, chủ nhà, hợp đồng và trạng thái nhà.
CREATE TABLE HOME(
    home_ID VARCHAR(20),  -- ID nhà duy nhất.
    home_Province VARCHAR(10),
    home_District VARCHAR(10),
    customer_Ward VARCHAR(10),
    home_Address VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,  -- Địa chỉ khách hàng.
    home_RentalPrice BIGINT,  -- Giá thuê nhà.
    home_HostID VARCHAR(12),  -- ID chủ nhà.
    home_HostName VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,  -- Tên chủ nhà.
    home_HostPhoneNumber VARCHAR(10),  -- Số điện thoại chủ nhà.
    home_ContractFrom DATE,  -- Ngày bắt đầu hợp đồng.
    home_ContractTo DATE,  -- Ngày kết thúc hợp đồng.
    home_HostSignature TEXT,  -- Chữ ký của chủ nhà trong hợp đồng.
    home_TotalFloors INT DEFAULT 1 CHECK (home_TotalFloors >= 1),
    home_Status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',  -- Trạng thái nhà (0: không có khách, 1: có khách).
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo thông tin nhà cho thuê.
    CONSTRAINT PRIMARY_KEY_HOME PRIMARY KEY(home_ID),  -- Khóa chính cho bảng HOME.
    INDEX idx_home_Address (home_Address)  -- Tạo chỉ mục cho địa chỉ nhà.
);

-- Bảng FLOOR: Lưu trữ thông tin về các tầng trong mỗi nhà.
-- Chứa ID của tầng và liên kết với nhà cho thuê.
CREATE TABLE FLOOR(
    floor_ID VARCHAR(20) PRIMARY KEY,  -- ID tầng duy nhất.
    home_ID VARCHAR(20),  -- ID nhà (liên kết với bảng HOME).
    floor_Name VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,  -- Tên tầng.
    floor_TotalRooms INT DEFAULT 1 CHECK (floor_TotalRooms >= 1),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo thông tin tầng.
    CONSTRAINT FOREIGN_KEY_OF_FLOOR_TO_HOME FOREIGN KEY(home_ID) REFERENCES HOME(home_ID) ON DELETE CASCADE  -- Khóa ngoại liên kết với bảng HOME.
);

-- Bảng ROOM: Lưu trữ thông tin về phòng trong mỗi tầng.INACTIVE
-- Chứa thông tin về phòng, bao gồm tên, diện tích và trạng thái.
CREATE TABLE ROOM(
    room_ID VARCHAR(20),  -- ID phòng duy nhất.
    floor_ID VARCHAR(20),  -- ID tầng (liên kết với bảng FLOOR).
    room_Name VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,  -- Tên phòng.
    room_Area VARCHAR(50),  -- Diện tích phòng.
    room_Status ENUM('AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'INACTIVE', 'ACTIVE') DEFAULT 'AVAILABLE',  -- Trạng thái phòng (AVAILABLE: sẵn sàng, OCCUPIED: đã thuê, MAINTENANCE: bảo trì, INACTIVE: Chưa sẵn sàng).
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo phòng.
    CONSTRAINT PRIMARY_KEY_ROOM PRIMARY KEY(room_ID),  -- Khóa chính cho bảng ROOM.
    CONSTRAINT FOREIGN_KEY_OF_FLOOR_TO_ROOM FOREIGN KEY(floor_ID) REFERENCES FLOOR(floor_ID) ON DELETE CASCADE,  -- Khóa ngoại liên kết với bảng FLOOR.
    INDEX idx_room_Name (room_Name)  -- Tạo chỉ mục cho tên phòng.
);

-- Bảng PRODUCE: Lưu trữ thông tin về sản phẩm (ví dụ: nội thất, thiết bị).
-- Chứa thông tin về tên, loại, ngày mua và giá trị sản phẩm.
CREATE TABLE PRODUCE(
    produce_ID VARCHAR(30) PRIMARY KEY, 
    produce_Name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL, 
    produce_Series VARCHAR(30) UNIQUE, 
    produce_Purchase DATE NOT NULL, 
	produce_Price BIGINT UNSIGNED NOT NULL CHECK (produce_Price >= 0),
    produce_Coverage DATE, 
    produce_Note VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci, 
    produce_Status ENUM('NEW', 'IN_USE', 'MAINTENANCE') DEFAULT 'NEW', 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    INDEX idx_produce_Series (produce_Series), 
    INDEX idx_produce_Status (produce_Status)  
);

-- Bảng ASSET: Lưu trữ thông tin về tài sản trong mỗi phòng.
-- Chứa thông tin về tài sản liên quan đến sản phẩm.
CREATE TABLE ASSET(
    asset_ID BIGINT AUTO_INCREMENT,  -- ID tài sản, tự động tăng, dùng làm khóa chính.
    room_ID VARCHAR(30) NOT NULL,  -- ID phòng chứa tài sản (liên kết với bảng ROOM).
    produce_ID VARCHAR(30) NOT NULL,  -- ID sản phẩm được sử dụng (liên kết với bảng PRODUCE).
    asset_Note VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,  -- Ghi chú tài sản, mô tả chi tiết về tài sản.
    asset_Status ENUM('NEW', 'IN_USE', 'MAINTENANCE', 'BROKEN') DEFAULT 'NEW',  -- Trạng thái tài sản: -- 'NEW' - Mới,-- 'IN_USE' - Đang sử dụng,-- 'MAINTENANCE' - Đang bảo trì,-- 'BROKEN' - Hỏng.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo bản ghi tài sản.
	-- Khóa chính
    CONSTRAINT PRIMARY_KEY_ASSET PRIMARY KEY(asset_ID),  
	-- Khóa ngoại liên kết với bảng ROOM
    CONSTRAINT FOREIGN_KEY_OF_ROOM_TO_ASSET FOREIGN KEY(room_ID)  
    REFERENCES ROOM(room_ID) ON DELETE CASCADE,  
	-- Khóa ngoại liên kết với bảng PRODUCE
    CONSTRAINT FOREIGN_KEY_OF_PRODUCE_TO_ASSET FOREIGN KEY(produce_ID)  
    REFERENCES PRODUCE(produce_ID) ON DELETE CASCADE,  
	-- Đảm bảo một sản phẩm không thể xuất hiện nhiều lần trong cùng một phòng
    CONSTRAINT UNIQUE_ASSET_ROOM_PRODUCE UNIQUE(room_ID, produce_ID),  
	-- Chỉ mục để tối ưu tốc độ truy vấn
    INDEX idx_room_ID (room_ID),  
    INDEX idx_produce_ID (produce_ID)  
);

-- Bảng DISCOUNT: Lưu trữ thông tin về các chương trình khuyến mãi.
-- Chứa thông tin về tỷ lệ giảm giá, ngày bắt đầu và kết thúc của chương trình.
CREATE TABLE DISCOUNT (
    discount_ID INT AUTO_INCREMENT PRIMARY KEY,  -- ID khuyến mãi, tự động tăng.
    discount_Name VARCHAR(50) NOT NULL,  -- Tên khuyến mãi.
    discount_Percentage DECIMAL(5,2) CHECK (discount_Percentage BETWEEN 0 AND 100),  -- Tỷ lệ giảm giá (0-100%).
    start_Date DATE,  -- Ngày bắt đầu khuyến mãi.
    end_Date DATE,  -- Ngày kết thúc khuyến mãi.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP  -- Thời gian tạo khuyến mãi.
);

-- Bảng CONTRACT_RENT: Lưu trữ thông tin về hợp đồng thuê phòng.
-- Chứa thông tin về phòng, khách hàng, tiền đặt cọc, tiền thanh toán, và các thông tin hợp đồng liên quan.
CREATE TABLE CONTRACT_RENT(
    contract_rentID VARCHAR(20) PRIMARY KEY, -- Mã hợp đồng thuê, định danh duy nhất
    room_ID VARCHAR(20) NOT NULL, -- Mã phòng thuê
    customer_ID VARCHAR(30) NOT NULL, -- Mã khách hàng thuê chính
    contract_rentDeposit BIGINT DEFAULT 0, -- Số tiền đặt cọc
    contract_rentPayment BIGINT DEFAULT 0, -- Số tiền thanh toán mỗi kỳ
    contract_rentFrom DATE NOT NULL, -- Ngày bắt đầu hợp đồng
    contract_rentTo DATE NOT NULL, -- Ngày kết thúc hợp đồng
    contract_rentSignature TEXT, -- Ảnh chữ ký số của hợp đồng
    contract_rentStatus TINYINT(1) DEFAULT 0, -- Trạng thái hợp đồng (0: Chưa kích hoạt, 1: Đã kích hoạt, 2: Hết hạn, 3: Hủy)
    discount_ID INT DEFAULT NULL, -- Mã khuyến mãi nếu có
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Thời điểm tạo hợp đồng
    CONSTRAINT FK_CONTRACT_ROOM FOREIGN KEY (room_ID) REFERENCES ROOM(room_ID) ON DELETE CASCADE,
    CONSTRAINT FK_CONTRACT_CUSTOMER FOREIGN KEY (customer_ID) REFERENCES CUSTOMER(customer_ID),
    CONSTRAINT FK_CONTRACT_DISCOUNT FOREIGN KEY (discount_ID) REFERENCES DISCOUNT(discount_ID) ON DELETE SET NULL,
    CONSTRAINT CHK_CONTRACT_DATES CHECK (contract_rentFrom < contract_rentTo) -- Đảm bảo ngày bắt đầu nhỏ hơn ngày kết thúc
);

CREATE TABLE ROOM_MATE(
    contract_rentID VARCHAR(20) NOT NULL, -- Mã hợp đồng thuê
    customer_ID VARCHAR(30) NOT NULL, -- Mã khách hàng ở cùng phòng
    roommate_Status ENUM('ACTIVE', 'LEFT') DEFAULT 'ACTIVE', -- Trạng thái của bạn cùng phòng (ACTIVE: Đang ở, LEFT: Đã rời đi)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Thời điểm thêm vào danh sách
    CONSTRAINT PK_ROOM_MATE PRIMARY KEY (contract_rentID, customer_ID),
    CONSTRAINT FK_ROOMMATE_CONTRACT FOREIGN KEY (contract_rentID) REFERENCES CONTRACT_RENT(contract_rentID) ON DELETE CASCADE,
    CONSTRAINT FK_ROOMMATE_CUSTOMER FOREIGN KEY (customer_ID) REFERENCES CUSTOMER(customer_ID) ON DELETE CASCADE
);

CREATE TABLE PAYMENT_SCHEDULE(
    payment_ScheduleID VARCHAR(30) PRIMARY KEY, -- Mã lịch thanh toán
    contract_rentID VARCHAR(20) NOT NULL, -- Mã hợp đồng thuê liên quan
    payment_Method ENUM('CASH', 'BANK_TRANSFER', 'MOMO', 'CREDIT_CARD') DEFAULT 'BANK_TRANSFER', -- Phương thức thanh toán (tiền mặt, chuyển khoản, MoMo, thẻ tín dụng)
    bank_AccountID VARCHAR(30) NULL, -- Mã tài khoản ngân hàng sử dụng
    payment_Amount BIGINT NOT NULL, -- Số tiền cần thanh toán
    payment_Date DATE NOT NULL, -- Ngày thanh toán
    payment_Note VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci, -- Ghi chú thanh toán
    payment_Status ENUM('PENDING', 'PAID', 'OVERDUE', 'CANCELLED', 'REFUNDED') DEFAULT 'PENDING', -- Trạng thái thanh toán (Chờ thanh toán, Đã thanh toán, Quá hạn, Hủy, Hoàn tiền)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Thời điểm tạo lịch thanh toán
    CONSTRAINT FK_PAYMENT_CONTRACT FOREIGN KEY (contract_rentID) REFERENCES CONTRACT_RENT(contract_rentID) ON DELETE CASCADE,
    CONSTRAINT FK_PAYMENT_FINANCE FOREIGN KEY (bank_AccountID) REFERENCES FINANCE(bank_AccountID) ON DELETE SET NULL
);

-- Bảng UTILITY: Lưu trữ thông tin về các tiện ích sử dụng trong các hợp đồng thuê.
-- Chứa thông tin về tên tiện ích, giá trị đơn vị và loại đơn vị.
CREATE TABLE UTILITY (
    utility_ID INT AUTO_INCREMENT PRIMARY KEY,  -- ID tiện ích, tự động tăng.
    utility_Name VARCHAR(50) UNIQUE NOT NULL,  -- Tên tiện ích (ví dụ: Điện, Nước, Internet).
    utility_Description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP   -- Thời gian tạo tiện ích.
);

CREATE TABLE CONTRACT_UTILITY (
    contract_rentID VARCHAR(20) NOT NULL,  -- Mã hợp đồng thuê.
    utility_ID INT NOT NULL,  -- Mã tiện ích.
    unit_Price DECIMAL(10,2) NOT NULL CHECK (unit_Price >= 0),  -- Đảm bảo giá không âm.
    unit_Type ENUM('kWh', 'm³', 'tháng', 'người') NOT NULL,  -- Loại đơn vị của tiện ích.
    quantity DECIMAL(10,2) DEFAULT 0 CHECK (quantity >= 0),  -- Số lượng tiêu thụ, không âm.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo bản ghi.
    PRIMARY KEY (contract_rentID, utility_ID),  -- Một hợp đồng có thể có nhiều tiện ích, nhưng không trùng loại.
    CONSTRAINT FK_CONTRACT_UTILITY_CONTRACT FOREIGN KEY (contract_rentID) 
    REFERENCES CONTRACT_RENT(contract_rentID) ON DELETE CASCADE,   -- Nếu hợp đồng bị xóa, tiện ích đi kèm cũng bị xóa.
    CONSTRAINT FK_CONTRACT_UTILITY_UTILITY FOREIGN KEY (utility_ID) 
    REFERENCES UTILITY(utility_ID) ON DELETE CASCADE  -- Nếu tiện ích bị xóa, thông tin trong hợp đồng cũng bị xóa.
);


CREATE TABLE EXPENSES(
    expenses_ID INT AUTO_INCREMENT PRIMARY KEY,  
    payment_ScheduleID VARCHAR(30) NOT NULL,  -- Kỳ thanh toán.
    contract_rentID VARCHAR(20) DEFAULT NULL,  -- Hợp đồng liên quan (nếu có).
    expenses_Name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,  
    expenses_Note VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,  
    expenses_OldIndex DECIMAL(10,2) DEFAULT 0,  -- Chỉ số cũ (không âm).
    expenses_NewIndex DECIMAL(10,2) DEFAULT 0,  -- Chỉ số mới (lớn hơn chỉ số cũ).
    expenses_Price DECIMAL(15,2) NOT NULL DEFAULT 0,  -- Giá không âm.
    utility_ID INT DEFAULT NULL,  -- Mã tiện ích (nếu có).
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  
    CONSTRAINT FK_EXPENSES_PAYMENT FOREIGN KEY (payment_ScheduleID) 
    REFERENCES PAYMENT_SCHEDULE(payment_ScheduleID) ON DELETE CASCADE,  
    CONSTRAINT FK_EXPENSES_CONTRACT FOREIGN KEY (contract_rentID) 
    REFERENCES CONTRACT_RENT(contract_rentID) ON DELETE SET NULL,  
    CONSTRAINT FK_EXPENSES_UTILITY FOREIGN KEY (utility_ID) 
    REFERENCES UTILITY(utility_ID) ON DELETE SET NULL  
);

-- Bảng REVENUE_EXPENDITURE_TYPE: Lưu trữ các loại thu chi (Doanh thu hoặc Chi phí).
-- Chứa thông tin về loại thu chi và tên loại thu chi.
CREATE TABLE REVENUE_EXPENDITURE_TYPE(
    revenueExpenditureType_ID VARCHAR(10),  -- ID loại thu chi.
    revenueExpenditureType_Name VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,  -- Tên loại thu chi.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo loại thu chi.
    CONSTRAINT PRIMARY_KEY_REVENUE_EXPENDITURE_TYPE PRIMARY KEY(revenueExpenditureType_ID)  -- Khóa chính cho bảng REVENUE_EXPENDITURE_TYPE.
);

-- Bảng REVENUE_EXPENDITURE: Lưu trữ thông tin về các khoản thu chi trong hệ thống.
-- Chứa thông tin về loại thu chi, phương thức thanh toán, số tiền nhận được và các ghi chú.
CREATE TABLE REVENUE_EXPENDITURE (
    revenueExpenditure_ID VARCHAR(30) PRIMARY KEY,  -- ID thu chi duy nhất
    revenueExpenditure_Form ENUM('THU', 'CHI') NOT NULL,  -- Loại thu/chi
    revenueExpenditure_Method ENUM('TIỀN MẶT', 'CHUYỂN KHOẢN') NOT NULL,  -- Phương thức thu/chi
    revenueExpenditureType_ID VARCHAR(10),  -- ID loại thu chi (liên kết với REVENUE_EXPENDITURE_TYPE)
    revenueExpenditure_Content VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,  -- Nội dung thu chi
    payment_ScheduleID VARCHAR(30),  -- ID lịch thanh toán (liên kết với PAYMENT_SCHEDULE)
    bank_AccountID VARCHAR(30) NULL,  -- ID tài khoản ngân hàng (liên kết với FINANCE)
    amountReceived_Amount DECIMAL(18,2) NOT NULL,  -- Số tiền thu được (hỗ trợ số thập phân)
    dateAdd DATE DEFAULT (CURRENT_DATE),  -- Ngày thu chi
    -- Khóa ngoại
    CONSTRAINT FK_REVENUE_EXPENDITURE_TYPE FOREIGN KEY (revenueExpenditureType_ID) REFERENCES REVENUE_EXPENDITURE_TYPE(revenueExpenditureType_ID) ON DELETE SET NULL,
	CONSTRAINT FK_FINANCE FOREIGN KEY (bank_AccountID) REFERENCES FINANCE(bank_AccountID) ON DELETE SET NULL,
	CONSTRAINT FK_PAYMENT_SCHEDULE FOREIGN KEY (payment_ScheduleID) REFERENCES PAYMENT_SCHEDULE(payment_ScheduleID) ON DELETE SET NULL
);

-- Bảng REVENUE_REPORT (tiếp theo): Lưu trữ báo cáo doanh thu.
-- Chứa thông tin về tổng doanh thu, tổng chi phí và lợi nhuận ròng của doanh nghiệp.
CREATE TABLE REVENUE_REPORT (
    report_ID INT AUTO_INCREMENT PRIMARY KEY,  -- ID báo cáo doanh thu, tự động tăng.
    total_Revenue BIGINT NOT NULL,  -- Tổng doanh thu trong báo cáo.
    total_Expenses BIGINT NOT NULL,  -- Tổng chi phí trong báo cáo.
    net_Profit BIGINT GENERATED ALWAYS AS (total_Revenue - total_Expenses) STORED,  -- Lợi nhuận ròng (doanh thu - chi phí).
    report_Date DATE NOT NULL,  -- Ngày báo cáo.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP  -- Thời gian tạo báo cáo.
);

-- Bảng TRANSACTION_LOG: Lưu trữ lịch sử giao dịch của các hành động trong hệ thống.
-- Chứa thông tin về các hành động (INSERT, UPDATE, DELETE) trên các bảng, ghi lại chi tiết thay đổi.
CREATE TABLE TRANSACTION_LOG (
    log_ID INT AUTO_INCREMENT PRIMARY KEY,  -- ID giao dịch, tự động tăng.
    table_Name VARCHAR(50),  -- Tên bảng mà giao dịch được thực hiện.
    record_ID VARCHAR(30),  -- ID bản ghi mà giao dịch ảnh hưởng đến.
    action_Type ENUM('INSERT', 'UPDATE', 'DELETE'),  -- Loại hành động (chèn, cập nhật, xóa).
    action_Detail TEXT,  -- Chi tiết của hành động (các giá trị thay đổi).
    user_ID VARCHAR(30),  -- ID người dùng thực hiện hành động (liên kết với bảng USER).
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP  -- Thời gian tạo giao dịch.
);

-- Bảng ROLE: Lưu trữ các vai trò người dùng trong hệ thống.
-- Chứa thông tin về vai trò người dùng (ví dụ: admin, user, manager).
CREATE TABLE ROLE (
    role_ID SMALLINT AUTO_INCREMENT PRIMARY KEY, 
    role_Name ENUM('ADMIN', 'USER', 'MODERATOR') UNIQUE NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng USER: Lưu trữ thông tin người dùng của hệ thống.
-- Chứa thông tin về tên đăng nhập, mật khẩu và vai trò của người dùng.
CREATE TABLE USER (
    user_ID VARCHAR(30) PRIMARY KEY, 
    username VARCHAR(50) UNIQUE NOT NULL CHECK (CHAR_LENGTH(username) >= 3), 
    password_hash VARCHAR(255) NOT NULL, 
    role_ID SMALLINT DEFAULT 2,  -- Bỏ NOT NULL để tránh lỗi
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT FK_USER_ROLE FOREIGN KEY (role_ID) REFERENCES ROLE(role_ID) ON DELETE SET NULL, 
    INDEX idx_role (role_ID)  
);

-- Bảng NOTIFICATION: Lưu trữ thông báo cho người dùng trong hệ thống.
-- Chứa thông tin về nội dung thông báo, trạng thái đọc và người nhận thông báo.
CREATE TABLE NOTIFICATION (
    notification_ID INT AUTO_INCREMENT PRIMARY KEY,  -- ID thông báo, tự động tăng.
    user_ID VARCHAR(30),  -- ID người dùng nhận thông báo (liên kết với bảng USER).
    message TEXT NOT NULL,  -- Nội dung thông báo.
    status ENUM('UNREAD', 'READ') DEFAULT 'UNREAD',  -- Trạng thái của thông báo (UNREAD: chưa đọc, READ: đã đọc).
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo thông báo.
    FOREIGN KEY (user_ID) REFERENCES USER(user_ID)  -- Khóa ngoại liên kết với bảng USER.
);

