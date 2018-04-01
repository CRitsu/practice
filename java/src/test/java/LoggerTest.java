import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import springtest.aspect.LogAspect;

public class LoggerTest {

    private static Logger logger = LoggerFactory.getLogger(LogAspect.class);

    @Test
    public void logTest() {
        logger.info("info message!!");
        logger.error("error!!!!!!!!!");
        logger.debug("that's ok!");
    }

}
