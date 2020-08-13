// miniprogram/pages/user/user.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto:"/images/user/user-unlogin.png",
    nickName:"王子三千元",
    logged:false,
    disabled:true,
    id : '',
    weixnno:''
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
    this.getLocation();

   wx.cloud.callFunction({
    name:'login',
    data:{}
   }).then((res)=>{
   // console.log(res);
   db.collection('users').where({
     _openid:res.result.openid
   }).get().then((res)=>{
     if(res.data.length){
      app.userInfo=Object.assign(app.userInfo,res.data[0]);
      this.setData({
        userPhoto:app.userInfo.userPhoto,
        nickName:app.userInfo.nickName,
        weixnno:app.userInfo.weixinNumber,
        logged:true,
        id:app.userInfo._id
      });
      this.jianting()
  }
      else{
        this.setData({
          disabled:false
        })
      }
   });
     })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      nickName:app.userInfo.nickName,
      userPhoto:app.userInfo.userPhoto,
      id:app.userInfo._id
    })
   
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
  /*授权登录*/
  bindGetUserInfo(ev){
    //console.log(ev);
    //this.getLocation()
    let userInfo = ev.detail.userInfo;
      if(!this.data.logged && userInfo ){
      
         db.collection('users').add({
          data : {
            userPhoto: userInfo.avatarUrl,
            nickName: userInfo.nickName, 
            signature : '',
            phoneNumber : '',
            weixinNumber : '',
            links : 0,
            time : new Date(),
            isLocation:true,
            longitude: this.longitude,
            latitude: this.latitude,
            location: db.Geo.Point(this.longitude, this.latitude),
            friendList : []
        }
      }).then((res)=>{
       db.collection('users').doc(res._id).get().then((res) =>{
          app.userInfo=Object.assign(app.userInfo,res.data);
          this.setData({
           userPhoto:app.userInfo.userPhoto,
           nickName:app.userInfo.nickName,
           logged:true,
           id:app.userInfo._id
         });
       });
      });

    }
  },
  jianting(){
    db.collection('message').where({
      userid:app.userInfo._id
    })
    .watch({
      onChange: function(snapshot) {
       //console.log(snapshot)
       if(snapshot.docChanges.length){
          let list = snapshot.docChanges[0].doc.list;
          if(list.length){
            wx.showTabBarRedDot({
              index: 2,
             })
             app.message = list;
          }
          else{
            wx.hideTabBarRedDot({
              index: 2,
            })
            app.message=[]
          }
       }
      },
      onError: function(err) {
       
      }
    })
  },
  //获取地理位置
  getLocation(){
    wx.getLocation({
      type: 'gcj02 ',
      success :(res)=> {
      this.latitude = res.latitude
      this.longitude = res.longitude
       
      }
      
     })
   
   
  }
})