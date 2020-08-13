// components/callPhone/callPhone.js
Component({
  /**
   * 组件的属性列表
   */
  
    options: {
      styleIsolation: 'apply-shared'
    },

  properties: {
    phonenum:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    callphone(){
      wx.makePhoneCall({
        phoneNumber: this.data.phonenum //仅为示例，并非真实的电话号码
      })
    }
  }
})
