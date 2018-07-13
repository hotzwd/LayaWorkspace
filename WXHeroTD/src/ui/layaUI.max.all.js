var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.moveBox=null;
		    this.centerBox=null;
		    this.t_score=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":720,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":720,"lineWidth":1,"height":1556,"fillColor":"#f4ff00"}}]},{"type":"Box","props":{"width":720,"var":"moveBox","mouseEnabled":true,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"game/beijing.jpg","height":1280}},{"type":"Box","props":{"y":685,"x":360,"width":264,"visible":false,"var":"centerBox","height":264,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Sprite","props":{"y":132,"x":132,"width":0,"height":0},"child":[{"type":"Circle","props":{"y":0,"x":0,"radius":150,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Text","props":{"y":79,"x":78,"width":552,"var":"t_score","text":"0","height":101,"font":"shuzi","align":"center"}}]},{"type":"Box","props":{"y":303,"x":182,"width":154,"height":130}},{"type":"Sprite","props":{"y":380,"x":352,"width":112,"visible":false,"pivotY":55,"pivotX":55,"height":110},"child":[{"type":"Animation","props":{"y":56,"x":50,"width":385,"source":"hero/gailun-07.png","pivotY":155,"pivotX":180,"height":294,"autoPlay":true}}]}]};
		return GameUI;
	})(View);