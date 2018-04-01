package springtest.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LogAspect {

    private static org.slf4j.Logger logger = LoggerFactory.getLogger(LogAspect.class.getName());

    @Pointcut("execution(* springtest.*.*.*(..))")
    public void toPage(){}
    
//    @Around("toPage()")
//    public Object logPages(ProceedingJoinPoint point) throws Throwable{
//        Object o = null;
//        try {
//            StringBuilder param = new StringBuilder("Param: ");
//            for (int i = 0; i < point.getArgs().length; i++) {
//                param.append(point.getArgs()[i].toString()).append(';');
//            }
//            String param2String = param.toString().trim().equals("Param:") ? "":param.toString();
//            logger.info("START - {} {} {}", point.getTarget().getClass().getName(), point.getSignature().getName(), param2String);
//            o = point.proceed();
//            logger.info("END - " + point.getTarget().getClass().getName()  + " " +point.getSignature().getName());
//        } catch (Throwable e) {
//            logger.error("异常 - {} {}", point.getTarget().getClass().getName(), point.getSignature().getName(),e);
//            throw e;
//        }
//        return o;
//    }

    @Before("toPage()")
    public void beforePerform(JoinPoint point) {
        StringBuilder param = new StringBuilder("Param: ");
        for (int i = 0; i < point.getArgs().length; i++) {
            param.append(point.getArgs()[i].toString()).append(';');
        }
        String param2String = param.toString().trim().equals("Param:") ? "":param.toString();
        logger.info("START - {} {} {}", point.getTarget().getClass().getName(), point.getSignature().getName(), param2String);
    }

    @After("toPage()")
    public void afterPerform(JoinPoint point) {
        logger.info("END   - {} {}", point.getTarget().getClass().getName(), point.getSignature().getName());
    }

    @AfterThrowing(throwing = "e",pointcut = "toPage()")
    public void logException(JoinPoint point, Throwable e){
        logger.error("异常 - {} {}", point.getTarget().getClass().getName(), point.getSignature().getName(),e);
    }

}
