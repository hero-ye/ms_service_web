var common = {
    /**
     * 发送短信的接口
     */
    smsUrl: "http://127.0.0.1:7012/ms/sms/sendsms/sendValidCode",

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
            position: 'top-right',
            autoclose: 3000
            // onOpen: function() {
            //     document.body.style.background = "#fff";
            // }
        });
    },

    /**
     * 显示失败提示窗口
     */
    showError: function (e) {
        spop({
            template: e,
            style: 'error',
            position: 'top-right',
            autoclose: 3000
            // onOpen: function() {
            //     document.body.style.background = "#fff";
            // }
        });
    },

    /**
     * 显示基本信息提示窗口
     */
    showInfo: function (e) {
        spop({
            template: e,
            style: 'default',
            position: 'top-right',
            autoclose: 3000
            // onOpen: function() {
            //     document.body.style.background = "#fff";
            // }
        });
    },

    /**
     * 清空表单
     */
    resetForm: function (obj) {
        $(":input", obj)
            .not(":button", ":reset", ":hidden", ":submit")
            .val("")
            .removeAttr("checked")
            .removeAttr("selected");
    },

    /**
     * 将表单数据序列化并转为json格式
     */
    formToJson: function (form) {
        var o = {};
        $(form.serializeArray()).each(function () {
            if (o[this.name]) {
                if ($.isArray(o[this.name])) {
                    o[this.name].push(this.value);
                } else {
                    o[this.name] = [o[this.name], this.value];
                }
            } else {
                o[this.name] = this.value;
            }
        });
        //对只有单name的checkbox和radio明确标著是否有选中
        form.find(":checkbox,:radio").each(function () {
            var el = $("[name='" + this.name + "']", form);
            if (el && el.length == 1) {
                o[this.name] = el.is(":checked") ? true : false;
            }
        });
        return o;
    },

    /**
     * 检查手机号码是否合法
     */
    checkMobile: function (e) {
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
        var form = common.formToJson($("#formsendsms"));
        if (form && common.checkMobile(form.mobile)) {
            $.ajax({
                type: 'post',
                url: common.smsUrl,
                data: form,
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
            common.showError("请输入合法手机号码");
        }
    }
};