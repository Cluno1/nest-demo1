

CREATE TABLE e_user (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    account VARCHAR(255) NOT NULL COMMENT 'Login account',
    password VARCHAR(255) NOT NULL COMMENT 'Password (should be encrypted)',
    name VARCHAR(255) COMMENT 'User name',
    description TEXT COMMENT 'Description',
    disable TINYINT DEFAULT 1 COMMENT '1: active; 0: disabled'
) COMMENT 'e_user table';

CREATE TABLE permission (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE user_permission (
    user_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (user_id, permission_id),
    FOREIGN KEY (user_id) REFERENCES e_user (id),
    FOREIGN KEY (permission_id) REFERENCES permission (id)
);

CREATE TABLE event_user (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    e_user_id INT NOT NULL COMMENT 'user表的id',
    params JSON COMMENT '埋点参数 半结构化 json',
    description TEXT COMMENT '描述',
    disable TINYINT DEFAULT 1 COMMENT '1: active; 0: disabled'
) COMMENT '埋点设备记录表-不同设备登录同一个user会有不同的event_user';

CREATE TABLE event_types (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    name VARCHAR(255) COMMENT '事件名称',
    description TEXT COMMENT '描述',
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_name (name) COMMENT '名称索引'
) COMMENT '埋点事件类型表';

CREATE TABLE event_data (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
    event_types_id int not NULL COMMENT '类型id',
    event_user_id int NOT NULL COMMENT 'user id',
    params JSON COMMENT '埋点参数 半结构化 json',
    description TEXT COMMENT '描述'
) COMMENT '埋点数据表';