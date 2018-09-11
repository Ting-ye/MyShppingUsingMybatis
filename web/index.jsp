<%--
  Created by IntelliJ IDEA.
  User: p13
  Date: 18/9/11
  Time: 10:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
  String path = request.getContextPath();
  // 获得本项目的地址(例如: http://localhost:8080/MyApp/)赋值给basePath变量
  String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
          + path + "/";
  // 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
  pageContext.setAttribute("basePath", basePath);
%>
<html>
  <head>
    <title>$Title$</title>
  </head>
  <body>
  <jsp:forward page="/WEB-INF/jsp/back/commodList.jsp"></jsp:forward>
  </body>
</html>
