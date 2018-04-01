package springtest.web;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import springtest.services.SpittleRepository;

@Controller
@RequestMapping("/spittles")
public class SpittleController {
    private SpittleRepository spittleRepository;

    private static Logger logger = LogManager.getLogger(SpittleController.class);

    @Autowired
    public SpittleController(SpittleRepository spittleRepository) {
        this.spittleRepository = spittleRepository;
    }

    public SpittleController() {}

    private static final String MAX_VALUE = "99999999";

    @RequestMapping(method=RequestMethod.GET)
    public String toSpittles(
            @RequestParam(value="max", defaultValue=MAX_VALUE) long max,
            @RequestParam(value="count", defaultValue="10") int count,
            Model model) {
        System.out.println("max=" + max + ",count=" + count);
        model.addAttribute("spittlesList", spittleRepository.findSpittles(max, count));
        return "spittles";
    }

    @RequestMapping(value="/id{id}")
    public String toSpittleInId(
            @PathVariable Long id,
            Model model) {
        System.out.println("id=" + id);
        model.addAttribute("spittle", spittleRepository.findSpittle(id));
        logger.info("id= " + id);
        return "spittle";
    }

}
