package springtest;

import org.springframework.web.filter.CharacterEncodingFilter;

public class EncodingFilter extends CharacterEncodingFilter {
    public EncodingFilter() {
        setEncoding("UTF8");
        setForceEncoding(true);
    }
}
