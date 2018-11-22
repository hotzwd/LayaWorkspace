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
    _proto.m_startStep = null;                                               //开始台阶
    _proto.m_endStep = null;                                                 //结束台阶
    _proto.m_knife = null;                                                   //刀子
    _proto.m_progress = null;                                                //进度条
    _proto.m_progressValue = 0;                                              //进度条值
    

    
    _proto.Init = function () {
        
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
            // this.gameUI.visible = false;
        }
        
        this.gameLayer = this.gameUI.gameLayer;
        this.m_progress = this.gameUI.pro_push;

        //初始化生成器
        // ZombieGenerator.getInstance().initGenerator(this.gameLayer);
        
        // this.gameLayer.on(Laya.Event.CLICK,this,this._gameLayerclickEvent);
        this.gameLayer.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        this.gameLayer.on(Laya.Event.MOUSE_UP,this,this._mouseUpEvent);

        //自动适配完后初始化
        Laya.timer.frameOnce(8, this, this.delayInitShow);
        // this.delayInitShow();

        this.restartGame();
       
    }

    _proto.onDestroy = function () {

    }

    //自动适配完后初始化
     _proto.delayInitShow = function () {

         //创建对象
        this.m_endStep = new Step();
        this.gameLayer.addChild(this.m_endStep);
        this.m_startStep = new Step();
        this.gameLayer.addChild(this.m_startStep);

        this.m_knife = new Knife();
        this.gameLayer.addChild(this.m_knife);

        
        this.updateStep();    
        this.startGame();
     }

     

    /**重置游戏 */
    _proto.restartGame = function(_score){

        this.gameLevel = 0;
        this.gameUI.t_level.text = this.gameLevel;
        this.gameScore = 0;
        this.gameUI.t_gamescore.text = this.gameScore;
        
        
    }

    //更新台阶位置
    _proto.updateStep = function(){

        this.gameUI.t_level.text = this.gameLevel;

        //台阶
        var t_endPoint;
        var t_startPoint;
        var t_endLevel = this.gameLevel +1;
        var t_startLevel = this.gameLevel;
        //初始位置
        if(this.gameLevel == 0){
            t_endPoint = new Point(this.gameUI.end_step.x,this.gameUI.end_step.y);
            t_startPoint = new Point(this.gameUI.start_step.x,this.gameUI.start_step.y);
        }
        this.m_endStep.initStep(1,t_endPoint,t_endLevel);
        this.m_startStep.initStep(0,t_startPoint,t_startLevel);

        //刀
        this.m_knife.initKnife(1,new Point(this.m_startStep.x - 20 ,this.m_startStep.y -46));
        //进度条
        // this.m_progress.pos(this.m_startStep.x ,this.m_startStep.y + 50);
        // this.m_progress.value = 0;
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
        if(this.m_endStep != null){
            this.m_endStep.onUpdate();
        }
        if(this.m_startStep != null){
            this.m_startStep.onUpdate();
            this.m_progress.pos(this.m_startStep.x ,this.m_startStep.y + 50);
        }
        if(this.m_knife != null){
            this.m_knife.onUpdate();
        }
    }

   
    //增加分数
    _proto.addGameScore = function(){
        this.gameScore += 50;
        this.gameUI.t_gamescore.text = this.gameScore;
    }

    /**按下监听事件 */
    _proto._mouseDowmEvent = function(_event){
        // var m_mouseDownPoint = new Point(_event.stageX,_event.stageY);
        // this.gameLayer.globalToLocal(m_mouseDownPoint);
        // this.mouseTime = new Date().getTime();
        this.m_progress.visible = true;
        this.m_progressValue = 0;
        this.m_progress.value = this.m_progressValue;
        Laya.timer.loop(100,this,this.pushProgress);
    }

     /**抬起监听事件 */
    _proto._mouseUpEvent = function (_event) {
        //跳跃
        // this.curSight._tapShot(new Point(_event.stageX,_event.stageY));
        Laya.timer.clear(this,this.pushProgress);
        this.m_knife.setState(1);
    }
    
    //按压进度
    _proto.pushProgress = function(){
        this.m_progressValue += 0.1;
        this.m_progress.value = this.m_progressValue;
    }

    return GameScene;
})();