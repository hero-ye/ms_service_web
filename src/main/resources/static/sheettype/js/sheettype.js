var Sheettype = {
    /*beforeClick:function (treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("sheetTree");
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        return false;
    },*/
    /*单击节点展开*/
    onNodeClick: function (e, treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("sheetTree");
        zTree.expandNode(treeNode);
    },
    onCheck: function (e, treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("sheetTree"),
            nodes = zTree.getCheckedNodes(true),
            v = "";
        var sheetType = "";
        for (var i = 0, l = nodes.length; i < l; i++) {
            v += nodes[i].name + ",";
            sheetType += nodes[i].id + ",";
        }
        if (v.length > 0) v = v.substring(0, v.length - 1);
        if (sheetType.length > 0) sheetType = sheetType.substring(0, sheetType.length - 1);
        $("#sheetSel").attr("value", v);
        $("#sheetType").attr("value", sheetType);
    },
    showMenu: function () {
        var sheetObj = $("#sheetSel");
        var sheetOffset = $("#sheetSel").offset();
        $("#menuContent").css({
            left: sheetOffset.left + "px",
            top: sheetOffset.top + sheetObj.outerHeight() + "px"
        }).slideDown("fast");
        $("body").bind("mousedown", Sheettype.onBodyDown);
    },
    hideMenu: function () {
        $("#menuContent").fadeOut("fast");
        $("body").unbind("mousedown", Sheettype.onBodyDown);
    },
    onBodyDown: function (event) {
        if (!(event.target.id === "sheetSel" || event.target.id === "showa" || event.target.id === "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
            Sheettype.hideMenu();
        }
    },
    /*重置所有*/
    reset: function (obj1, obj2) {
        $("#proSel").val("<option selected value='0'>请选择</option>");    //重置省份名称
        $("#proId").val("");    //重置省份编码
        Sheettype.clear(obj1, obj2);    //清除已选工单类型
        $("#sheetTree li").remove();    //清除工单类型下拉框
    },
    /*清除工单类型*/
    clear: function (obj1, obj2) {
        if (obj1 !== null || obj1 !== "") {
            $(obj1).val('');
        }
        if (obj2 !== null || obj2 !== "") {
            $(obj2).val('');
        }
        //取消已勾选
        var zNodes = Sheettype.getTreeList("50", "CODE_SHEET_TYPE_ID");
        var treeObj = $.fn.zTree.init($("#sheetTree"), setting, zNodes);
        treeObj.checkAllNodes(false);
    },
    getTreeList: function (proId, codeType) {
        var sheettypeList;
        $.ajax({
            type: 'get',
            // url: common.getPath() + "/sheetType/findTreeByCodeType",
            url: "http://localhost:7011/ms/service/tree/getTreeCodeInfo",
            dataType: "json",
            data: {codeType: codeType, proId: proId},
            async: false,
            success: function (data) {
                if (data.success) {
                    sheettypeList = data.data;
                }
            }
        });
        return sheettypeList;
    },
    create: function () {
        var proId = $("#proId").val();
        var zNodes = Sheettype.getTreeList(proId, "CODE_SHEET_TYPE_ID");
        try {
            if (!zNodes.length <= 0) {
                $.fn.zTree.init($("#sheetTree"), setting, zNodes);
                common.showSuccess("创建成功！");
                Sheettype.showMenu();
            } else {
                common.showError("暂无数据！");
            }
        } catch (e) {
            common.showError("加载zTree插件包失败");
        }
    },

    //鼠标放上去
    overFn: function (obj) {
        $(obj).css("background", "#DBEAF9");

    },

    //鼠标移开
    outFn: function (obj) {
        $(obj).css("background", "#fff");

    },

    //下拉选项单击事件
    clickFn: function (obj) {
        $("#codeName").val($(obj).html());
        $("#showDiv").css("display", "none");
    },

    //输入内容
    searchWord: function (obj) {
        //1键盘抬起时获得输入框的内容
        var codeName = $(obj).val();
        //2根据输入框的内容去数据库中模糊查询---List<Product>
        var content = "";
        if (codeName) {
            $.post(common.getPath() + "/sheetType/findByWord", {"codeName": codeName},
                function (e) {
                    //3、将返回的商品的名称 现在showDiv中
                    if (e.data && e.data.length > 0) {
                        for (var i = 0; i < e.data.length; i++) {
                            content += "<div class='codeNameItem' onclick='Sheettype.clickFn(this)' onmouseover='Sheettype.overFn(this)' onmouseout='Sheettype.outFn(this)'>" + e.data[i].name + "</div>";
                        }
                    } else {
                        content += "<div class='codeNameItem'>暂无匹配标签！</div>";
                    }
                    $("#showDiv").html(content);
                    $("#showDiv").css("display", "block");
                },
                "json"
            );
        } else {
            $("#showDiv").css("display", "none");
        }
    },
};

//点击空白处隐藏下拉框
$(document).bind("click", function () {
    $('#showDiv').empty();
    $('#showDiv').css('display', 'none');
});

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
        // beforeClick: Sheettype.beforeClick,//取消此方法，则单击节点文字时不会勾选复选框
        onClick: Sheettype.onNodeClick,
        onCheck: Sheettype.onCheck
    }
};

$(function () {
    Sheettype.hideMenu();
    //回车触发事件
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) { // enter 键
            //要做的事情
            Sheettype.create();
        }
    };
    //异步加载省份
    $.ajax({
        // url: common.getPath() + "/proType/findAll",
        url: "http://localhost:7011/ms/service/proType/findAll",
        type: "get",
        dataTYpe: "json",
        async: true,
        timeout: 5000,
        success: function (e) {
            if (e.success = true) {
                for (var i = 0; i < e.data.length; i++) {
                    $("#proSel").append("<option value='" + e.data[i].proId + "'>" + e.data[i].proName + "</option>");
                }
            }
        },
        error: function () {
            common.showError("数据获取失败，请联系管理员！");
        },
        complete: function (XMLHttpRequest, status) {
            if (status == "timeout") {
                //如果请求超时，则弹出提示,并取消请求
                common.showError("请求超时");
            }
        }
    });
    //下拉框change事件
    $("#proSel").bind("change", function () {
        var proSel = $("#proSel").val();
        if (proSel === 0 || proSel === "0" || proSel === null) {
            $("#proId").val("");
        } else {
            $("#proId").val(proSel);
            Sheettype.create();
        }
    });
});


/**
 * 测试专用，获取input值
 */
function getVal() {
    var val = $("#sheetSel").val();
    var sheetTypeVal = $("#sheetType").val();
    if ((val === null || val === "") || (sheetTypeVal === null || sheetTypeVal === "")) {
        common.showError("暂无数据！");
    } else {
        common.showInfo("名称：" + val);
        common.showInfo("ID：" + sheetTypeVal);
    }
}






