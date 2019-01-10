var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.ani1=null;
		    this.gameLayer=null;
		    this.t_gamescore=null;
		    this.box_triangle=null;
		    this.sp_color1=null;
		    this.sp_color2=null;
		    this.sp_color3=null;
		    this.anim_line=null;
		    this.img_qiu=null;
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

		GameUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"skin":"Game/background.png","height":1556,"centerY":0,"centerX":0}},{"type":"Box","props":{"width":720,"var":"gameLayer","height":1556,"centerY":0,"centerX":0},"child":[{"type":"Text","props":{"y":200,"x":5,"width":177,"text":"分数","height":45,"fontSize":45,"font":"SimHei","color":"#2e4556","align":"center"}},{"type":"Text","props":{"y":264,"x":3,"width":177,"var":"t_gamescore","text":"9999","height":45,"fontSize":50,"font":"SimHei","color":"#2e4556","align":"center"}},{"type":"Box","props":{"y":902,"x":360,"width":220,"var":"box_triangle","rotation":0,"height":220,"anchorY":0.38,"anchorX":0.5},"compId":23,"child":[{"type":"Image","props":{"skin":"Game/tcolor1.png"}},{"type":"Image","props":{"skin":"Game/tcolor2.png"}},{"type":"Image","props":{"skin":"Game/tcolor3.png"}},{"type":"Sprite","props":{"y":8,"x":11,"width":200,"var":"sp_color1","height":10},"child":[{"type":"Rect","props":{"width":200,"lineWidth":1,"height":10,"fillColor":"#ff0000"}}]},{"type":"Sprite","props":{"y":197,"x":114,"width":200,"var":"sp_color2","rotation":-60,"height":10},"child":[{"type":"Rect","props":{"width":200,"lineWidth":1,"height":10,"fillColor":"#ff0000"}}]},{"type":"Sprite","props":{"y":23,"x":7,"width":200,"var":"sp_color3","rotation":60,"height":10},"child":[{"type":"Rect","props":{"width":200,"lineWidth":1,"height":10,"fillColor":"#ff0000"}}]}]},{"type":"Animation","props":{"y":144,"x":309,"var":"anim_line","source":"Game/rope-sheet0_06.png,Game/rope-sheet0_07.png,Game/rope-sheet0_08.png"}},{"type":"Image","props":{"y":225,"x":310,"var":"img_qiu","skin":"Game/dcolor2.png"}}]},{"type":"Box","props":{"width":1280,"visible":false,"var":"guidBox","height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":1280,"height":1556,"alpha":0.5},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":519,"x":599,"skin":"Game/guide1.png"}},{"type":"Text","props":{"y":420,"x":377,"width":526,"text":"点击下落到对应颜色区域","height":78,"fontSize":45,"font":"SimHei","color":"#ffffff"}}]}],"animations":[{"nodes":[{"target":23,"keyframes":{"x":[{"value":360,"tweenMethod":"linearNone","tween":true,"target":23,"key":"x","index":0}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":23,"key":"rotation","index":0},{"value":180,"tweenMethod":"linearNone","tween":true,"target":23,"key":"rotation","index":30},{"value":360,"tweenMethod":"linearNone","tween":true,"target":23,"key":"rotation","index":60}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			
		    this.btn_start=null;
		    this.btn_share=null;

			GameOverUI.__super.call(this);
		}

		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"y":926,"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":253,"x":-2}},{"type":"Button","props":{"y":0,"x":220,"width":280,"var":"btn_start","stateNum":1,"skin":"Game/img_button.png","labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","label":"重新开始","height":92}},{"type":"Button","props":{"y":136,"x":220,"width":280,"visible":false,"var":"btn_share","stateNum":1,"skin":"Game/img_button.png","labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","label":"邀请好友","height":92}}]}]};
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
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);

		}

		GameStartUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"x":-280,"width":1280,"height":1280,"alpha":0.5},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1280,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":396,"x":-6,"skin":"Game/title-sheet0.png"}},{"type":"Button","props":{"y":957,"x":220,"width":280,"var":"btn_start","stateNum":1,"skin":"Game/img_button.png","labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","label":"开始游戏","height":92}},{"type":"Button","props":{"y":1083,"x":220,"width":280,"var":"btn_share","stateNum":1,"skin":"Game/img_button.png","labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","label":"邀请好友","height":92}},{"type":"Text","props":{"y":1209,"x":20,"width":180,"text":"v1.0","height":63,"fontSize":25,"font":"SimHei","color":"#ffffff"}}]}]};
		return GameStartUI;
	})(View);