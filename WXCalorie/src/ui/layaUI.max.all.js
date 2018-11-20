var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.ani_num=null;
		    this.box_human=null;
		    this.img_human=null;
		    this.t_num=null;
		    this.anim_face=null;
		    this.anim_left=null;
		    this.anim_right=null;
		    this.img_table=null;
		    this.gameLayer=null;
		    this.t_calculate=null;
		    this.plate1=null;
		    this.plate2=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);
			View.regComponent("ui.PlateUI",ui.PlateUI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1366,"height":768,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":1664,"skin":"Game/background.jpg","height":768,"centerY":0,"centerX":0}},{"type":"Box","props":{"y":48,"x":298,"var":"box_human"},"child":[{"type":"Image","props":{"var":"img_human","skin":"Game/human0001.png"}},{"type":"Image","props":{"y":246,"x":290,"skin":"Game/numberBackground.png"}},{"type":"Text","props":{"y":261,"x":317,"width":139,"var":"t_num","text":"9999","height":50,"fontSize":50,"font":"SimHei","color":"#666666","bold":true,"align":"center"},"compId":6},{"type":"Animation","props":{"y":104,"x":314,"var":"anim_face","source":"Face/human_face_Spritesheet6x5_01.png,Face/human_face_Spritesheet6x5_02.png"}},{"type":"Animation","props":{"y":197,"x":236,"var":"anim_left","source":"Left/human_left_Spritesheet5x4_01.png,Left/human_left_Spritesheet5x4_02.png"}},{"type":"Animation","props":{"y":197,"x":414,"var":"anim_right","source":"Right/human_right_Spritesheet5x4_01.png,Right/human_right_Spritesheet5x4_02.png"}}]},{"type":"Image","props":{"y":0,"x":0,"width":1664,"var":"img_table","skin":"Game/table.png","centerY":0,"centerX":0}},{"type":"Box","props":{"width":1664,"var":"gameLayer","height":768,"centerX":0},"child":[{"type":"Text","props":{"y":129,"x":898,"width":527,"visible":false,"var":"t_calculate","text":"9999+9999=99999","height":84,"fontSize":65,"font":"SimHei","color":"#666666","bold":true,"align":"right"}},{"type":"Plate","props":{"y":375,"x":674,"visible":false,"var":"plate1","runtime":"ui.PlateUI"}},{"type":"Plate","props":{"y":375,"x":860,"visible":false,"var":"plate2","runtime":"ui.PlateUI"}}]}]}],"animations":[{"nodes":[{"target":6,"keyframes":{"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":10},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":20}]}}],"name":"ani_num","id":1,"frameRate":24,"action":0}]};
		return GameUI;
	})(View);
var PlateUI=(function(_super){
		function PlateUI(){
			
		    this.img_left=null;
		    this.img_food=null;
		    this.t_num=null;

			PlateUI.__super.call(this);
		}

		CLASS$(PlateUI,'ui.PlateUI',_super);
		var __proto__=PlateUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PlateUI.uiView);

		}

		PlateUI.uiView={"type":"View","props":{"width":127,"height":114},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"Game/plate.png"}},{"type":"Image","props":{"y":74,"x":25,"visible":false,"var":"img_left","skin":"Game/leftover.png"}},{"type":"Image","props":{"y":73,"x":63,"var":"img_food","skin":"Game/food1.png","centerX":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":2,"x":26,"width":77,"var":"t_num","text":"9","height":40,"fontSize":40,"font":"SimHei","color":"#ffffff","align":"center"}}]};
		return PlateUI;
	})(View);