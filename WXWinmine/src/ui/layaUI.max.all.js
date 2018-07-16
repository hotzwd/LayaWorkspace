var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.contentBox=null;
		    this.label_time=null;
		    this.label_mineNum=null;
		    this.btn_setting=null;
		    this.panel_diban=null;
		    this.blockBox=null;
		    this.setBox=null;
		    this.setMainBox=null;
		    this.btn_setClose=null;
		    this.btn_exitRoom=null;
		    this.btn_setSound=null;
		    this.btn_setPlayerList=null;
		    this.btn_rule=null;
		    this.setGoldBox=null;
		    this.label_setGold=null;
		    this.setPlayerBox=null;
		    this.setPlayerList=null;
		    this.btn_setPlayerClose=null;
		    this.rulesBox=null;
		    this.btn_rulesBox=null;
		    this.label_rules=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":1280,"skin":"GameUI/img_beijing.png","height":1280,"centerY":0,"centerX":0}},{"type":"Box","props":{"width":1280,"name":"center","height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":0,"x":0,"width":1280,"var":"contentBox","height":1280,"centerX":0},"child":[{"type":"Box","props":{"y":1,"x":292,"name":"top"},"child":[{"type":"Image","props":{"y":43,"x":248,"skin":"GameUI/img_shijian.png"}},{"type":"Label","props":{"y":56,"x":315,"width":64,"var":"label_time","text":"0","height":37,"fontSize":40,"font":"shijianFont","color":"#ffffff","bold":true,"align":"right"}},{"type":"Image","props":{"y":50,"x":7,"skin":"GameUI/img_leishu.png"}},{"type":"Label","props":{"y":64,"x":77,"width":60,"var":"label_mineNum","text":"0","height":37,"fontSize":40,"font":"shijianFont","color":"#ffffff","bold":true,"align":"right"}},{"type":"Button","props":{"y":28,"x":618,"var":"btn_setting","stateNum":2,"skin":"GameUI/btn_shzhi.png"}}]},{"type":"Image","props":{"y":265,"x":280,"skin":"GameUI/img_diban.png"}},{"type":"Panel","props":{"y":287,"x":302,"width":675,"var":"panel_diban","height":673}},{"type":"Box","props":{"y":0,"x":0,"width":1280,"var":"blockBox","height":1280,"centerX":0}}]}]},{"type":"Box","props":{"width":1280,"visible":false,"var":"setBox","mouseEnabled":true,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":1280,"height":1280,"alpha":0.7},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1280,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":330,"x":382,"skin":"GameUI/img_dikuang.png"}},{"type":"Box","props":{"y":293,"x":405,"var":"setMainBox","cacheAs":"bitmap"},"child":[{"type":"Image","props":{"skin":"GameUI/img_shezhi.png"}},{"type":"Button","props":{"y":13,"x":444,"var":"btn_setClose","stateNum":2,"skin":"GameUI/btn_guanbi.png"}},{"type":"Button","props":{"y":576,"x":114,"var":"btn_exitRoom","stateNum":2,"skin":"GameUI/btn_tuichufangjian.png"}},{"type":"Image","props":{"y":184,"x":64,"skin":"GameUI/img_yinxiao.png"}},{"type":"Button","props":{"y":167,"x":302,"var":"btn_setSound","stateNum":2,"skin":"GameUI/btn_kai.png"}},{"type":"Image","props":{"y":378,"x":64,"skin":"GameUI/img_youxiguize.png"}},{"type":"Box","props":{"y":286,"x":70,"width":346,"var":"btn_setPlayerList","height":52},"child":[{"type":"Button","props":{"stateNum":2,"skin":"GameUI/btn_jiantou.png","right":0}}]},{"type":"Image","props":{"y":280,"x":64,"skin":"GameUI/img_chengyuanliebiao2.png"}},{"type":"Box","props":{"y":376,"x":69,"width":347,"var":"btn_rule","height":52},"child":[{"type":"Button","props":{"stateNum":2,"skin":"GameUI/btn_jiantou.png","right":0}}]},{"type":"Box","props":{"y":123,"x":64,"visible":false,"var":"setGoldBox"},"child":[{"type":"Image","props":{"skin":"GameUI/img_jinbi.png"}},{"type":"Label","props":{"y":2,"x":152,"width":200,"var":"label_setGold","text":"99999","height":64,"fontSize":50,"font":"jiesuanFont1","color":"#f8f808","align":"right"}}]}]},{"type":"Box","props":{"y":310,"x":360,"visible":false,"var":"setPlayerBox"},"child":[{"type":"List","props":{"y":75,"x":73,"var":"setPlayerList","repeatY":6},"child":[{"type":"Box","props":{"renderType":"render","cacheAs":"bitmap"},"child":[{"type":"Image","props":{"skin":"GameUI/img_chengyuanliebiao.png"}},{"type":"Image","props":{"y":6,"x":41,"width":65,"skin":"GameUI/image_touxiang.png","name":"img_icon","height":65},"child":[{"type":"Image","props":{"y":0,"x":0,"width":65,"skin":"GameUI/img_zhuye_touxiang_02.png","renderType":"mask","height":65}}]},{"type":"Label","props":{"y":23,"x":137,"width":229,"text":"名称名称名称","name":"label_name","height":35,"fontSize":35,"font":"SimHei","color":"#ffffff","align":"center"}}]}]},{"type":"Button","props":{"var":"btn_setPlayerClose","stateNum":2,"skin":"GameUI/btn_fanhui.png"}}]},{"type":"Box","props":{"y":310,"x":360,"visible":false,"var":"rulesBox","cacheAs":"bitmap"},"child":[{"type":"Button","props":{"var":"btn_rulesBox","stateNum":2,"skin":"GameUI/btn_fanhui.png"}},{"type":"Label","props":{"y":99,"x":62,"wordWrap":true,"width":444,"var":"label_rules","text":"1、数字表示周围有几个雷\\n2、每回合可以行动一次（单击扫雷，长按插旗）\\n3、选对、标对旗加分\\n4、踩雷、标错旗扣分\\n5、有几率获得神秘收集品兑换超值礼物","height":476,"fontSize":35,"font":"SimHei","color":"#ffffff"}}]}]}]};
		return GameUI;
	})(View);