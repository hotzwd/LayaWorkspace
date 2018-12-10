var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameEndShareUI=(function(_super){
		function GameEndShareUI(){
			
		    this.aniShare=null;
		    this.gameoverPanel=null;
		    this.cancleBtn=null;
		    this.shareBtn=null;
		    this.endTimer=null;
		    this.score=null;

			GameEndShareUI.__super.call(this);
		}

		CLASS$(GameEndShareUI,'ui.GameEndShareUI',_super);
		var __proto__=GameEndShareUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameEndShareUI.uiView);

		}

		GameEndShareUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"visible":true,"var":"gameoverPanel","height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":0,"x":0,"width":1280,"mouseEnabled":true,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":0,"x":-3,"alpha":0.9},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]}]},{"type":"Label","props":{"y":1027,"x":600,"visible":true,"var":"cancleBtn","underlineColor":"#ffffff","underline":true,"text":"Skip","fontSize":32,"font":"SimHei","color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":941,"x":634,"var":"shareBtn","stateNum":2,"skin":"WXGameUI/fuhuo.png","scaleY":1,"scaleX":1,"anchorY":0.5,"anchorX":0.5},"compId":116},{"type":"Label","props":{"y":653,"x":630,"visible":true,"var":"endTimer","underlineColor":"#ffffff","underline":false,"text":"10","fontSize":150,"font":"SimHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":336,"x":628,"visible":true,"underlineColor":"#ffffff","underline":false,"text":"Game Time","fontSize":22,"font":"SimHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":388,"x":630,"visible":true,"var":"score","underlineColor":"#ffffff","underline":false,"text":"9999","fontSize":50,"font":"SimHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}],"animations":[{"nodes":[{"target":116,"keyframes":{"x":[{"value":634,"tweenMethod":"linearNone","tween":true,"target":116,"key":"x","index":0}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":116,"key":"scaleY","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":116,"key":"scaleY","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":116,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":116,"key":"scaleX","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":116,"key":"scaleX","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":116,"key":"scaleX","index":30}]}}],"name":"aniShare","id":1,"frameRate":24,"action":0}]};
		return GameEndShareUI;
	})(View);
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

		GameNewUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"name":"center","height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"skin":"WXGameUI/img_bg.jpg","centerY":0,"centerX":0}},{"type":"Box","props":{"y":0,"x":0,"width":1280,"var":"contentBox","height":1280,"centerX":0},"child":[{"type":"Box","props":{"y":16,"x":278,"name":"top"},"child":[{"type":"Image","props":{"y":43,"x":297,"width":217,"skin":"WXGameUI/img_shijian.png","height":70,"sizeGrid":"22,24,23,76"}},{"type":"Label","props":{"y":57,"x":361,"width":129,"var":"label_time","text":"00:00","height":42,"fontSize":40,"font":"SimHei","color":"#ffffff","bold":true,"align":"right"}},{"type":"Image","props":{"y":45,"x":91,"width":187,"skin":"WXGameUI/img_leishu.png","height":70,"sizeGrid":"20,23,24,84"}},{"type":"Label","props":{"y":61,"x":152,"width":119,"var":"label_mineNum","text":"00/00","height":37,"fontSize":40,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":225,"x":280,"skin":"WXGameUI/img_diban.jpg"}},{"type":"Panel","props":{"y":247,"x":302,"width":675,"var":"panel_diban","height":673}},{"type":"Box","props":{"y":0,"x":0,"width":1280,"var":"blockBox","height":1280,"centerX":0}}]}]}]};
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

		GameoverNewUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":0,"x":0,"alpha":0.8},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":464,"x":375,"width":530,"skin":"WXGameUI/img_dikuang.jpg","height":638}},{"type":"Image","props":{"y":522,"x":499,"var":"img_result","skin":"WXGameUI/jiesuan_biaoti_shengli.png"}},{"type":"Label","props":{"y":738,"x":516,"width":271,"var":"label_time","text":"00:00","strokeColor":"#0d0d0d","stroke":2,"height":60,"fontSize":55,"font":"SimHei","color":"#e7f106","bold":true,"align":"center"}},{"type":"Button","props":{"y":949,"x":538,"var":"btn_playAgain","stateNum":1,"skin":"WXGameUI/btn_playAgain.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":688,"x":548,"width":199,"text":"Game Time","strokeColor":"#0d0d0d","stroke":2,"height":48,"fontSize":40,"font":"SimHei","color":"#fcfdf4","bold":true,"align":"center"}}]}]};
		return GameoverNewUI;
	})(View);
