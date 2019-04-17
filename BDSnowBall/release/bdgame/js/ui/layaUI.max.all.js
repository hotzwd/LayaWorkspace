var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.gameLayer=null;
		    this.treeLayer=null;
		    this.g_trajectory=null;
		    this.img_ball=null;
		    this.t_gamescore=null;
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

		GameUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":720,"var":"gameLayer","height":1556,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"Game/bg.png","height":1556,"sizeGrid":"5,5,5,5"}},{"type":"Box","props":{"y":0,"x":0,"width":720,"var":"treeLayer","height":1556},"child":[{"type":"Sprite","props":{"y":0,"x":0,"var":"g_trajectory"}},{"type":"Image","props":{"y":333,"x":151,"visible":false,"skin":"Game/img_tree.png","name":"tree1"}},{"type":"Image","props":{"y":654,"x":74,"visible":false,"skin":"Game/img_tree.png","name":"tree2"}},{"type":"Image","props":{"y":290,"x":554,"visible":false,"skin":"Game/img_tree.png","name":"tree3"}},{"type":"Image","props":{"y":824,"x":541,"visible":false,"skin":"Game/img_tree.png","name":"tree4"}},{"type":"Image","props":{"y":1027,"x":167,"visible":false,"skin":"Game/img_tree.png","name":"tree5"}},{"type":"Image","props":{"y":1229,"x":367,"visible":false,"skin":"Game/img_tree.png","name":"tree6"}}]},{"type":"Image","props":{"y":500,"x":354,"var":"img_ball","skin":"Game/player.png","scaleY":1.4,"scaleX":1.4,"anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":214,"x":325,"text":"分数","fontSize":35,"font":"SimHei","color":"#4d9e9f"}},{"type":"Text","props":{"y":268,"x":194,"width":332,"var":"t_gamescore","text":"9999999","height":71,"fontSize":65,"font":"SimHei","color":"#4d9e9f","align":"center"}}]},{"type":"Box","props":{"width":720,"visible":false,"var":"guidBox","height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.5},"child":[{"type":"Rect","props":{"width":720,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Text","props":{"y":593,"x":220,"text":"点击改变雪球方向","fontSize":35,"font":"SimHei","color":"#ffffff"}},{"type":"Image","props":{"y":659,"x":313,"width":93,"skin":"Game/guide1.png","pivotY":11,"height":104}}]}]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			
		    this.btn_close=null;
		    this.btn_share=null;
		    this.t_gamescore=null;
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

		GameOverUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":720,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.7},"child":[{"type":"Rect","props":{"width":720,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Button","props":{"y":917,"x":245,"var":"btn_close","skin":"Game/flash-sheet0.png","labelSize":35,"labelFont":"SimHei","labelColors":"#000000","label":"再玩一次"}},{"type":"Button","props":{"y":1046,"x":245,"var":"btn_share","skin":"Game/flash-sheet0.png","labelSize":35,"labelFont":"SimHei","labelColors":"#000000","label":"邀请好友"}},{"type":"Text","props":{"y":518,"x":194,"width":332,"text":"当前得分","height":47,"fontSize":35,"font":"SimHei","color":"#4d9e9f","align":"center"}},{"type":"Text","props":{"y":570,"x":194,"width":332,"var":"t_gamescore","text":"9999999","height":71,"fontSize":65,"font":"SimHei","color":"#4d9e9f","align":"center"}},{"type":"Text","props":{"y":387,"x":194,"width":332,"text":"历史最高","height":49,"fontSize":35,"font":"SimHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":430,"x":194,"width":332,"var":"t_highScore","text":"9999999","height":71,"fontSize":65,"font":"SimHei","color":"#ffffff","align":"center"}}]}]};
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

		GameRankUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"visible":true,"var":"gameoverPanel","height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.7},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1280,"lineWidth":1,"height":1556,"fillColor":"#050505"}}]},{"type":"Box","props":{"y":367,"centerX":0},"child":[{"type":"Image","props":{"y":12,"x":0,"width":618,"skin":"Game/rankBg.png","sizeGrid":"10,10,10,10","height":728},"child":[{"type":"List","props":{"y":89,"x":6,"width":610,"visible":false,"var":"RankList","spaceY":5,"selectEnable":false,"repeatY":6,"repeatX":1,"height":536},"child":[{"type":"Box","props":{"y":0,"x":0,"width":574,"var":"playerItem","renderType":"render","height":85},"child":[{"type":"Label","props":{"y":40,"x":36,"width":35,"text":"99","name":"rankIndex","height":36,"fontSize":30,"font":"SimHei","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":23,"x":135,"width":205,"text":"玩家名字七个字","name":"playerName","height":40,"fontSize":25,"font":"SimHei"}},{"type":"Label","props":{"y":25,"x":350,"width":116,"text":"9999999","name":"playerScore","height":30,"fontSize":25,"font":"SimHei","color":"#ff0000","align":"center"}},{"type":"Label","props":{"y":26,"x":471,"width":116,"text":"青铜卫士","name":"playerTitle","height":30,"fontSize":25,"font":"SimHei","color":"#010101","align":"center"}}]}]},{"type":"Label","props":{"y":21,"var":"listName","text":"好友排行","fontSize":35,"font":"SimHei","color":"#ffffff","centerX":-7}},{"type":"Label","props":{"y":669,"x":306,"text":"每周一更新排名","fontSize":26,"font":"SimHei","color":"#ffffff","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-2,"x":577,"var":"close","skin":"Game/btn_guanbi.png"}}]}]}]};
		return GameRankUI;
	})(View);
