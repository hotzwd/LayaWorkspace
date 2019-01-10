var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.gameLayer=null;
		    this.box1=null;
		    this.box2=null;
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

		GameUI.uiView={"type":"View","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":960,"var":"gameLayer","height":2078,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":960,"skin":"Game/bggame-sheet0.png","height":2078}},{"type":"Image","props":{"y":1039,"x":480,"skin":"Game/piso-sheet0.png","height":2078,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":1684,"x":394,"var":"box1","skin":"Game/img_box1.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":1684,"x":566,"width":122,"var":"box2","skin":"Game/img_box2.png","height":122,"anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":323,"x":67,"var":"t_gamescore","text":"999999","fontSize":60,"font":"SimHei","color":"#ffff00","bold":true}},{"type":"Text","props":{"y":255,"x":67,"text":"分数","fontSize":55,"font":"SimHei","color":"#ffff00","bold":true}}]},{"type":"Box","props":{"width":960,"visible":false,"var":"guidBox","height":2078,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.5},"child":[{"type":"Rect","props":{"width":960,"lineWidth":1,"height":2078,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":1141,"x":251,"skin":"Game/guide1.png"}},{"type":"Image","props":{"y":1141,"x":638,"skin":"Game/guide1.png"}},{"type":"Text","props":{"y":890,"x":322,"text":"点击屏幕跳跃箱子","fontSize":40,"font":"SimHei","color":"#ffffff","bold":false}}]}]};
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
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":960,"height":2078,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.5},"child":[{"type":"Rect","props":{"width":960,"lineWidth":1,"height":2078,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":562,"x":243,"skin":"Game/gameover_titulo-sheet0.png"}},{"type":"Button","props":{"y":1326,"x":310,"var":"btn_close","stateNum":1,"skin":"Game/img_replay.png"}},{"type":"Button","props":{"y":1456,"x":310,"var":"btn_share","stateNum":1,"skin":"Game/img_yaoqing.png"}},{"type":"Label","props":{"y":930,"x":538,"width":192,"var":"t_gamescore","text":"99999","height":50,"fontSize":50,"font":"SimHei","color":"#ffff00","bold":true}},{"type":"Label","props":{"y":864,"x":538,"width":182,"var":"t_highScore","text":"99999","height":57,"fontSize":50,"font":"SimHei","color":"#00ff00","bold":true}},{"type":"Label","props":{"y":870,"x":275,"width":168,"text":"最高分数:","height":45,"fontSize":35,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Label","props":{"y":938,"x":277,"width":168,"text":"当前分数:","height":45,"fontSize":35,"font":"SimHei","color":"#ffffff","bold":true}}]}]};
		return GameOverUI;
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

		GameSharedUI.uiView={"type":"View","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":960,"height":2076,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":0,"x":0,"alpha":0.5},"child":[{"type":"Rect","props":{"width":960,"lineWidth":1,"height":2078,"fillColor":"#000000"}}]},{"type":"Button","props":{"y":833,"x":480,"var":"btn_shard","stateNum":1,"skin":"Game/fuhuo.png","labelSize":30,"labelPadding":"0,0,10,0","labelFont":"SimHei","labelColors":"#ffffff","anchorY":0.5,"anchorX":0.5},"compId":78},{"type":"Button","props":{"y":1415,"x":480,"width":141,"var":"btn_cancel","mouseEnabled":true,"labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","label":"点击跳过","height":44,"anchorY":0.5,"anchorX":0.5}}]}],"animations":[{"nodes":[{"target":78,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":0},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":0},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":30}]}}],"name":"aniShare","id":1,"frameRate":24,"action":0}]};
		return GameSharedUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
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

		GameStartUI.uiView={"type":"View","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":960,"height":2078,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":0,"x":-2,"alpha":0.5},"child":[{"type":"Rect","props":{"width":960,"lineWidth":1,"height":2078,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":461,"x":46,"skin":"Game/menutitulo-sheet0.png"}},{"type":"Image","props":{"y":1125,"x":480,"var":"btn_start","skin":"Game/btndefeatcont-sheet1.png","anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":1362,"x":314,"var":"btn_share","stateNum":1,"skin":"Game/img_yaoqing.png"}},{"type":"Button","props":{"y":1480,"x":312,"visible":false,"var":"btn_rank","stateNum":1,"skin":"Game/newbest-sheet0.png"}},{"type":"Label","props":{"y":1778,"x":54,"text":"v1.1","fontSize":35,"font":"SimHei","color":"#ffffff"}}]}]};
		return GameStartUI;
	})(View);