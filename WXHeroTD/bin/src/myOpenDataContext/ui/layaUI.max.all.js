var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameRankUI=(function(_super){
		function GameRankUI(){
			
		    this.gameoverPanel=null;
		    this.RankList=null;
		    this.playerItem=null;
		    this.close=null;

			GameRankUI.__super.call(this);
		}

		CLASS$(GameRankUI,'ui.PuzzleBobble.GameRankUI',_super);
		var __proto__=GameRankUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameRankUI.uiView);

		}

		GameRankUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"visible":true,"var":"gameoverPanel","centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"width":1280,"skin":"game/bg_heise.png","sizeGrid":"5,5,5,5","height":1280}},{"type":"Box","props":{"y":212,"x":334},"child":[{"type":"Image","props":{"y":12,"skin":"game/rank_bg.png"},"child":[{"type":"List","props":{"y":77,"x":20,"width":577,"var":"RankList","spaceY":5,"selectEnable":false,"repeatX":1,"height":636},"child":[{"type":"Box","props":{"y":0,"x":0,"width":574,"var":"playerItem","renderType":"render","height":85},"child":[{"type":"Line","props":{"y":83,"x":0,"toY":0,"toX":574,"lineWidth":3,"lineColor":"#999595"}},{"type":"Image","props":{"y":10,"x":10,"skin":"game/No.1.png","name":"rankIcon"}},{"type":"Image","props":{"y":10,"x":125,"skin":"game/No.1.png","name":"playerIcon"}},{"type":"Label","props":{"y":37,"x":45,"text":"1","name":"rankIndex","fontSize":36,"font":"SimHei","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":23,"x":244,"text":"玩家名字","name":"playerName","fontSize":36,"font":"SimHei"}},{"type":"Label","props":{"y":23,"x":447,"text":"9999","name":"playerScore","fontSize":36,"font":"SimHei","color":"#ff0000","align":"center"}}]}]},{"type":"Label","props":{"y":8,"x":213,"text":"好友排行","fontSize":50,"font":"SimHei","color":"#ffffff","bold":true}}]},{"type":"Image","props":{"x":572,"var":"close","skin":"game/close.png"}}]}]}]};
		return GameRankUI;
	})(View);