package springtest.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import springtest.entity.Error;
import springtest.exception.SpitterNotFoundException;

import java.io.IOException;

//import org.springframework.web.bind.annotation.ResponseBody;

@RestControllerAdvice
public class AppWideExceptionHandler extends ResponseEntityExceptionHandler {

//    @ExceptionHandler(value = { NoHandlerFoundException.class })
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    public String spitterNotFoundHandler() {
////        System.out.printf("1");
//        return "error/404";
//    }
    @ExceptionHandler({ SpitterNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Error>  error() {
        Error error = new Error();
        error.setId(5);
        error.setMessage("Not Found.");
        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
//        return "error/404";
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<Error>  ioError() {
        Error error = new Error();
        error.setId(5);
        error.setMessage("Not Found.");
        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
//        return "error/404";
    }

}
