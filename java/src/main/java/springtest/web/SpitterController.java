package springtest.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import springtest.entity.Spitter;
import springtest.exception.SpitterNotFoundException;
import springtest.services.SpitterRespository;

import javax.validation.Valid;


@Controller
@RequestMapping("/spitter")
public class SpitterController {

    private  SpitterRespository spitterRespository;

    @Autowired
    public SpitterController(SpitterRespository spitterRespository) {
        this.spitterRespository = spitterRespository;
    }

    public SpitterController(){}

    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String register(Model model) {
        model.addAttribute(new Spitter());
        return "registerForm";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String registration(@ModelAttribute("spitter") @Valid Spitter spitter, Errors errors,
                               RedirectAttributes model) {
        System.out.println(spitter);
        if (errors.hasErrors()) return "registerForm";
        if (!spitterRespository.save(spitter)) {
            model.addAttribute("error","保存失败。重新注册。");
            return "registerForm";
        }
        model.addAttribute("id", spitter.getId());
//        model.addFlashAttribute("spitter", spitter);
        System.out.println(spitter.toString());
        return "redirect:/spitter/user/{id}";
    }

    @RequestMapping(value = "/{username}")
    public String toProfile(@PathVariable String username, Model model) throws SpitterNotFoundException {

        if (!model.containsAttribute("spitter")){
            throw new SpitterNotFoundException();
        }
        return "spitter";
    }
    @RequestMapping(value = "/user/{id}")
    public String userLogin(@PathVariable int id, Model model) {
        Spitter spitter = spitterRespository.findById(id);
//        if (spitter == null) throw new SpitterNotFoundException();
        model.addAttribute("spitter", spitter);
        return "spitter";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String loginForm() {
        return "loginForm";
    }


}
