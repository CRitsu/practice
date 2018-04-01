# START

# 删除如果表存在
DROP TABLE IF EXISTS users;

# 创建表，设置自增主键从10000开始
create TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(48) NOT NULL ,
  password VARCHAR(128) NOT NULL ,
  avatar VARCHAR(255) DEFAULT '',
  mail VARCHAR(128) DEFAULT ''UNIQUE ,
  tel VARCHAR(11) DEFAULT '' UNIQUE ,
  created_time TIMESTAMP DEFAULT current_timestamp,
  last_update_time TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8;

# 对username创建索引
CREATE UNIQUE INDEX users_index ON users(username);

# 测试插入数据
INSERT INTO users (username, password) VALUES ('TEST_USER', 'TEST_USER_PASSWORD');

# INSERT INTO users (username, password) VALUES ('TEST_USER2', 'TEST_USER_PASSWORD');

# END

# 用户id
# 用户名
# 密码
# 头像
# 邮箱
# 手机
# 创建时间
# 更新时间