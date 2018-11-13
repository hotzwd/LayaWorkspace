var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.duckLayer=null;
		    this.gameLayer=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":-320,"width":1664,"skin":"Game/bg_tile.png","height":768,"centerY":0,"centerX":0,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"width":1366,"skin":"Game/bg_game.jpg","height":768,"centerY":0,"centerX":0}},{"type":"Box","props":{"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"width":1664,"height":768,"alpha":0.8},"child":[{"type":"Rect","props":{"width":1664,"lineWidth":1,"height":768,"fillColor":"#000000"}}]}]},{"type":"Image","props":{"y":108,"x":0,"skin":"Game/img_tree.png"}},{"type":"Box","props":{"y":0,"x":-149,"width":1664,"var":"duckLayer","height":768,"centerY":0,"centerX":0}},{"type":"Image","props":{"y":478,"x":1,"width":1366,"skin":"Game/grass.png","height":373}},{"type":"Box","props":{"y":10,"x":-139,"width":1664,"var":"gameLayer","height":768,"centerY":0,"centerX":0}},{"type":"Image","props":{"y":641,"x":484,"skin":"Game/hit_panel.png"}},{"type":"Image","props":{"y":607,"x":1114,"skin":"Game/shot_panel.png"}},{"type":"Image","props":{"y":601,"x":1114,"skin":"Game/life_panel.png"}},{"type":"Text","props":{"y":651,"x":630,"text":"分数:","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Text","props":{"y":651,"x":732,"width":232,"text":"9999999","height":35,"fontSize":35,"font":"SimHei","color":"#ffffff","bold":true,"align":"left"}}]};
		return GameUI;
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

		GameStartUI.uiView={"type":"View","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":10,"x":-310,"width":1664,"skin":"Game/bg_tile.png","height":768,"centerY":0,"centerX":0,"sizeGrid":"10,10,10,10"}},{"type":"Box","props":{"y":10,"x":10,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"width":1664,"height":768,"alpha":0.8},"child":[{"type":"Rect","props":{"width":1664,"lineWidth":1,"height":768,"fillColor":"#000000"}}]}]},{"type":"Image","props":{"width":1366,"skin":"Game/bg_menu.jpg","centerY":0,"centerX":0}},{"type":"Button","props":{"y":581,"x":568,"var":"btn_start","stateNum":1,"skin":"Game/btn_play.png","labelSize":45,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"开始"}}]};
		return GameStartUI;
	})(View);