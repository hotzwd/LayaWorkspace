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
    _proto.curLevelIndex = 0;                                                //当前关卡id
    _proto.curRock = null;                                                   //当前石头
    _proto.curGround = null;                                                 //当前地面
    _proto.curBomb = null;                                                   //当前炸弹
  

    _proto.Init = function () {
        
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
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

        this.gameUI.box_ground.visible = false;
        //创建石头
        this.curRock = new Rock();
        var t_rockPoint = this.gameUI.moveBox.localToGlobal(new Point(this.gameUI.img_stone.x,this.gameUI.img_stone.y),true);
        // t_rockPoint.x += 40;
        this.curRock.pos(t_rockPoint.x,t_rockPoint.y);
        this.curRock.initRock(t_rockPoint);
        this.gameBox.addChild(this.curRock);
        
        //创建车子
        this.curCar = new Car();
        var t_carPoint = this.gameUI.moveBox.localToGlobal(new Point(this.gameUI.img_car.x,this.gameUI.img_car.y),true);
        t_carPoint.x += 40;
        this.curCar.pos(t_carPoint.x,t_carPoint.y);

        var t_stationPoint = this.gameUI.moveBox.localToGlobal(new Point(this.gameUI.img_station.x,this.gameUI.img_station.y),true);
        this.curCar.initCar(t_carPoint,t_stationPoint);

        this.gameBox.addChild(this.curCar);
        
        //创建地面
        this.curGround = new Ground();
        var t_groundPoint = this.gameUI.moveBox.localToGlobal(new Point(this.gameUI.box_ground.x,this.gameUI.box_ground.y),true);
        // t_rockPoint.x += 40;
        this.curGround.pos(t_groundPoint.x,t_groundPoint.y);
        this.curGround.initGround(t_groundPoint);
        this.gameBox.addChild(this.curGround);
        // this.curGround.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);

        // this.initLevelData();
        this.startGame();

        
     }

     //创建炸弹
     _proto.createBomb = function(_point){
        this.curBomb = new Bomb();
        this.curBomb.pos(_point.x,_point.y);
        this.gameBox.addChild(this.curBomb);
     }
     //初始化关卡数据
     _proto.initLevelData = function(){

        this.gameUI.initLevel();
        this.curCar.initLevel();
        this.curRock.initLevel();
        this.curGround.initLevel();

        switch (this.curLevelIndex) {
            case 6:
                this.gameBox.anchorX = 1;
                this.gameBox.anchorY = 1;
                this.gameBox.pos(Laya.stage.width,Laya.stage.height);
                // Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
                this.gameBox.rotation = 0;
                break;
        
            default:
                this.gameBox.anchorX = 0;
                this.gameBox.anchorY = 0;
                this.gameBox.pos(0,0);
                this.gameBox.rotation = 0;
                break;
        }


        
     }
    /**开始游戏 */
    _proto.startGame = function () {
         Laya.timer.frameLoop(1, this, this.onUpdate);
         Laya.timer.frameOnce(1, this, function(){
            this.initLevelData();
         });
         
        //  wxGame.getInstance().showAD(2);
    }

    /**下一个游戏 */
    _proto.nextlevelGame = function(){
        this.curLevelIndex++;
        this.curCar.resetCar();
        this.curRock.resetRock();
        this.curGround.resetGround();

        this.startGame();
    }

    /**重置游戏 */
    _proto.restartGame = function(_score){
       

        
    }
    /**游戏结束 */
    _proto.gameover = function(_win){
        // wxGame.getInstance().showAD(0);
        
        Laya.timer.clear(this,this.onUpdate);
        this.curCar.stopCar();
        this.curRock.stopRock();
        
        var overUI = UIManager.getInstance().showUI("GameOverUI");
        overUI.initUI(_win);


        
    }
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.curCar != null){
            this.curCar.onUpdate();
        }
        if(this.curRock != null){
            this.curRock.onUpdate();
        }
        if(this.curBomb != null){
            this.curBomb.onUpdate();
        }
        if(this.curGround != null){
            this.curGround.onUpdate();
        }

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