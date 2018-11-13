/**
 * 游戏场景
 */
var GameScene = (function (_super) {


    Laya.class(GameScene, "Core.GameScene", _super);
    _proto = GameScene.prototype;

    function GameScene() {
        // GameScene.super(this);
        this.Init();
    }

    _proto.gameUI = null;                                                    //ui对象
    _proto.gameBox = null;                                                   //游戏层
  

    _proto.Init = function () {
        
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
            this.gameUI.visible = false;
        }

        this.gameBox = new Laya.Box();
        this.gameBox.width = Laya.stage.width;
        this.gameBox.height = Laya.stage.height;
        this.gameBox.zOrder = 10;
        this.gameBox.mouseEnabled = true;
        this.gameBox.mouseThrough = true;
        
        Laya.stage.addChild(this.gameBox);


        this.curLevelIndex = 0;
        // this.curLevelIndex = 1;
        
        // this.gameUI.moveBox.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        // Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);

        //自动适配完后初始化
        Laya.timer.frameOnce(8, this, this.delayInitShow);
        // this.delayInitShow();

        // this.startGame();
       
    }

    _proto.onDestroy = function () {

    }

    //自动适配完后初始化
     _proto.delayInitShow = function () {

        
        this.startGame();

        
     }

    /**开始游戏 */
    _proto.startGame = function () {
         Laya.timer.frameLoop(1, this, this.onUpdate);
         
    }


    /**重置游戏 */
    _proto.restartGame = function(_score){
       

        
    }
    /**游戏结束 */
    _proto.gameover = function(_win){
        // wxGame.getInstance().showAD(0);
        
        Laya.timer.clear(this,this.onUpdate);
        
        
        // var overUI = UIManager.getInstance().showUI("GameOverUI");
        // overUI.initUI(_win);


        
    }
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        // if(this.curCar != null){
        //     this.curCar.onUpdate();
        // }
       
    }



    
    /**按下监听事件 */
    _proto._mouseDowmEvent = function(_event){
        var tarPos = this.heroBox.globalToLocal(new Point(_event.stageX,_event.stageY));
    }
    /**按下移动监听事件 */
    _proto._mouseMoveEvent = function(_event){
        if(this.curRock == null){
            return;
        }
        // Gamelog("---move x="+_event.stageX+",y="+_event.stageY);
        var t_rad = Math.atan2(Laya.stage.height - _event.stageY,Laya.stage.width - _event.stageX) / Math.PI * 180;  //注意参数（y,x） Y在前，X在后
        // Gamelog("---rotation t_rad="+t_rad);
        this.gameBox.rotation = t_rad; 

        if(t_rad >= 6){
            this.gameBox.rotation = 6; 
            this.curGround.off(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
            this.curRock.m_canRotate = true;
            this.curRock.m_autoRotate = true;
            
        }
    }


  

    return GameScene;
})();