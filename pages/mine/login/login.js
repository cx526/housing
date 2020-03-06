import unit from '../../network.js'
Page({
    data: {

    },

    // 监听用户输入的用户名
    username(event) {
        let username = event.detail.value;
        this.setData({
            username
        })
    },
    // 监听用户输入的密码
    password(event) {
        let password = event.detail.value;
        this.setData({
            password
        })
    },

    // 点击登录按钮
    login() {
        let username = this.data.username;
        let password = this.data.password;
        unit.login({username:username,password:password}, res => {
            console.log(res.data.data.auth);
            // res.data.data.auth
            if(res.data.code == 1) {
                // 存储登录成功是接口返回的auth
                swan.setStorage({
                    key: 'loginAuth',
                    data: res.data.data.auth
                });
                // 存储登录成功时的用户名作为昵称
                swan.setStorage({
                    key: 'username',
                    data: username
                });
                swan.showToast({
                    title: '登录成功',
                    icon: "suceess",
                    success:res => {
                        setTimeout(() => {
                            swan.switchTab({
                                url: '/pages/mine/mine'
                            });
                        }, 1500);
                    }
                });
            }
            else if(res.data.code == 0) {
                let msg = res.data.msg;
                swan.showToast({
                    title: msg,
                    icon:'none'
                });
            }
        })
    },


    // 跳转到注册页面
    goRegister() {
        swan.navigateTo({
            url: '/pages/mine/register/register'
        });
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