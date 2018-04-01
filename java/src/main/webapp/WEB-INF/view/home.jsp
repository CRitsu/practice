<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"  isELIgnored="false"%>
    <% String path = request.getContextPath();%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html">
<title>Just test</title>
    <script type="text/javascript" src="res/jquery-3.1.1.js" ></script>
</head>
<body>
<h1>显示TM的主页 WHAT???</h1>
<h3><a href="<%= path %>/spittles">到spittles画面去</a></h3>
<form action="spitter/user/10000" method="post" >
    <h3><input type="submit" value="显示用户10000"></h3><br>
    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
</form>
<form action="logout" method="post" >
    <h3><input type="submit" value="退出"></h3><br>
    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
</form>
</body>
</html>