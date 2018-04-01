package springtest.entity;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Spitter {


    private int id;

    private String realName;

    private String nickName;

    private int age;

    private String password;

    public Spitter(String realName, String nickName, int age, String password) {
        this.realName = realName;
        this.nickName = nickName;
        this.age = age;
        this.password = password;
    }

    public Spitter(){}

    @Override
    public int hashCode() {
        return HashCodeBuilder.reflectionHashCode(this);
    }

    @Size(min = 3, max = 16, message = "{realName.size}")
    public String getRealName() {
        return realName;
    }
    @Size(min = 3, max = 25, message = "{nickName.size}")
    public String getNickName() {
        return nickName;
    }
    @Min(value = 0, message = "{age.message}")
    public int getAge() {
        return age;
    }
    @NotNull
    @Size(min = 2, max = 30, message = "{password.size}")
    public String getPassword() {
        return password;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override

    public boolean equals(Object obj) {
        return EqualsBuilder.reflectionEquals(this, obj, "realName", "nickName" , "age", "password");
    }

    @Override
    public String toString() {
        return "Spitter{" +
                "id=" + id +
                ", realName='" + realName + '\'' +
                ", nickName='" + nickName + '\'' +
                ", age='" + age + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
