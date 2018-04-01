<%--
  Created by IntelliJ IDEA.
  User: Ritsu
  Date: 2017/9/8
  Time: 0:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8"  isELIgnored="false" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Spitter</title>
</head>
<body>
<h1>This is your profile.</h1>
Hi, <c:out value="${spitter.nickName}" />.
你的真名是<c:out value="${spitter.realName}" />.
你的密码是<c:out value="${spitter.password}" />，你TMD小心被盗号哟。
还有你的ID是<span style="color: red;"><c:out value="${spitter.id}" /></span>。
</body>
</html>
