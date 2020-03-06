Page({
    data: {
        telphone: false,
        // 获取本地存储的username;默认为游客
        username: '',
        flag: true
    },
 
    // 点击去到register页面
    register() {
        swan.navigateTo({
            url: '/pages/mine/register/register'
        });
    },
    // 点击跳转到login页面
    login() {
        swan.navigateTo({
            url: '/pages/mine/login/login'
        });
    },

    // 点击跳转到attentionHouse页面
    attentionHouse() {
        swan.showToast({
            title: '开发中',
            icon: 'none'
        });
        // swan.navigateTo({
        //     url: '/pages/mine/attentionHouse/attentionHouse'
        // });
    },
    // 点击跳转到contactUs页面
    contactUs() {
        swan.navigateTo({
            url: '/pages/mine/contactUs/contactUs'
        });
    },
    // 点击注销登录时清除本地缓存的loginAuth
    cancel() {
        swan.removeStorage({
            key: 'loginAuth',
            success: res => {
                swan.showToast({
                    title: '成功退出'
                });
                this.setData({
                    loginAuth: ''
                })
            }
        });
    },














    onLoad: function () {
        // 监听页面加载的生命周期函数

    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {
        // 监听页面显示的生命周期函数
        // 读取登录成功时该号码的授权码(auth)
        swan.getStorage({
            key: 'loginAuth',
            success: res => {
                console.log(res.data);
                this.setData({
                    loginAuth: res.data
                })
            }
        });
        // 读取登录成功时的用户名
        swan.getStorage({
            key: 'username',
            success: res => {
                console.log(res.data)
                this.setData({
                    username: res.data
                })
            }
        });
        // 读取注册成功时该号码的授权码(auth)
        swan.getStorage({
            key: 'auth',
            success: res => {
                console.log(res.data);
            }
        });

        
    },
    onHide: function () {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function () {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function () {
        // 监听用户下拉动作
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});