// miniprogram/pages/riji/riji.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:''//当前登录Id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  //
  formSubmit(e) {
    let id = app.userInfo._id
    console.log(id)
    let info = e.detail.value.input
   // console.log( e.detail.value.input)
    db.collection('notepad').add({
       data:{
         time : new Date(),
         notepad:info,
         userid:id
         }
       }).then((res)=>{
        wx.showToast({
          title: 'Baby,祝你好运',
          duration: 1000,
          icon: 'none',
          success: () => {
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/user/user'
              })
            }, 1000);
          }
        })
   
   
       })

  },
 /* bindTextAreaBlur: function(e) {
    //console.log(e.detail.value);
    var that = this
    that.setData({
      details: e.detail.value
    });
    console.log(e.detail.value)
  },*/
  btn(ev){
  //console.log(ev)
  },
  //bindGetUserInfo(ev){
 //  db.collection('notepad').add({
  //   data:{
   //   time : new Date(),
   //   notepad:details
      
  //   }
  // }).then((res)=>{

  // })
 // }
})