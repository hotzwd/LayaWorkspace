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
    _proto.m_boxLeft = null;                                                //左边的盒子
    _proto.m_boxRight = null;                                               //右边的盒子
    _proto.m_boxLeftX = 0;                                                 //左边盒子坐标
    _proto.m_boxRightX = 0;                                                //右边盒子坐标
    _proto.m_jump_left =false;                                             //左边跳起
    _proto.m_jump_right =false;                                            //右边跳起
    _proto.levelData = null;                                               //关卡数据
    

    
    _proto.Init = function () {
        
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
            // this.gameUI.visible = false;
        }
        
        // MusicManager.getInstance().playMusic("res/music/1.mp3")

        this.gameLayer = this.gameUI.gameLayer;
        this.m_boxLeft = this.gameUI.box1;
        this.m_boxRight = this.gameUI.box2;
        this.m_boxLeftX = this.m_boxLeft.x;
        this.m_boxRightX = this.m_boxRight.x;

        //初始化生成器
        BoxesGenerator.getInstance().bengbenginitGenerator(this.gameLayer);
        
        this.gameLayer.on(Laya.Event.CLICK,this,this.bengbeng_gameLayerclickEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_UP,this,this._mouseUpEvent);

        //自动适配完后初始化
        Laya.timer.frameOnce(8, this, this.bengbengdelayInitShow);
        // this.delayInitShow();


        this.restartGame(true);
       
    }

    _proto.onDestroy = function () {

    }

    //自动适配完后初始化
     _proto.bengbengdelayInitShow = function () {
        
     }

    /**重置游戏 */
    _proto.restartGame = function(_gameover,_score){
        if(_gameover){
            this.gameLevel = 0;
            this.gameScore = 0;
        }else{
            this.gameScore = _score;
        }
        this.gameUI.t_gamescore.text = this.gameScore;
        // this.gameLive = 3;
        // this.gameUI.t_life.text = "x"+this.gameLive;

        // for (var i = 0; i < this.BoxesList.length; i++) {
        //     var t_Boxes = this.BoxesList[i];
        //     BoxesFactory.getInstance().recoveryBoxesToPool(t_Boxes);
        //     this.BoxesList.splice(i, 1);
        // }
        // this.BoxesList = [];

        this.m_boxLeft.visible = true;
        this.m_boxRight.visible = true;
        this.m_boxLeft.x =  this.m_boxLeftX;
        this.m_boxRight.x = this.m_boxRightX;
        this.m_boxLeft.rotation = 0;
        this.m_boxRight.rotation = 0;

        this.m_jump_left = false;
        this.m_jump_right = false;
        
        
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
    _proto.gameover = function(){
        Gamelog("------------游戏结束");
        Laya.timer.clear(this,this.onUpdate);
        // Laya.timer.clear(this,this.updateGameTime);
        for (var i = 0; i < this.BoxesList.length; i++) {
            var t_Boxes = this.BoxesList[i];
            BoxesFactory.getInstance().recoveryBoxesToPool(t_Boxes);
        }
        this.BoxesList = [];

        //播放死亡动画
        this.boxDead(this.m_boxLeft,1);
        this.boxDead(this.m_boxRight,2);

        Laya.timer.once(1000,this,function(){
            if(Browser.onMiniGame){
                if(wxGame.getInstance().videoAd == null || !window.wxLoadVideoAd){
                    UIManager.getInstance().showUI("GameOverUI");
                    return;
                }
                    UIManager.getInstance().showUI("GameSharedUI");
            }else{
                // this.btn_addLife.visible = true;
                UIManager.getInstance().showUI("GameSharedUI");
            }
            // UIManager.getInstance().showUI("GameOverUI");
        })
        
    }

    //盒子消失效果
    _proto.boxDead = function(p_box,p_dir){
        // MusicManager.getInstance().playSound("res/music/gameover.wav");
        
        p_box.visible = false;

        // var t_ballPoint = new Point(0,0);
        // p_box.localToGlobal(t_ballPoint);
        var t_ballPoint = new Point(p_box.x,p_box.y);

        var t_img = new Laya.Image("Game/yuan"+p_dir+".png");
        t_img.anchorX = 0.5;
        t_img.anchorY = 0.5;
        t_img.pos(t_ballPoint.x,t_ballPoint.y);
        // Laya.stage.addChild(t_img);
        this.gameLayer.addChild(t_img);
        
        t_img.alpha = 0;
        t_img.scaleX = 0;
        t_img.scaleY = 0;


        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("show",0).to(t_img,
        {
            alpha:1,
            scaleX:1.0,
            scaleY:1.0,
        },300).addLabel("go",0).to(t_img,
        {
            alpha:0,
        },500);
        timeLine.play(0,false);
        timeLine.on(Laya.Event.COMPLETE,this,function(arg){
            arg.destroy();
        },[t_img]);
    }

    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        for (var i = 0; i < this.BoxesList.length; i++) {
            var t_Boxes = this.BoxesList[i];
            t_Boxes.onUpdate();
        }
        this.createTime--;
        if(this.createTime <= 0){
            this.createBoxesList();
        }

    }

    //创建盒子
    _proto.createBoxesList = function(){

        this.levelData = null;
        for (var i = GameLevelData.length -1 ; i >=0; i--) {
            this.levelData = GameLevelData[i];
            if(this.gameScore >= this.levelData.score){
                break;
            }
        }

        var t_list = BoxesGenerator.getInstance().bengbengcreateBoxes(1);
        this.BoxesList = this.BoxesList.concat(t_list);

        // this.createTime = 45;
        this.createTime = this.levelData.time;

    }

    //删除箱子
    _proto.deleteBox = function(p_box){

        for (var i = 0; i < this.BoxesList.length; i++) {
            var t_box = this.BoxesList[i];
            if(t_box == p_box){
                BoxesFactory.getInstance().recoveryBoxesToPool(t_box);
                Gamelog("------删除箱子");
                this.BoxesList.splice(i, 1);
            }
        }
        this.addGameScore();
    }
   
    //增加分数
    _proto.addGameScore = function(){
        this.gameScore += 1;
        this.gameUI.t_gamescore.text = this.gameScore;


    }

     /**按下监听事件 */
    _proto.bengbeng_gameLayerclickEvent = function(_event){
        var m_mouseDownPoint = new Point(_event.stageX,_event.stageY);
        this.gameLayer.globalToLocal(m_mouseDownPoint);
        var t_left = false;
        if(m_mouseDownPoint.x <= this.gameLayer.width/2){
            t_left = true
        }
        Gamelog("-----点击方向="+t_left);
       
        this.boxJump(t_left);
        

    }

    /**
     * 箱子跳跃
     */
    _proto.boxJump = function(_left){

        if(_left && this.m_jump_left){
            return;
        }
        if(!_left && this.m_jump_right){
            return;
        }

        var t_box = this.m_boxLeft;
        var t_dir = 1;
        if(!_left){
            t_box = this.m_boxRight;
            t_dir = -1;
            this.m_jump_right = true;
        }else{
            this.m_jump_left = true;
        }

        var timeLine = new Laya.TimeLine();
        var t_pox = t_box.x;
        Laya.Tween.to(t_box,{
            rotation:90*t_dir
        },600);
        timeLine.addLabel("go",0).to(t_box,
        {
            x:t_pox-350*t_dir,
            // rotation:45,
        },300,Laya.Ease.quadOut).addLabel("back",0).to(t_box,
        {
            x:t_pox,
            // rotation:90,
        },300,Laya.Ease.quadIn);
        
        timeLine.play(0,false);
        timeLine.on(Laya.Event.COMPLETE,this,function(p_dir){
            t_box.rotation = 0;
            if(p_dir == 1){
                this.m_jump_left = false;
            }else{
                this.m_jump_right = false;
            }
            this.gameUI.stageShake();
        },[t_dir]);
    }
   

    return GameScene;
})();