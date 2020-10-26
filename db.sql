DROP TABLE IF EXISTS
	ManagerHasPrivilege,
	RoleHasPrivilege,
	OrderHasProductHasExtra,
	OrderHasProduct,
	OrderHasStatus,
	GroupOrderHasOrder,
	OrderRating,
	SingleOrder,
	RestaurantHasCategory,
	RestaurantHours,
	ProductHasCategory,
	ProductCategory,
	ProductHasExtra,
	Extra,
	Manager,
	Product,
	Restaurant,
	Seat,
	GroupOrder,
	OrderStatus,
	Privilege,
	ManagerRole,
	City,
	RestaurantCategory
;

CREATE TABLE IF NOT EXISTS RestaurantCategory (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    category_name VARCHAR(100),
    description TEXT
);

CREATE TABLE IF NOT EXISTS City (
    zip_code CHAR(4) PRIMARY KEY NOT NULL,
    city_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS ManagerRole (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    role_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Privilege (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    privilege_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS OrderStatus (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    status_name VARCHAR(25),
    color CHAR(6),
    completed BOOL
);

CREATE TABLE IF NOT EXISTS GroupOrder (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    group_uuid BINARY(16)
);

CREATE TABLE IF NOT EXISTS Seat (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    restaurant_id INT UNSIGNED NOT NULL,
    seat_name VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS Restaurant (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    restaurant_name VARCHAR(100),
    registered_at DATE,
    zip_code CHAR(4) NOT NULL,
    address VARCHAR(100),
    location POINT,
    phone CHAR(8),
    email VARCHAR(100),
    website VARCHAR(100),
    image_logo VARCHAR(100),
    image_banner VARCHAR(100),
    description TEXT,
    smiley_id INT,
    FOREIGN KEY (zip_code)
        REFERENCES City (zip_code)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Product (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    restaurant_id INT UNSIGNED NOT NULL,
    product_name VARCHAR(255),
    description VARCHAR(255),
    image_icon VARCHAR(255),
    price DECIMAL(10 , 2 ),
    hidden BOOL,
    sold_out BOOL,
    FOREIGN KEY (restaurant_id)
        REFERENCES Restaurant (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Manager (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    restaurant_id INT UNSIGNED NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone CHAR(8),
    password VARCHAR(255),
    registered_at DATE,
    last_login DATETIME,
    FOREIGN KEY (restaurant_id)
        REFERENCES Restaurant (id)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (role_id)
        REFERENCES ManagerRole (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Extra (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    restaurant_id INT UNSIGNED NOT NULL,
    extra_name VARCHAR(255),
    description VARCHAR(255),
    price DECIMAL(10 , 2 ),
    hidden BOOL,
    sold_out BOOL,
    FOREIGN KEY (restaurant_id)
        REFERENCES Restaurant (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ProductHasExtra (
    product_id INT UNSIGNED NOT NULL,
    extra_id INT UNSIGNED NOT NULL,
    amount TINYINT UNSIGNED,
    PRIMARY KEY (product_id , extra_id),
    FOREIGN KEY (product_id)
        REFERENCES Product (id)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (extra_id)
        REFERENCES Extra (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ProductCategory (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    restaurant_id INT UNSIGNED NOT NULL,
    category_name VARCHAR(255),
    description VARCHAR(255),
    image_icon VARCHAR(255),
    image_wide VARCHAR(255),
    hidden BOOL,
    available_start TIME,
    available_end TIME,
    FOREIGN KEY (restaurant_id)
        REFERENCES Restaurant (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ProductHasCategory (
    product_id INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (product_id , category_id),
    FOREIGN KEY (product_id)
        REFERENCES Product (id)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (category_id)
        REFERENCES ProductCategory (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS RestaurantHours (
    restaurant_id INT UNSIGNED NOT NULL,
    day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', ' saturday', 'sunday', 'default'),
    open_hour TIME,
    close_hour TIME,
    PRIMARY KEY (restaurant_id , day_of_week),
    FOREIGN KEY (restaurant_id)
        REFERENCES Restaurant (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS RestaurantHasCategory (
    restaurant_id INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (restaurant_id , category_id),
    FOREIGN KEY (restaurant_id)
        REFERENCES Restaurant (id)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (category_id)
        REFERENCES RestaurantCategory (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SingleOrder (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    restaurant_id INT UNSIGNED NOT NULL,
    table_id INT UNSIGNED NOT NULL,
    order_name VARCHAR(50),
    order_number INT,
    created_at DATETIME,
    order_comment VARCHAR(250),
    ready BOOL,
    FOREIGN KEY (restaurant_id)
        REFERENCES Restaurant (id)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (table_id)
        REFERENCES Seat (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS OrderRating (
    order_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    rating_name VARCHAR(50),
    rating TINYINT,
    review TEXT,
    rated_at DATETIME,
    FOREIGN KEY (order_id)
        REFERENCES SingleOrder (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS GroupOrderHasOrder (
    order_id BIGINT UNSIGNED NOT NULL,
    grouporder_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (order_id , grouporder_id),
    FOREIGN KEY (order_id)
        REFERENCES SingleOrder (id)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (grouporder_id)
        REFERENCES GroupOrder (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS OrderHasStatus (
    order_id BIGINT UNSIGNED NOT NULL,
    status_id INT UNSIGNED NOT NULL,
    time_changed DATETIME,
    PRIMARY KEY (order_id , status_id),
    FOREIGN KEY (order_id)
        REFERENCES SingleOrder (id)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (status_id)
        REFERENCES OrderStatus (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS OrderHasProduct (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    amount TINYINT,
    FOREIGN KEY (order_id)
        REFERENCES SingleOrder (id)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES Product (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS OrderHasProductHasExtra (
    orderproduct_id BIGINT UNSIGNED NOT NULL,
    extra_id INT UNSIGNED NOT NULL,
    amount TINYINT,
    PRIMARY KEY (orderproduct_id , extra_id),
    FOREIGN KEY (orderproduct_id)
        REFERENCES OrderHasProduct (id)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (extra_id)
        REFERENCES Extra (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS RoleHasPrivilege (
    role_id INT UNSIGNED NOT NULL,
    privilege_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (role_id , privilege_id),
    FOREIGN KEY (role_id)
        REFERENCES ManagerRole (id)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (privilege_id)
        REFERENCES Privilege (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ManagerHasPrivilege (
    manager_id INT UNSIGNED NOT NULL,
    privilege_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (manager_id , privilege_id),
    FOREIGN KEY (manager_id)
        REFERENCES Manager (id)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (privilege_id)
        REFERENCES Privilege (id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);
