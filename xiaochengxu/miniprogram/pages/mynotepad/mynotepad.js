// miniprogram/pages/mynotepad/mynotepad.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notepad:[],
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
    
    db.collection("notepad").where({
      userid:app.userInfo._id
    }).field({
      time:true,
      notepad:true
    }).get().then((res)=>{
      if(res.data.length!=0){
        this.setData({
          notepad:res.data,
         
        })
      }
      else{
       
      }
    })
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
  //删除信息
  del(e){
  let id = e.target.dataset.id;
  //console.log(id)
   db.collection('notepad').doc('id').remove({
}).then((res)=>{
  console.log(res)
})
  }
})