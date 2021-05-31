// index.js
// 获取应用实例
const app = getApp()

Page({
    // addLog: (e)=>{//按钮绑定的事件 添加日志到数据库中
    //     console.log("add",e.target.dataset.add);
    //     const add = e.target.dataset.add;
    //     const openid = wx.getStorageSync('openid');
    //     if(!openid){//用户没登录时 则转到登录页面
    //         wx.switchTab({
    //           url: '../../pages/me/me',
    //         })
    //         return;
    //     }
    //     wx.cloud.callFunction({
    //         name:"createLog",//调用云函数 向数据库添加记录
    //         data:{
    //             add:add,
    //             date:Date.now(),
    //             openid:openid
    //         }
    //     })
    // }
    click: (e)=>{

    },
    handleFinish(e) {
        if (!e.detail) { return }
        console.log(e.detail);
    }
})