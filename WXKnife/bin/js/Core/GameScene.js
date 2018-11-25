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
    _proto.m_stepBoxPoint = null;                                            //台阶盒子坐标
    _proto.m_gameover = false;                                               //游戏是否结束
    

    
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
        this.m_endStep.zOrder = 10;
        this.gameLayer.addChild(this.m_endStep);
        this.m_startStep = new Step();
        this.m_startStep.zOrder = 10;
        this.gameLayer.addChild(this.m_startStep);

        this.m_knife = new Knife();
        this.m_knife.zOrder = 20;
        this.gameLayer.addChild(this.m_knife);

        this.m_progress.zOrder = 100;
        
        this.m_stepBoxPoint = new Point(this.gameUI.stepBox.x,this.gameUI.stepBox.y);
        
        this.updateStep();    
        // this.startGame();
     }

     

    /**重置游戏 */
    _proto.restartGame = function(_score){

        this.gameLevel = 0;
        this.gameUI.t_level.text = this.gameLevel;
        // this.gameScore = 0;
        // this.gameUI.t_gamescore.text = this.gameScore;
        var highscoreNum = SetLocalMaxScore(0);
        this.gameUI.t_gamescore.text = highscoreNum;

        this.m_gameover = false;
        if(this.m_startStep != null){
            this.updateStep();
        }

        
    }

    //更新台阶位置
    _proto.updateStep = function(){

        this.gameUI.t_level.text = this.gameLevel;

        //台阶
        var t_endPoint;
        var t_startPoint;
        var t_endLevel = this.gameLevel +1;
        var t_startLevel = this.gameLevel;

        this.gameUI.stepBox.zOrder = 15;
        this.m_knife.rotation = 0;
        //初始位置
        if(this.gameLevel == 0){
            this.gameUI.cloudBox.zOrder = 20;
            this.gameLayer.zOrder = 10;

            t_endPoint = new Point(this.gameUI.end_step.x,this.gameUI.end_step.y);
            t_startPoint = new Point(this.gameUI.start_step.x,this.gameUI.start_step.y);
            this.gameUI.stepBox.pos(this.m_stepBoxPoint.x,this.m_stepBoxPoint.y);
            this.gameUI.stepBox.visible = true;

            this.m_startStep.pos(t_startPoint.x,t_startPoint.y);
            this.m_endStep.pos(t_endPoint.x,t_endPoint.y);

            this.m_endStep.initStep(1,t_endPoint,t_endLevel);
            this.m_startStep.initStep(0,t_startPoint,t_startLevel);

            //刀
            this.m_knife.initKnife(1,this.m_startStep,this.m_endStep);
            this.m_knife.setState(0);
        }else{

            this.gameLayer.zOrder = 20;
            this.gameUI.cloudBox.zOrder = 10;

            var t_step = this.m_startStep;
            this.m_startStep = this.m_endStep;
            this.m_endStep = t_step;
            
            t_endPoint = new Point(this.m_endStep.x,200 + parseInt(Math.random()*200) );
            t_startPoint = new Point(this.m_startStep.x,600);



            this.m_startStep.initStep(0,t_startPoint,t_startLevel);
            var t_dimDown = t_startPoint.y - this.m_startStep.y;
            //开始面板往下移动
            Laya.Tween.to(this.m_startStep,{
                y:t_startPoint.y
            },t_dimDown * 2,null,new Laya.Handler(this,function(){
                // this.m_knife.initKnife(1,this.m_startStep,this.m_endStep);
            }));

            var t_knifeY = this.m_knife.y + t_dimDown;
            Laya.Tween.to(this.m_knife,{
                y:t_knifeY
            },t_dimDown *2 ,null);



            //结束面板先往下，再下落
            Laya.Tween.to(this.m_endStep,{
                y:Laya.stage.height + 100
            },(t_dimDown*2),null,new Laya.Handler(this,function(){
                this.m_endStep.y = -100;
                this.m_endStep.initStep(1,t_endPoint,t_endLevel);
                Laya.Tween.to(this.m_endStep,{
                    y:t_endPoint.y
                },((t_endPoint.y +100)/1),null,new Laya.Handler(this,function(){
                    this.m_knife.initKnife(1,this.m_startStep,this.m_endStep);
                    this.m_knife.setState(0);
                }));
            }));

            //隐藏台阶
            if(this.gameLevel == 1){
                Laya.Tween.to(this.gameUI.stepBox,{
                    y:Laya.stage.height +100
                },t_dimDown*2,null,new Laya.Handler(this,function(){
                    this.gameUI.stepBox.visible = false;
                }));
                
            }

        }

        this.m_startStep.setShadow(true);
        this.m_endStep.setShadow(false);

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
        this.m_gameover = true;
        Laya.timer.clear(this,this.onUpdate);

        UIManager.getInstance().showUI("GameOverUI");
        
    }

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
        if(this.gameLevel != 0 && this.m_knife.m_state == 0){
            this.m_startStep.y += 1;
            this.m_knife.initKnife(1,this.m_startStep,this.m_endStep);
            if(this.m_startStep.y == Laya.stage.height){
                Gamelog("------掉落屏幕外");
                this.jumpKnife(false);
            }
        }
    }

   
    //增加分数
    _proto.addGameScore = function(p_time){
        var t_score = 10;
        this.gameScore += 50;
        this.gameUI.t_gamescore.text = this.gameScore;
    }

    /**按下监听事件 */
    _proto._mouseDowmEvent = function(_event){
        // var m_mouseDownPoint = new Point(_event.stageX,_event.stageY);
        // this.gameLayer.globalToLocal(m_mouseDownPoint);
        // this.mouseTime = new Date().getTime();
        if(this.m_knife.m_state != 0)
            return;
        this.m_progress.visible = true;
        this.m_progressValue = 0;
        this.m_progress.value = this.m_progressValue;
        Laya.timer.loop(40,this,this.pushProgress);
    }

     /**抬起监听事件 */
    _proto._mouseUpEvent = function (_event) {
        if(this.m_knife.m_state != 0 || !this.m_progress.visible || this.m_gameover)
            return;
        
        //跳跃
        Laya.timer.clear(this,this.pushProgress);
        this.m_knife.setState(1);
        this.m_progress.visible = false;

        //自动下落到底部
        if(this.gameLevel != 0){
            //结束面板先往下，再下落
            Laya.Tween.to(this.m_startStep,{
                y:Laya.stage.height + 100
            },500,null,new Laya.Handler(this,function(){
                
            }));
        }
    }
    
    //按压进度
    _proto.pushProgress = function(){
        this.m_progressValue += 0.04;
        if(this.m_progressValue >= 1){
            this.m_progressValue = 1;
        }
        this.m_progress.value = this.m_progressValue;
        
    }


    /**
     * 刀子跳跃
     */
    _proto.jumpKnife = function(p_suc){
        //跳跃成功
        if(p_suc){
            this.gameLevel++;
            this.updateStep();
        }else{
            this.gameover();
        }
    }


    return GameScene;
})();