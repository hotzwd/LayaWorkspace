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
    _proto.gameLayer = null;                                                 //游戏层
    _proto.gameScore = 0;                                                    //游戏得分
    _proto.gameLevel = 0;                                                    //游戏等级
    _proto.gameSpeed = 3;                                                    //游戏速度
    _proto.BoxesList = [];                                                  //所有对象列表
    _proto.levelData = null;                                                 //关卡数据
    _proto.gameLive = 3;                                                     //游戏生命
    

    
    _proto.Init = function () {
        
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
            // this.gameUI.visible = false;
        }
        
        // MusicManager.getInstance().playMusic("res/music/1.mp3")

        this.gameLayer = this.gameUI.gameLayer;
        //初始化生成器
        BoxesGenerator.getInstance().initGenerator(this.gameLayer);
        
        this.gameLayer.on(Laya.Event.CLICK,this,this._gameLayerclickEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_UP,this,this._mouseUpEvent);

        //自动适配完后初始化
        Laya.timer.frameOnce(8, this, this.delayInitShow);
        // this.delayInitShow();


        this.restartGame();
       
    }

    _proto.onDestroy = function () {

    }

    //自动适配完后初始化
     _proto.delayInitShow = function () {
        
     }

    /**重置游戏 */
    _proto.restartGame = function(_score){

        this.gameLevel = 0;
        this.gameScore = 0;
        this.gameUI.t_gamescore.text = this.gameScore;
        // this.gameLive = 3;
        // this.gameUI.t_life.text = "x"+this.gameLive;

        // for (var i = 0; i < this.BoxesList.length; i++) {
        //     var t_Boxes = this.BoxesList[i];
        //     BoxesFactory.getInstance().recoveryBoxesToPool(t_Boxes);
        //     this.BoxesList.splice(i, 1);
        // }
        // this.BoxesList = [];
        
        
    }

    /**开始游戏 */
    _proto.startGame = function () {

        
        this.createBoxesList();

        Laya.timer.frameLoop(1, this, this.onUpdate);
        // Laya.timer.loop(1000,this,this.updateGameTime);
        
    }

    /**暂停游戏 */
    _proto.pauseGame = function(){
        Laya.timer.clear(this,this.onUpdate);
        // Laya.timer.clear(this,this.updateGameTime);
        
    }

    /**恢复游戏 */
    _proto.resumeGame = function(){
        Laya.timer.frameLoop(1, this, this.onUpdate);
        // Laya.timer.loop(1000,this,this.updateGameTime);
        
    }

    /**游戏结束 */
    _proto.gameover = function(_win){
        Gamelog("------------游戏结束");
        Laya.timer.clear(this,this.onUpdate);
        // Laya.timer.clear(this,this.updateGameTime);
        // for (var i = 0; i < this.BoxesList.length; i++) {
        //     var t_Boxes = this.BoxesList[i];
        //     BoxesFactory.getInstance().recoveryBoxesToPool(t_Boxes);
        //     this.BoxesList.splice(i, 1);
        // }

        UIManager.getInstance().showUI("GameOverUI");
        
    }


    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        
    }

    //创建盒子
    _proto.createBoxesList = function(){
        

    }

   
    //增加分数
    _proto.addGameScore = function(){
        this.gameScore += 50;
        this.gameUI.t_gamescore.text = this.gameScore;


    }

     /**按下监听事件 */
    _proto._gameLayerclickEvent = function(_event){
        var m_mouseDownPoint = new Point(_event.stageX,_event.stageY);
        this.gameLayer.globalToLocal(m_mouseDownPoint);
       
        

    }
   

    return GameScene;
})();