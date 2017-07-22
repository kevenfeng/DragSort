Page({
    data:{
        optionsListData:[],
        movableViewPosition:{
            x:0,
            y:0,
            className:"none",
            data:{}
        },
        scrollPosition:{
            everyOptionCell:65,
            top:47,
            scrollTop:0,
            scrollY:true,
            scrollViewHeight:1000,
            scrollViewWidth:375,
            windowViewHeight:1000,
        },
        selectItemInfo:{
            sName:"",
            sDtSecCode:"",
            sCode:"",
            selectIndex: -1,
            selectPosition:0,
        },
    },
    bindscroll:function (event) {
        var scrollTop = event.detail.scrollTop;
        this.setData({
            'scrollPosition.scrollTop':scrollTop
        })
    },
    getOptionInfo:function (code) {
        for(var i=0,j=this.data.optionsListData.length;i<j;i++){
            var optionData= this.data.optionsListData[i];
            if(optionData.sDtSecCode == code){
                optionData.selectIndex = i;
                return optionData;
            }
        }
        return {};
    },
    getPositionDomByXY:function (potions) {
        var y = potions.y-this.data.scrollPosition.top+this.data.scrollPosition.scrollTop;
        var optionsListData = this.data.optionsListData;
        var everyOptionCell = this.data.scrollPosition.everyOptionCell;
        for(var i=0,j=optionsListData.length;i<j;i++){
            if(y>=i*everyOptionCell&&y<(i+1)*everyOptionCell){
                return optionsListData[i];
            }
        }
        return optionsListData[0];
    },
    draggleTouch:function (event) {
        var touchType = event.type;
        switch(touchType){
            case "touchstart":
                this.scrollTouchStart(event);
                break;
            case "touchmove":
                this.scrollTouchMove(event);
                break;
            case "touchend":
                this.scrollTouchEnd(event);
                break;
        }
    },
    scrollTouchStart:function (event) {
        // console.log(event);
        var firstTouchPosition = {
            x:event.changedTouches[0].pageX,
            y:event.changedTouches[0].pageY,
        }
        console.log("firstTouchPosition:",firstTouchPosition);
        var domData = this.getPositionDomByXY(firstTouchPosition);
        console.log("domData:",domData);

        //movable-area滑块位置处理
        var movableX = 0;
        var movableY = firstTouchPosition.y-this.data.scrollPosition.top-this.data.scrollPosition.everyOptionCell/2;

        this.setData({
            movableViewPosition:{
                x:movableX,
                y:movableY,
                className:"",
                data:domData
            }
        })

        var secCode = domData.sDtSecCode;
        var secInfo = this.getOptionInfo(secCode);
        secInfo.selectPosition =  event.changedTouches[0].clientY;
        secInfo.selectClass = "dragSelected";

        this.data.optionsListData[secInfo.selectIndex].selectClass = "dragSelected";

        var optionsListData = this.data.optionsListData;

        this.setData({
            'scrollPosition.scrollY':false,
            selectItemInfo:secInfo,
            optionsListData:optionsListData,
            'scrollPosition.selectIndex':secInfo.selectIndex
        })
    },
    scrollTouchMove:function (event) {
        var selectItemInfo = this.data.selectItemInfo;
        var selectPosition = selectItemInfo.selectPosition;
        var moveDistance   = event.changedTouches[0].clientY;
        var everyOptionCell = this.data.scrollPosition.everyOptionCell;
        var optionsListData = this.data.optionsListData;
        var selectIndex = selectItemInfo.selectIndex;

        console.log("event.changedTouches:",event.changedTouches);
        //movable-area滑块位置处理
        var movableX = 0;
        var movableY = event.changedTouches[0].pageY-this.data.scrollPosition.top-this.data.scrollPosition.everyOptionCell/2;


        this.setData({
            movableViewPosition:{
                x:movableX,
                y:movableY,
                className:"",
                data:this.data.movableViewPosition.data
            }
        })

        if(moveDistance - selectPosition > 0 && selectIndex < optionsListData.length - 1){
            if (optionsListData[selectIndex].sDtSecCode == selectItemInfo.sDtSecCode) {
                optionsListData.splice(selectIndex, 1);
                optionsListData.splice(++selectIndex, 0, selectItemInfo);
                selectPosition += everyOptionCell;
            }
        }

        if (moveDistance - selectPosition < 0 && selectIndex > 0) {
            if (optionsListData[selectIndex].sDtSecCode == selectItemInfo.sDtSecCode) {
                optionsListData.splice(selectIndex, 1);
                optionsListData.splice(--selectIndex, 0, selectItemInfo);
                selectPosition -= everyOptionCell;
            }
        }

        this.setData({
            'selectItemInfo.selectPosition': selectPosition,
            'selectItemInfo.selectIndex': selectIndex,
            optionsListData: optionsListData,
        });
    },
    scrollTouchEnd:function (event) {
        console.log(event);
        var optionsListData = this.optionsDataTranlate(this.data.optionsListData,"");

        this.setData({
            optionsListData:optionsListData,
            'scrollPosition.scrollY':true,
            'movableViewPosition.className':"none"
        })
    },
    optionsDataTranlate:function (optionsList,selectClass) {
        for(var i=0,j=optionsList.length;i<j;i++){
            optionsList[i].selectClass = selectClass;
        }
        return optionsList;
    },
    onLoad: function (options) {
        var systemInfo= wx.getSystemInfoSync();
        var optionsList = [{"sCode":"600879","sDtSecCode":"0101600879","sName":"航天电子","iUpdateTime":1496362315,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"00700","sDtSecCode":"020100700","sName":"腾讯控股","iUpdateTime":1495531418,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"000759","sDtSecCode":"0001000759","sName":"中百集团","iUpdateTime":1495531394,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"000651","sDtSecCode":"0001000651","sName":"格力电器","iUpdateTime":1495531384,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600036","sDtSecCode":"0101600036","sName":"招商银行","iUpdateTime":1495153104,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600518","sDtSecCode":"0101600518","sName":"康美药业","iUpdateTime":1495153089,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"601238","sDtSecCode":"0101601238","sName":"广汽集团","iUpdateTime":1495153077,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"601989","sDtSecCode":"0101601989","sName":"中国重工","iUpdateTime":1495153069,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600519","sDtSecCode":"0101600519","sName":"贵州茅台","iUpdateTime":1495153058,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"002230","sDtSecCode":"0001002230","sName":"科大讯飞","iUpdateTime":1495152519,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"002431","sDtSecCode":"0001002431","sName":"棕榈股份","iUpdateTime":1494776256,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"01357","sDtSecCode":"020101357","sName":"美图公司","iUpdateTime":1494480437,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"300222","sDtSecCode":"0001300222","sName":"科大智能","iUpdateTime":1493777483,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"300131","sDtSecCode":"0001300131","sName":"英唐智控","iUpdateTime":1493777479,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"001696","sDtSecCode":"0001001696","sName":"宗申动力","iUpdateTime":1493777476,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600503","sDtSecCode":"0101600503","sName":"华丽家族","iUpdateTime":1493777473,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"300154","sDtSecCode":"0001300154","sName":"瑞凌股份","iUpdateTime":1493177346,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"000001","sDtSecCode":"0105000001","sName":"上证指数","iUpdateTime":1492426642,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"300059","sDtSecCode":"0001300059","sName":"东方财富","iUpdateTime":1490074861,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"002616","sDtSecCode":"0001002616","sName":"长青集团","iUpdateTime":1487392877,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"002340","sDtSecCode":"0001002340","sName":"格林美  ","iUpdateTime":1485419729,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600893","sDtSecCode":"0101600893","sName":"航发动力","iUpdateTime":1485147808,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"000768","sDtSecCode":"0001000768","sName":"中航飞机","iUpdateTime":1483949683,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600677","sDtSecCode":"0101600677","sName":"航天通信","iUpdateTime":1483949677,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600435","sDtSecCode":"0101600435","sName":"北方导航","iUpdateTime":1483763759,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"000738","sDtSecCode":"0001000738","sName":"航发控制","iUpdateTime":1483763742,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600150","sDtSecCode":"0101600150","sName":"中国船舶","iUpdateTime":1483763697,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"HSI","sDtSecCode":"1605HSI","sName":"恒生指数","iUpdateTime":1483691814,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"000002","sDtSecCode":"0001000002","sName":"万  科Ａ","iUpdateTime":1483691798,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"300104","sDtSecCode":"0001300104","sName":"乐视网  ","iUpdateTime":1483691763,"fNow":"--","sRate":"--","className":"block_wave block_stop"}];
        optionsList = this.optionsDataTranlate(optionsList,"");
        // 开始加载页面
        var scrollViewHeight = systemInfo.windowHeight-47;
        var scrollViewWidth = systemInfo.windowWidth;
        this.setData({
            optionsListData:optionsList,
            'scrollPosition.scrollViewWidth':scrollViewWidth,
            'scrollPosition.scrollViewHeight':scrollViewHeight,
            'scrollPosition.windowViewHeight':systemInfo.windowHeight,
        });
    },
    onShow: function () {
        // 页面显示
        console.log("onShow");

    },
    onReady: function () {
        // 页面渲染完成
        console.log("onReady");
    },
    onHide: function () {
        console.log(22);


        // 页面隐藏
        console.log("onHide");
    },
    onUnload: function () {
        // 页面关闭
        console.log("onUnload");
    },
});
