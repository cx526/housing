import unit from '../../../network.js'
Page({
    data: {
        // 模拟导航栏的数据
        navList: ["一居(0)", "两居(2)", "三居(0)", "四居(2)", "五居(3)", "其他(0)", "别墅(1)"],
        // 控制tab栏的切换
        currentIndex: 0,
        imgUrl: ''

    },

    // tab切换
    tabChoose(even) {
        let index = even.currentTarget.dataset.idx;
        this.setData({
            currentIndex: index
        })
    },
    // 图像预览
    previewImg() {
        let arr = [];
        let index = this.data.currentIndex
        if(index == 0) {
            for(let i = 0;i < this.data.oneHouse.length;i++) {
                arr.push(this.data.oneHouse[i].thumb)
            }
            this.setData({
                imgUrl: arr
            })
        }
        else if(index == 1) {
            for(let i = 0;i < this.data.twoHouse.length;i++) {
                arr.push(this.data.twoHouse[i].thumb)
            }
            this.setData({
                imgUrl: arr
            })  
        }
        else if(index == 2) {
            for(let i = 0;i < this.data.threeHouse.length;i++) {
                arr.push(this.data.threeHouse[i].thumb)
            }
            this.setData({
                imgUrl: arr
            })  
        }
        else if(index == 3) {
            for(let i = 0;i < this.data.fourHouse.length;i++) {
                arr.push(this.data.fourHouse[i].thumb)
            }
            this.setData({
                imgUrl: arr
            })  
        }
        else if(index == 4) {
            for(let i = 0;i < this.data.fiveHouse.length;i++) {
                arr.push(this.data.fiveHouse[i].thumb)
            }
            this.setData({
                imgUrl: arr
            })  
        }
        else if(index == 5) {
            for(let i = 0;i < this.data.otherHouse.length;i++) {
                arr.push(this.data.otherHouse[i].thumb)
            }
            this.setData({
                imgUrl: arr
            })  
        }
        else if(index == 6) {
            for(let i = 0;i < this.data.spcialHouse.length;i++) {
                arr.push(this.data.spcialHouse[i].thumb)
            }
            this.setData({
                imgUrl: arr
            })  
        }
        let imgUrl = this.data.imgUrl;
        let list = [];
        for (var i = 0; i < imgUrl.length; i++) {
            list.unshift(imgUrl[i]);
        }
        swan.previewImage({
            urls: list
        });
    },





















    onLoad: function (option) {
        // 监听页面加载的生命周期函数
        let itemid = option.itemid;
        unit.getNewDetail(itemid, (res) => {
            console.log(res);
            // 处理居数
            let houseType = [];
            for (let i = 0; i < res.data.huxing.length; i++) {
                houseType.push(res.data.huxing[i])
            }
            // 根据返回的jushu参数确定是几居
            let [oneHouse, twoHouse, threeHouse, fourHouse, fiveHouse, otherHouse, spcialHouse] = [[], [], [], [], [], [], []];
            for (let j = 0; j < houseType.length; j++) {
                let houseNumber = houseType[j].jushu;
                if (houseNumber == 1) {
                    oneHouse.push(houseType[j]);
                }
                else if (houseNumber == 2) {
                    twoHouse.push(houseType[j]);
                }
                else if (houseNumber == 3) {
                    threeHouse.push(houseType[j]);
                }
                else if (houseNumber == 4) {
                    fourHouse.push(houseType[j]);
                }
                else if (houseNumber == 5) {
                    fiveHouse.push(houseType[j]);
                }
                else if (houseNumber == 0) {
                    otherHouse.push(houseType[j]);
                }
                else if (houseNumber == 8) {
                    spcialHouse.push(houseType[j]);
                }
            }
            this.setData({
                oneHouse,
                twoHouse,
                threeHouse,
                fourHouse,
                fiveHouse,
                otherHouse,
                spcialHouse,
                res: res.data.info
            })
            // 处理户型图片
            let houseTypeImg = [];
            for (let z = 0; z < res.data.huxing.length; z++) {
                houseTypeImg.push(res.data.huxing[z].thumb)
            }
            this.setData({
                imgUrl: houseTypeImg
            })
            // console.log(this.data.oneHouse);
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