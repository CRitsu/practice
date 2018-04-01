package config;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import springtest.entity.Spitter;
import springtest.services.SpitterRespository;

import java.util.ArrayList;
import java.util.List;

public class SpitterDetailService implements UserDetailsService {

    private final SpitterRespository spitterRespository;

    public SpitterDetailService (SpitterRespository spitterRespository) {
        this.spitterRespository = spitterRespository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Spitter spitter = spitterRespository.findByName(username);

        if (spitter != null) {
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            User user = new User(spitter.getNickName(), spitter.getPassword(),authorities);

            return user;
        }

        throw new UsernameNotFoundException("User " + username + " Not Found.");
    }
}
