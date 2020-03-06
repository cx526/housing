let unit = {
    // http://bdapp.086soft.cn/api/bdapp.php?mod=index&act=info&aid=1
    // 获取城市列表数据
    getCity(callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=index&act=info&aid=1',
            success: (data) => {
                if(data.data.statusCode = 200) {
                    callback(data)
                }
                
            }
        });
    },
    // 获取首页index数据
    getIndex(id,callback) {
        swan.request({
            // url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=index&act=info&aid='+ id,
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=index&act=info&aid=1',
            success: (data) => {
                console.log(data);
                if(data.data.statusCode = 200) {
                    callback(data)
                }
            }
        });
    },
    // 获取新房页面数据(上啦加载更多功能)
    getNewHouse(page,callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=newhouse&act=list&aid=1&page='+page,
            success: (data) => {
                console.log('getNewHous success')
                callback(data);
            }
        });
    },
    // 新房页面价格筛选
    getNewPrice(price,callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=newhouse&act=list&aid=1&price='+price,
            success: res => {
                callback(res)
            }
        });
    },
    // 新房页面开发商筛选
    getNewDevelopers(developers,callback) {
      swan.request({
          url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=newhouse&act=list&aid=1&kfs='+developers,
          success: res => {
              callback(res)
          }
      });  
    },
    // 新房页面特点筛选
    getNewFeature(feature,callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=newhouse&act=list&aid=1&tedian='+feature,
            success: res => {
                callback(res)
            }
        });
    },
    getAllFeature(callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=newhouse&act=list&aid=1',
            success: res => {
                callback(res)
            }
        });
    },
        // 新房列表输入框请求数据
    getSearchData(title,callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=newhouse&act=list&aid=1&title='+ title,
            success:(data) => {
                callback(data);
            }
        });
    },
        // 获取从新房列表跳转到houseDetail页面的详情数据源
    getNewDetail(itemid,callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=newhouse&act=info&aid=1&hid='+ itemid,
            success:(data) => {
                callback(data);
            }
        });
    },
        // 发送评论
    sendComment(params,callback) {
        console.log(params)
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=send&act=comment&hid='+params.itemid+'&auth='+params.auth+'&content='+params.commentContext,
            success: res => {
                callback(res)
            }
        });
    },  
        // 全部评论
    getAllComment(itemid,page,callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=comment&act=list&hid=' + itemid + '&page=' + page,
            success: res => {
                callback(res)
            }
        });
    },
    // 帮我找房
    findHouse(params,callback) {
        console.log(params);
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=made&act=submit&type='+params.type+'&title='+params.title+'&budget='+params.budget+'&huxing='+params.huxing+'&area='+params.huxing+'&area='+params.area+'&teshu='+params.teshu+'&name='+params.name+'&contact='+params.contact+'&auth='+params.auth,
            success: res => {
                callback(res);
            }
        });
    },
    // 楼盘相册
    getAllPhoto(itemid,callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=newhouse&act=photo&hid='+itemid,
            success: res => {
                callback(res);
            }
        });
    },
    // 登录
    login(params,callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=member&act=login&username='+params.username+'&password='+params.password,
            success: (data) => {
                callback(data)
            }
        });
    },
    // 注册
    register(params,callback) {
        console.log(params.username,params.number,params.password);
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=member&act=register&username='+params.username+'&mobile='+params.number+'&password='+params.password,
            success: (data) => {
                callback(data)
            }
        });
    },
    // 资讯分类
    getMessage(callback) {
        swan.request({
            // url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=article&act=list&page=5&catid=28'
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=article&act=category',
            success: res => {
                callback(res)
            }
        });
    },
    // 资讯列表
    getMessageList(catid,page,callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=article&act=list&page='+page+'&catid='+catid,
            success: res => {
                callback(res)
            }
        });
    },
    // 资讯详情
    getMessageContext(catid,itemid,callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=article&act=list&catid='+catid+'&itemid='+itemid,
            success: res => {
                callback(res)
            }
        });
    },
    // 资讯搜索
    getMessageSearch(catid,title,callback) {
        swan.request({
            url: 'https://bdapp.086soft.cn/api/bdapp.php?mod=article&act=list&catid='+catid+'&title='+title,
            success: res => {
                callback(res)
            }
        });
    }
}
export default unit