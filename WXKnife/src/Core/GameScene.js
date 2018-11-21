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
    _proto.zombieList = [];                                                  //所有对象列表
    _proto.levelData = null;                                                 //关卡数据
    _proto.gameLive = 3;                                                     //游戏生命
    

    
    _proto.Init = function () {
        
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
            // this.gameUI.visible = false;
        }
        
        this.gameLayer = this.gameUI.gameLayer;
        //初始化生成器
        // ZombieGenerator.getInstance().initGenerator(this.gameLayer);
        
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
        this.gameLive = 3;
        this.gameUI.t_life.text = "x"+this.gameLive;

        // for (var i = 0; i < this.zombieList.length; i++) {
        //     var t_zombie = this.zombieList[i];
        //     ZombieFactory.getInstance().recoveryZombieToPool(t_zombie);
        // }
        // this.zombieList = [];
        
        
    }

    /**开始游戏 */
    _proto.startGame = function () {

        
        // this.createZombieList();

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
        // for (var i = 0; i < this.zombieList.length; i++) {
        //     var t_zombie = this.zombieList[i];
        //     ZombieFactory.getInstance().recoveryZombieToPool(t_zombie);
        // }

        UIManager.getInstance().showUI("GameOverUI");
        
    }
    /**更新游戏时间 */
    // _proto.updateGameTime = function(){
    //     this.gameTime --;
    //     if(this.gameTime <= 0){
    //         this.gameTime = 0;
    //         this.gameover();
    //     }
    //     var t_timeStr =""+this.gameTime;
    //     if(this.gameTime < 10){
    //         t_timeStr = "0"+this.gameTime;
    //     }
    //     this.gameUI.label_time.text = "00:"+t_timeStr;
    // }

    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        
    }

   
    //增加分数
    _proto.addGameScore = function(){
        this.gameScore += 50;
        this.gameUI.t_gamescore.text = this.gameScore;


    }

  

    return GameScene;
})();