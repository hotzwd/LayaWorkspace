var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var CrushUI=(function(_super){
		function CrushUI(){
			
		    this.ani1=null;

			CrushUI.__super.call(this);
		}

		CLASS$(CrushUI,'ui.CrushUI',_super);
		var __proto__=CrushUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(CrushUI.uiView);

		}

		CrushUI.uiView={"type":"View","props":{"width":300,"height":300},"child":[{"type":"Image","props":{"y":90,"x":137,"skin":"Game/sheet0.png","name":"img1","anchorY":0.5,"anchorX":0.5},"compId":2},{"type":"Image","props":{"y":90,"x":137,"skin":"Game/sheet0.png","name":"img2","anchorY":0.5,"anchorX":0.5},"compId":3},{"type":"Image","props":{"y":90,"x":137,"skin":"Game/sheet0.png","name":"img3","anchorY":0.5,"anchorX":0.5},"compId":4},{"type":"Image","props":{"y":90,"x":137,"skin":"Game/sheet0.png","name":"img4","anchorY":0.5,"anchorX":0.5},"compId":5}],"animations":[{"nodes":[{"target":2,"keyframes":{"y":[{"value":90,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":0},{"value":177,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":7}],"x":[{"value":137,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":0},{"value":54,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":7},{"value":54,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":14}]}},{"target":3,"keyframes":{"y":[{"value":90,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":0},{"value":184,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":7}],"x":[{"value":137,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":0},{"value":111,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":7}]}},{"target":4,"keyframes":{"y":[{"value":90,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":0},{"value":176,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":7}],"x":[{"value":137,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":0},{"value":170,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":7}]}},{"target":5,"keyframes":{"y":[{"value":90,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":0},{"value":171,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":7}],"x":[{"value":137,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":0},{"value":235,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":7}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
		return CrushUI;
	})(View);
var GameUI=(function(_super){
		function GameUI(){
			
		    this.ani1=null;
		    this.t_gamescore=null;
		    this.t_life=null;
		    this.gameLayer=null;
		    this.btn_addLife=null;
		    this.guidBox=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":960,"skin":"Game/bggame-sheet0.png","height":1708}},{"type":"Label","props":{"y":39,"x":185,"width":221,"var":"t_gamescore","text":"0","height":50,"fontSize":50,"font":"SimHei","color":"#ffffff"}},{"type":"Label","props":{"y":38,"x":57,"text":"分数:","fontSize":50,"font":"SimHei","color":"#ffffff"}},{"type":"Image","props":{"y":37,"x":443,"width":74,"skin":"Game/live1.png","height":76}},{"type":"Label","props":{"y":41,"x":541,"width":129,"var":"t_life","text":"x0","height":50,"fontSize":50,"font":"SimHei","color":"#ffffff"}},{"type":"Box","props":{"y":0,"x":0,"width":960,"var":"gameLayer","mouseEnabled":true,"height":1708},"child":[{"type":"Animation","props":{"y":662,"x":70,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim1"}},{"type":"Animation","props":{"y":668,"x":411,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim2"}},{"type":"Animation","props":{"y":664,"x":745,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim3"}},{"type":"Animation","props":{"y":924,"x":68,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim4"}},{"type":"Animation","props":{"y":925,"x":404,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim5"}},{"type":"Animation","props":{"y":928,"x":748,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim6"}},{"type":"Animation","props":{"y":1208,"x":70,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim7"}},{"type":"Animation","props":{"y":1208,"x":406,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim8"}},{"type":"Animation","props":{"y":1210,"x":746,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim9"}}]},{"type":"Button","props":{"y":178,"x":150,"width":211,"visible":false,"var":"btn_addLife","stateNum":1,"skin":"Game/img_blue.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","label":"增加生命","height":98,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"22,35,35,30"},"compId":27}]},{"type":"Box","props":{"width":960,"visible":false,"var":"guidBox","height":1708,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":-175,"x":0,"alpha":0.7},"child":[{"type":"Rect","props":{"width":960,"lineWidth":1,"height":2078,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":1071,"x":491,"skin":"Game/guide1.png"}},{"type":"Label","props":{"y":967,"x":475,"text":"点击消灭僵尸","fontSize":50,"font":"SimHei","color":"#ffffff"}}]}],"animations":[{"nodes":[{"target":27,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":27,"key":"scaleY","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":27,"key":"scaleY","index":20},{"value":1,"tweenMethod":"linearNone","tween":true,"target":27,"key":"scaleY","index":40}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":27,"key":"scaleX","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":27,"key":"scaleX","index":20},{"value":1,"tweenMethod":"linearNone","tween":true,"target":27,"key":"scaleX","index":40}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
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
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":20,"x":20,"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":-185,"alpha":0.5},"child":[{"type":"Rect","props":{"width":960,"lineWidth":1,"height":2078,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":299,"x":255,"skin":"Game/gameover-sheet0.png"}},{"type":"Button","props":{"y":1128,"x":311,"width":337,"var":"btn_close","stateNum":1,"skin":"Game/img_blue.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","label":"再玩一次","height":113,"sizeGrid":"22,35,35,30"}},{"type":"Label","props":{"y":781,"x":286,"text":"分数:","fontSize":50,"font":"SimHei","color":"#ffffff"}},{"type":"Label","props":{"y":782,"x":429,"width":294,"var":"t_gamescore","text":"999999","height":50,"fontSize":50,"font":"SimHei","color":"#ffffff"}},{"type":"Label","props":{"y":688,"x":310,"text":"历史最高:","fontSize":40,"font":"SimHei","color":"#ffffff"}},{"type":"Label","props":{"y":688,"x":498,"width":294,"var":"t_highScore","text":"999999","height":45,"fontSize":40,"font":"SimHei","color":"#ffffff"}},{"type":"Button","props":{"y":1279,"x":311,"width":337,"var":"btn_share","stateNum":1,"skin":"Game/img_blue.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","label":"分享游戏","height":113,"sizeGrid":"22,35,35,30"}}]}]};
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

		GameRankUI.uiView={"type":"View","props":{"width":960,"height":1708},"child":[{"type":"Box","props":{"width":960,"visible":true,"var":"gameoverPanel","height":2078,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.7},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":960,"lineWidth":1,"height":2078,"fillColor":"#050505"}}]},{"type":"Box","props":{"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":12,"x":0,"width":618,"skin":"Game/rankBg.png","sizeGrid":"10,10,10,10","height":728},"child":[{"type":"List","props":{"y":89,"x":6,"width":610,"visible":false,"var":"RankList","spaceY":5,"selectEnable":false,"repeatY":6,"repeatX":1,"height":536},"child":[{"type":"Box","props":{"y":0,"x":0,"width":574,"var":"playerItem","renderType":"render","height":85},"child":[{"type":"Label","props":{"y":40,"x":36,"width":35,"text":"99","name":"rankIndex","height":36,"fontSize":30,"font":"SimHei","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":23,"x":135,"width":205,"text":"玩家名字七个字","name":"playerName","height":40,"fontSize":25,"font":"SimHei"}},{"type":"Label","props":{"y":25,"x":350,"width":116,"text":"9999999","name":"playerScore","height":30,"fontSize":25,"font":"SimHei","color":"#ff0000","align":"center"}},{"type":"Label","props":{"y":26,"x":471,"width":116,"text":"青铜卫士","name":"playerTitle","height":30,"fontSize":25,"font":"SimHei","color":"#010101","align":"center"}}]}]},{"type":"Label","props":{"y":21,"var":"listName","text":"好友排行","fontSize":35,"font":"SimHei","color":"#ffffff","centerX":-7}},{"type":"Label","props":{"y":669,"x":306,"text":"每周一更新排名","fontSize":26,"font":"SimHei","color":"#ffffff","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-2,"x":577,"var":"close","skin":"Game/close.png"}}]}]}]};
		return GameRankUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
		    this.ani_play=null;
		    this.btn_start=null;
		    this.btn_share=null;
		    this.btn_rank=null;

			GameStartUI.__super.call(this);
		}

		CLASS$(GameStartUI,'ui.GameStartUI',_super);
		var __proto__=GameStartUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);

		}

		GameStartUI.uiView={"type":"View","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":10,"x":10,"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":-185,"alpha":0.5},"child":[{"type":"Rect","props":{"width":960,"lineWidth":1,"height":2078,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":854,"x":480,"var":"btn_start","skin":"Game/menuplay-sheet0.png","anchorY":0.5,"anchorX":0.5},"compId":8},{"type":"Image","props":{"y":269,"x":46,"skin":"Game/menutitulo-sheet0.png"}},{"type":"Button","props":{"y":1128,"x":311,"width":337,"var":"btn_share","stateNum":1,"skin":"Game/img_blue.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","label":"分享","height":113,"sizeGrid":"22,35,35,30"}},{"type":"Button","props":{"y":1275,"x":311,"width":337,"var":"btn_rank","stateNum":1,"skin":"Game/img_blue.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","label":"排行榜","height":113,"sizeGrid":"22,35,35,30"}},{"type":"Label","props":{"y":1633,"x":55,"text":"v1.0","fontSize":30,"font":"SimHei","color":"#ffffff"}}]}],"animations":[{"nodes":[{"target":8,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":30}]}}],"name":"ani_play","id":1,"frameRate":24,"action":0}]};
		return GameStartUI;
	})(View);