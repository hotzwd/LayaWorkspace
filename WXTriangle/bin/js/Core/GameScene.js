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
    /**小球颜色 */
    var QiuImgArray = ["Game/dcolor1.png","Game/dcolor2.png","Game/dcolor3.png"];

    _proto.gameUI = null;                                                    //ui对象
    _proto.gameLayer = null;                                                 //游戏层
    _proto.gameScore = 0;                                                    //游戏分数
    _proto.startTime = 0;                                                    //游戏开始时间
    _proto.gameTime = 0;                                                     //游戏时间
    _proto.anim_line = null;                                                 //悬挂的线
    _proto.curQiu = null;                                                    //当前的球
    _proto.curQiuType = 0;                                                   //当前球类型
    _proto.curTriangle = null;                                               //当前三角形
    _proto.colorRectList = [];                                               //颜色矩形列表
    _proto.gameSpeed = 1;                                                    //游戏速度
    _proto.startPoint = null;                                                //初始起点
    _proto.isFall = false;                                                   //是否再下落

  

    _proto.Init = function () {
        
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
            // this.gameUI.visible = false;
        }

        // MusicManager.getInstance().playMusic("res/music/1.mp3");
        
        this.gameLayer = this.gameUI.gameLayer;
        this.anim_line = this.gameUI.anim_line;
        this.curQiu = this.gameUI.img_qiu;
        this.curTriangle = this.gameUI.box_triangle;
        this.colorRectList = [this.gameUI.sp_color1,this.gameUI.sp_color2,this.gameUI.sp_color3];
        
        this.gameLayer.on(Laya.Event.CLICK,this,this._clickfangkuai_LayerEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_UP,this,this._mouseUpEvent);

        //自动适配完后初始化
        Laya.timer.frameOnce(8, this, this.delayInitShow);
        // this.delayInitShow();

        this.fangkuai_restartGame(true);
        // this.fangkuai_startGame();
       
    }

    _proto.onDestroy = function () {

    }

    //自动适配完后初始化
     _proto.delayInitShow = function () {
         this.startPoint = new Laya.Point(this.curQiu.x,this.curQiu.y);
         this.updateQiu();
     }

     /**重置游戏 */
    _proto.fangkuai_restartGame = function(_gameover,_score){

        
        if(_gameover){
            this.gameScore = 0;
        }else{
            this.gameScore = _score;
        }
        this.gameUI.t_gamescore.text = this.gameScore;
        // this.gameTime = 0;
        // this.leftGameTime = 0;
        // this.gameUI.label_time.text = "00:00";

        this.isGameover = false;
        

        this.anim_line.interval = 100;
        this.anim_line.play(0, true, "line_adle");
        this.curTriangle.rotation = 0;

        this.updateLevelData();

        if(this.startPoint != null)
            this.updateQiu();

    }

    /**开始游戏 */
    _proto.fangkuai_startGame = function () {

        
        Laya.timer.frameLoop(1, this, this.fangkuai_onUpdate);

        
        // this.startTime = new Date().getTime();
        // Laya.timer.loop(1000,this,this.fangkuai_updateGameTime);
        
        
    }
    /**暂停游戏 */
    _proto.fangkuai_pauseGame = function(){
        Laya.timer.clear(this,this.fangkuai_onUpdate);
        // Laya.timer.clear(this,this.fangkuai_updateGameTime);
        // this.leftGameTime = this.gameTime;
    }

    /**恢复游戏 */
    _proto.fangkuai_resumeGame = function(){
        Laya.timer.frameLoop(1, this, this.fangkuai_onUpdate);
        // Laya.timer.loop(1000,this,this.fangkuai_updateGameTime);
        // this.startTime = new Date().getTime();
    }

    

    /**游戏结束 */
    _proto.fangkuai_gameover = function(_win){

        Laya.timer.clear(this,this.fangkuai_onUpdate);
        Laya.timer.clear(this,this.fangkuai_updateGameTime);
        this.isGameover = true;


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

        
    }
    /**
     * update刷新
     */
    _proto.fangkuai_onUpdate = function () {
       
        if(this.curTriangle.rotation == -360){
            this.curTriangle.rotation = 0;
        }

        this.curTriangle.rotation -= this.gameSpeed;

        if(this.isFall){
            if(this.curQiu.y > this.curTriangle.y-200){
                Laya.Tween.clearAll(this.curQiu);

                this.isFall = false;
                this.curQiu.visible = false;
                //根据角度判断所属区域
                var t_rota = this.curTriangle.rotation % 360;
                Gamelog("-------触碰时刻的角度="+t_rota);

                //黑色球
                if(this.curQiuType == 0){
                    if( (t_rota >= -60 && t_rota <= 0) || (t_rota < -300 && t_rota >= -360) ){
                        Gamelog("----蓝色正确");
                        this.addGameScore(10);
                    }else{
                        Gamelog("----蓝色颜色错误");
                        this.fangkuai_gameover();
                    }
                }else if(this.curQiuType == 1){
                    //绿色球
                    if(t_rota < -60 && t_rota >= -180){
                        Gamelog("----绿色正确");
                        this.addGameScore(10);
                    }else{
                        Gamelog("----绿色颜色错误");
                        this.fangkuai_gameover();
                    }

                }else if(this.curQiuType == 2){
                    //蓝色球
                    if(t_rota < -180 && t_rota >= -300){
                        Gamelog("----蓝色正确");
                        this.addGameScore(10);
                    }else{
                        Gamelog("----蓝色颜色错误");
                        this.fangkuai_gameover();
                    }
                }

               
            }
        }
        
    }

    //更新下落小球
    _proto.updateQiu = function(){

        this.curQiu.pos(this.startPoint.x,this.startPoint.y);

        this.anim_line.play(0, false, "line_knot");

        this.curQiu.visible = true;
        this.curQiuType = parseInt(Math.random()*3,10);
        this.curQiu.skin = QiuImgArray[this.curQiuType];
        


    }

    //更新关卡数据
    _proto.updateLevelData = function(){

        for (var i = LevelData.length -1; i >= 0; i--) {
            var t_data = LevelData[i];
            if(this.gameScore >= t_data.score){
                this.gameSpeed = t_data.speed;
                break;
            }
        }
    }


    //增加分数
    _proto.addGameScore = function(_score){
        this.gameScore +=  _score;
        this.gameUI.t_gamescore.text = this.gameScore;

        this.updateQiu();
        this.updateLevelData();
    }
    
     /**更新游戏时间 */
    _proto.fangkuai_updateGameTime = function(){
        // this.gameTime = this.leftGameTime + Math.floor((new Date().getTime() - this.startTime) / 1000);
        // this.gameUI.label_time.text = GetTimeFormat(this.gameTime);
        // this.addGameScore(1);
    }
    
    
    //点击界面
    _proto._clickfangkuai_LayerEvent = function(){
        // MusicManager.getInstance().playSound("res/music/snow.wav");
        
        if(this.isFall)
            return;
        this.isFall = true;


        Laya.Tween.to(this.curQiu,{
            y:this.curTriangle.y
        },800,Laya.Ease.quadIn);
        
       this.anim_line.play(0, false, "line_fall");

        
    }

    return GameScene;
})();