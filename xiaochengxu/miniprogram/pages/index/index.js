// miniprogram/pages/index/index.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listsjon:[],
    imgUrls: [],
    current : 'links'
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
    this.getimglist()
    this.getlist()
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
  txtbtn(ev){
    //console.log(ev)
    let id = ev.target.dataset.id;

    wx.cloud.callFunction({
      name : 'uplinks',
      data : {
        collection : 'users',
        doc: id,
        data : "{links : _.inc(1)}"
      }
    }).then((res)=>{
      let updated = res.result.stats.updated;
      if (updated){
        let cloneListData = [...this.data.listsjon];
        for (let i = 0; i < cloneListData.length;i++){
          if (cloneListData[i]._id == id ){
            cloneListData[i].links++;
          }
        }
        this.setData({
          listsjon : cloneListData
        });
      }
    });
  },
  tabclick(ev){
    let current = ev.target.dataset.current;
   /* if(current == this.data.current){
      return false
    }*/
    this.setData({
      current
    },()=>{
     this.getlist()
    })

  },
  //或许列表
  getlist(){
    db.collection("users").field({
      userPhoto:true,
      nickName:true,
      links:true
    
    })
    .orderBy(this.data.current,'desc')
    .get().then((res)=>{
    this.setData({
      listsjon :res.data
    
    })
    
    })
  },
  xiangqing(ev){
    let id = ev.target.dataset.id
    //console.log(id)
    wx.navigateTo({
      url: '../index/xiangqing/xiangqing?userid='+id,
    })
  },
  //加载图片
  getimglist(){
    db.collection('banner').get().then((res)=>{
      //console.log(res)
      this.setData({
        imgUrls:res.data
      })
    })
  }
})