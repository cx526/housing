Page({
    data: {
        imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572868895039&di=9fce01d0e93b1d010f05d0122f21798c&imgtype=0&src=http%3A%2F%2F7.pic.pc6.com%2Fup%2F2016-12%2F20161213153647219.png'
    },
    savePicture() {
        swan.downloadFile({
            url: this.data.imgUrl,
            success(res) {
                //下载成功
                if (res.statusCode === 200) {
                    // console.log("临时文件路径" + res.tempFilePath);
                    let img = res.tempFilePath;
                    swan.saveImageToPhotosAlbum({
                        filePath: img,
                        success() {
                            swan.showToast({
                                title: '保存成功'
                            });
                        }
                    });
                }
            },
        });
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