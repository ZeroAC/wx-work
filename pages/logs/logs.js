// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  getlogs: function(){//获得当前用户的所有记录日志(最多一百条https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/read.html)
    const openid = wx.getStorageSync('openid');
    if(!openid){
      wx.switchTab({
        url: '../../pages/me/me',
      });
      return;
    }
    wx.cloud.callFunction({
      name:"getLogs",
      data:{
        openid: openid
      }
    }).then(res=>{
        console.log("res",res.result.data);
        this.setData({
          logs:res.result.data.map(log=>{ //对日志格式化
            let dateFormat = util.formatTime(new Date(log.date));
            log.date = dateFormat;
            return log;
          })
        })
      })
  },
  onShow:function(){
    this.getlogs();
  }
})
