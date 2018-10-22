var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.aniCloud=null;
		    this.moveBox=null;
		    this.t_score=null;
		    this.img_cloud1=null;
		    this.img_cloud2=null;
		    this.img_cloud3=null;
		    this.img_tree1=null;
		    this.img_tree2=null;
		    this.img_tree3=null;
		    this.img_car=null;
		    this.anim_cat=null;
		    this.box_floor=null;
		    this.img_floorLeft=null;
		    this.img_flootRight=null;
		    this.img_station=null;
		    this.img_tip=null;
		    this.t_name=null;
		    this.img_stone=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":1136,"height":640,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1368,"visible":false,"height":640,"centerY":0,"centerX":0},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1386,"lineWidth":1,"height":640,"fillColor":"#f4ff00"}}]},{"type":"Box","props":{"width":1136,"var":"moveBox","mouseEnabled":true,"height":640,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"skin":"game_resoure/background.jpg","centerY":0,"centerX":0}},{"type":"Text","props":{"y":67,"x":226,"width":199,"var":"t_score","text":"0","pivotY":40,"pivotX":277,"height":76,"font":"shuzi","align":"center"}},{"type":"Image","props":{"y":200,"x":255,"var":"img_cloud1","skin":"game_resoure/cloud.png","anchorY":0.5,"anchorX":0.5},"compId":32},{"type":"Image","props":{"y":175,"x":484,"var":"img_cloud2","skin":"game_resoure/cloudRain.png","anchorY":0.5,"anchorX":0.5},"compId":33},{"type":"Image","props":{"y":209,"x":731,"var":"img_cloud3","skin":"game_resoure/cloudThunder.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":271,"x":276,"var":"img_tree1","skin":"game_resoure/tree1.png"}},{"type":"Image","props":{"y":237,"x":415,"var":"img_tree2","skin":"game_resoure/tree0.png"}},{"type":"Image","props":{"y":337,"x":759,"var":"img_tree3","skin":"game_resoure/tree2.png"}},{"type":"Image","props":{"y":435,"x":247,"visible":false,"var":"img_car","skin":"game_resoure/car0.png","anchorY":0.5,"anchorX":0.5}},{"type":"Animation","props":{"y":40,"x":-70,"width":173,"visible":false,"var":"anim_cat","source":"game_resoure/AD_animation_1.png,game_resoure/AD_animation_2.png","interval":200,"height":189,"autoPlay":true}},{"type":"Box","props":{"y":478,"x":155,"width":890,"var":"box_floor","height":160},"child":[{"type":"Image","props":{"y":3,"var":"img_floorLeft","skin":"game_resoure/groundLeft.png"}},{"type":"Image","props":{"x":492,"var":"img_flootRight","skin":"game_resoure/groundRight.png"}}]},{"type":"Image","props":{"y":368,"x":937,"var":"img_station","skin":"game_resoure/signpost.png"}},{"type":"Text","props":{"y":392,"x":953,"width":34,"text":"1","height":30,"fontSize":30,"font":"SimHei","color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":223,"x":823,"var":"img_tip","skin":"game_resoure/tip-bg.png"},"child":[{"type":"Text","props":{"y":11,"x":7,"wordWrap":true,"width":166,"var":"t_name","valign":"middle","text":"点击汽车->车开到1站牌->过关","leading":8,"height":77,"fontSize":20,"font":"SimHei","color":"#000000","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":422,"x":664,"var":"img_stone","skin":"game_resoure/stone.png","anchorY":0.5,"anchorX":0.5}}]}],"animations":[{"nodes":[{"target":33,"keyframes":{"x":[{"value":484,"tweenMethod":"linearNone","tween":true,"target":33,"key":"x","index":0},{"value":488,"tweenMethod":"linearNone","tween":true,"target":33,"key":"x","index":20},{"value":484,"tweenMethod":"linearNone","tween":true,"target":33,"key":"x","index":35},{"value":480,"tweenMethod":"linearNone","tween":true,"target":33,"key":"x","index":55},{"value":484,"tweenMethod":"linearNone","tween":true,"target":33,"key":"x","index":80}]}},{"target":32,"keyframes":{"x":[{"value":255,"tweenMethod":"linearNone","tween":true,"target":32,"key":"x","index":0},{"value":250,"tweenMethod":"linearNone","tween":true,"target":32,"key":"x","index":30},{"value":255,"tweenMethod":"linearNone","tween":true,"target":32,"key":"x","index":60}]}}],"name":"aniCloud","id":1,"frameRate":24,"action":0}]};
		return GameUI;
	})(View);