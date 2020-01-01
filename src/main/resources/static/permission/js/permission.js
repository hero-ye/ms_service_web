/*function getTreeList() {
    var permissionList;
    $.ajax({
        type: 'get',
        url: common.getPath() + "/permission/loadData",
        async: false,
        success: function (data) {
            if (data.success) {
                permissionList = data.data;
            }
        }
    });
    return permissionList;
};*/

$(function () {
    var setting = {};
    var znodes = common.getTreeList();
    try {
        $.fn.zTree.init($("#permission"), setting, znodes);
    } catch (e) {
        common.showError("加载zTree插件包失败");
    }
});
