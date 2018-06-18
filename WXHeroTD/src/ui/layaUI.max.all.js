var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.moveBox=null;
		    this.centerBox=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":640,"height":1008,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":640,"height":1386,"centerY":0,"centerX":0},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":640,"lineWidth":1,"height":1386,"fillColor":"#f4ff00"}}]},{"type":"Box","props":{"width":640,"var":"moveBox","mouseEnabled":true,"height":1008,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"skin":"game/loading_ky_zgtz.jpg","height":1008}},{"type":"Sprite","props":{"y":636,"x":122,"width":110,"height":110},"child":[{"type":"Image","props":{"y":0,"x":0,"width":110,"skin":"hero/tower_pichengnvjing_attack_0000.png","height":95}}]},{"type":"Box","props":{"y":504,"x":320,"width":264,"visible":true,"var":"centerBox","height":264,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Sprite","props":{"y":132,"x":132,"width":0,"height":0},"child":[{"type":"Circle","props":{"y":0,"x":0,"radius":80,"lineWidth":1,"fillColor":"#ff0000"}}]},{"type":"Animation","props":{"y":0,"x":0,"visible":false,"source":"tower/tower_10_idle02_10000.png,tower/tower_10_idle02_10001.png,tower/tower_10_idle02_10002.png,tower/tower_10_idle02_10003.png,tower/tower_10_idle02_10004.png,tower/tower_10_idle02_10005.png","interval":150,"autoPlay":true}}]}]},{"type":"Box","props":{"top":0,"left":0},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":238,"lineWidth":1,"height":80,"fillColor":"#ff0000"}}]},{"type":"Sprite","props":{"y":295,"x":344,"width":110,"pivotY":55,"pivotX":55,"height":110},"child":[{"type":"Animation","props":{"y":55,"x":55,"width":281,"source":"monster/npc_102_walk_r_0001.png,monster/npc_102_walk_r_0002.png,monster/npc_102_walk_r_0003.png,monster/npc_102_walk_r_0004.png","pivotY":140,"pivotX":140,"height":281,"autoPlay":true}}]}]};
		return GameUI;
	})(View);