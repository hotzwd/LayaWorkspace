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

    /**
     * 游戏速度增加
     */
    var GameSpeedAdd = 0.5;

    _proto.gameUI = null;                                                    //ui对象
    _proto.gameLayer = null;                                                 //游戏层
    _proto.blockList = [];                                                   //所以方块对象
    _proto.m_curLevel = 0;                                                   //当前等级
    _proto.m_iconList = [];                                                  //当前图标列表
    _proto.gameScore = 0;                                                    //游戏分数
    _proto.startTime = 0;                                                    //游戏开始时间
    _proto.gameTime = 0;                                                     //游戏时间
    _proto.leftGameTime = 0;                                                 //上一次保存的游戏时间
  

    _proto.Init = function () {
        
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
            // this.gameUI.visible = false;
        }

        // MusicManager.getInstance().playMusic("res/music/1.mp3");
        
        this.gameLayer = this.gameUI.gameLayer;
        // //初始化生成器
        TreeGenerator.getInstance().initGenerator(this.gameLayer);
        
        // this.gameLayer.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_UP,this,this._mouseUpEvent);

        //自动适配完后初始化
        // Laya.timer.frameOnce(8, this, this.delayInitShow);
        // this.delayInitShow();

        this.restartGame();
        // this.startGame();
       
    }

    _proto.onDestroy = function () {

    }

    //自动适配完后初始化
     _proto.delayInitShow = function () {


        
     }

    /**开始游戏 */
    _proto.startGame = function () {

        
        Laya.timer.frameLoop(1, this, this.onUpdate);
        // this.updateLevel();

        
        // this.startTime = new Date().getTime();
        // Laya.timer.loop(1000,this,this.updateGameTime);
        
        
    }
    /**暂停游戏 */
    _proto.pauseGame = function(){
        Laya.timer.clear(this,this.onUpdate);
        // Laya.timer.clear(this,this.updateGameTime);
        // this.leftGameTime = this.gameTime;
    }

    /**恢复游戏 */
    _proto.resumeGame = function(){
        Laya.timer.frameLoop(1, this, this.onUpdate);
        // Laya.timer.loop(1000,this,this.updateGameTime);
        // this.startTime = new Date().getTime();
    }

    /**重置游戏 */
    _proto.restartGame = function(_score){

        this.m_curLevel = 0; 

        for (var i = 0; i < this.blockList.length; i++) {
            var t_block = this.blockList[i];
            BlockFactory.getInstance().recoveryObgectToPool(t_block);
        }
        this.blockList = [];

        this.gameScore = 0;
        this.gameUI.t_score.text = this.gameScore;
        this.gameTime = 0;
        // this.leftGameTime = 0;
        // this.gameUI.label_time.text = "00:00";
        
    }

    /**游戏结束 */
    _proto.gameover = function(_win){
        // Laya.timer.clear(this,this.onUpdate);
        Laya.timer.clear(this,this.updateGameTime);

        UIManager.getInstance().showUI("GameOverUI");
        
    }
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        
       
    }
  
    //增加分数
    _proto.addGameScore = function(_score){
        this.gameScore +=  _score;
        this.gameUI.t_gamescore.text = this.gameScore;
    }
    
    
    /**增加生命 */
    _proto.addLife = function(_success){
        this.resumeGame();
        if(_success){
            this.gameTime += 11;
            this.updateGameTime();
        }
        wxGame.getInstance().createVideoAD();
    }

    return GameScene;
})();