var GameRecommendUI=(function(_super){
		function GameRecommendUI(){
			
		    this.appList=null;
		    this.btn_close=null;

			GameRecommendUI.__super.call(this);
		}

		CLASS$(GameRecommendUI,'ui.GameRecommendUI',_super);
		var __proto__=GameRecommendUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameRecommendUI.uiView);

		}

		GameRecommendUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":10,"x":10,"width":1280,"visible":true,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.7},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1280,"lineWidth":1,"height":1556,"fillColor":"#050505"}}]},{"type":"Box","props":{"y":367,"centerX":0},"child":[{"type":"Image","props":{"y":12,"x":0,"width":618,"skin":"Game/rank_bg.png","sizeGrid":"10,10,10,10","height":728},"child":[{"type":"List","props":{"y":89,"x":6,"width":610,"var":"appList","spaceY":10,"repeatY":6,"repeatX":1,"height":569},"child":[{"type":"Box","props":{"y":0,"x":0,"width":574,"renderType":"render","height":85},"child":[{"type":"Label","props":{"y":40,"x":36,"width":35,"text":"99","name":"rankIndex","height":36,"fontSize":35,"font":"SimHei","color":"#b4b4b4","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Image","props":{"y":0,"x":84,"skin":"Game/app_1.png","name":"appIcon"}},{"type":"Label","props":{"y":5,"x":193,"width":366,"text":"玩家名字七个字","name":"appName","height":31,"fontSize":25,"font":"SimHei","color":"#2e2e2e"}},{"type":"Label","props":{"y":43,"x":193,"wordWrap":true,"width":384,"text":"青铜卫士青铜卫士青铜卫士青铜卫士青铜卫士青铜卫士青铜卫士","name":"appDic","height":45,"fontSize":20,"font":"SimHei","color":"#808080","align":"left"}}]}]},{"type":"Label","props":{"y":21,"x":221,"text":"热门游戏榜","fontSize":35,"font":"SimHei","color":"#373737","centerX":-7}}]},{"type":"Image","props":{"y":-2,"x":577,"var":"btn_close","skin":"Game/btn_guanbi.png"}}]}]}]};
		return GameRecommendUI;
	})(View);
var GameSharedUI=(function(_super){
		function GameSharedUI(){
			
		    this.aniShare=null;
		    this.btn_shard=null;
		    this.btn_cancel=null;

			GameSharedUI.__super.call(this);
		}

		CLASS$(GameSharedUI,'ui.GameSharedUI',_super);
		var __proto__=GameSharedUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameSharedUI.uiView);

		}

		GameSharedUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":720,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":0,"x":0,"alpha":0.7},"child":[{"type":"Rect","props":{"width":720,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Button","props":{"y":654,"x":360,"var":"btn_shard","stateNum":1,"skin":"Game/fuhuo.png","scaleY":1,"scaleX":1,"labelSize":30,"labelPadding":"0,0,10,0","labelFont":"SimHei","labelColors":"#ffffff","anchorY":0.5,"anchorX":0.5},"compId":78},{"type":"Button","props":{"y":765,"x":360,"width":148,"var":"btn_cancel","mouseEnabled":true,"labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"label":"点击跳过","height":44,"anchorY":0.5,"anchorX":0.5}}]}],"animations":[{"nodes":[{"target":78,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":30}]}}],"name":"aniShare","id":1,"frameRate":24,"action":0}]};
		return GameSharedUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
		    this.ani1=null;
		    this.btn_start=null;
		    this.btn_rank=null;
		    this.btn_appRank=null;
		    this.img_app=null;
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

		GameStartUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":720,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.5},"child":[{"type":"Rect","props":{"width":720,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":536,"x":193,"skin":"Game/logo.png"}},{"type":"Button","props":{"y":917,"x":245,"var":"btn_start","skin":"Game/flash-sheet0.png","labelSize":35,"labelFont":"SimHei","labelColors":"#000000","label":"开始游戏"}},{"type":"Button","props":{"y":1046,"x":245,"visible":false,"var":"btn_rank","skin":"Game/flash-sheet0.png","labelSize":35,"labelFont":"SimHei","labelColors":"#000000","label":"好友排行"}},{"type":"Text","props":{"y":1354,"x":23,"text":"v1.0.2","fontSize":30,"font":"SimHei","color":"#ffffff"}},{"type":"Box","props":{"y":1074,"x":39,"visible":false,"var":"btn_appRank"},"child":[{"type":"Image","props":{"y":86,"x":75,"var":"img_app","skin":"Game/app_1.png","rotation":0,"anchorY":0.5,"anchorX":0.5},"compId":9},{"type":"Label","props":{"text":"游戏热玩榜","fontSize":30,"font":"SimHei","color":"#ffffff"}}]},{"type":"Button","props":{"y":1046,"x":245,"var":"btn_share","skin":"Game/flash-sheet0.png","labelSize":35,"labelFont":"SimHei","labelColors":"#000000","label":"分享好友"}}]}],"animations":[{"nodes":[{"target":9,"keyframes":{"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":0},{"value":10,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":10},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":20},{"value":-10,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":30},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":40},{"value":15,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":45},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":50},{"value":-15,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":55},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"rotation","index":60}]}}],"name":"ani1","id":2,"frameRate":24,"action":0}]};
		return GameStartUI;
	})(View);