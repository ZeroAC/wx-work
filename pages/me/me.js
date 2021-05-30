// pages/me/me.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},//含openid 通过云函数login获取
        hasUserInfo: false,
        canIUseGetUserProfile: false,
        openid:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //获取缓存信息
        const ui = wx.getStorageSync('userInfo');
        const uid = wx.getStorageSync('openid');
        if(uid){//若缓存存在,则无需再次申请登录
            this.setData({
                userInfo:ui,
                hasUserInfo:true,
                openid:uid
            })
        }
        else if (wx.getUserProfile) {//否则则使用该函数获取用户信息
            this.setData({
              canIUseGetUserProfile: true
            })
        } 
    },
    onGetUserInfo: function(e) {//获得用户基本信息和openid
        //获取用户基本信息
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {//使用箭头函数 this是外层的 不受影响
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              });
              console.log(this.data.userInfo);
              //把信息加入缓存
              wx.setStorageSync('userInfo', this.data.userInfo);
            }
        });
        //获取用户openid
        wx.cloud.callFunction({
            name:"login",
            success:res=>{//异步调用 在成功后再打印
                console.log("云函数登录调用成功");
                this.setData({//直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致
                    openid: res.result.openid,
                });
                console.log(this.data.openid);
                //把信息加入缓存
              wx.setStorageSync('openid', this.data.openid);
            },
            fail:res=>{
                console.log('云函数登录调用失败');
            }
        });
    },
    getUserInfo(e) {//此接口只能获取匿名的用户信息
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})