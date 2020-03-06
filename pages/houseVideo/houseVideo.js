Page({
    data: {
        cur: 0,
        // 视频路径
        videoSrc:["https://vd3.bdstatic.com/mda-ib0u8x1bvaf00qa8/mda-ib0u8x1bvaf00qa8.mp4?playlist=%5B%22hd%22%2C%22sc%22%5D","https://b.bdstatic.com/swan-temp/940fe716b0eaad38f47b209d61657490.mp4","https://vd3.bdstatic.com/mda-ib0u8x1bvaf00qa8/mda-ib0u8x1bvaf00qa8.mp4?playlist=%5B%22hd%22%2C%22sc%22%5D"],
        // 视频封面
        poster: ['http://www.wanningw.com/images/20190119/xtrly2zclpj2251.jpg','http://www.wanningw.com/images/20190119/iauasvcdrds2370.jpg','http://www.wanningw.com/images/20190119/d3bitxt3ys32374.jpg']
    },
    // 改变路径
    changeSrc() {
        let cur = this.data.cur;
        let len = this.data.videoSrc.length;
        cur = (cur + 1) % len;
        this.setData({
            cur
        })
    },
    //在线咨询
    online() {
        swan.switchTab({
            url: '/pages/message/message'
        });
    }, 
    // 电话咨询
    call() {
        swan.makePhoneCall({
            phoneNumber: this.data.telephoneRefer
        });
    },


    onLoad: function () {
        // 监听页面加载的生命周期函数
        const videoContext = swan.createVideoContext('myVideo');
        this.videoContext = videoContext;
        // 获取电话咨询号码
        swan.getStorage({
            key: 'telephoneRefer',
            success: res => {
                this.setData({
                    telephoneRefer: res.data
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