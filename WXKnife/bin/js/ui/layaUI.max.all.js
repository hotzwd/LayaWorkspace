var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.ani1=null;
		    this.ani2=null;
		    this.t_level=null;
		    this.gameLayer=null;
		    this.end_step=null;
		    this.start_step=null;
		    this.pro_push=null;
		    this.stepBox=null;
		    this.cloudBox=null;
		    this.t_gamescore=null;
		    this.guidBox=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);
			View.regComponent("ui.StepUI",ui.StepUI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":480,"height":854,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":480,"height":845,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":-98,"x":0,"width":480,"skin":"Game/bggame-sheet0.png","height":1040,"centerX":0}},{"type":"Image","props":{"y":113,"x":136,"skin":"Game/bgplay-sheet0.png"}},{"type":"Text","props":{"y":124,"x":168,"width":143,"var":"t_level","text":"9","height":41,"fontSize":35,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Box","props":{"y":695,"x":-114,"name":"floorCloud"},"compId":23,"child":[{"type":"Image","props":{"y":5,"x":332,"skin":"Game/nubeg-sheet0.png","scaleY":1.2,"scaleX":1.2,"name":"cloud2"}},{"type":"Image","props":{"x":324,"skin":"Game/nubeg-sheet0.png","scaleY":1.2,"scaleX":-1.2,"name":"cloud1"}}]},{"type":"Box","props":{"y":0,"x":0,"width":480,"var":"gameLayer","mouseEnabled":true,"height":845,"centerY":0,"centerX":0},"child":[{"type":"Step","props":{"y":344,"x":240,"visible":false,"var":"end_step","runtime":"ui.StepUI"}},{"type":"Step","props":{"y":627,"x":240,"visible":false,"var":"start_step","runtime":"ui.StepUI"}},{"type":"ProgressBar","props":{"y":672,"x":239,"visible":false,"var":"pro_push","value":1,"skin":"Game/progress.png","anchorY":0.5,"anchorX":0.5,"sizeGrid":"3,3,3,3"}}]},{"type":"Box","props":{"y":634,"x":42,"var":"stepBox"},"child":[{"type":"Image","props":{"y":-28,"x":113,"visible":false,"skin":"Game/columna-sheet0.png","name":"step1"}},{"type":"Image","props":{"y":72,"skin":"Game/columna-sheet0.png","name":"step2"}},{"type":"Image","props":{"y":100,"x":227,"skin":"Game/columna-sheet0.png","name":"step3"}}]},{"type":"Box","props":{"y":647,"x":-71,"var":"cloudBox"},"compId":21,"child":[{"type":"Image","props":{"y":175,"x":11,"skin":"Game/nubeg-sheet0.png","scaleY":1.2,"scaleX":1.2,"name":"cloud4"}},{"type":"Image","props":{"y":146,"x":589,"skin":"Game/nubeg-sheet0.png","scaleY":1.2,"scaleX":-1.2,"name":"cloud3"}},{"type":"Image","props":{"x":67,"width":488,"skin":"Game/fade2-sheet0.png","name":"white","height":309}}]},{"type":"Image","props":{"y":-115,"x":14,"width":429,"skin":"Game/lianas_up-sheet0.png","name":"grass","height":428},"compId":25},{"type":"Text","props":{"y":34,"x":59,"width":143,"var":"t_gamescore","text":"999999","height":30,"fontSize":30,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Image","props":{"y":29,"x":14,"skin":"Game/crown-sheet0.png"}}]},{"type":"Box","props":{"width":480,"visible":false,"var":"guidBox","height":845,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":-98,"x":0,"alpha":0.5},"child":[{"type":"Rect","props":{"width":480,"lineWidth":1,"height":1040,"fillColor":"#000000"}}]},{"type":"Text","props":{"y":411,"x":99,"text":"按压选择力度,抬起释放","fontSize":30,"font":"SimHei","color":"#ffffff"}},{"type":"Image","props":{"y":474,"x":208,"skin":"Game/guide1.png"}}]}],"animations":[{"nodes":[{"target":25,"keyframes":{"y":[{"value":-115,"tweenMethod":"linearNone","tween":true,"target":25,"key":"y","index":0},{"value":-105,"tweenMethod":"linearNone","tween":true,"target":25,"key":"y","index":15},{"value":-115,"tweenMethod":"linearNone","tween":true,"target":25,"key":"y","index":30}]}}],"name":"ani1","id":1,"frameRate":24,"action":0},{"nodes":[{"target":23,"keyframes":{"x":[{"value":-114,"tweenMethod":"linearNone","tween":true,"target":23,"key":"x","index":0},{"value":-104,"tweenMethod":"linearNone","tween":true,"target":23,"key":"x","index":30},{"value":-114,"tweenMethod":"linearNone","tween":true,"target":23,"key":"x","index":60}]}},{"target":21,"keyframes":{"x":[{"value":-71,"tweenMethod":"linearNone","tween":true,"target":21,"key":"x","index":0},{"value":-51,"tweenMethod":"linearNone","tween":true,"target":21,"key":"x","index":30},{"value":-71,"tweenMethod":"linearNone","tween":true,"target":21,"key":"x","index":60}]}}],"name":"ani2","id":2,"frameRate":24,"action":0}]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			
		    this.ani1=null;
		    this.btn_close=null;
		    this.t_gamescore=null;
		    this.t_highScore=null;
		    this.btn_share=null;

			GameOverUI.__super.call(this);
		}

		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"width":480,"height":854},"child":[{"type":"Box","props":{"width":480,"height":845,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":-98,"x":0,"alpha":0.7},"child":[{"type":"Rect","props":{"width":480,"lineWidth":1,"height":1040,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":182,"x":73,"skin":"Game/bgcomplete-sheet0.png"}},{"type":"Image","props":{"y":530,"x":237,"var":"btn_close","skin":"Game/btntryagain-sheet0.png","rotation":-4,"anchorY":0.5,"anchorX":0.5},"compId":7},{"type":"Text","props":{"y":353,"x":163,"width":143,"var":"t_gamescore","text":"999999","height":30,"fontSize":30,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Text","props":{"y":423,"x":164,"width":143,"var":"t_highScore","text":"999999","height":30,"fontSize":30,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Button","props":{"y":512,"x":89,"width":70,"var":"btn_share","stateNum":1,"skin":"Game/btn_bg.png","labelSize":20,"labelFont":"SimHei","labelColors":"#ffffff","labelAlign":"center","label":"分享 ","height":70}}]}],"animations":[{"nodes":[{"target":7,"keyframes":{"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"rotation","index":0},{"value":10,"tweenMethod":"linearNone","tween":true,"target":7,"key":"rotation","index":10},{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"rotation","index":20},{"value":-10,"tweenMethod":"linearNone","tween":true,"target":7,"key":"rotation","index":30},{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"rotation","index":40}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
		return GameOverUI;
	})(View);
var GameRankUI=(function(_super){
		function GameRankUI(){
			
		    this.gameoverPanel=null;
		    this.RankList=null;
		    this.playerItem=null;
		    this.listName=null;
		    this.close=null;

			GameRankUI.__super.call(this);
		}

		CLASS$(GameRankUI,'ui.GameRankUI',_super);
		var __proto__=GameRankUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameRankUI.uiView);

		}

		GameRankUI.uiView={"type":"View","props":{"width":480,"height":845,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":480,"visible":true,"var":"gameoverPanel","height":1040,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":0,"x":0,"alpha":0.7},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":480,"lineWidth":1,"height":1040,"fillColor":"#050505"}}]},{"type":"Box","props":{"scaleY":0.6,"scaleX":0.6,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":12,"x":0,"width":618,"skin":"Game/rankBg.png","sizeGrid":"10,10,10,10","height":728},"child":[{"type":"List","props":{"y":89,"x":6,"width":610,"visible":false,"var":"RankList","spaceY":5,"selectEnable":false,"repeatY":6,"repeatX":1,"height":536},"child":[{"type":"Box","props":{"y":0,"x":0,"width":574,"var":"playerItem","renderType":"render","height":85},"child":[{"type":"Label","props":{"y":40,"x":36,"width":35,"text":"99","name":"rankIndex","height":36,"fontSize":30,"font":"SimHei","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":23,"x":135,"width":205,"text":"玩家名字七个字","name":"playerName","height":40,"fontSize":25,"font":"SimHei"}},{"type":"Label","props":{"y":25,"x":350,"width":116,"text":"9999999","name":"playerScore","height":30,"fontSize":25,"font":"SimHei","color":"#ff0000","align":"center"}},{"type":"Label","props":{"y":26,"x":471,"width":116,"text":"青铜卫士","name":"playerTitle","height":30,"fontSize":25,"font":"SimHei","color":"#010101","align":"center"}}]}]},{"type":"Label","props":{"y":21,"var":"listName","text":"好友排行","fontSize":35,"font":"SimHei","color":"#ffffff","centerX":-7}},{"type":"Label","props":{"y":669,"x":306,"text":"每周一更新排名","fontSize":26,"font":"SimHei","color":"#ffffff","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-2,"x":577,"var":"close","skin":"Game/close.png"}}]}]}]};
		return GameRankUI;
	})(View);
var GameSharedUI=(function(_super){
		function GameSharedUI(){
			
		    this.aniShare=null;
		    this.btn_shard=null;
		    this.btn_cancel=null;

			GameSharedUI.__super.call(this);
		}

		CLASS$(GameSharedUI,'ui.GameSharedUI',_super);
		var __proto__=GameSharedUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameSharedUI.uiView);

		}

		GameSharedUI.uiView={"type":"View","props":{"width":480,"height":845,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":480,"visible":true,"height":1040,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":0,"x":0,"alpha":0.7},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":480,"lineWidth":1,"height":1040,"fillColor":"#050505"}}]},{"type":"Button","props":{"y":487,"x":242,"var":"btn_shard","stateNum":1,"skin":"Game/fuhuo.png","scaleY":0.6,"scaleX":0.6,"labelSize":30,"labelPadding":"0,0,10,0","labelFont":"SimHei","labelColors":"#ffffff","anchorY":0.5,"anchorX":0.5},"compId":78},{"type":"Button","props":{"y":564,"x":243,"width":148,"var":"btn_cancel","scaleY":0.6,"scaleX":0.6,"mouseEnabled":true,"labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"label":"点击跳过","height":44,"anchorY":0.5,"anchorX":0.5}}]}],"animations":[{"nodes":[{"target":78,"keyframes":{"scaleY":[{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":15},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":30}],"scaleX":[{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":15},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":30}]}}],"name":"aniShare","id":1,"frameRate":24,"action":0}]};
		return GameSharedUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
		    this.ani1=null;
		    this.ani2=null;
		    this.btn_start=null;
		    this.btn_share=null;
		    this.btn_rank=null;

			GameStartUI.__super.call(this);
		}

		CLASS$(GameStartUI,'ui.GameStartUI',_super);
		var __proto__=GameStartUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);

		}

		GameStartUI.uiView={"type":"View","props":{"width":480,"height":854,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":480,"height":845,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":-98,"x":0,"alpha":0.5},"child":[{"type":"Rect","props":{"width":480,"lineWidth":1,"height":1040,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":100,"x":56,"skin":"Game/menutitulo-sheet0.png"},"compId":4},{"type":"Image","props":{"y":481,"x":250,"var":"btn_start","skin":"Game/btncont-sheet0.png","anchorY":0.5,"anchorX":0.5},"compId":5},{"type":"Text","props":{"y":791,"x":26,"text":"V1.0","fontSize":25,"font":"SimHei","color":"#ffffff"}},{"type":"Button","props":{"y":642,"x":114,"width":80,"var":"btn_share","stateNum":1,"skin":"Game/btn_bg.png","labelSize":20,"labelPadding":"-2,0,0,-2","labelFont":"SimHei","labelColors":"#ffffff","labelAlign":"center","label":"分享 ","height":80,"anchorY":0.5,"anchorX":0.5},"compId":8},{"type":"Button","props":{"y":660,"x":362,"width":80,"var":"btn_rank","stateNum":1,"skin":"Game/btn_bg.png","labelSize":20,"labelPadding":"-2,0,0,-2","labelFont":"SimHei","labelColors":"#ffffff","labelAlign":"center","label":"排行","height":80,"anchorY":0.5,"anchorX":0.5},"compId":9}]}],"animations":[{"nodes":[{"target":5,"keyframes":{"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":0},{"value":20,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":10},{"value":0,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":20},{"value":-20,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":30},{"value":0,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":40}]}},{"target":4,"keyframes":{"y":[{"value":100,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":0},{"value":120,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":20},{"value":100,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":40}]}}],"name":"ani1","id":1,"frameRate":24,"action":0},{"nodes":[{"target":8,"keyframes":{"y":[{"value":642,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":0},{"value":652,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":10},{"value":642,"tweenMethod":"linearNone","tween":true,"target":8,"key":"y","index":20}]}},{"target":9,"keyframes":{"y":[{"value":660,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":0},{"value":675,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":10},{"value":660,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":20}]}}],"name":"ani2","id":2,"frameRate":24,"action":0}]};
		return GameStartUI;
	})(View);
var StepUI=(function(_super){
		function StepUI(){
			
		    this.img_step=null;
		    this.t_level=null;
		    this.img_shadow=null;

			StepUI.__super.call(this);
		}

		CLASS$(StepUI,'ui.StepUI',_super);
		var __proto__=StepUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(StepUI.uiView);

		}

		StepUI.uiView={"type":"View","props":{"y":25,"x":83,"width":166,"height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":7,"x":1,"var":"img_step","skin":"Game/suelo1-sheet0.png","name":"img_step"}},{"type":"Text","props":{"y":20,"x":61,"width":36,"var":"t_level","text":"999","name":"t_level","height":20,"fontSize":15,"font":"SimHei","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":13,"x":79,"var":"img_shadow","skin":"Game/shadow-sheet0.png","name":"img_shadow","anchorY":0.5,"anchorX":0.5}}]};
		return StepUI;
	})(View);