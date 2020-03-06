import unit from '../../network.js'
Page({
    data: {
        // 实际数据
        // 用于请求数据
        id: '',
        index: '',
        res: '',
        // 户型图
        houseTypeArr: '',
        // MAP
        title: 'openLocation',
        loading: false,
        latitude: 40.04,
        longitude: 116.27,
        scale: 18,
        name: '百度科技园',
        address: '北京市海淀区西北旺东路10号院',
        enableScroll: false,
        currentIndex: '',
        // 点击显示或隐藏留言条内容
        showAll: true,
        // 控制开盘通知弹窗的状态;
        opening: false,
        // 保存用户在开盘通知输入的号码
        telNumber: null,
        // 控制变价通知弹窗的状态
        changePrice: false,
        // 保存用户在变价通知输入的号码
        phoneNumber: null,
        // 评论框内容
        commentContext: '',
    },
    // 点击跳转到housesPhoto页面
    housesPhoto() {
        swan.navigateTo({
            url: '/pages/index/houseDetail/housesPhoto/housesPhoto?itemid='+this.data.itemid
        });
    },
    // 点击查看全部按钮跳转到lookAll页面
    lookAll() {
        swan.navigateTo({
            url: '/pages/index/houseDetail/lookAll/lookAll?itemid=' + this.data.itemid
        });
    },

    // 点击主力户型查看更多跳转到户型图(housePlan)页面
    housePlan() {
        let itemid = this.data.res.itemid;
        swan.navigateTo({
            url: '/pages/index/houseDetail/housePlan/housePlan?itemid=' + itemid
        });
    },
    // 点击动态评论查看更多跳转到动态(dynamicMore)页面
    dynamicMore() {
        swan.navigateTo({
            url: '/pages/index/houseDetail/dynamicMore/dynamicMore'
        });
    },
    // 图片预览
    clickMain(even) {
        let index = even.currentTarget.dataset.idx;
        swan.previewImage({
            current: this.data.houseTypeArr[index],// current需与urls中链接一致
            urls: this.data.houseTypeArr,
        });
    },

    // 控制评论内容显示全文或者隐藏
    showAll(even) {
        let currentIndex = even.currentTarget.dataset.idx;
        let arr = 'comment[' + currentIndex + '].isShow';
        this.setData({
            [arr]: !this.data.comment[currentIndex].isShow
        })
    },

    // 点击评论查看更多跳转到commonMore页面
    commonMore() {
        swan.navigateTo({
            url: '/pages/index/houseDetail/commonMore/commonMore?itemid='+this.data.itemid
        });
    },
    // Map
    openLocation() {
        let locationInfo = this.data.locationInfo;
        swan.openLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            scale: 18,
            name: this.data.name,
            address: this.data.address,
            success: res => {
                console.log('success', res);
            },
            fail: function (err) {
                swan.showToast({
                    title: '检查位置权限',
                    icon: 'none'
                })
                console.log('fail msg', err);
            }
        });
    },
    // 在线咨询
    online() {
        swan.switchTab({
            url: '/pages/message/message'
        });
    },
    // 电话咨询
    call() {
        swan.makePhoneCall({
            phoneNumber: this.data.res.telephone
        });
    },
    // 显示开盘通知弹窗;
        // openingShow() {
        //     let status = !this.data.opening;
        //     this.setData({
        //         opening: status
        //     })
        // },
    // 点击遮罩层关闭开盘通知弹窗
        // closeOpening() {
        //     let status = !this.data.opening;
        //     this.setData({
        //         opening: status
        //     })
        // },
    // 监听用户在开盘通知弹窗输入的号码
        // userPhone(even) {
        //     let number = even.detail.value;
        //     this.setData({
        //         telNumber: number
        //     })
        // },
    // 点击确定
        // subscription() {
        //     let number = this.data.telNumber;
        //     let verify = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        //     if (verify.test(number)) {
        //         swan.showToast({
        //             title: '提交成功',
        //             duration: 1000
        //         });
        //         let status = !this.data.opening;
        //         setTimeout(() => {
        //             this.setData({
        //                 opening: status
        //             })
        //         }, 1000);

        //     }
        //     else {
        //         swan.showToast({
        //             title: '请填写正确号码',
        //             icon: 'none',
        //             duration: 1000
        //         });
        //     }
        // },

    // 显示变价通知弹窗;
        // changePriceShow() {
        //     console.log("ok");
        //     let status = !this.data.changePrice;
        //     this.setData({
        //         changePrice: status
        //     })
        // },
    // 点击遮罩层关闭变价通知弹窗
        // closeChangePrice() {
        //     let status = !this.data.changePrice;
        //     this.setData({
        //         changePrice: status
        //     })
        // },
    // 监听用户在变价通知弹窗输入的号码
        // userTel(even) {
        //     let number = even.detail.value;
        //     this.setData({
        //         phoneNumber: number
        //     })
        // },
    // 点击确定
        // changePriceNotice() {
        //     let number = this.data.phoneNumber;
        //     let verify = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        //     if (verify.test(number)) {
        //         swan.showToast({
        //             title: '提交成功',
        //             duration: 1000
        //         });
        //         let status = !this.data.changePrice;
        //         setTimeout(() => {
        //             this.setData({
        //                 changePrice: status
        //             })
        //         }, 1000);

        //     }
        //     else {
        //         swan.showToast({
        //             title: '请填写正确号码',
        //             icon: 'none',
        //             duration: 1000
        //         });
        //     }
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
    // 获取评论内容
    commentContext(event) {
        this.setData({
            commentContext: event.detail.value
        })
    },
    // 发送评论
    sendComment() {
        let commentContext = this.data.commentContext;
        let auth = this.data.loginAuth;
        let itemid = this.data.itemid;
        // 如果输入框的内容为空则不发送提交评论
        if(commentContext == '') {
            swan.showToast({
                title: '请输入评论内容',
                icon: "none"
            });
        }
        else {
            // 提示评论成功
            swan.showToast({
                title: '提交成功',
                icon: "success",
            });
            unit.sendComment({commentContext,auth,itemid},res => {
                if(res.data.code == 1) {
                    let itemid = this.data.itemid;
                    let page = 1
                    // 刷新评论
                    unit.getAllComment(itemid,page,(res) => {
                        // 处理返回的时间戳
                        for(let i = 0;i < res.data.length;i++) {
                            res.data[i].addtime = this.dataFormate((res.data[i].addtime) * 1000);
                        }
                        this.setData({
                            comment: res.data,
                            commentContext: '',
                            // val: 'TEST'
                        })

                    })
                }
            })
        }

    },


    onLoad: function (option) {
        // 监听页面加载的生命周期函数
        let itemid = option.itemid;
        this.setData({
            itemid
        })
        // 发起请求
        // 从首页跟新房列表页跳转过来的详情都是请求同一个地址;
        unit.getNewDetail(itemid, (res) => {
            if (res.statusCode == 200) {
                this.setData({
                    // 请求参数
                    itemid,
                    // 页面数据
                    res: res.data.info,
                    // 轮播图
                    swiperPicture: res.data.topimg,
                    // 户型图
                    houseTypePicture: res.data.huxing,
                })
                // 处理户型图实现点击可以预览图片功能
                let houseTypeArr = [];
                for (let i = 0; i < this.data.houseTypePicture.length; i++) {
                    houseTypeArr.push(this.data.houseTypePicture[i].thumb);
                    this.setData({
                        houseTypeArr
                    });
                }
                // 处理返回地图坐标数据
                let location = this.data.res.map.split(",");
                this.setData({
                    longitude : location[0],
                    latitude : location[1],
                    name : this.data.res.title,
                    address : this.data.res.address
                })
                // 设置houseDetail页面的标题
                swan.setNavigationBarTitle({
                    title: this.data.res.title
                });
                // 为comment增加一个isShow属性(实现评论的显示全文功能)
                let arr = this.data.comment;
                for (let i = 0; i < arr.length; i++) {
                    this.data.comment[i].isShow = false
                }
                this.setData({
                    comment: arr
                })
            }
        })
        // 获取最新评论
        unit.getAllComment(itemid,page=1,(res) => {
            // 处理返回的时间戳
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].addtime = this.dataFormate((res.data[i].addtime) * 1000);
            }
            this.setData({
                comment: res.data,
            })
        })

    },

    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
        this.mapContext = swan.createMapContext('myMap');
    },
    onShow: function () {
        // 监听页面显示的生命周期函数
        swan.getStorage({
            key: 'auth',
            success: res => {
                this.setData({
                    auth: res.data
                })
            }
        });
        swan.getStorage({
            key: 'loginAuth',
            success: res => {
                this.setData({
                    loginAuth: res.data
                })
            }
        });
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