// components/removeList/removeList.js

const app = getApp()
const db = wx.cloud.database()
const _ = db.command

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    messageId : String
  },

  /**
   * 组件的初始数据
   */
  data: {
    message : {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
  //删除消息
  delinfo(){
    //console.log( this.data.messageId)
    wx.showModal({
      content:"删除信息",
      confirmText:'删除',
      success: (res)=> {
        if (res.confirm) {
         this.delfriendlist();
      
        } else if (res.cancel) {
          console.log('取消删除')
        }
      }
    })
  },
  //添加好友
  addfriend(){
    wx.showModal({
      content:"添加好友",
      confirmText:'同意',
      success: (res)=> {
        if (res.confirm){
         db.collection("users").doc(app.userInfo._id).update({
         data:{
           friendList:_.unshift(this.data.messageId)
         }

           }).then((res)=>{});
           wx.cloud.callFunction({
             name:"uplinks",
             data:{
               collection:"users",
               doc:this.data.messageId,
               data:`{friendList:_.unshift('${app.userInfo._id}')}`
             }
           }).then((res)=>{})
           this.delfriendlist();
        }
          
          else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  },
 //移除好友列表信息
 delfriendlist(){
  db.collection("message").where({
    userid:app.userInfo._id
  }).get().then((res)=>{
   // console.log(res)
    let list = res.data[0].list;
   
    list = list.filter((val, i) => {
          return val != this.data.messageId
       // console.log(this.data.messageId)
    })
   // console.log(list)
    wx.cloud.callFunction({
      name:"uplinks",
      data:{
        collection:"message",
        where:{
          userid:app.userInfo._id
        },
        data:{
          list
        }
      }
    }).then((res)=>{
      this.triggerEvent('myevent',list)
    })
  })
  },
  
 },
//回调
lifetimes: {
  attached: function () {
   // console.log(this.data.messageId)
   db.collection('users').doc(this.data.messageId).field({
      userPhoto : true,
      nickName : true
    }).get().then((res)=>{
     
       this.setData({
        message : res.data
        
      });
     
    });
  }
}
})