var GameRankUI=(function(_super){
		function GameRankUI(){
			
		    this.gameoverPanel=null;
		    this.RankList=null;
		    this.playerItem=null;
		    this.listName=null;
		    this.close=null;

			GameRankUI.__super.call(this);
		}

		CLASS$(GameRankUI,'ui.GameRankUI',_super);
		var __proto__=GameRankUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameRankUI.uiView);

		}

		GameRankUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"visible":true,"var":"gameoverPanel","height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":-134,"width":1280,"skin":"WXGameUI/bg_heise.png","sizeGrid":"5,5,5,5","height":1556}},{"type":"Box","props":{"y":212,"x":334},"child":[{"type":"Image","props":{"y":12,"x":0,"width":618,"skin":"WXGameUI/img_dikuang.jpg","sizeGrid":"10,10,10,10","height":728},"child":[{"type":"List","props":{"y":92,"x":20,"width":577,"var":"RankList","spaceY":5,"selectEnable":false,"repeatY":6,"repeatX":1,"height":550},"child":[{"type":"Box","props":{"y":0,"x":0,"width":574,"var":"playerItem","renderType":"render","height":85},"child":[{"type":"Line","props":{"y":83,"x":0,"toY":0,"toX":574,"lineWidth":3,"lineColor":"#999595"}},{"type":"Image","props":{"y":3,"x":94,"width":70,"name":"playerIcon","height":70}},{"type":"Image","props":{"y":5,"x":15,"skin":"WXGameUI/img_di1.png","name":"rankIcon"}},{"type":"Label","props":{"y":37,"x":45,"text":"1","name":"rankIndex","fontSize":36,"font":"SimHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":23,"x":206,"width":239,"text":"玩家名字100000","name":"playerName","height":40,"fontSize":36,"font":"SimHei","color":"#ffffff"}},{"type":"Label","props":{"y":23,"x":447,"text":"9999","name":"playerScore","fontSize":36,"font":"SimHei","color":"#dbaf5b","align":"center"}}]}]},{"type":"Label","props":{"y":32,"var":"listName","text":"World Rank","fontSize":40,"font":"SimHei","color":"#ffffff","centerX":0,"bold":true}},{"type":"Label","props":{"y":669,"x":306,"visible":false,"text":"每周一更新排名","fontSize":26,"font":"SimHei","color":"#070201","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":-14,"x":567,"var":"close","stateNum":2,"skin":"WXGameUI/btn_guanbi.png"}}]}]}]};
		return GameRankUI;
	})(View);
var GameStartNewUI=(function(_super){
		function GameStartNewUI(){
			
		    this.aniBegin=null;
		    this.guidBox=null;
		    this.startBox=null;
		    this.btn_startGame=null;
		    this.btn_rank=null;
		    this.btn_share=null;

			GameStartNewUI.__super.call(this);
		}

		CLASS$(GameStartNewUI,'ui.GameStartNewUI',_super);
		var __proto__=GameStartNewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartNewUI.uiView);

		}

		GameStartNewUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"var":"guidBox","mouseEnabled":true,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":1},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":138,"x":0,"skin":"BeginUI/img_yindao.png","centerY":0,"centerX":0}}]},{"type":"Box","props":{"width":814,"var":"startBox","height":1556,"centerY":0,"centerX":0,"alpha":1},"child":[{"type":"Image","props":{"x":0,"skin":"BeginUI/img_5.png","name":"5","alpha":0.9928888888888889},"compId":7},{"type":"Image","props":{"x":0,"skin":"BeginUI/img_4.png","name":"4","alpha":1},"compId":8},{"type":"Image","props":{"x":0,"skin":"BeginUI/img_3.png","name":"3","alpha":1},"compId":9},{"type":"Image","props":{"x":0,"skin":"BeginUI/img_2.png","name":"2","alpha":1},"compId":10},{"type":"Image","props":{"y":0,"x":0,"skin":"BeginUI/img_1.png","name":"1","alpha":1},"compId":11},{"type":"Box","props":{"y":159,"x":281,"alpha":1},"compId":16,"child":[{"type":"Image","props":{"y":-93,"x":-186,"skin":"BeginUI/img_logo.png","scaleY":0.8,"scaleX":0.8,"name":"logo"}},{"type":"Button","props":{"y":746,"x":1,"var":"btn_startGame","stateNum":1,"skin":"BeginUI/btn_playGame.png","alpha":1}},{"type":"Label","props":{"y":1190,"x":-211,"text":"V1.0","fontSize":30,"font":"SimHei","color":"#ada7a7"}},{"type":"Button","props":{"y":896,"x":-1,"var":"btn_rank","stateNum":1,"skin":"WXGameUI/btn_rank.png"}},{"type":"Button","props":{"y":891,"x":136,"var":"btn_share","stateNum":1,"skin":"WXGameUI/btn_share.png"}}]}]}],"animations":[{"nodes":[{"target":16,"keyframes":{"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":16,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":16,"key":"alpha","index":20}]}},{"target":10,"keyframes":{"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"key":"x","index":20},{"value":-200,"tweenMethod":"linearNone","tween":true,"target":10,"key":"x","index":30}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"key":"alpha","index":20},{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"key":"alpha","index":30},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"key":"alpha","index":60}]}},{"target":11,"keyframes":{"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":11,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":11,"key":"x","index":20},{"value":200,"tweenMethod":"linearNone","tween":true,"target":11,"key":"x","index":30}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"alpha","index":30},{"value":0,"tweenMethod":"linearNone","tween":true,"target":11,"key":"alpha","index":60}]}},{"target":8,"keyframes":{"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":8,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":8,"key":"x","index":30},{"value":-200,"tweenMethod":"linearNone","tween":true,"target":8,"key":"x","index":40}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"alpha","index":30},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":8,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":8,"key":"alpha","index":60}]}},{"target":9,"keyframes":{"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":30},{"value":200,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":40}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":30},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":60}]}},{"target":7,"keyframes":{"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"x","index":40}],"alpha":[{"value":0.9928888888888889,"tweenMethod":"linearNone","tween":true,"target":7,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"alpha","index":60}]}}],"name":"aniBegin","id":1,"frameRate":24,"action":0}]};
		return GameStartNewUI;
	})(View);