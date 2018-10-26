var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.aniCloud=null;
		    this.ani_tip=null;
		    this.ani_addGold=null;
		    this.moveBox=null;
		    this.t_life=null;
		    this.img_cloud1=null;
		    this.img_cloud2=null;
		    this.img_cloud3=null;
		    this.img_tree1=null;
		    this.img_tree2=null;
		    this.img_tree3=null;
		    this.img_car=null;
		    this.anim_cat=null;
		    this.box_ground=null;
		    this.img_floorLeft=null;
		    this.img_flootRight=null;
		    this.img_station=null;
		    this.t_id=null;
		    this.img_tip=null;
		    this.t_name=null;
		    this.img_stone=null;
		    this.btn_share=null;
		    this.btn_tip=null;
		    this.img_gold=null;
		    this.t_gold=null;
		    this.t_addGold=null;
		    this.btn_guid=null;
		    this.img_showTip=null;
		    this.t_tip=null;
		    this.btn_getGold=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":1136,"height":640,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1386,"var":"moveBox","mouseEnabled":true,"height":640,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1386,"skin":"game_resoure/background.jpg","height":640,"centerY":0,"centerX":0}},{"type":"Text","props":{"y":164,"x":600,"width":113,"var":"t_life","text":"0","pivotY":40,"pivotX":277,"height":33,"fontSize":30,"font":"SimHei","color":"#000000","bold":true,"align":"left"}},{"type":"Text","props":{"y":126,"x":249,"width":79,"text":"生命:","height":30,"fontSize":25,"font":"SimHei","color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":200,"x":380,"var":"img_cloud1","skin":"game_resoure/cloud.png","anchorY":0.5,"anchorX":0.5},"compId":32},{"type":"Image","props":{"y":175,"x":609,"var":"img_cloud2","skin":"game_resoure/cloudRain.png","anchorY":0.5,"anchorX":0.5},"compId":33},{"type":"Image","props":{"y":209,"x":856,"var":"img_cloud3","skin":"game_resoure/cloudThunder.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":271,"x":401,"var":"img_tree1","skin":"game_resoure/tree1.png"}},{"type":"Image","props":{"y":237,"x":540,"var":"img_tree2","skin":"game_resoure/tree0.png"}},{"type":"Image","props":{"y":337,"x":884,"var":"img_tree3","skin":"game_resoure/tree2.png"}},{"type":"Image","props":{"y":435,"x":372,"visible":false,"var":"img_car","skin":"game_resoure/car0.png","anchorY":0.5,"anchorX":0.5}},{"type":"Animation","props":{"y":40,"x":55,"width":173,"visible":false,"var":"anim_cat","source":"game_resoure/AD_animation_1.png,game_resoure/AD_animation_2.png","interval":200,"height":189,"autoPlay":true}},{"type":"Box","props":{"y":558,"x":725,"width":890,"visible":false,"var":"box_ground","height":160,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":3,"var":"img_floorLeft","skin":"game_resoure/groundLeft.png"}},{"type":"Image","props":{"x":492,"var":"img_flootRight","skin":"game_resoure/groundRight.png"}}]},{"type":"Image","props":{"y":368,"x":1062,"var":"img_station","skin":"game_resoure/signpost.png"}},{"type":"Text","props":{"y":392,"x":1078,"width":34,"var":"t_id","text":"1","height":30,"fontSize":30,"font":"SimHei","color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":223,"x":948,"var":"img_tip","skin":"game_resoure/tip-bg.png"},"child":[{"type":"Text","props":{"y":11,"x":7,"wordWrap":true,"width":166,"var":"t_name","valign":"middle","text":"点击汽车->车开到1站牌->过关","leading":8,"height":77,"fontSize":20,"font":"SimHei","color":"#000000","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":422,"x":771,"visible":false,"var":"img_stone","skin":"game_resoure/stone.png","anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":1,"x":510,"var":"btn_share","stateNum":1,"skin":"game_resoure/help-1.png"}},{"type":"Button","props":{"y":2,"x":344,"var":"btn_tip","stateNum":1,"skin":"game_resoure/tip-40-money-1.png"}},{"type":"Image","props":{"y":2,"x":254,"var":"img_gold","skin":"game_resoure/shopping-1.png"},"child":[{"type":"Text","props":{"y":51,"x":11,"width":59,"var":"t_gold","text":"10","height":24,"fontSize":25,"font":"SimHei","color":"#865428","bold":true,"align":"center"}},{"type":"Text","props":{"y":63,"x":43,"width":60,"var":"t_addGold","text":"+10","pivotY":15,"pivotX":30,"height":30,"fontSize":30,"font":"SimHei","color":"#f1d610","bold":true,"alpha":0,"align":"center"},"compId":63}]},{"type":"Button","props":{"y":1,"x":428,"var":"btn_guid","stateNum":1,"skin":"game_resoure/guide_c_1.png"}},{"type":"Image","props":{"y":188,"x":372,"var":"img_showTip","skin":"game_resoure/tip-bg.png","scaleY":0,"scaleX":0,"anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":57,"child":[{"type":"Text","props":{"y":11,"x":7,"wordWrap":true,"width":166,"var":"t_tip","valign":"middle","text":"点击汽车->车开到1站牌->过关","leading":8,"height":77,"fontSize":20,"font":"SimHei","color":"#000000","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":-1,"x":597,"var":"btn_getGold","stateNum":1,"skin":"game_resoure/add_coin_00.png"}},{"type":"Text","props":{"y":611,"x":129,"width":66,"text":"V1.1","height":26,"fontSize":20,"font":"SimHei","color":"#865428","bold":true,"align":"center"}}]}],"animations":[{"nodes":[{"target":33,"keyframes":{"x":[{"value":609,"tweenMethod":"linearNone","tween":true,"target":33,"key":"x","index":0},{"value":619,"tweenMethod":"linearNone","tween":true,"target":33,"key":"x","index":20},{"value":609,"tweenMethod":"linearNone","tween":true,"target":33,"key":"x","index":35},{"value":599,"tweenMethod":"linearNone","tween":true,"target":33,"key":"x","index":55},{"value":609,"tweenMethod":"linearNone","tween":true,"target":33,"key":"x","index":80}]}},{"target":32,"keyframes":{"x":[{"value":380,"tweenMethod":"linearNone","tween":true,"target":32,"key":"x","index":0},{"value":370,"tweenMethod":"linearNone","tween":true,"target":32,"key":"x","index":30},{"value":380,"tweenMethod":"linearNone","tween":true,"target":32,"key":"x","index":60}]}}],"name":"aniCloud","id":1,"frameRate":24,"action":0},{"nodes":[{"target":57,"keyframes":{"scaleY":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":57,"key":"scaleY","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":57,"key":"scaleY","index":60},{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"scaleY","index":70}],"scaleX":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":57,"key":"scaleX","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":57,"key":"scaleX","index":60},{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"scaleX","index":70}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":57,"key":"alpha","index":10},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":57,"key":"alpha","index":60},{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"alpha","index":70}]}}],"name":"ani_tip","id":2,"frameRate":24,"action":0},{"nodes":[{"target":63,"keyframes":{"y":[{"value":63,"tweenMethod":"linearNone","tween":true,"target":63,"key":"y","index":0},{"value":33,"tweenMethod":"linearNone","tween":true,"target":63,"key":"y","index":25}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":63,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":63,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":63,"key":"alpha","index":17},{"value":0,"tweenMethod":"linearNone","tween":true,"target":63,"key":"alpha","index":25}]}}],"name":"ani_addGold","id":3,"frameRate":24,"action":0}]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			
		    this.img_result=null;
		    this.btn_restart=null;
		    this.btn_next=null;
		    this.btn_help=null;
		    this.btn_earn=null;

			GameOverUI.__super.call(this);
		}

		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"width":1136,"height":640,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":20,"x":20,"width":1386,"height":640,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":0,"x":0,"width":1386,"height":640,"centerY":0,"centerX":0,"alpha":0.7},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1386,"lineWidth":1,"height":640,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":140,"x":468,"var":"img_result","skin":"game_resoure/win-bg.png"}},{"type":"Button","props":{"y":210,"x":642,"var":"btn_restart","stateNum":1,"skin":"game_resoure/restart-1.png"}},{"type":"Button","props":{"y":207,"x":761,"var":"btn_next","stateNum":1,"skin":"game_resoure/next-1.png"}},{"type":"Button","props":{"y":211,"x":527,"var":"btn_help","stateNum":1,"skin":"game_resoure/help.png"}},{"type":"Button","props":{"y":204,"x":759,"var":"btn_earn","stateNum":1,"skin":"game_resoure/earn_01.png"}}]}]};
		return GameOverUI;
	})(View);
