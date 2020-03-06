import unit from '../network.js'
Page({
    data: { 
        // 储存全部数据
        res:'',
        cityName: '',
        // 存储城市名称
        result: ''
    },
    onLoad: function () {
        swan.showToast({
            title: '加载中',
            icon: 'loading'
        });
        // 监听页面加载的生命周期函数
        unit.getCity((res) => {
            console.log(res);
            swan.hideToast();
            this.setData({
                res: res.data.area
            })
            let allCity = res.data.area;
            let cityName = []
            for(let i = 0;i < allCity.length;i++) {
                cityName.push(allCity[i].areaname)
            }
            this.setData({
                cityName
            });
            // 将letter转为大写字母
            let result = this.pySegSort(this.data.cityName);
            for(let i = 0;i < result.length;i++) {
               result[i].letter = result[i].letter.toUpperCase()
            }
            this.setData({
                result: result
            }); 
        })
    },
    // 城市中文名按A-Z排列
    pySegSort(arr) {
        if (!String.prototype.localeCompare)
            return null;

        var letters = "*abcdefghjklmnopqrstwxyz".split('');
        var zh = "阿八嚓哒妸发旮哈讥咔垃麻拏噢妑七呥扨它穵夕丫帀".split('');

        var segs = [];
        var curr;
        letters.forEach(function (item, i) {
            curr = { letter: item, data: [] };
            arr.forEach(function (item2) {
                if((!zh[i-1] || zh[i-1].localeCompare(item2,'zh') <= 0) && item2.localeCompare(zh[i],'zh') == -1)  {
                    curr.data.push(item2);
                }
            });
            if (curr.data.length) {
                segs.push(curr);
                curr.data.sort(function (a, b) {
                    return a.localeCompare(b);
                });
            }
        });
        return segs;
    },
    // 选择城市并跳转到首页
    cityChoose(even) {
        // 拿到用户点击城市的名字
        let val = even.currentTarget.dataset.val;
        let idx = even.currentTarget.dataset.idx;
        let text = this.data.result[val].data[idx];
        let res = this.data.res;
        console.log(val,idx);
        console.log(this.data.result)
        console.log(text);
        console.log(this.data.res)
        let id = ''
        // 跳转到另一个小程序需要鞋带res[i].text跟res[i].areaid过去
        for(let i = 0;i < res.length;i++) {
            if(res[i].areaname == text) {
                id = res[i].areaid;
                swan.setStorage({
                    key: 'id',
                    data: id
                });
                swan.switchTab({
                    url: '/pages/index/index'

                });
            }
        }

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