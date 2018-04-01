package springtest.services;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import springtest.entity.Spitter;
import springtest.exception.SpitterNotFoundException;

import static mybatis.test.mapper.SqlMapper.GET_SPITTER;
import static mybatis.test.mapper.SqlMapper.GET_SPITTER_BY_NAME;
import static mybatis.test.mapper.SqlMapper.SAVE_SPITTER;

@Repository
public class SpitterRespositoryImpl implements SpitterRespository {

    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    /**
     * {@inheritDoc}
     */
    public boolean save(Spitter spitter) {

        int result = sqlSession.insert(SAVE_SPITTER, spitter);
        return result > 0 ? true : false;
    }

    @Override
    public Spitter findById(int id) throws SpitterNotFoundException {

        Spitter spitter = sqlSession.selectOne(GET_SPITTER,id);

        if(spitter == null) throw new SpitterNotFoundException();

        return spitter;
    }

    @Override
    public Spitter findByName(String username) throws SpitterNotFoundException{
        Spitter spitter = sqlSession.selectOne(GET_SPITTER_BY_NAME,username);
//        if(spitter == null) throw new SpitterNotFoundException();
        return spitter;
    }
}
