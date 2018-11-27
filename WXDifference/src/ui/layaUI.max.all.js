var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.ani1=null;
		    this.blockList=null;
		    this.blockLayer=null;
		    this.label_time=null;
		    this.t_score=null;
		    this.btn_addLife=null;
		    this.guidBox=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"skin":"Game/background.png","height":1556,"centerY":0,"centerX":0}},{"type":"Box","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":71,"x":-3,"skin":"Game/img_blockBg.png"}},{"type":"List","props":{"y":200,"x":30,"width":660,"visible":false,"var":"blockList","height":880},"child":[{"type":"Box","props":{"y":0,"x":0,"width":220,"renderType":"render","mouseEnabled":true,"height":220},"child":[{"type":"Sprite","props":{"name":"bg"},"child":[{"type":"Rect","props":{"width":220,"lineWidth":1,"height":220,"fillColor":"#7f6160"}}]},{"type":"Image","props":{"skin":"Game/1.png","name":"icon","centerY":0,"centerX":0}}]}]},{"type":"Box","props":{"y":196,"x":29,"width":660,"var":"blockLayer","mouseEnabled":true,"height":880}},{"type":"Image","props":{"y":117,"x":295,"width":172,"skin":"Game/item_find.png","height":55,"sizeGrid":"16,17,16,65"}},{"type":"Image","props":{"y":117,"x":37,"skin":"Game/item_time.png"}},{"type":"Text","props":{"y":125,"x":111,"width":100,"var":"label_time","text":"00:00","height":45,"fontSize":35,"font":"SimHei","color":"#ffffff"}},{"type":"Text","props":{"y":125,"x":362,"width":97,"var":"t_score","text":"9999","height":45,"fontSize":35,"font":"SimHei","color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":142,"x":593,"width":178,"visible":false,"var":"btn_addLife","stateNum":1,"skin":"Game/img_red.png","labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","label":"增加时间","height":74,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"31,32,26,76"},"compId":20}]},{"type":"Box","props":{"width":1280,"var":"guidBox","height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"width":1280,"height":1556,"alpha":0.7},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":840,"x":452,"skin":"Game/guide1.png"}},{"type":"Text","props":{"y":747,"x":449,"width":347,"text":"找出不同的图片","height":78,"fontSize":35,"font":"SimHei","color":"#ffffff"}}]}],"animations":[{"nodes":[{"target":20,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":20,"key":"scaleY","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":20,"key":"scaleY","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":20,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":20,"key":"scaleX","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":20,"key":"scaleX","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":20,"key":"scaleX","index":30}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			
		    this.btn_close=null;
		    this.t_gamescore=null;
		    this.t_highScore=null;
		    this.btn_share=null;

			GameOverUI.__super.call(this);
		}

		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"width":1280,"height":1556,"alpha":0.7},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]}]},{"type":"Box","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":388,"x":67,"skin":"Game/img_bg.png"}},{"type":"Text","props":{"y":406,"x":270,"width":180,"text":"游戏结束","height":63,"fontSize":45,"font":"SimHei","color":"#ffffff"}},{"type":"Button","props":{"y":933,"x":220,"width":280,"var":"btn_close","stateNum":1,"skin":"Game/img_red.png","labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","label":"再玩一次","height":92,"sizeGrid":"31,32,26,76"}},{"type":"Text","props":{"y":567,"x":172,"width":180,"text":"闯关数量:","height":63,"fontSize":35,"font":"SimHei","color":"#ffffff"}},{"type":"Text","props":{"y":567,"x":342,"width":180,"var":"t_gamescore","text":"9999","height":63,"fontSize":35,"font":"SimHei","color":"#ffffff"}},{"type":"Text","props":{"y":506,"x":234,"width":180,"text":"最高成绩:","height":63,"fontSize":30,"font":"SimHei","color":"#ffffff"}},{"type":"Text","props":{"y":506,"x":372,"width":180,"var":"t_highScore","text":"99999","height":63,"fontSize":30,"font":"SimHei","color":"#ffffff"}},{"type":"Button","props":{"y":1057,"x":220,"width":280,"var":"btn_share","stateNum":1,"skin":"Game/img_red.png","labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","label":"分享游戏","height":92,"sizeGrid":"31,32,26,76"}}]}]};
		return GameOverUI;
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

		GameRankUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"width":1280,"visible":true,"var":"gameoverPanel","height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.7},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1280,"lineWidth":1,"height":1556,"fillColor":"#050505"}}]},{"type":"Box","props":{"y":367,"centerX":0},"child":[{"type":"Image","props":{"y":12,"x":0,"width":618,"skin":"Game/img_blockBg.png","sizeGrid":"10,10,10,10","height":728},"child":[{"type":"List","props":{"y":89,"x":6,"width":610,"visible":false,"var":"RankList","spaceY":5,"selectEnable":false,"repeatY":6,"repeatX":1,"height":536},"child":[{"type":"Box","props":{"y":0,"x":0,"width":574,"var":"playerItem","renderType":"render","height":85},"child":[{"type":"Label","props":{"y":40,"x":36,"width":35,"text":"99","name":"rankIndex","height":36,"fontSize":30,"font":"SimHei","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":23,"x":135,"width":205,"text":"玩家名字七个字","name":"playerName","height":40,"fontSize":25,"font":"SimHei"}},{"type":"Label","props":{"y":25,"x":350,"width":116,"text":"9999999","name":"playerScore","height":30,"fontSize":25,"font":"SimHei","color":"#ff0000","align":"center"}},{"type":"Label","props":{"y":26,"x":471,"width":116,"text":"青铜卫士","name":"playerTitle","height":30,"fontSize":25,"font":"SimHei","color":"#010101","align":"center"}}]}]},{"type":"Label","props":{"y":21,"var":"listName","text":"好友排行","fontSize":35,"font":"SimHei","color":"#ffffff","centerX":-7}},{"type":"Label","props":{"y":669,"x":306,"text":"每周一更新排名","fontSize":26,"font":"SimHei","color":"#ffffff","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-2,"x":577,"var":"close","skin":"Game/button_exit.png"}}]}]}]};
		return GameRankUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
		    this.btn_start=null;
		    this.btn_rank=null;

			GameStartUI.__super.call(this);
		}

		CLASS$(GameStartUI,'ui.GameStartUI',_super);
		var __proto__=GameStartUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);

		}

		GameStartUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"skin":"Game/background.png","height":1556,"centerY":0,"centerX":0}},{"type":"Box","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"skin":"Game/img_startBg.png"}},{"type":"Button","props":{"y":794,"x":220,"width":280,"var":"btn_start","stateNum":1,"skin":"Game/img_red.png","labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","label":"开始游戏","height":92,"sizeGrid":"31,32,26,76"}},{"type":"Button","props":{"y":920,"x":220,"width":280,"var":"btn_rank","stateNum":1,"skin":"Game/img_red.png","labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","label":"好友排行榜","height":92,"sizeGrid":"31,32,26,76"}},{"type":"Text","props":{"y":1209,"x":20,"width":180,"text":"v1.2","height":63,"fontSize":25,"font":"SimHei","color":"#ffffff"}}]}]};
		return GameStartUI;
	})(View);