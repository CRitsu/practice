package test.comparator;

import java.math.BigInteger;
import java.util.regex.Pattern;

public class SortingComparator implements Comparable<String> {

    private String string;
    private final String reg = "^\\d+$";

    public SortingComparator(String s){
        this.string = s;
    }

    public String getString() {
        return string;
    }

    @Override
    public int compareTo(String target) {

        if (Pattern.matches(reg, string) && Pattern.matches(reg, target)) {
            try {
                if (string.length() < 19 && target.length() < 19) {
                    Long s = Long.valueOf(string),
                            t = Long.valueOf(target);

                    System.out.println("Long");
                    System.out.println(s + " : " + t);
                    System.out.println(s.compareTo(t));

                    return s.compareTo(t);
                } else {
                    BigInteger s = new BigInteger(string),
                            t = new BigInteger(target);

                    System.out.println("BigInteger");
                    System.out.println(s + " : " + t);
                    System.out.println(s.compareTo(t));

                    return s.compareTo(t);
                }
            } catch (NumberFormatException e) {
                // do nothing
            }
        }

        System.out.println("String");
        System.out.println(string + " : " + target);
        System.out.println(string.compareTo(target));

        return string.compareTo(target);
    }
}
