<%@ page contentType="text/html;charset=UTF-8" language="java"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>首页</title>
    <%@ include file="/common/page/meta.jsp" %>
</head>
<body>
    <%@ include file="/common/page/head.jsp" %>
    <div class="dbody">
        <h1>功能菜单</h1>
        <button class="fourWordsButton" onclick="common.page('permission')">许可维护</button>
        <button class="fourWordsButton" onclick="common.page('assignPermission')">分配角色</button>
        <button class="fourWordsButton" onclick="common.page('sheettype')">工单类型</button>
    </div>
    <%@ include file="/common/page/foot.jsp" %>
</body>
</html>
