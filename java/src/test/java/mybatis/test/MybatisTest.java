package mybatis.test;

import mybatis.entity.Account;
import mybatis.entity.TestUser;
import mybatis.test.mapper.UserMapper;
import mybatis.test.utils.TestUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import test.comparator.SortingComparator;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class MybatisTest {

    private SqlSession sqlSession;

    @Before
    public void setSqlSession() throws IOException {
        SqlSessionFactory sqlSessionFactory = TestUtils.getSqlSessionFactory();
        sqlSession = sqlSessionFactory.openSession();
    }

    @After
    public void destroyResource() {
        if(sqlSession != null) {
            sqlSession.close();
        }
    }

    @Test
    public void getOne() throws Exception {
//        String statement = "config.UserMapper.getUser";
//        TestUser user = sqlSession.selectOne(statement,2);
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        TestUser user = userMapper.getUser(2);
        System.out.println(user);
    }

    @Test
    public void update() {
        int id = 3;
        String statement = "config.UserMapper.updateUser";
        String get = "config.UserMapper.getUser";
        TestUser user = new TestUser();
        user.setAge(11);
        user.setName("年少轻狂");
        user.setId(id);
        TestUser before = sqlSession.selectOne(get, id);
        System.out.println("更新前");
        System.out.println(before);
        int result = sqlSession.update(statement, user);
        System.out.println("更新结果：" + result);
        sqlSession.commit();
        TestUser after = sqlSession.selectOne(get, id);
        System.out.println("更新后");
        System.out.println(after);
    }

    @Test
    public void save() {
        String statement = "config.UserMapper.saveUser";
        TestUser user = new TestUser();
        user.setAge(27);
        user.setName("森罗万象");
        int result = sqlSession.insert(statement, user);
        System.out.println("插入结果：" + result);
        sqlSession.commit();
    }

    @Test
    public void delete() {
        String statement = "config.UserMapper.deleteUser";
        int id = 3;
        int result = sqlSession.insert(statement, id);
        System.out.println("删除结果：" + result);
        sqlSession.commit();
    }

    @Test
    public void getAllUsers() {
//        String statement = "config.UserMapper.getAllUsers";
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        List<TestUser> users = userMapper.getAllUsers();
        for (TestUser user : users
             ) {
            System.out.println(user);
        }
    }


    @Test
    public void sortTest() {
        String statement = "config.AccountMapper.getAccounts";
        List<Account> accounts = sqlSession.selectList(statement);
        for (Account account :
                accounts) {
            account.setSortKey(
                    account.getKind() + account.getNumber()
            );
        }

        Account[] acc = accounts.toArray(new Account[accounts.size()]);

        int in, out;
        for (out = 1; out < acc.length; out++) {
            Account temp = acc[out];
            in = out;
            SortingComparator co = new SortingComparator(temp.getSortKey());
            while (in > 0 && co.compareTo(acc[in - 1].getSortKey()) < 0) {
                acc[in] = acc[in - 1];
                --in;
            }
            acc[in] = temp;
        }



        System.out.println(Arrays.toString(acc));
    }

}
