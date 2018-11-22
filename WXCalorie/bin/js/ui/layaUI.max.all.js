var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.ani_num=null;
		    this.ani_arm=null;
		    this.box_human=null;
		    this.img_human=null;
		    this.t_num=null;
		    this.anim_face=null;
		    this.anim_left=null;
		    this.anim_right=null;
		    this.img_table=null;
		    this.gameLayer=null;
		    this.t_calculate=null;
		    this.plate1=null;
		    this.plate2=null;
		    this.t_gameScore=null;
		    this.label_time=null;
		    this.btn_addLife=null;
		    this.guidBox=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);
			View.regComponent("ui.PlateUI",ui.PlateUI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":1664,"skin":"Game/background.jpg","height":768,"centerY":0,"centerX":0}},{"type":"Box","props":{"y":48,"x":298,"visible":false,"var":"box_human"},"child":[{"type":"Image","props":{"var":"img_human","skin":"Game/human0001.png"}},{"type":"Image","props":{"y":246,"x":290,"skin":"Game/numberBackground.png"}},{"type":"Text","props":{"y":261,"x":317,"width":139,"var":"t_num","text":"9999","height":50,"fontSize":50,"font":"SimHei","color":"#666666","bold":true,"alpha":0.5,"align":"center"},"compId":6},{"type":"Animation","props":{"y":104,"x":314,"var":"anim_face","source":"Face/human_face_Spritesheet6x5_01.png,Face/human_face_Spritesheet6x5_02.png"}},{"type":"Animation","props":{"y":230,"x":236,"var":"anim_left","source":"Left/human_left_Spritesheet5x4_01.png,Left/human_left_Spritesheet5x4_02.png"},"compId":12},{"type":"Animation","props":{"y":230,"x":414,"var":"anim_right","source":"Right/human_right_Spritesheet5x4_01.png,Right/human_right_Spritesheet5x4_02.png"},"compId":13}]},{"type":"Image","props":{"y":0,"x":0,"width":1664,"var":"img_table","skin":"Game/table.png","centerY":0,"centerX":0}},{"type":"Box","props":{"width":1664,"var":"gameLayer","height":768,"centerX":0},"child":[{"type":"Text","props":{"y":129,"x":898,"width":527,"visible":false,"var":"t_calculate","text":"9999+9999=99999","height":84,"fontSize":65,"font":"SimHei","color":"#666666","bold":true,"align":"right"}},{"type":"Plate","props":{"y":375,"x":674,"visible":false,"var":"plate1","runtime":"ui.PlateUI"}},{"type":"Plate","props":{"y":375,"x":860,"visible":false,"var":"plate2","runtime":"ui.PlateUI"}},{"type":"Text","props":{"y":44,"x":292,"width":222,"var":"t_gameScore","text":"0","height":53,"fontSize":45,"font":"SimHei","color":"#666666","bold":true,"align":"left"}},{"type":"Text","props":{"y":46,"x":158,"width":124,"text":"体重:","height":67,"fontSize":45,"font":"SimHei","color":"#666666","bold":true,"align":"right"}},{"type":"Text","props":{"y":111,"x":170,"width":145,"var":"label_time","text":"00:00","height":67,"fontSize":45,"font":"SimHei","color":"#666666","bold":true,"align":"left"}},{"type":"Box","props":{"y":43,"x":422,"visible":false,"var":"btn_addLife","mouseEnabled":true},"child":[{"type":"Image","props":{"x":9,"skin":"Game/plate.png"}},{"type":"Image","props":{"y":48,"x":33,"skin":"Game/food1.png"}},{"type":"Text","props":{"y":11,"width":124,"text":"增加时间","height":38,"fontSize":25,"font":"SimHei","color":"#f9c817","bold":true,"align":"right"}}]}]}]},{"type":"Box","props":{"width":1664,"visible":false,"var":"guidBox","height":768,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"width":1664,"height":768,"alpha":0.7},"child":[{"type":"Rect","props":{"width":1664,"lineWidth":1,"height":768,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":568,"x":495,"skin":"Game/guide1.png"}},{"type":"Text","props":{"y":481,"x":378,"text":"选择两个数字盘子","fontSize":35,"font":"SimHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":247,"x":429,"text":"两个数字相加等于","fontSize":35,"font":"SimHei","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":323,"x":766,"skin":"Game/guide2.png","rotation":221}}]}],"animations":[{"nodes":[{"target":6,"keyframes":{"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":10},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":20}]}}],"name":"ani_num","id":1,"frameRate":24,"action":0},{"nodes":[{"target":12,"keyframes":{"y":[{"value":197,"tweenMethod":"linearNone","tween":true,"target":12,"key":"y","index":0},{"value":230,"tweenMethod":"linearNone","tween":true,"target":12,"key":"y","index":10}]}},{"target":13,"keyframes":{"y":[{"value":197,"tweenMethod":"linearNone","tween":true,"target":13,"key":"y","index":0},{"value":230,"tweenMethod":"linearNone","tween":true,"target":13,"key":"y","index":10}]}}],"name":"ani_arm","id":2,"frameRate":24,"action":0}]};
		return GameUI;
	})(View);
