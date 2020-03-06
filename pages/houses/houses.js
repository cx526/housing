import unit from '../network.js'
Page({
    data: {
        // 区域
        areaArr: ["区域","上海","广州","深圳","北京"],
        areaIndex: 0,
        // 价格
        priceArr: ["价格","8000元/m²以下","8000元-1万/m²","1万-1.5万/m²","2万以上/m²"],
        choosePrice: ["0","-8000","8000-10000","10000-15000","20000-"],
        priceIndex: 0,
        // 开发商
        developersArr: ["开发商","万科","恒大","碧桂园","鲁能","融创","绿地", "保利","富力","雅居乐","中海","海航","中信","衍宏","广物","中铁","111"],
        developersIndex: 0,
        // 特点
        moreArr: ["特点","小户型","公园地产","学区房","旅游地产","投资地产","海景地产","经济住宅","宜居生态地产"],
        moreIndex: 0,
        page: 1,
        updataPage: 2,
        flag: false
    },
    // 搜索输入框
    searchHouse(event) {
        // 读取用户实时输入的值
        let text = event.detail.value;
        unit.getSearchData(text,(res) => {
            if(res.statusCode == 200) {
                let search = res.data.list;
                this.setData({
                    res: search
                })
            }
        })

    },
    // 区域
    cityChoose() {
        // swan.navigateTo({
        //     url: '/pages/city/city'
        // });
    },
    // 价格
    priceChange(even) {
        let index = even.detail.value;
        // 获取要发送请求参数的price
        let choosePrice = this.data.choosePrice[index]
        this.setData({
            priceIndex: index
        })
        unit.getNewPrice(choosePrice,(res) => {
            if(res.statusCode == 200) {
                console.log(res);
                let search = res.data.list;
                this.setData({
                    res:search
                })
            }
            
        })
    },
    // 开发商
    developersChange(even) {
        let index = even.detail.value;
        let developers = this.data.developersArr[index];
        this.setData({
            developersIndex: index
        })
        unit.getNewDevelopers(developers,res => {
            console.log(res);
            if(res.statusCode == 200) {
                let search = res.data.list;
                this.setData({
                    res: search
                })
            }
        })
    },
    // 特点
    moreChange(even) {
        let index = even.detail.value;
        let chooseFeature= this.data.moreArr[index];
        console.log(chooseFeature)
        if(chooseFeature == '特点') {
            unit.getAllFeature(res => {
                if(res.statusCode == 200) {
                    this.setData({
                        res: res.data.list
                    })
                }
            })
        }
        else {
            unit.getNewFeature(chooseFeature,res => {
                if(res.statusCode == 200) {
                    this.setData({
                        res: res.data.list
                    })
                }
            })
        }

        this.setData({
            moreIndex: index
        })
    },
    // 点击跳转到楼盘详情页面
    jumpDetail(event) {
        let index = event.currentTarget.dataset.idx;
        let itemid = this.data.res[index].itemid;
        swan.navigateTo({
            url: '/pages/index/houseDetail/houseDetail?itemid='+ itemid
        });
    },











    onLoad: function () {
        // 监听页面加载的生命周期函数
        // 读取数据
        unit.getNewHouse(this.data.page,res => {
            console.log(res);
            if(res.statusCode == 200) {
                this.setData({
                    res: res.data.list
                })
            }  
        })
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
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
        // /加载时显示加载提示框
        swan.showToast({
            title: '数据加载中',
            icon: 'loading'
        });
        unit.getMessageContext(this.data.updataPage, res => {
            // 返回数据时关闭加载提示框
            swan.hideToast();
            // 同时页面的updataPage默认自加一
            this.setData({
                updataPage: this.data.updataPage + 1
            })
            // 没有数据时显示提示
            if(res.data.length <= 5) {
                this.setData({
                    flag: !this.data.flag
                })
            }
            for (let i = 0; i < res.data.length; i++) {
                this.data.res.push(res.data[i])
            }
            // 同步上拉加载更多的数据
            this.setData({
                res: this.data.res,
            })
        })
        
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});