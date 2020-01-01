<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>zTree-许可维护</title>
    <%@ include file="/common/page/meta.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/permission/css/permission.css">
    <script type="text/javascript" src="${ctx}/permission/js/permission.js"></script>
</head>
<body>
    <%@ include file="/common/page/head.jsp" %>
    <div class="dbody">
        <div class="dtitle">
            许可维护
        </div>
        <button class="twoWordsButton" onclick="common.page('index')">首页</button>
        <div class="zTreeDemoBackground left">
            <ul id="permission" class="ztree"></ul>
        </div>
    </div>
    <%@ include file="/common/page/foot.jsp" %>
</body>
</html>
