var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.gameLayer=null;
		    this.treeLayer=null;
		    this.img_ball=null;
		    this.t_score=null;
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

		GameUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"width":720,"var":"gameLayer","height":1556,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":0,"x":0,"width":720,"var":"treeLayer","height":1556},"child":[{"type":"Image","props":{"y":333,"x":151,"skin":"Game/img_tree.png"}},{"type":"Image","props":{"y":654,"x":74,"skin":"Game/img_tree.png"}},{"type":"Image","props":{"y":290,"x":554,"skin":"Game/img_tree.png"}},{"type":"Image","props":{"y":824,"x":541,"skin":"Game/img_tree.png"}},{"type":"Image","props":{"y":1027,"x":167,"skin":"Game/img_tree.png"}},{"type":"Image","props":{"y":1229,"x":367,"skin":"Game/img_tree.png"}}]},{"type":"Image","props":{"y":393,"x":347,"var":"img_ball","skin":"Game/player.png","anchorY":0.5,"anchorX":0.4}},{"type":"Text","props":{"y":214,"x":237,"text":"分数:","fontSize":35,"font":"SimHei","color":"#4d9e9f"}},{"type":"Text","props":{"y":214,"x":337,"width":198,"var":"t_score","text":"9999999","height":35,"fontSize":35,"font":"SimHei","color":"#4d9e9f"}}]},{"type":"Box","props":{"width":720,"visible":false,"var":"guidBox","height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.5},"child":[{"type":"Rect","props":{"width":720,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Text","props":{"y":593,"x":220,"text":"点击改变雪球方向","fontSize":35,"font":"SimHei","color":"#ffffff"}},{"type":"Image","props":{"y":659,"x":313,"width":93,"skin":"Game/guide1.png","pivotY":11,"height":104}}]}]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			
		    this.btn_close=null;
		    this.btn_share=null;

			GameOverUI.__super.call(this);
		}

		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"width":720,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.7},"child":[{"type":"Rect","props":{"width":720,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Button","props":{"y":917,"x":245,"var":"btn_close","skin":"Game/flash-sheet0.png","labelSize":35,"labelFont":"SimHei","labelColors":"#000000","label":"再玩一次"}},{"type":"Button","props":{"y":1046,"x":245,"var":"btn_share","skin":"Game/flash-sheet0.png","labelSize":35,"labelFont":"SimHei","labelColors":"#000000","label":"分享游戏"}}]}]};
		return GameOverUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
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

		GameStartUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"width":720,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.5},"child":[{"type":"Rect","props":{"width":720,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":376,"x":193,"skin":"Game/logo.png"}},{"type":"Button","props":{"y":769,"x":235,"var":"btn_start","skin":"Game/flash-sheet0.png","labelSize":35,"labelFont":"SimHei","labelColors":"#000000","label":"开始游戏"}},{"type":"Button","props":{"y":898,"x":235,"var":"btn_share","skin":"Game/flash-sheet0.png","labelSize":35,"labelFont":"SimHei","labelColors":"#000000","label":"分享游戏"}}]}]};
		return GameStartUI;
	})(View);