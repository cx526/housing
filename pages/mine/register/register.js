import unit from '../../network.js'
Page({
    data: {
        // 存储用户的电话号码
        number: '',
        // 存储验证码
        code: '',
        // 计算
        count: '60',
        codeShow: true,
        gain: false,
        again: false
    },
    // 监听用户输入的用户名
    username(event) {
        let username = event.detail.value;
        this.setData({
            username
        })
    },
    // 监听用户输入的电话号码
    telphone(even) {
        let number = even.detail.value;
        this.setData({
            number
        });
        // let telVerify = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        // if(number != '' && telVerify.test(number)) {
        //     // 把号码作为本次储存储存进去作为判断用户是否已经登录过
        //     swan.setStorage({
        //         key: 'telphone',
        //         data: number
        //     });
        // }

    },
    // 监听用户输入的密码
    password(event) {
        let password = event.detail.value;
        this.setData({
            password
        })
    },







    // 提交按钮
    putIn() {
        // 获取用户名
        let username = this.data.username;
        // 获取号码
        let number = this.data.number;
        // 获取密码
        let password = this.data.password;
        if (username == '') {
            swan.showModal({
                title: '用户名不能为空',
                showCancel: false
            });
        }
        // 11位电话号码验证
        let telVerify = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if (number == '') {
            swan.showModal({
                title: '手机号码不能为空',
                showCancel: false
            })
        }
        if (number != '' && !telVerify.test(number)) {
            swan.showModal({
                title: '请输入正确的手机号码',
                showCancel: false
            })
        }
        if (password == '') {
            swan.showModal({
                title: '密码不能为空',
                showCancel: false
            });
        }


        // 手机号跟验证码都验证成功则跳转到index页面
        if (number != '' && telVerify.test(number) && username != '' && password != '') {
            unit.register({ username: username, number: number, password: password }, res => {
                console.log(res.data.data.auth);
                if (res.data.code == 1) {
                    //   同时将该号码的授权码储存到本地
                    swan.setStorage({
                        key: 'auth',
                        data: res.data.data.auth
                    });
                    swan.showToast({
                        title: '注册成功',
                        icon: 'success',
                        // 注册成功1.5s后去到登录页
                        success: res => {
                            setTimeout(() => {
                                swan.switchTab({
                                    url: '/pages/mine/mine'
                                });
                            }, 1500);
                        }
                    });

                }
                else if (res.data.code == 0) {
                    let msg = res.data.msg;
                    swan.showToast({
                        title: msg,
                        icon: 'none',
                    });
                }
            })



        }
    },















    onLoad: function () {
        // 监听页面加载的生命周期函数

    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {
        // 监听页面显示的生命周期函数
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