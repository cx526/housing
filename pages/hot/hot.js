import unit from '../network.js'
Page({
    data: {
        flag: false,
        // 存储资讯分类
        navList: [],
        currentIndex: 0,
        // 搜索框内容;
        title: '',
        // 存储资讯列表
        navContext: [],
        catid: 28,
        // 默认请求的页数
        page: 1,
        // 上拉加载更多
        updataPage: 2
    },
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
    // 搜索框
    houseSearch(event) {
        let title = event.detail.value;
        let catid = this.data.catid;
        this.setData({
            title
        })
        unit.getMessageSearch(catid,title,res => {
            let navContext = [];
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].addtime = this.dataFormate((res.data[i].addtime) * 1000);
                navContext.push(res.data[i])
            }
            this.setData({
                navContext
            })
        })

    },
    // 导航栏
    navChoose(even) {
        swan.pageScrollTo({
            scrollTop: 0,
            duration: 300,

        });
        swan.showToast({
            title: '数据加载中',
            icon: 'loading'
        });
        let currentIndex = even.currentTarget.dataset.idx;
        let catid = even.currentTarget.dataset.catid;
        let page = 1
        this.setData({
            currentIndex,
            catid,
            page,
            flag: false
        })
        unit.getMessageContext(catid, page, res => {
            swan.hideToast();
            let navContext = [];
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].addtime = this.dataFormate((res.data[i].addtime) * 1000);
                navContext.push(res.data[i])
            }
            this.setData({
                navContext
            })
      
        })
    },
    // 点击列表跳转到listcontex页面
    listcontext(event) {
        let itemid = event.currentTarget.dataset.itemid;
        let catid = this.data.catid;
        swan.navigateTo({
            url: '/pages/hot/listcontext/listcontext?itemid='+itemid+'&catid='+catid
        });
    },
    // 在线咨询
    onlineRefer() {
        console.log("123")
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
        // 获取在线电话咨询号码
        swan.getStorage({
            key: 'telephoneRefer',
            success: res => {
                this.setData({
                    telephoneRefer: res.data
                })
            }
        });
        // 监听页面加载的生命周期函数
        // 获取资讯分类
        swan.showToast({
            title: '数据加载中',
            icon: 'loading'
        });
        unit.getMessage(res => {
            swan.hideToast();
            let navList = res.data;
            this.setData({
                navList
            })
        });
        // 初始化页面是默认请求本地楼市第一页代码
        unit.getMessageList(this.data.catid, this.data.page, res => {
            let navContext = [];
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].addtime = this.dataFormate((res.data[i].addtime) * 1000);
                navContext.push(res.data[i])
            }
            this.setData({
                navContext
            })

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
        // 如果搜索框有内容,不启动上啦加载更多功能
        if(this.data.title != '') {
            return 
        }
        // /加载时显示加载提示框
        swan.showToast({
            title: '数据加载中',
            icon: 'loading'
        });
        unit.getMessageList(this.data.catid, this.data.updataPage, res => {
            // 没有数据时显示提示
            if(res.data == '') {
               this.setData({
                   flag: !this.data.flag
               }) 
            }
            // 返回数据时关闭加载提示框
            swan.hideToast();
            // 同时页面的updataPage默认自加一
            this.setData({
                updataPage: this.data.updataPage + 1
            })
            // 处理数据返回的时间戳
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].addtime = this.dataFormate((res.data[i].addtime) * 1000);
                this.data.navContext.push(res.data[i])
            }
            // 同步上拉加载更多的数据
            this.setData({
                navContext: this.data.navContext,
            })
        })
        
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});