var GameoverUI=(function(_super){
		function GameoverUI(){
			
		    this.t_gamescore=null;
		    this.btn_share=null;
		    this.t_highScore=null;
		    this.btn_close=null;

			GameoverUI.__super.call(this);
		}

		CLASS$(GameoverUI,'ui.GameoverUI',_super);
		var __proto__=GameoverUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameoverUI.uiView);

		}

		GameoverUI.uiView={"type":"View","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1664,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"width":1664,"height":768,"alpha":0.5},"child":[{"type":"Rect","props":{"width":1664,"lineWidth":1,"height":768,"fillColor":"#000000"}}]},{"type":"Text","props":{"y":88,"x":730,"text":"游戏结束","fontSize":50,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Text","props":{"y":240,"x":663,"text":"分数:","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Text","props":{"y":240,"x":765,"width":232,"var":"t_gamescore","text":"9999999","height":35,"fontSize":35,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Button","props":{"y":417,"x":779,"width":106,"var":"btn_share","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"分享","height":90}},{"type":"Text","props":{"y":183,"x":678,"text":"历史最高分数:","fontSize":25,"font":"SimHei","color":"#ffffff"}},{"type":"Text","props":{"y":183,"x":849,"width":232,"var":"t_highScore","text":"9999999","height":28,"fontSize":25,"font":"SimHei","color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":332,"x":735,"width":193,"var":"btn_close","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"再玩一次","height":90}}]}]};
		return GameoverUI;
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

		GameRankUI.uiView={"type":"View","props":{"width":1366,"height":768},"child":[{"type":"Box","props":{"width":1366,"visible":true,"var":"gameoverPanel","height":768,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"x":-149,"alpha":0.7},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1664,"lineWidth":1,"height":768,"fillColor":"#050505"}}]},{"type":"Box","props":{"y":16,"centerX":0},"child":[{"type":"Image","props":{"y":12,"x":0,"width":618,"skin":"Game/rankBg.png","sizeGrid":"10,10,10,10","height":728},"child":[{"type":"List","props":{"y":89,"x":6,"width":610,"visible":false,"var":"RankList","spaceY":5,"selectEnable":false,"repeatY":6,"repeatX":1,"height":536},"child":[{"type":"Box","props":{"y":0,"x":0,"width":574,"var":"playerItem","renderType":"render","height":85},"child":[{"type":"Label","props":{"y":40,"x":36,"width":35,"text":"99","name":"rankIndex","height":36,"fontSize":30,"font":"SimHei","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":23,"x":135,"width":205,"text":"玩家名字七个字","name":"playerName","height":40,"fontSize":25,"font":"SimHei"}},{"type":"Label","props":{"y":25,"x":350,"width":116,"text":"9999999","name":"playerScore","height":30,"fontSize":25,"font":"SimHei","color":"#ff0000","align":"center"}},{"type":"Label","props":{"y":26,"x":471,"width":116,"text":"青铜卫士","name":"playerTitle","height":30,"fontSize":25,"font":"SimHei","color":"#010101","align":"center"}}]}]},{"type":"Label","props":{"y":21,"var":"listName","text":"好友排行","fontSize":35,"font":"SimHei","color":"#ffffff","centerX":-7}},{"type":"Label","props":{"y":669,"x":306,"text":"每周一更新排名","fontSize":26,"font":"SimHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-2,"x":577,"var":"close","skin":"Game/close.png"}}]}]}]};
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

		GameStartUI.uiView={"type":"View","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":10,"x":10,"width":1664,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"width":1664,"height":768,"alpha":0.5},"child":[{"type":"Rect","props":{"width":1664,"lineWidth":1,"height":768,"fillColor":"#000000"}}]},{"type":"Text","props":{"y":151,"x":668,"text":"全民养膘","fontSize":80,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Button","props":{"y":325,"x":734,"width":195,"var":"btn_start","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"开始游戏","height":90}},{"type":"Button","props":{"y":404,"x":748,"width":167,"var":"btn_rank","labelSize":30,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"好友排行榜","height":90}},{"type":"Text","props":{"y":718,"x":188,"text":"v1.1","fontSize":25,"font":"SimHei","color":"#ffffff"}}]}]};
		return GameStartUI;
	})(View);
var PlateUI=(function(_super){
		function PlateUI(){
			
		    this.img_left=null;
		    this.img_food=null;
		    this.t_num=null;

			PlateUI.__super.call(this);
		}

		CLASS$(PlateUI,'ui.PlateUI',_super);
		var __proto__=PlateUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PlateUI.uiView);

		}

		PlateUI.uiView={"type":"View","props":{"width":127,"height":114},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"Game/plate.png"}},{"type":"Image","props":{"y":74,"x":25,"visible":false,"var":"img_left","skin":"Game/leftover.png"}},{"type":"Image","props":{"y":73,"x":63,"var":"img_food","skin":"Game/food1.png","centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":2,"x":26,"width":77,"var":"t_num","text":"9","height":40,"fontSize":40,"font":"SimHei","color":"#ffffff","align":"center"}}]};
		return PlateUI;
	})(View);