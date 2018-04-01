<%--
  Created by IntelliJ IDEA.
  User: Ritsu
  Date: 2017/8/27
  Time: 23:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8"  isELIgnored="false"%>
<%@taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Registration</title>
</head>
    <h1>Registration 里</h1>
    <c:if test="${requestScope.error != null}" >
        <p><c:out value="${requestScope.error}" /></p>
    </c:if>
    <sf:form method="post" commandName="spitter">
        <sf:errors element="div" path="*" cssClass="errors" />
        <label>Real Name: <sf:input path="realName" /></label> <br>
        <label>YOUR Name: <sf:input path="nickName" /></label> <br>
        <label>Age: <sf:input path="age" /></label> <br>
        <label>Password: <sf:password path="password" /></label> <br>
        <input type="submit" value="Register">
    </sf:form>
</body>
</html>
