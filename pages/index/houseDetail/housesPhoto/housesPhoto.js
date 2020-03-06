import unit from '../../../network.js'
Page({
    data: {
        // nav导航栏数据
        navList:["实景图(4)","区位图(4)","效果图(4)","样板间(4)","配套图(4)"],
        currentIndex:0,
        // 默认进来为实景图
        catid: 26,
        // 储存页面所有的类型图
        photo: '',
        // 图片展示模拟数据
        imgUrl: '',
        pictureIndex: 0
    },
    // 实现导航栏的切换添加样式
    navToggle(even) {
        let currentIndex = even.currentTarget.dataset.idx;
        let catid = even.currentTarget.dataset.catid;
        this.setData({
            currentIndex,
            catid
        });

    },
    // 实景图实现照片的预览;
    previewImg(even) {
        let arr = [];
        let pictureIndex = even.currentTarget.dataset.idx;
        for(let i = 0;i < this.data.photo[this.data.catid].length;i++) {
            arr.push(this.data.photo[this.data.catid][i].thumb)
        }
        this.setData({
            imgUrl: arr
        })
        swan.previewImage({
            urls: this.data.imgUrl,
            current:this.data.imgUrl[pictureIndex]
        });
    },

    onLoad: function (option) {
        this.setData({
            itemid: option.itemid
        })
        unit.getAllPhoto(this.data.itemid,res => {
            console.log(res);
            this.setData({
                photo: res.data
            })
            console.log(res.data[this.data.catid]);
        })
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