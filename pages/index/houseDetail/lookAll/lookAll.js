import unit from '../../../network.js'
Page({
    data: {
        // 存储请求参数
        id: '',
        index: '',
        res:''
    },
    openShare() {
        swan.openShare({
            title: '智能小程序示例',
            content: '世界很复杂，百度更懂你',
            // path: '/pages/openShare/openShare?key=value',
            imageUrl: 'https://smartprogram.baidu.com/docs/img/logo_new.png',
            success: res => {
                swan.showToast({
                    title: '分享成功'
                });
                console.log('openShare success', res);
            },
            fail: err => {
                console.log('openShare fail', err);
            }
        });
    },






    onLoad: function (option) {
        console.log(option.itemid)
        // 监听页面加载的生命周期函数
        this.setData({
            itemid: option.itemid,
        });
        swan.showToast({
            title: '加载中',
            icon: 'loading'
        });
        unit.getNewDetail(this.data.itemid,res => {
           console.log(res);
            swan.hideToast();
            if(res.statusCode == 200) {
                this.setData({
                    res: res.data.info,
                    // 处理装修类型
                    fitment1: res.data.info.fitment.indexOf(1) != -1,
                    fitment2: res.data.info.fitment.indexOf(2) != -1,
                    fitment3: res.data.info.fitment.indexOf(3) != -1,
                    // 处理物业类型
                    type1: res.data.info.catid.indexOf(1) != -1,
                    type2: res.data.info.catid.indexOf(2) != -1,
                    type3: res.data.info.catid.indexOf(3) != -1,
                    type4: res.data.info.catid.indexOf(4) != -1,
                    type5: res.data.info.catid.indexOf(5) != -1,
                    type6: res.data.info.catid.indexOf(6) != -1,
                    type7: res.data.info.catid.indexOf(7) != -1,
                })
            }
            
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