var common = {
    smsUrl: "http://127.0.0.1:7012/ms/sms/sendsms/",
    /**
     * 页面跳转
     * @param pageName
     */
    page: function (bussiness, pageName) {
        // window.location.href = common.getPath() + "/common/" + pageName;
        window.location.href = common.getPath() + "/ms/service/web/" + bussiness + "/page/" + pageName + ".html";
    },

    /**
     * 功能说明：得到应用路径
     * @method holly.getPath
     * @param { string } url 参数可选。默认为当前网页
     * @return{ string } appPath 应用的URL路径
     */
    getPath: function (url) {
        var path = (url || self.location.href).replace("//", "@@").split("/");
        // return path[0].replace("@@", "//") + "/" + path[1];
        return path[0].replace("@@", "//");
    },

    /**
     * 获取树List
     */
    getTreeList: function () {
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
    },

    /**
     * 显示成功提示窗口
     */
    showSuccess: function (e) {
        spop({
            template: e,
            style: 'success',
            position  : 'top-right',
            autoclose: 3000
            // onOpen: function() {
            //     document.body.style.background = "#fff";
            // }
        });
    },

    /**
     * 显示失败提示窗口
     */
    showError:function (e) {
        spop({
            template: e,
            style: 'error',
            position  : 'top-right',
            autoclose: 3000
            // onOpen: function() {
            //     document.body.style.background = "#fff";
            // }
        });
    },

    /**
     * 显示基本信息提示窗口
     */
    showInfo:function (e) {
        spop({
            template: e,
            style: 'default',
            position  : 'top-right',
            autoclose: 3000
            // onOpen: function() {
            //     document.body.style.background = "#fff";
            // }
        });
    },

    /**
     * 检查手机号码是否合法
     */
    checkMobile: function(e){
        if (!(/^1[3456789]\d{9}$/.test(e))) {
            return false;
        } else {
            return true;
        }
    },

    /**
     * 发送验证码
     */
    sendsms: function () {
        var mobile = $("#mobile").val();
        var valid = common.checkMobile(mobile);
        if (valid) {
            $.ajax({
                type: 'post',
                url: common.smsUrl + mobile,
                dataType: "json",
                async: false,
                success: function (e) {
                    if (e.success) {
                        console.log("发送成功");
                        $("#mobile").val("");
                        $('#dlg-sendsms').dialog('close');
                        common.showSuccess(e.msg);
                    }
                }
            });
        } else {
            console.log("发送失败");
            common.showError("请输入合法手机号码！");
        }
    }
};