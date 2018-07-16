var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.moveBox=null;
		    this.centerBox=null;
		    this.t_score=null;
		    this.s_hero=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":814,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":814,"lineWidth":1,"height":1556,"fillColor":"#f4ff00"}}]},{"type":"Box","props":{"width":720,"var":"moveBox","mouseEnabled":true,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"game/beijing.jpg","height":1280}},{"type":"Box","props":{"y":685,"x":360,"width":264,"visible":false,"var":"centerBox","height":264,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Sprite","props":{"y":132,"x":132,"width":0,"height":0},"child":[{"type":"Circle","props":{"y":0,"x":0,"radius":150,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Text","props":{"y":119,"x":355,"width":552,"var":"t_score","text":"0","pivotY":40,"pivotX":277,"height":76,"font":"shuzi","align":"center"}}]},{"type":"Sprite","props":{"y":963,"x":361,"width":112,"visible":false,"var":"s_hero","pivotY":55,"pivotX":55,"height":110},"child":[{"type":"Animation","props":{"y":56,"x":50,"width":385,"source":"hero/gailun-01.png","pivotY":155,"pivotX":180,"height":294,"autoPlay":true}}]}]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			
		    this.img_highScore=null;
		    this.t_score=null;
		    this.t_highScore=null;
		    this.t_title=null;
		    this.btn_playAgain=null;
		    this.btn_shared=null;
		    this.btn_rank=null;

			GameOverUI.__super.call(this);
		}

		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":30,"x":30,"width":814,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":-3,"x":0,"alpha":0.9},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":814,"lineWidth":1,"height":1556,"fillColor":"#050505"}}]},{"type":"Image","props":{"y":196,"x":255,"var":"img_highScore","skin":"game/zuigaofen.png"}},{"type":"Text","props":{"y":441,"x":224,"text":"当前得分:","fontSize":35,"font":"SimHei"}},{"type":"Text","props":{"y":441,"x":404,"width":302,"var":"t_score","text":"9999999","height":40,"fontSize":35,"font":"SimHei"}},{"type":"Text","props":{"y":320,"x":131,"width":552,"var":"t_highScore","text":"0","height":101,"font":"shuzi","align":"center"}},{"type":"Image","props":{"y":517,"x":165,"skin":"game/huodechenghao-di.png"}},{"type":"Text","props":{"y":528,"x":238,"text":"获得称号:","fontSize":35,"font":"SimHei","color":"#eacd83"}},{"type":"Text","props":{"y":528,"x":409,"width":203,"var":"t_title","text":"青铜守卫","fontSize":35,"font":"SimHei","color":"#eacd83","align":"center"}},{"type":"Button","props":{"y":1186,"x":273,"var":"btn_playAgain","stateNum":2,"skin":"game/btn_zaiwanyici.png"}},{"type":"Button","props":{"y":1055,"x":273,"var":"btn_shared","stateNum":2,"skin":"game/btn_xuanyaodefen.png"}},{"type":"Button","props":{"y":1315,"x":259,"width":297,"var":"btn_rank","labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","label":"查看全部排行","height":58}}]}]};
		return GameOverUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
		    this.guildBox=null;
		    this.startBox=null;
		    this.btn_start=null;

			GameStartUI.__super.call(this);
		}

		CLASS$(GameStartUI,'ui.GameStartUI',_super);
		var __proto__=GameStartUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);

		}

		GameStartUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":814,"visible":false,"var":"guildBox","mouseEnabled":true,"height":1556,"centerY":0,"centerX":0,"cacheAs":"bitmap"},"child":[{"type":"Sprite","props":{"y":0,"x":0,"name":"s_mask","alpha":0.8},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":814,"lineWidth":1,"height":1556,"fillColor":"#050505"}}]},{"type":"Image","props":{"y":1044,"x":562,"skin":"game/jiantou.png"}},{"type":"Image","props":{"y":1039,"x":231,"skin":"game/jiantou.png","scaleX":-1}},{"type":"Text","props":{"y":1327,"x":300,"text":"点击任意位置开始","fontSize":30,"font":"SimHei","color":"#ffffff"}},{"type":"Text","props":{"y":573,"x":90,"text":"点击或滑动英雄来击退敌人，保护水晶不被破坏","fontSize":30,"font":"SimHei","color":"#ffffff"}}]},{"type":"Box","props":{"y":-128,"x":-37,"width":814,"var":"startBox","height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.9},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":814,"lineWidth":1,"height":1556,"fillColor":"#050505"}}]},{"type":"Image","props":{"y":404,"x":191,"skin":"game/logo.png"}},{"type":"Button","props":{"y":803,"x":257,"var":"btn_start","stateNum":1,"skin":"game/btn_kaishianniu.png"}}]}]};
		return GameStartUI;
	})(View);