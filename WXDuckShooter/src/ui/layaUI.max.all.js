var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.aniLife=null;
		    this.duckLayer=null;
		    this.gameLayer=null;
		    this.img_sight=null;
		    this.t_gamescore=null;
		    this.t_life=null;
		    this.hitDucktList=null;
		    this.bulletList=null;
		    this.t_noBullet=null;
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

		GameUI.uiView={"type":"View","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1664,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":1664,"skin":"Game/bg_tile.png","height":768,"centerY":0,"centerX":0,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"width":1366,"skin":"Game/bg_game.jpg","height":768,"centerY":0,"centerX":0}},{"type":"Image","props":{"y":76,"x":149,"skin":"Game/img_tree.png"}},{"type":"Box","props":{"x":171,"width":1664,"var":"duckLayer","height":768,"centerY":0,"centerX":0}},{"type":"Image","props":{"y":483,"x":149,"width":1366,"skin":"Game/grass.png","height":373}},{"type":"Box","props":{"y":10,"x":181,"width":1664,"var":"gameLayer","mouseEnabled":true,"height":768,"centerY":0,"centerX":0}},{"type":"Image","props":{"y":455,"x":770,"var":"img_sight","skin":"Game/gun_sight.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":643,"x":629,"skin":"Game/hit_panel.png"}},{"type":"Image","props":{"y":609,"x":1259,"skin":"Game/shot_panel.png"}},{"type":"Image","props":{"y":603,"x":1259,"skin":"Game/life_panel.png"}},{"type":"Text","props":{"y":653,"x":775,"text":"分数:","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Text","props":{"y":653,"x":877,"width":232,"var":"t_gamescore","text":"9999999","height":35,"fontSize":35,"font":"SimHei","color":"#ffffff","bold":true,"align":"left"}},{"type":"Text","props":{"y":609,"x":1333,"width":64,"var":"t_life","text":"X1","height":35,"fontSize":35,"font":"SimHei","color":"#ffffff","bold":true,"align":"left"}},{"type":"Text","props":{"y":657,"x":651,"text":"提示","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"List","props":{"y":710,"x":648,"width":520,"var":"hitDucktList","repeatY":1,"repeatX":10,"height":42},"child":[{"type":"Box","props":{"y":0,"x":0,"renderType":"render"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"Game/hit_icon_02.png","name":"img_duck"}}]}]},{"type":"List","props":{"y":684,"x":1278,"width":70,"var":"bulletList","spaceX":5,"repeatY":1,"repeatX":3,"height":66},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"Game/bullet.png","renderType":"render","name":"img_bullet"}}]},{"type":"Text","props":{"y":697,"x":1273,"visible":false,"var":"t_noBullet","text":"没有子弹","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Button","props":{"y":387,"x":1421,"width":88,"visible":false,"var":"btn_addLife","stateNum":1,"skin":"Game/btn_play.png","scaleY":0.8,"scaleX":0.8,"mouseEnabled":true,"labelSize":20,"labelFont":"SimHei","labelColors":"#ffffff","labelAlign":"center","label":"增加\\n生命","height":78,"anchorY":0.5,"anchorX":0.5},"compId":38,"child":[{"type":"Image","props":{"y":-5,"x":-3,"width":96,"skin":"Game/img_light.png","height":85,"alpha":0.5,"sizeGrid":"18,22,18,19"},"compId":37}]},{"type":"Box","props":{"y":0,"x":0,"var":"guidBox","mouseEnabled":true},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":1664,"height":800,"alpha":0.7},"child":[{"type":"Rect","props":{"width":1664,"lineWidth":1,"height":800,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":463,"x":776,"skin":"Game/guide1.png"}},{"type":"Text","props":{"y":414,"x":793,"text":"拖动瞄准，抬起射击","fontSize":30,"font":"SimHei","color":"#ffffff"}},{"type":"Image","props":{"y":594,"x":1340,"skin":"Game/guide2.png","rotation":-89}},{"type":"Text","props":{"y":482,"x":1309,"text":"生命值","fontSize":30,"font":"SimHei","color":"#ffffff"}},{"type":"Image","props":{"y":678,"x":1258,"skin":"Game/guide2.png","rotation":-131}},{"type":"Text","props":{"y":582,"x":1158,"text":"子弹数","fontSize":30,"font":"SimHei","color":"#ffffff"}}]}]}],"animations":[{"nodes":[{"target":38,"keyframes":{"scaleY":[{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":38,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":38,"key":"scaleY","index":10},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":38,"key":"scaleY","index":20}],"scaleX":[{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":38,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":38,"key":"scaleX","index":10},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":38,"key":"scaleX","index":20}]}},{"target":37,"keyframes":{"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":37,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":37,"key":"alpha","index":5},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":37,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":37,"key":"alpha","index":15},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":37,"key":"alpha","index":20}]}}],"name":"aniLife","id":1,"frameRate":24,"action":0}]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			
		    this.btn_close=null;
		    this.t_gamescore=null;
		    this.btn_share=null;
		    this.t_highScore=null;

			GameOverUI.__super.call(this);
		}

		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1664,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"width":1664,"height":768,"alpha":0.8},"child":[{"type":"Rect","props":{"width":1664,"lineWidth":1,"height":768,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":179,"x":521,"width":621,"skin":"Game/img_box.png","height":445,"sizeGrid":"50,50,50,50"}},{"type":"Text","props":{"y":222,"x":730,"text":"游戏结束","fontSize":50,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Image","props":{"y":153,"x":1098,"var":"btn_close","skin":"Game/but_exit.png"}},{"type":"Text","props":{"y":348,"x":663,"text":"分数:","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Text","props":{"y":348,"x":765,"width":232,"var":"t_gamescore","text":"9999999","height":35,"fontSize":35,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Button","props":{"y":652,"x":721,"width":221,"var":"btn_share","stateNum":1,"skin":"Game/btn_play.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"分享","height":90}},{"type":"Text","props":{"y":292,"x":678,"text":"历史最高分数:","fontSize":25,"font":"SimHei","color":"#ffffff"}},{"type":"Text","props":{"y":292,"x":849,"width":232,"var":"t_highScore","text":"9999999","height":28,"fontSize":25,"font":"SimHei","color":"#ffffff","align":"left"}}]}]};
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

		GameRankUI.uiView={"type":"View","props":{"width":1366,"height":768},"child":[{"type":"Box","props":{"width":1366,"visible":true,"var":"gameoverPanel","height":768,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"x":-149,"alpha":0.7},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1664,"lineWidth":1,"height":768,"fillColor":"#050505"}}]},{"type":"Box","props":{"y":16,"centerX":0},"child":[{"type":"Image","props":{"y":12,"x":0,"width":618,"skin":"Game/img_box.png","sizeGrid":"10,10,10,10","height":728},"child":[{"type":"List","props":{"y":89,"x":6,"width":610,"visible":false,"var":"RankList","spaceY":5,"selectEnable":false,"repeatY":6,"repeatX":1,"height":536},"child":[{"type":"Box","props":{"y":0,"x":0,"width":574,"var":"playerItem","renderType":"render","height":85},"child":[{"type":"Label","props":{"y":40,"x":36,"width":35,"text":"99","name":"rankIndex","height":36,"fontSize":30,"font":"SimHei","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":23,"x":135,"width":205,"text":"玩家名字七个字","name":"playerName","height":40,"fontSize":25,"font":"SimHei"}},{"type":"Label","props":{"y":25,"x":350,"width":116,"text":"9999999","name":"playerScore","height":30,"fontSize":25,"font":"SimHei","color":"#ff0000","align":"center"}},{"type":"Label","props":{"y":26,"x":471,"width":116,"text":"青铜卫士","name":"playerTitle","height":30,"fontSize":25,"font":"SimHei","color":"#010101","align":"center"}}]}]},{"type":"Label","props":{"y":21,"var":"listName","text":"好友排行","fontSize":35,"font":"SimHei","color":"#ffffff","centerX":-7}},{"type":"Label","props":{"y":669,"x":306,"text":"每周一更新排名","fontSize":26,"font":"SimHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-2,"x":577,"var":"close","skin":"Game/but_exit.png"}}]}]}]};
		return GameRankUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
		    this.btn_start=null;
		    this.btn_rank=null;
		    this.btn_share=null;

			GameStartUI.__super.call(this);
		}

		CLASS$(GameStartUI,'ui.GameStartUI',_super);
		var __proto__=GameStartUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);

		}

		GameStartUI.uiView={"type":"View","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1664,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":0,"x":0,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"width":1664,"height":768,"alpha":0.8},"child":[{"type":"Rect","props":{"width":1664,"lineWidth":1,"height":768,"fillColor":"#000000"}}]}]},{"type":"Image","props":{"y":0,"x":0,"width":1664,"skin":"Game/bg_tile.png","height":768,"centerY":0,"centerX":0,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":0,"x":149,"width":1366,"skin":"Game/bg_menu.jpg","centerY":0,"centerX":0}},{"type":"Button","props":{"y":591,"x":738,"width":229,"var":"btn_start","stateNum":1,"skin":"Game/btn_play.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","labelAlign":"center","label":"开始","height":104}},{"type":"Button","props":{"y":591,"x":1005,"width":229,"var":"btn_rank","stateNum":1,"skin":"Game/btn_play.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","labelAlign":"center","label":"排行榜","height":104}},{"type":"Button","props":{"y":591,"x":471,"width":229,"var":"btn_share","stateNum":1,"skin":"Game/btn_play.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","labelAlign":"center","label":"分享","height":104}},{"type":"Text","props":{"y":707,"x":180,"text":"v1.1","fontSize":30,"font":"SimHei","color":"#ffffff"}}]}]};
		return GameStartUI;
	})(View);