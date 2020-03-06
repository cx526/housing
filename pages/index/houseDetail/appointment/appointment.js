Page({
    data: {
        // 用来确定看房时间
        currentIndex: null,
        // 存储用户姓名
        username:null,
        // 存储用户姓名
        telphone:null
    },
    // 选择看房时间
    chooseTime(even) {
        let index = even.currentTarget.dataset.idx;
        this.setData({
            currentIndex:index
        })
    },
    // 日期选择表
    dateChoose(even) {
        console.log(even)
    },
    // 获取用户名称
    uesrName(even) {
        let username = even.detail.value;
        // let usernameTest = [\u4e00-\u9fa5]
        this.setData({
            username
        })
    },
    // 获取用户手机号
    telPhone(even) {
        let telphone = even.detail.value;
        // let usernameTest = [\u4e00-\u9fa5]
        this.setData({
            telphone
        })
    },
    // 确定预约
    sureAppointment() {
        let username = this.data.username;
        let telphone = this.data.telphone;
        let verify = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if (username == null) {
            swan.showModal({
                // 提示的标题
                title: '请填写姓名',
                // 是否显示取消按钮 。
                showCancel: false,
                // 确定按钮的文字，最多 4 个字符。
                confirmText: '确定',
                // 确定按钮的文字颜色。
                confirmColor: 'blue'
            });
        }
        if(username != null && telphone == null) {
            swan.showModal({
                // 提示的标题
                title: '请输入联系方式',
                // 是否显示取消按钮 。
                showCancel: false,
                // 确定按钮的文字，最多 4 个字符。
                confirmText: '确定',
                // 确定按钮的文字颜色。
                confirmColor: 'blue'
            });     
        }
        if(username != null && telphone != null && !verify.test(telphone)) {
            swan.showModal({
                // 提示的标题
                title: '请输入11位有效号码',
                // 是否显示取消按钮 。
                showCancel: false,
                // 确定按钮的文字，最多 4 个字符。
                confirmText: '确定',
                // 确定按钮的文字颜色。
                confirmColor: 'blue'
            });            
        }
        if(username != null && telphone != null && verify.test(telphone)) {
            swan.showModal({
                // 提示的标题
                title: '提交成功',
                // 是否显示取消按钮 。
                showCancel: false,
                // 确定按钮的文字，最多 4 个字符。
                confirmText: '确定',
                // 确定按钮的文字颜色。
                confirmColor: 'blue',
                success() {
                    swan.navigateTo({
                        url: '/pages/index/houseDetail/houseDetail'
                    });
                }              
            })
        }

    },









    onLoad: function () {
        // 监听页面加载的生命周期函数
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
    },
    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});