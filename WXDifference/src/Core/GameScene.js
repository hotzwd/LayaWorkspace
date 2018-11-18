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
     * 游戏图标
     */
    var GameBlockIconList = ["Game/1.png","Game/2.png","Game/3.png","Game/4.png","Game/5.png"
                            ,"Game/6.png","Game/7.png","Game/8.png","Game/9.png","Game/10.png"
                            ,"Game/11.png","Game/12.png","Game/13.png"];
    /**
     * 游戏速度增加
     */
    var GameSpeedAdd = 0.5;

    _proto.gameUI = null;                                                    //ui对象
    _proto.blockLayer = null;                                                //方块层
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

        MusicManager.getInstance().playMusic("res/music/1.mp3");
        
        this.blockLayer = this.gameUI.blockLayer;
        // //初始化生成器
        BlockGenerator.getInstance().initGenerator(this.blockLayer);
        
        // this.gameLayer.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_UP,this,this._mouseUpEvent);

        //自动适配完后初始化
        // Laya.timer.frameOnce(8, this, this.delayInitShow);
        // this.delayInitShow();

        // this.startGame();
       
    }

    _proto.onDestroy = function () {

    }

    //自动适配完后初始化
     _proto.delayInitShow = function () {


        
     }

    /**开始游戏 */
    _proto.startGame = function () {

        this.restartGame();
        // Laya.timer.frameLoop(1, this, this.onUpdate);
        this.updateLevel();

        
        // this.startTime = new Date().getTime();
        // Laya.timer.loop(1000,this,this.updateGameTime);
        
        
    }
    /**暂停游戏 */
    _proto.pauseGame = function(){
        // Laya.timer.clear(this,this.onUpdate);
        Laya.timer.clear(this,this.updateGameTime);
        this.leftGameTime = this.gameTime;
    }

    /**恢复游戏 */
    _proto.resumeGame = function(){
        // Laya.timer.frameLoop(1, this, this.onUpdate);
        Laya.timer.loop(1000,this,this.updateGameTime);
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
        this.leftGameTime = 0;
        this.gameUI.label_time.text = "00:00";
        
    }

    //更新关卡
    _proto.updateLevel = function(){
        var t_levelData = LevelData[this.m_curLevel];
        
        this.gameTime = t_levelData.time;
        // Gamelog("---this.m_curLeve="+this.m_curLevel);
        if(this.m_curLevel == LevelData.length-1){
            this.gameTime = t_levelData.time - (2 * this.gameScore - LevelData.length);
            if(this.gameTime < 4){
                this.gameTime = 4;
            }
        }
        var t_timeStr =""+this.gameTime;
        if(this.gameTime < 10){
            t_timeStr = "0"+this.gameTime;
        }
        this.gameUI.label_time.text = "00:"+t_timeStr;


        for (var i = 0; i < this.blockList.length; i++) {
            var t_block = this.blockList[i];
            // var sp = new Laya.Sprite();
            // sp.removeSelf();
            BlockFactory.getInstance().recoveryObgectToPool(t_block);
        }
        this.blockList = [];
        // this.blockLayer.destroyChildren();

        this.m_iconList = [];
        var t_index = parseInt(Math.random()*GameBlockIconList.length);
        var t_index2 = 0;
        do {
            t_index2 = parseInt(Math.random()*GameBlockIconList.length);
        } while (t_index == t_index2);

        this.m_iconList.push(GameBlockIconList[t_index]);
        this.m_iconList.push(GameBlockIconList[t_index2]);


        var t_list =BlockGenerator.getInstance().createBlock(t_levelData.num);
        this.blockList = this.blockList.concat(t_list);

        var t_differenceIndex = parseInt(Math.random() * t_levelData.num);

        for (var i = 0; i < t_levelData.repeatX; i++) {
            for (var j = 0; j  < t_levelData.repeatY; j++){
                var t_index = i * (t_levelData.repeatY ) + j;
                // Gamelog("---index= "+t_index);
                var t_block = this.blockList[t_index];
                var t_point = new Laya.Point(i*t_levelData.width,j*t_levelData.height);
                var t_icon = this.m_iconList[0];
                var t_type = BlockType.Normal;
                if(t_index == t_differenceIndex){
                    t_type = BlockType.Difference;
                    t_icon = this.m_iconList[1];
                }

                t_block.initBlock(t_type,t_icon,t_point,t_levelData);
            }        
        }

        this.m_curLevel ++;
        if(this.m_curLevel >1)
            this.gameScore++;
        this.gameUI.t_score.text = this.gameScore;

        if(this.m_curLevel == LevelData.length){
            this.m_curLevel = LevelData.length -1;
        }
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
    
    /**更新游戏时间 */
    _proto.updateGameTime = function(){
        // this.gameTime = this.leftGameTime + Math.floor((new Date().getTime() - this.startTime) / 1000);
        // this.gameUI.label_time.text = GetTimeFormat(this.gameTime);
        this.gameTime --;
        if(this.gameTime <= 0){
            this.gameTime = 0;
            this.gameover();
        }
        var t_timeStr =""+this.gameTime;
        if(this.gameTime < 10){
            t_timeStr = "0"+this.gameTime;
        }
        this.gameUI.label_time.text = "00:"+t_timeStr;
    }

  

    return GameScene;
})();