package springtest.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import springtest.entity.Spitter;
import springtest.exception.SpitterNotFoundException;
import springtest.services.SpitterRespository;

import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/api")
public class ApiRestController {

    @Autowired
    private SpitterRespository spitterRespository;

    @RequestMapping(value = "/spitter", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<Spitter> getSpitter(@RequestParam(value = "id") int id) {
        Spitter spitter = spitterRespository.findById(id);
        if (spitter == null) {
            throw new SpitterNotFoundException();
        }
//        if (spitter == null) {
//            spitter = new Spitter();spitter.setNickName("dummy");
//        }
        return new ResponseEntity<>(spitter, HttpStatus.OK);
    }

//    @ExceptionHandler(SpitterNotFoundException.class)
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    public Error error() {
//        Error error = new Error();
//        error.setId(5);
//        error.setMessage("Not Found.");
//        return error;
//    }

    @RequestMapping(value = "/spitter", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<Spitter> postSpitter(@RequestBody Spitter spitter, UriComponentsBuilder uriComponentsBuilder){
        spitterRespository.save(spitter);
        HttpHeaders headers = new HttpHeaders();
        URI uri = uriComponentsBuilder.path("/api/spitter").queryParam("id", spitter.getId()).build().toUri();
        headers.setLocation(uri);
        ResponseEntity<Spitter> responseEntity = new ResponseEntity<>(spitter, headers, HttpStatus.CREATED);
        return responseEntity;
    }

    @RequestMapping("/io")
    public ResponseEntity<Spitter> ioTest() throws IOException {
        throw new IOException("test");
//        return new ResponseEntity<>(new Spitter(), HttpStatus.OK);
    }

}
