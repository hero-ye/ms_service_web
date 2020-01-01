<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%--该jsp作用：引入公共的静态文件（js和css），只需要在相应的界面引入该jsp即可--%>
<link rel="shortcut icon" type="image/x-icon" href="${ctx}/common/img/hero.png">
<link rel="stylesheet" type="text/css" href="${ctx}/common/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx}/common/doc/zTree_v3/css/zTreeStyle/zTreeStyle.css">
<link rel="stylesheet" type="text/css" href="${ctx}/common/doc/spop/css/spop.css">
<script type="text/javascript" src="${ctx}/common/js/jquery.js"></script>
<script type="text/javascript" src="${ctx}/common/js/common.js"></script>
<script type="text/javascript" src="${ctx}/common/doc/zTree_v3/js/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="${ctx}/common/doc/zTree_v3/js/jquery.ztree.excheck-3.5.js"></script>
<script type="text/javascript" src="${ctx}/common/doc/spop/js/spop.js"></script>

