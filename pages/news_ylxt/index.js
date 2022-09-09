import { getArticleCategoryList, getArticleList, getArticleHotList, getArticleBannerList} from '../../api/api.js';


const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '雨林·学堂',
      'color': false
    },
    imgUrls: [],
    articleList:[],
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    active: 0,
    first:0,
    limit:8,
    cateTitle:"雨林学堂",
    status:false,
    scrollLeft: 0,
    isGoIndex: true,
    iShidden: false
  },
  /**
  * 关闭授权
  * 
 */
  onCloseAuto: function () {
    this.setData({ iShidden: true });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      navH: app.globalData.navHeight
    });
    if (app.globalData.token) that.setData({ iShidden: true });
  },
  getArticleHot: function () {
    var that = this;
    getArticleHotList().then(res=>{
      that.setData({ articleList: res.data });
    });
  },
  getArticleBanner: function () {
    var that = this;
    getArticleBannerList().then(res=>{
      //console.log(res.data);
      that.setData({ imgUrls: res.data });
    });
  },
  getCidArticle: function () {
    var that = this;
    if (that.data.active == 0) return ;
    var limit = that.data.limit;
    var first = that.data.first;
    var articleList = that.data.articleList;
    getArticleList(that.data.active, { first: first, limit: limit}).then(res=>{
      var articleListNew = [];
      var len = res.data.length;
      articleListNew = articleList.concat(res.data);
      //console.log(articleList);
      //console.log(res.data);
      //console.log(articleListNew);
      that.setData({ 
        articleList: articleListNew, 
        status: limit > len, 
        first: first + limit 
      });
    });
  },
  getArticleCate:function(){
    var that = this;
    getArticleCategoryList().then(res=>{
      //console.log(res.data);
      for (var index in res.data) {
        //console.log(res.data[index]);
        if (res.data[index].title == that.data.cateTitle) {
          //console.log(res.data[index].title);
          that.setData({ articleList: [], active: res.data[index].id });
          this.getCidArticle();
          //console.log(this.data.articleList);
        };
      };
      that.setData({ navList: res.data });
    });
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
    this.getArticleHot();
    this.getArticleBanner();
    this.getArticleCate();
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
    //this.getCidArticle();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})