var GuidGameUI=(function(_super){
		function GuidGameUI(){
			
		    this.ani1=null;
		    this.btn_closeGuid=null;
		    this.img_getGold=null;

			GuidGameUI.__super.call(this);
		}

		CLASS$(GuidGameUI,'ui.GuidGameUI',_super);
		var __proto__=GuidGameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GuidGameUI.uiView);

		}

		GuidGameUI.uiView={"type":"View","props":{"width":1136,"height":640,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":10,"x":10,"width":1386,"height":640,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":0,"x":0,"width":1386,"height":640,"centerY":0,"centerX":0,"alpha":0.7},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1386,"lineWidth":1,"height":640,"fillColor":"#000000"}}]},{"type":"Box","props":{"y":43,"x":316},"child":[{"type":"Image","props":{"skin":"game_resoure/guidance_c.png"}},{"type":"Button","props":{"y":462,"x":40,"var":"btn_closeGuid","stateNum":1,"skin":"game_resoure/back-1.png"}},{"type":"Text","props":{"y":499,"x":401,"width":500,"text":"点击汽车->车开到1站牌->过关","pivotY":20,"pivotX":250,"height":40,"fontSize":35,"font":"SimHei","color":"#000000","bold":true},"compId":8}]},{"type":"Image","props":{"y":159,"x":337,"var":"img_getGold","skin":"game_resoure/hang2.png","mouseEnabled":true}}]}],"animations":[{"nodes":[{"target":8,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"scaleX","index":30}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
		return GuidGameUI;
	})(View);