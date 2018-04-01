package springtest.services;

import springtest.entity.Spitter;
import springtest.exception.SpitterNotFoundException;

public interface SpitterRespository {

    /**
     * 保存用户
     * @param spitter 保存对象
     * @return true 如果成功
     */
    boolean save(Spitter spitter);
    Spitter findById(int id) throws SpitterNotFoundException;
    Spitter findByName(String username) throws SpitterNotFoundException;
}
