// miniprogram/pages/index/xiangqing/xiangqing.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   isfriend:false,
   xiangqing:{},
   ishelide:true,
   ismyself:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let id = app.userInfo._id
   let userid = options.userid
   //判断点击是的是否为自己
   if(id!=userid){
    this.setData({
     ismyself:true
    })
  }
  else{
   this.setData({
     ismyself:false
    })
  }
  //console.log(id)
  //console.log(userid)
    db.collection("users").doc(userid).get().then((res)=>{
      this.setData({
        xiangqing:res.data
      });
      let friend = res.data.friendList;
      if(friend.includes(app.userInfo._id)){
        this.setData({
          isfriend:true
        })
      }
      else{
        this.setData({
          isfriend:false
        },()=>{
          if(userid==app.userInfo._id){
            this.setData({
              ishelide:false,
              isfriend:true
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //添加好友
  addbtn(){
    if(app.userInfo._id){
   db.collection("message").where({
  userid:this.data.xiangqing._id
   }).get().then((res)=>{
//  console.log(res.data.length)
  if(res.data.length){//更新信息
   if(res.data[0].list.includes(app.userInfo._id)){
     wx.showToast({
       title: '已申请过',
     })
   }
   else{
    wx.cloud.callFunction({
      name : 'uplinks',
      data : {
        collection : 'message',
        where : {
          userid : this.data.xiangqing._id
        },
        data : `{list : _.unshift('${app.userInfo._id}')}`
      }
    }).then((res)=>{
      wx.showToast({
        title: '申请成功~'
      })
    });
  }
  }
  else{
    db.collection("message").add({
      data:{
        userid:this.data.xiangqing._id,
        list:[app.userInfo._id]
      }
    }).then((res)=>{
       wx.showToast({
      title: '申请成功',
})
    })
  }
})

    }
    else{
     wx.showToast({
       title: '请先登录',
       duration:2000,
       icon:'none',
       success:(()=>{
setTimeout(()=>{
wx.switchTab({
  url: '/pages/user/user',
})
},2000)
       })
     })
    }
  },
  //跳到聊天记录
  btn(ev){
   
    let name = ev.target.dataset.name;
    let userid = ev.target.dataset.userid;
    
   //console.log(id);
   wx.navigateTo({
    url: '../../chats/chats?username='+name+"&userid="+userid,
   })
  },
  //我的好友列表
  btn1(){
    wx.navigateTo({
      url: '../../friendlist/friendlist',
    })
  }
})