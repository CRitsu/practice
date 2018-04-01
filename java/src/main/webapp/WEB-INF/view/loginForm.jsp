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
    <script type="text/javascript" src="../res/jquery-3.1.1.js" ></script>
    <title>Login</title>
</head>
    <h1>Login</h1>
    <c:if test="${param.error != null}" >
        <p><c:out value="错误。" /></p>
    </c:if>
    <c:if test="${param.logout != null}" >
        <p><c:out value="已经登出。" /></p>
    </c:if>
    <form action="login" method="post" >
        <label>YOUR Name: <input name="username"></label> <br>
        <label>Password: <input type="password" name="password"></label> <input type="checkbox" name="remember" ><br>
        <input type="submit" value="Login">
        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
    </form>
</body>
</html>
