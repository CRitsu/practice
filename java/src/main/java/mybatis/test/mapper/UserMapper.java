package mybatis.test.mapper;

import mybatis.entity.TestUser;

import java.util.List;

public interface UserMapper {

    TestUser getUser(int id) throws Exception;
    List<TestUser> getAllUsers();
}
