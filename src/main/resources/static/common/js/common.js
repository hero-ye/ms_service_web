var common = {

    /**
     * 根据类型获取树
     */
    treeListUrl: "http://127.0.0.1:7011/ms/service/tree/getTreeCodeInfo",

    /**
     * 发送短信的接口
     */
    smsUrl: "http://127.0.0.1:7012/ms/sms/sendsms/sendValidCode",

    /**
     * 获取所有菜单的接口
     */
    menuUrl: "http://127.0.0.1:7013/ms/system/menu/findAll",

    /**
     * 页面跳转
     * @param pageName
     */
    jumpPage: function (url) {
        window.location.href = url;
    },

    /**
     * 功能说明：得到应用路径
     * @method holly.getPath
     * @param { string } url 参数可选。默认为当前网页
     * @return{ string } appPath 应用的URL路径
     */
    getPath: function (url) {
        var path = (url || self.location.href).replace("//", "@@").split("/");
        return path[0].replace("@@", "//");
    },

    /**
     * 获取树List
     */
    getTreeList: function () {
        var permissionList;
        $.ajax({
            type: 'get',
            url: common.treeListUrl,
            data: "",
            async: false,
            success: function (e) {
                if (e.success) {
                    permissionList = data.data;
                } else {
                    common.showError(e.msg);
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
     * 点击标签激活
     */
    active: function (el) {
        $(el).addClass('active');
        $(el).siblings().removeClass('active');
    },

    /**
     * 获取所有菜单
     */
    getMenuList: function (obj) {
        $.ajax({
            type: 'get',
            url: common.menuUrl,
            dataType: "json",
            async: false,
            success: function (e) {
                if (e.success) {
                    var html = "";
                    var data = e.data;
                    $.each(data, function (key, value) {
                        html += "<li>";
                        if (value.url) {
                            html += "<button class=\"fourWordsButton indexbutton\" onclick=\"common.jumpPage('" + value.url + "')\">" + value.menuName + "</button>";
                        } else {
                            html += "<button class=\"fourWordsButton indexbutton\" onclick=\"$('#dlg-sendsms').dialog('open')\">" + value.menuName + "</button>";
                        }
                        html += "</li>";
                    });
                    obj.html(html);
                }
            }
        });
    },

    /**
     * 获取导航栏所有菜单
     */
    getNavMenu: function (obj) {
        $.ajax({
            type: 'get',
            url: common.menuUrl,
            dataType: "json",
            async: false,
            success: function (e) {
                if (e.success) {
                    var html = "";
                    var data = e.data;
                    $.each(data, function (key, value) {
                        var id = value.menuKey + "_" + value.menuId;
                        html += "<li>";
                        if (value.parentId == "ROOT") {
                            html += "<span class=\"navMenuSpan fourWordsSpan active\" id=\"" + id + "\" onclick=\"common.jumpPage('" + value.url + "')\">" + value.menuName + "</span>";
                        } else if (value.url) {
                            html += "<span class=\"navMenuSpan fourWordsSpan\" id=\"" + id + "\" onclick=\"common.jumpPage('" + value.url + "')\">" + value.menuName + "</span>";
                        } else {
                            html += "<span class=\"navMenuSpan fourWordsSpan\" id=\"" + id + "\" onclick=\"$('#dlg-sendsms').dialog('open')\">" + value.menuName + "</span>";
                        }
                        html += "</li>";
                    });
                    obj.html(html);
                }
            }
        });
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
    sendsms: function (obj) {
        var form = common.formToJson(obj);
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