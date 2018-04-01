
DROP TABLE IF EXISTS friends;

CREATE TABLE friends(
  user_id INT NOT NULL ,
  friends_id INT NOT NULL ,
  black_flg CHAR(1) DEFAULT 0,
  add_time TIMESTAMP DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE INDEX friends_index ON friends(user_id);

INSERT INTO friends(user_id, friends_id) VALUES (10000, 10001);

# 用户id
# 好友id
# 黑旗
# 添加时间