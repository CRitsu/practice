package config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import springtest.services.SpitterRespository;


@Configuration
@EnableWebSecurity()
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private SpitterRespository spitterRespository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
//                .antMatchers("/spitter/user/**").authenticated()
//                .antMatchers("/spitter/register").permitAll()
//                .antMatchers("/spitter/**").authenticated()
//                .anyRequest().permitAll()
                .antMatchers("/spittles/**").hasRole("ADMIN")
//                .antMatchers("/logout").permitAll()
                .antMatchers("/res/**").permitAll()
                .antMatchers("/auth").permitAll()
                .anyRequest().authenticated()
            .and()
            .requiresChannel()
                .anyRequest().requiresSecure()
            .and()
            .portMapper()
                .http(9081).mapsTo(9082)
                .http(80).mapsTo(443)
            .and().formLogin().loginPage("/spitter/login").permitAll()
            .and().httpBasic().realmName("auth")
        .and().rememberMe().key("remember")
        .and().logout().logoutUrl("/logout").logoutSuccessUrl("/spitter/login?logout").permitAll()
        .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(new SpitterDetailService(spitterRespository))
        .and().inMemoryAuthentication().withUser("root").password("root").roles("USER");
    }


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.debug(true);
    }
}
