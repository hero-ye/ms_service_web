<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>zTree-分配角色</title>
    <%@ include file="/common/page/meta.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/permission/css/permission.css">
    <script type="text/javascript" src="${ctx}/permission/js/assignPermission.js"></script>
</head>
<body>
    <%@ include file="/common/page/head.jsp" %>
    <div class="dbody">
        <div class="dtitle">
            分配角色
        </div>
        <button class="twoWordsButton" onclick="common.page('index')">首页</button>
        <div class="zTreeDemoBackground left">
            <ul class="list" style="list-style: none;">
                <li class="title">
                    角色：
                    <input type="hidden" name="roleType" id="roleType"/>
                    <input type="text" id="roleSel" readonly value="" style="width: 155px;height: 24px;border-radius: 3px;border: 1px #ccc solid;padding-left: 5px;padding-right: 25px;" onclick="assignPermission.showMenu();"/>
                    <a href="javascript:void(0)" onclick="assignPermission.showMenu()" id="showa" onclick="assignPermission.showMenu();"
                       style="display: inline-block;width: 8px;height: 8px;border-right: 1px #ccc solid;border-bottom: 1px #ccc solid;transform: rotate(45deg);position: relative;right: 23px;top: -3px;"></a>
                    <button class="twoWordsButton" onclick="getVal()" id="menuBtn" style="margin-left: -2px;">获取</button>
                    <button class="twoWordsButton" onclick="assignPermission.clear('#roleType','#roleSel')" id="clear" style="margin-left: 28px;">清除</button>
                </li>
            </ul>
        </div>
        <div id="menuContent" class="menuContent" style="border: 1px #ccc solid;max-height: 227px;width: 184.7px;position: absolute;left: 121.7px;top: 306px;">
            <ul id="permission" class="ztree menuul" style="margin-top:0;overflow: scroll;width:175px;max-height: 200px;"></ul>
        </div>
    </div>
    <%@ include file="/common/page/foot.jsp" %>
</body>
</html>
