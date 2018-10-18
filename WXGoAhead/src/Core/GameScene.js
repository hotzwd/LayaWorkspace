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
    _proto.curCar = null;                                                    //当前汽车
    _proto.gameBox = null;                                                   //游戏层
  

    _proto.Init = function () {
        
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
        }

        this.gameBox = new Laya.Box();
        this.gameBox.width = Laya.stage.width;
        this.gameBox.height = Laya.stage.height;
        this.gameBox.zOrder = 10;
        this.gameBox.mouseEnabled = true;
        
        Laya.stage.addChild(this.gameBox);


        
        // this.gameUI.moveBox.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        // this.gameUI.moveBox.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);

        //自动适配完后初始化
        Laya.timer.frameOnce(8, this, this.delayInitShow);
        // this.delayInitShow();

        this.startGame();
       
    }

    _proto.onDestroy = function () {

    }

    //自动适配完后初始化
     _proto.delayInitShow = function () {
        this.curCar = new Car();
        var t_carPoint = this.gameUI.moveBox.localToGlobal(new Point(this.gameUI.img_car.x,this.gameUI.img_car.y),true);
        t_carPoint.x += 40;
        this.curCar.pos(t_carPoint.x,t_carPoint.y);

        var t_stationPoint = this.gameUI.moveBox.localToGlobal(new Point(this.gameUI.img_station.x,this.gameUI.img_station.y),true);
        this.curCar.initCar(t_carPoint,t_stationPoint);

        this.gameBox.addChild(this.curCar);
     }

    /**开始游戏 */
    _proto.startGame = function () {
         Laya.timer.frameLoop(1, this, this.onUpdate);

        //  wxGame.getInstance().showAD(2);
    }

    /**重置游戏 */
    _proto.restartGame = function(_score){
       

        
    }
    /**游戏结束 */
    _proto.gameover = function(){
        wxGame.getInstance().showAD(0);
        UIManager.getInstance().showUI("GameOverUI");
        
    }
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.curCar != null){
            this.curCar.onUpdate();
        }

    }

    
    /**按下监听事件 */
    _proto._mouseDowmEvent = function(_event){
        var tarPos = this.heroBox.globalToLocal(new Point(_event.stageX,_event.stageY));
    }
    /**按下移动监听事件 */
    _proto._mouseMoveEvent = function(_event){
        var tarPos = this.heroBox.globalToLocal(new Point(_event.stageX,_event.stageY));
        
    }


  

    return GameScene;
})();