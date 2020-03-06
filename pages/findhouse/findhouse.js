import unit from '../network.js'
Page({
    data: {
        houseType: ["请选择","新房","二手房","新房或二手房"],
        houseIndex: 0,
        // 房源类型
        type: '',
        // 楼盘名称
        title: '',
        // 预算
        budget: '',
        // 户型
        huxing: '',
        // 区域
        area: '',
        //  特殊要求
        teshu: '',
        // 姓名
        name: '',
        // 联系方式
        contact: '',
        // 权限
        auth: ''
    },
    // 选择户型
    houseType(even) {
        let index = even.detail.value;
        this.setData({
            houseIndex: index,
            type: this.data.houseType[index]
        })
        console.log(this.data.houseIndex)
    },
    // 监听用户输入的楼盘名称
    title(event) {
        let title = event.detail.value;
        this.setData({
            title
        })
    },
    // 监听用户输入的预算
    budget(event) {
        let budget = event.detail.value;
        this.setData({
            budget
        })
    },
    // 监听用户输入的户型
    huxing(event) {
        let huxing = event.detail.value;
        this.setData({
            huxing
        })
    },
    // 监听用户输入的区域
    area(event) {
        let area = event.detail.value;
        this.setData({
            area
        })
    },
    // 监听用户输入的特殊要求
    teshu(event) {
        let teshu = event.detail.value;
        this.setData({
            teshu
        })
    },
    // 监听用户输入的姓名
    username(even) {
        let name = even.detail.value;
        this.setData({
            name
        })
    },
    // 监听用户输入的电话号码
    telphone(even) {
        let number = even.detail.value;
        this.setData({
            contact: number
        })
    },
    // 点击保存按钮
    save() {
        // 获取房源类型
        let type = this.data.type;
        // 获取楼盘名称
        let title = this.data.title;
        // 获取预算
        let budget = this.data.budget;
        // 获取户型
        let huxing = this.data.huxing;
        // 获取区域
        let area = this.data.area;
        //  获取特殊要求
        let teshu = this.data.teshu;
        // 获取姓名
        let username = this.data.name;
        // 获取联系方式
        let number = this.data.contact;
        // 获取权限
        let auth = this.data.auth;
        let check = /^1[3456789]\d{9}$/;
        if(username == '' && number == '') {
            swan.showModal({
                title: '请输入您的姓名',
                showCancel: false,
            });
        }
        if(username == '' && number != '') {
            swan.showModal({
                title: '请输入您的姓名',
                showCancel: false,
            });            
        }
        if(number == '' && username != '') {
            swan.showModal({
                title: '请输入联系方式',
                 showCancel: false
            });
        }
        if(!check.test(number) && username != '' && number != '') {
            swan.showModal({
                title: '请输入11位有效号码',
                showCancel: false
            });
        }
        if(username != ''&& check.test(number)) {
            unit.findHouse({type: type,title: title,budget: budget,huxing: huxing,area: area,teshu: teshu,name: username,contact: number,auth: auth},(res) => {
                if(res.data.code == 0) {
                    swan.showToast({
                        title: '请先登录',
                        icon: 'none'
                    });
                }
                else if(res.data.code == -1) {
                    swan.showToast({
                        title: '登录过时',
                        icon: 'none'
                    });
                }
                else if(res.data.code == 1) {
                    swan.showToast({
                        title: '提交成功',
                        icon: 'success',
                        success: () => {
                            swan.switchTab({
                                url: '/pages/index/index'
                            });
                        }
                    });
                }
                console.log(res);
            })
        }

    },

















    onLoad: function () {
        // 监听页面加载的生命周期函数
        swan.getStorage({
            key: 'loginAuth',
            success: res => {
                console.log(res.data);
                this.setData({
                    auth: res.data
                })
            }
        });
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