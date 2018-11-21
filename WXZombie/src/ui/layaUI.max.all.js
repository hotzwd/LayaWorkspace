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
			
		    this.t_gamescore=null;
		    this.t_life=null;
		    this.gameLayer=null;
		    this.guidBox=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":960,"skin":"Game/bggame-sheet0.png","height":1708}},{"type":"Label","props":{"y":39,"x":185,"width":221,"var":"t_gamescore","text":"0","height":50,"fontSize":50,"font":"SimHei","color":"#ffffff"}},{"type":"Label","props":{"y":38,"x":57,"text":"分数:","fontSize":50,"font":"SimHei","color":"#ffffff"}},{"type":"Image","props":{"y":37,"x":443,"width":74,"skin":"Game/live1.png","height":76}},{"type":"Label","props":{"y":41,"x":541,"width":129,"var":"t_life","text":"x0","height":50,"fontSize":50,"font":"SimHei","color":"#ffffff"}},{"type":"Box","props":{"y":0,"x":0,"width":960,"var":"gameLayer","mouseEnabled":true,"height":1708},"child":[{"type":"Animation","props":{"y":662,"x":70,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim1"}},{"type":"Animation","props":{"y":668,"x":411,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim2"}},{"type":"Animation","props":{"y":664,"x":745,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim3"}},{"type":"Animation","props":{"y":924,"x":68,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim4"}},{"type":"Animation","props":{"y":925,"x":404,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim5"}},{"type":"Animation","props":{"y":928,"x":748,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim6"}},{"type":"Animation","props":{"y":1208,"x":70,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim7"}},{"type":"Animation","props":{"y":1208,"x":406,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim8"}},{"type":"Animation","props":{"y":1210,"x":746,"visible":false,"source":"Zombie/zombie1-sheet0_01.png,Zombie/zombie1-sheet0_02.png,Zombie/zombie1-sheet0_03.png,Zombie/zombie1-sheet0_04.png","name":"anim9"}}]}]},{"type":"Box","props":{"width":960,"visible":false,"var":"guidBox","height":1708,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":-175,"x":10,"alpha":0.7},"child":[{"type":"Rect","props":{"width":960,"lineWidth":1,"height":2078,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":1071,"x":491,"skin":"Game/guide1.png"}},{"type":"Label","props":{"y":967,"x":475,"text":"点击消灭僵尸","fontSize":50,"font":"SimHei","color":"#ffffff"}}]}]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			
		    this.btn_close=null;
		    this.t_gamescore=null;
		    this.t_highScore=null;

			GameOverUI.__super.call(this);
		}

		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":20,"x":20,"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":-185,"alpha":0.5},"child":[{"type":"Rect","props":{"width":960,"lineWidth":1,"height":2078,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":299,"x":255,"skin":"Game/gameover-sheet0.png"}},{"type":"Button","props":{"y":1128,"x":311,"width":337,"var":"btn_close","stateNum":1,"skin":"Game/img_blue.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","label":"再玩一次","height":113,"sizeGrid":"22,35,35,30"}},{"type":"Label","props":{"y":781,"x":286,"text":"分数:","fontSize":50,"font":"SimHei","color":"#ffffff"}},{"type":"Label","props":{"y":782,"x":429,"width":294,"var":"t_gamescore","text":"999999","height":50,"fontSize":50,"font":"SimHei","color":"#ffffff"}},{"type":"Label","props":{"y":688,"x":310,"text":"历史最高:","fontSize":40,"font":"SimHei","color":"#ffffff"}},{"type":"Label","props":{"y":688,"x":498,"width":294,"var":"t_highScore","text":"999999","height":45,"fontSize":40,"font":"SimHei","color":"#ffffff"}}]}]};
		return GameOverUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
		    this.ani_play=null;
		    this.btn_start=null;
		    this.btn_share=null;

			GameStartUI.__super.call(this);
		}

		CLASS$(GameStartUI,'ui.GameStartUI',_super);
		var __proto__=GameStartUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);

		}

		GameStartUI.uiView={"type":"View","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":10,"x":10,"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":-185,"alpha":0.5},"child":[{"type":"Rect","props":{"width":960,"lineWidth":1,"height":2078,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":854,"x":480,"var":"btn_start","skin":"Game/menuplay-sheet0.png","anchorY":0.5,"anchorX":0.5},"compId":8},{"type":"Image","props":{"y":269,"x":46,"skin":"Game/menutitulo-sheet0.png"}},{"type":"Button","props":{"y":1128,"x":311,"width":337,"var":"btn_share","stateNum":1,"skin":"Game/img_blue.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","label":"分享","height":113,"sizeGrid":"22,35,35,30"}}]}],"animations":[{"nodes":[{"target":8,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":30}]}}],"name":"ani_play","id":1,"frameRate":24,"action":0}]};
		return GameStartUI;
	})(View);