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
			

			GameOverUI.__super.call(this);
		}

		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":960,"height":2078,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.5},"child":[{"type":"Rect","props":{"width":960,"lineWidth":1,"height":2078,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":562,"x":243,"skin":"Game/gameover_titulo-sheet0.png"}}]}]};
		return GameOverUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
		    this.btn_start=null;

			GameStartUI.__super.call(this);
		}

		CLASS$(GameStartUI,'ui.GameStartUI',_super);
		var __proto__=GameStartUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);

		}

		GameStartUI.uiView={"type":"View","props":{"width":960,"height":1708,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":960,"height":2078,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.5},"child":[{"type":"Rect","props":{"width":960,"lineWidth":1,"height":2078,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":461,"x":46,"skin":"Game/menutitulo-sheet0.png"}},{"type":"Image","props":{"y":1226,"x":480,"var":"btn_start","skin":"Game/btndefeatcont-sheet1.png","anchorY":0.5,"anchorX":0.5}}]}]};
		return GameStartUI;
	})(View);