import unit from '../../../network.js'
Page({
    data: {
        // 控制评论输入框显示还是隐藏
        inputShow: false,
        // 关注图标
        index: true,
        // 默认请求评论的页数
        page: 1,
        // 控制按钮是否可以点击
        flag: false,
        btnText: "点击加载更多"
    },
    // 点击跳转到houseDetai页面
    houseDetai() {
        swan.navigateTo({
            url: '/pages/index/houseDetail/houseDetail?itemid='+this.data.itemid
        });
    },
    // 点击回复按钮调出评论输入框
        // replay() {
        //     this.setData({
        //         inputShow: !this.data.inputShow
        //     })
        // },

    // 点击评论调出评论输入框
        // inputShow() {
        //     this.setData({
        //         inputShow: !this.data.inputShow
        //     })
        // },
    // 点击提交按钮时同时隐藏输入框
        // commit() {
        //     this.setData({
        //         inputShow: !this.data.inputShow
        //     })
        // },
    // 输入框失去焦点时隐藏输入框
        // inputHidden() {
        //     this.setData({
        //         inputShow: !this.data.inputShow
        //     })
        // },
    // 点击转发
        // openShare() {
        //     swan.openShare({
        //         title: '智能小程序示例',
        //         content: '世界很复杂，百度更懂你',
        //         imageUrl: 'https://smartprogram.baidu.com/docs/img/logo_new.png',
        //         success: res => {
        //             swan.showToast({
        //                 title: '分享成功'
        //             });
        //         },
        //         fail: err => {
        //             console.log('openShare fail', err);
        //         }
        //     });
        // },
    // 点击关注
        // attention() {
        //     this.setData({
        //         index: !this.data.index
        //     })
        // },
    // 格式化时间
        dataFormate(time) {
            var time = new Date(time);
            var year = this.complement(time.getFullYear());
            var month = this.complement(time.getMonth() + 1);
            var day = this.complement(time.getDate());
            return year + '-' + month + '-' + day
        },
        complement(value) {
            return value > 10 ? value : "0" + value
        },
    // 点击按钮加载更多评论数据
    loadingMore() {
        // 显示数据加载提示框
        swan.showToast({
            title: '数据加载中',
            icon: "loading"
        });
        // page自加一同时按钮变为true
        this.setData({
            page: this.data.page + 1,
            flag: !this.data.flag
        })
        unit.getAllComment(this.data.itemid,this.data.page,(res) => {
            if(res.data.length < 5) {
                this.setData({
                    flag: !this.data.flag,
                    btnText: "暂无更多数据"
                })
            }
            // 隐藏提示框
            swan.hideToast()
            let arr = this.data.comment;
            console.log(res);
            // 处理返回的时间戳
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].addtime = this.dataFormate((res.data[i].addtime) * 1000);
                arr.push(res.data[i])
            }            
            this.setData({
                flag: !this.data.flag,
                comment: arr
            })
        })

    },










    onLoad: function (option) {
        // 监听页面加载的生命周期函数
        this.setData({
            itemid: option.itemid
        });
        // 获取主题栏数据
        unit.getNewDetail(this.data.itemid,(res)=> {
            this.setData({
                res
            })
            if(res.data.comment == '') {
                this.setData({
                    flag: true,
                    btnText: "暂无该房评论"
                })
            }
        })
        // 获取评论数据,默认加载第一页\
        unit.getAllComment(this.data.itemid,this.data.page,(res) => {
            // 处理返回的时间戳
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].addtime = this.dataFormate((res.data[i].addtime) * 1000);
            }
            this.setData({
                comment: res.data
            });
            console.log(this.data.comment)
        })

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