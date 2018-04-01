package mybatis.entity;

public class Account {

    public Account(){}

    private String number;
    private String alias;
    private String kind;

    private String sortKey;

    public String getSortKey() {
        return sortKey;
    }

    public void setSortKey(String sortKey) {
        this.sortKey = sortKey;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    @Override
    public String toString() {
        return "\nA{" +number +
                ", alias='" + alias + '\'' +
                ", kind='" + kind + '\'' +
                "}";
    }
}
