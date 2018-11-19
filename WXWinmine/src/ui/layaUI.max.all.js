var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameNewUI=(function(_super){
		function GameNewUI(){
			
		    this.contentBox=null;
		    this.label_time=null;
		    this.label_mineNum=null;
		    this.panel_diban=null;
		    this.blockBox=null;

			GameNewUI.__super.call(this);
		}

		CLASS$(GameNewUI,'ui.GameNewUI',_super);
		var __proto__=GameNewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameNewUI.uiView);

		}

		GameNewUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"name":"center","height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":0,"x":0,"width":1280,"var":"contentBox","height":1280,"centerX":0},"child":[{"type":"Box","props":{"y":16,"x":278,"name":"top"},"child":[{"type":"Image","props":{"y":43,"x":297,"width":217,"skin":"WXGameUI/img_shijian.png","height":70,"sizeGrid":"22,24,23,76"}},{"type":"Label","props":{"y":57,"x":361,"width":129,"var":"label_time","text":"00:00","height":42,"fontSize":40,"font":"SimHei","color":"#ffffff","bold":true,"align":"right"}},{"type":"Image","props":{"y":45,"x":91,"width":187,"skin":"WXGameUI/img_leishu.png","height":70,"sizeGrid":"20,23,24,84"}},{"type":"Label","props":{"y":61,"x":152,"width":119,"var":"label_mineNum","text":"00/00","height":37,"fontSize":40,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":225,"x":280,"skin":"WXGameUI/img_diban.jpg"}},{"type":"Panel","props":{"y":247,"x":302,"width":675,"var":"panel_diban","height":673}},{"type":"Box","props":{"y":0,"x":0,"width":1280,"var":"blockBox","height":1280,"centerX":0}}]}]}]};
		return GameNewUI;
	})(View);
var GameoverNewUI=(function(_super){
		function GameoverNewUI(){
			
		    this.img_result=null;
		    this.label_time=null;
		    this.btn_playAgain=null;

			GameoverNewUI.__super.call(this);
		}

		CLASS$(GameoverNewUI,'ui.GameoverNewUI',_super);
		var __proto__=GameoverNewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameoverNewUI.uiView);

		}

		GameoverNewUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":0,"x":0,"alpha":0.8},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":464,"x":375,"width":530,"skin":"WXGameUI/img_dikuang.jpg","height":638}},{"type":"Image","props":{"y":396,"x":499,"var":"img_result","skin":"WXGameUI/jiesuan_biaoti_shengli.png"}},{"type":"Label","props":{"y":565,"x":516,"width":271,"var":"label_time","text":"00:00","strokeColor":"#0d0d0d","stroke":2,"height":60,"fontSize":55,"font":"SimHei","color":"#e7f106","bold":true,"align":"center"}},{"type":"Button","props":{"y":949,"x":555,"var":"btn_playAgain","stateNum":1,"skin":"WXGameUI/btn_playAgain.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":515,"x":548,"width":199,"text":"游戏用时","strokeColor":"#0d0d0d","stroke":2,"height":48,"fontSize":40,"font":"SimHei","color":"#fcfdf4","bold":true,"align":"center"}}]}]};
		return GameoverNewUI;
	})(View);
var GameStartNewUI=(function(_super){
		function GameStartNewUI(){
			
		    this.guidBox=null;

			GameStartNewUI.__super.call(this);
		}

		CLASS$(GameStartNewUI,'ui.GameStartNewUI',_super);
		var __proto__=GameStartNewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartNewUI.uiView);

		}

		GameStartNewUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"var":"guidBox","mouseEnabled":true,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":1},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":138,"x":0,"skin":"BeginUI/img_yindao.png","centerY":0,"centerX":0}}]}]};
		return GameStartNewUI;
	})(View);