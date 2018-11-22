var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.t_level=null;
		    this.gameLayer=null;
		    this.end_step=null;
		    this.start_step=null;
		    this.pro_push=null;
		    this.t_gamescore=null;

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

		GameUI.uiView={"type":"View","props":{"width":480,"height":854,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":480,"height":845,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":-98,"x":0,"width":480,"skin":"Game/bggame-sheet0.png","height":1040,"centerX":0}},{"type":"Image","props":{"y":113,"x":136,"skin":"Game/bgplay-sheet0.png"}},{"type":"Text","props":{"y":124,"x":168,"width":143,"var":"t_level","text":"9","height":41,"fontSize":35,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Box","props":{"y":695,"x":-114,"name":"floorCloud"},"child":[{"type":"Image","props":{"y":5,"x":332,"skin":"Game/nubeg-sheet0.png","scaleY":1.2,"scaleX":1.2,"name":"cloud2"}},{"type":"Image","props":{"x":324,"skin":"Game/nubeg-sheet0.png","scaleY":1.2,"scaleX":-1.2,"name":"cloud1"}}]},{"type":"Box","props":{"y":0,"x":0,"width":480,"var":"gameLayer","mouseEnabled":true,"height":845,"centerY":0,"centerX":0},"child":[{"type":"Step","props":{"y":278,"x":240,"visible":false,"var":"end_step","runtime":"ui.StepUI"}},{"type":"Step","props":{"y":627,"x":240,"visible":false,"var":"start_step","runtime":"ui.StepUI"}},{"type":"ProgressBar","props":{"y":672,"x":239,"visible":false,"var":"pro_push","value":1,"skin":"Game/progress.png","anchorY":0.5,"anchorX":0.5,"sizeGrid":"3,3,3,3"}}]},{"type":"Box","props":{"y":634,"x":42,"name":"step"},"child":[{"type":"Image","props":{"y":-28,"x":113,"visible":false,"skin":"Game/columna-sheet0.png","name":"step1"}},{"type":"Image","props":{"y":72,"skin":"Game/columna-sheet0.png","name":"step2"}},{"type":"Image","props":{"y":100,"x":227,"skin":"Game/columna-sheet0.png","name":"step3"}}]},{"type":"Box","props":{"y":647,"x":-71,"name":"topCloud"},"child":[{"type":"Image","props":{"y":175,"x":11,"skin":"Game/nubeg-sheet0.png","scaleY":1.2,"scaleX":1.2,"name":"cloud4"}},{"type":"Image","props":{"y":146,"x":589,"skin":"Game/nubeg-sheet0.png","scaleY":1.2,"scaleX":-1.2,"name":"cloud3"}},{"type":"Image","props":{"x":67,"width":488,"skin":"Game/fade2-sheet0.png","name":"white","height":309}}]},{"type":"Image","props":{"y":-115,"x":14,"width":429,"skin":"Game/lianas_up-sheet0.png","name":"grass","height":428}},{"type":"Text","props":{"y":34,"x":59,"width":143,"var":"t_gamescore","text":"999999","height":30,"fontSize":30,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Image","props":{"y":29,"x":14,"skin":"Game/crown-sheet0.png"}}]}]};
		return GameUI;
	})(View);
var GameOverUI=(function(_super){
		function GameOverUI(){
			

			GameOverUI.__super.call(this);
		}

		CLASS$(GameOverUI,'ui.GameOverUI',_super);
		var __proto__=GameOverUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameOverUI.uiView);

		}

		GameOverUI.uiView={"type":"View","props":{"width":480,"height":854}};
		return GameOverUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			

			GameStartUI.__super.call(this);
		}

		CLASS$(GameStartUI,'ui.GameStartUI',_super);
		var __proto__=GameStartUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);

		}

		GameStartUI.uiView={"type":"View","props":{"width":480,"height":854,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":-98,"alpha":0.7},"child":[{"type":"Rect","props":{"width":480,"lineWidth":1,"height":1040,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":132,"x":56,"skin":"Game/menutitulo-sheet0.png"}},{"type":"Image","props":{"y":421,"x":185,"skin":"Game/btncont-sheet0.png"}}]};
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