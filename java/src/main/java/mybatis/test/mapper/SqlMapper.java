package mybatis.test.mapper;

/**
 * 定义SQL调用语句
 * 使用静态导入（import static）导入这个类
 * 直接调用字段
 */
public class SqlMapper {

    public final static String GET_SPITTER = "mybatis.test.mapper.SpitterMapper.getUser";
    public final static String SAVE_SPITTER = "mybatis.test.mapper.SpitterMapper.saveUser";
    public final static String GET_SPITTER_BY_NAME = "mybatis.test.mapper.SpitterMapper.getUserByName";
}
