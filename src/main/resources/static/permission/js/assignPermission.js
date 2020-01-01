var assignPermission = {
    /*beforeClick:function (treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("permission");
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        return false;
    },*/
    onCheck:function (e, treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("permission"),
            nodes = zTree.getCheckedNodes(true),
            v = "";
        var roleType = "";
        for (var i = 0, l = nodes.length; i < l; i++) {
            v += nodes[i].name + ",";
            roleType += nodes[i].id + ",";
        }
        if (v.length > 0) v = v.substring(0, v.length - 1);
        if (roleType.length > 0) roleType = roleType.substring(0, roleType.length - 1);
        var roleObj = $("#roleSel");
        roleObj.attr("value", v);
        $("#roleType").attr("value", roleType);
    },
    showMenu:function () {
        var roleObj = $("#roleSel");
        var roleOffset = $("#roleSel").offset();
        $("#menuContent").css({
            left: roleOffset.left + "px",
            top: roleOffset.top + roleObj.outerHeight() + "px"
        }).slideDown("fast");
        $("body").bind("mousedown", assignPermission.onBodyDown);
    },
    hideMenu:function () {
        $("#menuContent").fadeOut("fast");
        $("body").unbind("mousedown", assignPermission.onBodyDown);
    },
    onBodyDown:function (event) {
        if (!(event.target.id === "roleSel" || event.target.id === "showa" || event.target.id === "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
            assignPermission.hideMenu();
        }
    },
    clear:function (obj1, obj2) {
        if (obj1 !== null || obj1 !== "") {
            $(obj1).val('');
        }
        if (obj2 !== null || obj2 !== "") {
            $(obj2).val('');
        }
        //取消已勾选
        var zNodes = common.getTreeList();
        try {
            var treeObj = $.fn.zTree.init($("#permission"), setting, zNodes);
            treeObj.checkAllNodes(false);
        }catch (e) {
            common.showError("加载zTree插件包失败");
        }
    }
};

var setting = {
    check: {
        enable: true,
        chkboxType: {"Y": "s", "N": "s"}
    },
    view: {
        dblClickExpand: true,
        showIcon: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        // beforeClick: assignPermission.beforeClick,//取消此方法，则单击节点文字时不会勾选复选框
        onCheck: assignPermission.onCheck
    }
};

$(function () {
    var zNodes = common.getTreeList();
    try {
        $.fn.zTree.init($("#permission"), setting, zNodes);
    }catch (e) {
        common.showError("加载zTree插件包失败");
    }
});

/**
 * 测试专用，获取input值
 */
function getVal() {
    var val = $("#roleSel").val();
    var roleTypeVal = $("#roleType").val();
    if ((val === null || val === "") || (roleTypeVal === null || roleTypeVal === "")) {
        common.showError("暂无数据！");
    } else {
        common.showInfo("名称：" + val);
        common.showInfo("ID："+roleTypeVal);
    }
}
