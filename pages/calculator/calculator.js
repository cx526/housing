Page({
    data: {
        // 导航栏用到的数据
        currentIndex: 0,
    // 商业贷款数据
        // 商业贷款 贷款总额
        loans: null,
        // 商业贷款 贷款年限数据
        yearLimit:['30年(360期)','29年(348期)','28年(336期)','27年(324期)','26年(312期)','25年(300期)','24年(288期)','23年(276期)','22年(264期)','21年(252期)','20年(240期)','19年(228期)',                    '18年(216期)','17年(204期)','16年(192期)','15年(180期)','14年(168期)','13年(156期)','12年(144期)','11年(132期)','10年(120期)','9年(108期)','8年(96期)','7年(84期)',                          '6年(72期)','5年(60期)','4年(48期)','3年(36期)','2年(24期)','1年(12期)'],
        yearIndex: 10,
        // 商业贷款 商贷利率数据
        commercial: ['基准利率7折(3.43%)','基准利率7.5折(3.645%)','基准利率8折(3.92%)','基准利率8.5折(4.169%)','基准利率9折(4.14%)','基准利率9.5折(4.665%)','基准利率(4.9%)',
                    '基准利率1.15倍(5.39)','基准利率1.15倍(5.635%)','基准利率1.2倍(5.88%)','基准利率1.25倍(6.125%)','基准利率1.3倍(6.37%)'],
        commercialIndex: 0,
        // 商业贷款计算结果用到的数据
        resultClass: 0,
        businessControlShow : 0,
        
    // 房贷年限数据
        // 房贷年限 贷款总额
        houseLoans: null,
        // 房贷年限 贷款年限数据
        houseYearLimit:['30年(360期)','29年(348期)','28年(336期)','27年(324期)','26年(312期)','25年(300期)','24年(288期)','23年(276期)','22年(264期)','21年(252期)','20年(240期)',
        '19年(228期)','18年(216期)','17年(204期)','16年(192期)','15年(180期)','14年(168期)','13年(156期)','12年(144期)','11年(132期)','10年(120期)','9年(108期)','8年(96期)',
        '7年(84期)','6年(72期)','5年(60期)','4年(48期)','3年(36期)','2年(24期)','1年(12期)'],
        houseYearIndex: 10,
        // 房贷年限 商贷利率数据
        houseCommercial: ['基准利率(3.25%)','基准利率1.1倍(3.575%)'],
        houseCommercialIndex: 0,
        // 房贷年限计算结果用到的数据
        houseResultClass: 0,
        houseControlShow : 0,

    // 组合贷款数据
        // 贷款总额
        groupLoans: '',
        // 贷款年限
        groupYearLimit:['30年(360期)','29年(348期)','28年(336期)','27年(324期)','26年(312期)','25年(300期)','24年(288期)','23年(276期)','22年(264期)','21年(252期)','20年(240期)',
        '19年(228期)','18年(216期)','17年(204期)','16年(192期)','15年(180期)','14年(168期)','13年(156期)','12年(144期)','11年(132期)','10年(120期)','9年(108期)','8年(96期)',
        '7年(84期)','6年(72期)','5年(60期)','4年(48期)','3年(36期)','2年(24期)','1年(12期)'],   
        groupYearIndex: 10,   
        // 公积金贷款
        groupHouseLoans: '',  
        // 公积金利率
        groupCommercial: ['基准利率(3.25%)','基准利率1.1倍(3.575%)'],
        groupCommercialIndex: 0,
        // 商业贷款
        businessCommercial: '',
        // 商贷利率
        businessCommercialList: ['基准利率7折(3.43%)','基准利率7.5折(3.645%)','基准利率8折(3.92%)','基准利率8.5折(4.169%)','基准利率9折(4.14%)','基准利率9.5折(4.665%)','基准利率(4.9%)',
                    '基准利率1.15倍(5.39)','基准利率1.15倍(5.635%)','基准利率1.2倍(5.88%)','基准利率1.25倍(6.125%)','基准利率1.3倍(6.37%)'],
        businessCommercialIndex: 0,
        // 计算结果用到的数据
        businessClass: 0,
        businessControlShow: 0


    },
    // 商业贷款
        // 实现点击导航栏添加类名
        navToggle(even) {
            let currentIndex = even.currentTarget.dataset.idx;
            this.setData({
                currentIndex
            });
        },
        // 监听用户输入的贷款总额数
        loans(even) {
            let number = even.detail.value;
            this.setData({
                loans: number
            });
            // 如果为空;则隐藏计算结果
            if(number == '') {
                this.setData({
                    controlShow: 0
                })
            }
        },
        // 选择贷款年限
        chooseYear(even) {
            let currentValue = even.detail.value;
            this.setData({
                yearIndex: currentValue,
                // 如果改变选项;则隐藏计算结果
                controlShow: 0
            })
        },
        // 商贷利率
        commercial(even) {
            let currentValue = even.detail.value;
            this.setData({
                commercialIndex: currentValue,
                // 如果改变选项;则隐藏计算结果
                controlShow: 0
            })
        },
        // 计算商业贷款
        starCount() {
            let number = this.data.loans;
            if(number == null || number == '') {
                swan.showModal({
                    title: '请输入贷款总额',
                    showCancel: false
                });
            }
            if(number != null && number != '') {
                // 计算逻辑??a.match(/\d/g)
                // 同时计算结果显示出来;
                this.setData({
                    controlShow: 1
                })
            }
            
        },
        // 实现计算结果的切换
        toggleResult(even) {
            let currentIndex = even.currentTarget.dataset.idx;
            this.setData({
                resultClass: currentIndex
            })
        },

    // 房贷年限
        // 贷款总额
        houseLoans(even) {
            let number = even.detail.value;
            this.setData({
                houseLoans: number
            });
            // 如果为空;则隐藏计算结果
            if(number == '') {
                this.setData({
                    houseControlShow: 0
                })
            }
        },
        // 选择贷款年限
        chooseHouseYear(even) {
            let currentValue = even.detail.value;
            this.setData({
                houseYearIndex: currentValue,
                // 如果改变选项;则隐藏计算结果
                houseControlShow: 0
            })
        },
        // 商贷利率
        houseCommercial(even) {
            let currentValue = even.detail.value;
            this.setData({
                houseCommercialIndex: currentValue,
                // 如果改变选项;则隐藏计算结果
                houseControlShow: 0
            })
        },
        // 计算商业贷款
        houseStarCount() {
            let number = this.data.houseLoans;
            if(number == null || number == '') {
                swan.showModal({
                    title: '请输入公积金贷款金额',
                    showCancel: false
                });
            }
            if(number != null && number != '') {
                // 计算逻辑??a.match(/\d/g)
                // 同时计算结果显示出来;
                this.setData({
                    houseControlShow: 1
                })
            }
            
        },
        // 实现计算结果的切换
        houseToggleResult(even) {
            let currentIndex = even.currentTarget.dataset.idx;
            this.setData({
                houseResultClass: currentIndex
            })
        },



    // 组合贷款
        // 贷款总额
        groupLoans(even) {
            let number = even.detail.value;
            this.setData({
                groupLoans: number
            });
            // 如果为空;则隐藏计算结果
            // if(number == '') {
            //     this.setData({
            //         controlShow: 0
            //     })
            // }
        },
        // 选择贷款年限
        chooseGroupYear(even) {
            let currentValue = even.detail.value;
            this.setData({
                groupYearIndex: currentValue,
                // 如果改变选项;则隐藏计算结果
                businessControlShow: 0
            })
        },
        // 公积金贷款
        groupHouseLoans(even) {
            let currentValue = even.detail.value;
            this.setData({
                groupHouseLoans: currentValue
            })
        },
        // 公积金利率
        groupCommercial(even) {
            let number = even.detail.value;
            this.setData({
                groupCommercialIndex: number,
                businessControlShow: 0
            })
        },
        // 商业贷款
        businessCommercial(even) {
            let currentValue = even.detail.value;
            this.setData({
               businessCommercial: currentValue
            })
            console.log(this.data.businessCommercial)
        },
        // 商贷利率
        businessCommercial(even) {
            let number = even.detail.value;
            this.setData({
                businessCommercialIndex: number
            })
        },
        // 计算商业贷款
        businessCount() {
            // 拿到贷款总额
            let total = this.data.groupLoans;
            // 拿到公积金
            let number = this.data.groupHouseLoans;
            console.log(total,number)
            if(total == '') {
                swan.showModal({
                    title: '请输入贷款总额',
                    showCancel: false
                });
            }
            if(number == '') {
                swan.showModal({
                    title: '请输入公积金贷款金额',
                    showCancel: false
                });
            }
            if(number != '' && total != '') {
                // 计算逻辑??a.match(/\d/g)
                // 同时计算结果显示出来;
                this.setData({
                    businessControlShow: 1
                })
            }
            
        },
        // 实现计算结果的切换
        businessToggleResult(even) {
            let currentIndex = even.currentTarget.dataset.idx;
            this.setData({
                businessClass: currentIndex
            })
        },















    onLoad: function () {
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