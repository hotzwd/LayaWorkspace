var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.duckLayer=null;
		    this.gameLayer=null;
		    this.img_sight=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1664,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":1664,"skin":"Game/bg_tile.png","height":768,"centerY":0,"centerX":0,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"width":1366,"skin":"Game/bg_game.jpg","height":768,"centerY":0,"centerX":0}},{"type":"Image","props":{"y":76,"x":149,"skin":"Game/img_tree.png"}},{"type":"Box","props":{"x":171,"width":1664,"var":"duckLayer","height":768,"centerY":0,"centerX":0}},{"type":"Image","props":{"y":483,"x":149,"width":1366,"skin":"Game/grass.png","height":373}},{"type":"Box","props":{"y":10,"x":181,"width":1664,"var":"gameLayer","mouseEnabled":true,"height":768,"centerY":0,"centerX":0}},{"type":"Image","props":{"y":455,"x":770,"var":"img_sight","skin":"Game/gun_sight.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":643,"x":629,"skin":"Game/hit_panel.png"}},{"type":"Image","props":{"y":609,"x":1259,"visible":false,"skin":"Game/shot_panel.png"}},{"type":"Image","props":{"y":603,"x":1259,"visible":false,"skin":"Game/life_panel.png"}},{"type":"Text","props":{"y":653,"x":775,"text":"分数:","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Text","props":{"y":653,"x":877,"width":232,"text":"9999999","height":35,"fontSize":35,"font":"SimHei","color":"#ffffff","bold":true,"align":"left"}}]}]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			
		    this.btn_close=null;

			GameOverUI.__super.call(this);
		}

		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1664,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"width":1664,"height":768,"alpha":0.8},"child":[{"type":"Rect","props":{"width":1664,"lineWidth":1,"height":768,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":179,"x":521,"skin":"Game/img_box.png"}},{"type":"Text","props":{"y":222,"x":730,"text":"游戏结束","fontSize":50,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Image","props":{"y":153,"x":1098,"var":"btn_close","skin":"Game/but_exit.png"}}]}]};
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

		GameStartUI.uiView={"type":"View","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1664,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":0,"x":0,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"width":1664,"height":768,"alpha":0.8},"child":[{"type":"Rect","props":{"width":1664,"lineWidth":1,"height":768,"fillColor":"#000000"}}]}]},{"type":"Image","props":{"y":0,"x":0,"width":1664,"skin":"Game/bg_tile.png","height":768,"centerY":0,"centerX":0,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":0,"x":149,"width":1366,"skin":"Game/bg_menu.jpg","centerY":0,"centerX":0}},{"type":"Button","props":{"y":581,"x":717,"var":"btn_start","stateNum":1,"skin":"Game/btn_play.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"开始"}}]}]};
		return GameStartUI;
	})(View);