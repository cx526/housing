import unit from '../network.js'
Page({

    // 页面的初始数据
    data: {
        // 存储从city页面传递过来的id
        id: '',
        // 存储数据
        res: ''
    },

    // 城市选择
    cityChoose() {
        swan.navigateTo({
            url: '/pages/city/city'
        });
    },
    // 搜索楼盘
    findHouses() {
        swan.navigateTo({
            url: '/pages/houses/houses'
        });
    },
    // 跳转到house页面
    newHouse() {
        swan.navigateTo({
            url: '/pages/houses/houses'
        });
    },
    // 跳转到houseVideo页面
    houseVideo() {
        swan.navigateTo({
            url: '/pages/houseVideo/houseVideo'
        });
    },
    // 跳转到findhouse页面
    findhouse() {
        swan.navigateTo({
            url: '/pages/findhouse/findhouse'
        });
    },
    // 跳转到hot
    hot() {
        swan.navigateTo({
            url: '/pages/hot/hot'
        });
    },

    // 跳转到推荐楼盘详情(houseDetail)页面
    houseDetail(even) {
        let index = even.currentTarget.dataset.index;
        let itemid = this.data.res.newhouse[index].itemid;
        swan.navigateTo({
            url: '/pages/index/houseDetail/houseDetail?itemid=' + itemid
        });
    },

    // 页面的生命周期函数 – 监听页面加载
    onLoad(res) {
        swan.showToast({
            title: '加载中',
            icon: 'loading'
        });
        swan.getStorage({
            key: 'id',
            success: res => {
                swan.hideToast();
                // 默认第一次进来请求的是'海口市'数据;以后每次进入页面读取本地储存的id再请求
                this.setData({
                    id: res.data || 1
                });
                unit.getIndex(this.data.id, (res) => {
                    this.setData({
                        res: res.data
                    })
                    // 存储电话咨询号码到本地
                    swan.setStorage({
                        key: 'telephoneRefer',
                        data: res.data.newhouse[0].telephone
                    });

                })

            }
        }); 


    },

    // 页面的生命周期函数 – 监听页面初次渲染完成
    onReady(res) {

    },

    // 页面的生命周期函数 – 监听页面显示
    onShow(res) {



    },

    // 页面的生命周期函数 – 监听页面隐藏
    onHide(res) {

    },

    // 页面的生命周期函数 – 监听页面卸载
    onUnload(res) {

    },

    // 页面的生命周期函数 – 监听页面重启，单击重启按钮时触发
    onForceReLaunch(res) {

    },

    // 页面的事件处理函数 – 监听用户下拉动作
    onPullDownRefresh(res) {

    },

    // 页面的事件处理函数 – 上拉触底事件的处理函数
    onReachBottom(res) {
        // swan.showLoading({
        //     title: '加载中'
        // });
    },

    // 页面的事件处理函数 – 用户点击右上角转发
    onShareAppMessage(res) {

    },

    // 页面的事件处理函数 – 页面滚动触发事件的处理函数
    onPageScroll(res) {

    },

    // 页面的事件处理函数 – 当前是 tab 页时，点击 tab 时触发
    onTabItemTap(res) {

    }
});