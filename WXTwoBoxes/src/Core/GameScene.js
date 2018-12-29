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

        for (var i = 0; i < this.BoxesList.length; i++) {
            var t_Boxes = this.BoxesList[i];
            BoxesFactory.getInstance().recoveryBoxesToPool(t_Boxes);
            this.BoxesList.splice(i, 1);
        }
        this.BoxesList = [];

        this.m_boxLeft.x =  this.m_boxLeft.x;
        this.m_boxRight.x = this.m_boxRightX;
        this.m_boxLeft.rotation = 0;
        this.m_boxRight.rotation = 0;
        
        
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

        // UIManager.getInstance().showUI("GameOverUI");
        
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
        var t_list = BoxesGenerator.getInstance().createBoxes(1);
        this.BoxesList = this.BoxesList.concat(t_list);

        this.createTime = 100;
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
        var t_box = this.m_boxLeft;
        var t_dir = 1;
        if(!_left){
            t_box = this.m_boxRight;
            t_dir = -1;
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
        timeLine.on(Laya.Event.COMPLETE,this,function(){
            t_box.rotation = 0;
            this.gameUI.stageShake();
        });
    }
   

    return GameScene;
})();