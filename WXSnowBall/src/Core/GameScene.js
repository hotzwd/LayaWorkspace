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
    _proto.gameScore = 0;                                                    //游戏分数
    _proto.startTime = 0;                                                    //游戏开始时间
    _proto.gameTime = 0;                                                     //游戏时间
    _proto.leftGameTime = 0;                                                 //上一次保存的游戏时间
    _proto.lineGraphics = null;                                              //轨迹
    _proto.snowBall = null;                                                  //雪球
    _proto.snowBallPoint = null;                                             //雪球位置
    _proto.snowBallDir = 1;                                                  //雪球方向
    _proto.snowBallSpeed = 1;                                                //雪球速度
    _proto.treeLayerSpeed = 1;                                               //树木移动速度
    _proto.isGameover = false;                                               //是否游戏结束
    _proto.treeList = [];                                                    //树木层
    _proto.treeLayerDis = 0;                                                 //树木层移动距离
  

    _proto.Init = function () {
        
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
            // this.gameUI.visible = false;
        }

        MusicManager.getInstance().playMusic("res/music/1.mp3");
        
        this.gameLayer = this.gameUI.gameLayer;
        this.treeLayer = this.gameUI.treeLayer;
        this.lineGraphics = this.gameUI.g_trajectory.graphics;
        this.snowBall = this.gameUI.img_ball;
        this.snowBallPoint = new Point(this.snowBall.x,this.snowBall.y);

        // //初始化生成器
        TreeGenerator.getInstance().initGenerator(this.treeLayer);
        
        this.gameLayer.on(Laya.Event.CLICK,this,this._clickLayerEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_UP,this,this._mouseUpEvent);

        //自动适配完后初始化
        // Laya.timer.frameOnce(8, this, this.delayInitShow);
        // this.delayInitShow();

        this.restartGame(true);
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

        // this.startTime = new Date().getTime();
        Laya.timer.loop(1000,this,this.updateGameTime);
        
        
    }
    /**暂停游戏 */
    _proto.pauseGame = function(){
        Laya.timer.clear(this,this.onUpdate);
        Laya.timer.clear(this,this.updateGameTime);
        // this.leftGameTime = this.gameTime;
    }

    /**恢复游戏 */
    _proto.resumeGame = function(){
        Laya.timer.frameLoop(1, this, this.onUpdate);
        Laya.timer.loop(1000,this,this.updateGameTime);
        // this.startTime = new Date().getTime();
    }

    /**重置游戏 */
    _proto.restartGame = function(_gameover,_score){

        
        this.snowBallDir = 1;
        this.snowBallSpeed = 3;
        this.treeLayerSpeed = 6;
        
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
        this.snowBall.pos(this.snowBallPoint.x,this.snowBallPoint.y);
        this.snowBall.visible = true;

        this.treeLayerDis = 0;
        this.treeLayer.pos(0,0);
        this.lineGraphics.clear();

        for (var i = 0; i < this.treeList.length; i++) {
            var t_tree = this.treeList[i];
            TreeFactory.getInstance().recoveryObgectToPool(t_tree);
            this.treeList.splice(i, 1);
        }
        this.treeList = [];
        
        this.createTreeList(0);
    }

    /**游戏结束 */
    _proto.gameover = function(_win){
        this.snowBallDead();

        Laya.timer.clear(this,this.onUpdate);
        Laya.timer.clear(this,this.updateGameTime);
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
    //雪球消失效果
    _proto.snowBallDead = function(){
        this.snowBall.visible = false;
        this.lineGraphics.clear();

        var t_ballPoint = new Point(0,0);
        this.snowBall.localToGlobal(t_ballPoint);

        var t_img = new Laya.Image("Game/blanco.png");
        t_img.anchorX = 0.5;
        t_img.anchorY = 0.5;
        t_img.pos(t_ballPoint.x,t_ballPoint.y);
        Laya.stage.addChild(t_img);

        t_img.alpha = 0;
        t_img.scaleX = 0;
        t_img.scaleY = 0;


        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("show",0).to(t_img,
        {
            alpha:1,
            scaleX:1.5,
            scaleY:1.5,
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
        if(!this.isGameover){
            this.treeLayer.y -= this.treeLayerSpeed;
            this.treeLayerDis += this.treeLayerSpeed;
            //创建树木
            if(this.treeLayerDis >= this.treeLayerCreateDis){
                var t_treePoint = new Point(0,Laya.stage.height + 10);
                this.treeLayer.globalToLocal(t_treePoint);
                // Gamelog("------createTree x="+t_treePoint.x+",y="+t_treePoint.y);
                this.createTreeList(t_treePoint.y);
            }

            //更新球的位置
            this.updateBall();
            //更新树木位置
            this.updateTreeList();
        }
       
    }
    /**更新球的位置 */
    _proto.updateBall =function(){
        //画球轨迹
        //  Gamelog("-----snowBallDir= "+this.snowBallDir);
        this.snowBall.x += this.snowBallSpeed * this.snowBallDir;
        // var t_ballPoint = new Point(this.gameUI.img_ball.x,this.gameUI.img_ball.y);
        var t_ballPoint = new Point(0,0);
        this.snowBall.localToGlobal(t_ballPoint);
        //撞到边界
        if(t_ballPoint.x <= 0 || t_ballPoint.x >= Laya.stage.width - 20){
            Gamelog("-----撞到边界");
            this.gameover();
        }

        // Gamelog("------t_ballPoint x="+t_ballPoint.x+",y="+t_ballPoint.y);
        this.treeLayer.globalToLocal(t_ballPoint);
        // Gamelog("------draw x="+t_ballPoint.x+",y="+t_ballPoint.y);
        this.drawLine(t_ballPoint);


    }
    //画轨迹
    _proto.drawLine = function(_point){
        this.lineGraphics.save();
        // this.lineGraphics.alpha(0.5);
        var t_gr = new Sprite().graphics;
        // if(this.snowBallDir > 0){
        //     _point = new Point(_point.x +6,_point.y);
        // }else{
        //     _point = new Point(_point.x + 20,_point.y);
        // }
        this.lineGraphics.drawCircle(_point.x +10,_point.y,8,"#dddbdb");
        // this.lineGraphics.restore();
    }

    /**
     * 更新树木列表
     */
    _proto.createTreeList = function(p_treeY){
        if(p_treeY == 0){
            var t_list =TreeGenerator.getInstance().createTree(6);
            this.treeList = this.treeList.concat(t_list);

            for (var i = 0; i < 6; i++) {
                var t_treeImg = this.treeLayer.getChildByName("tree"+(i+1));             
                this.treeList[i].pos(t_treeImg.x,t_treeImg.y);
            }


        }else{
            var t_num = parseInt(Math.random()*2 + 1);
            var t_list =TreeGenerator.getInstance().createTree(t_num,p_treeY);
            this.treeList = this.treeList.concat(t_list);

        }

        this.treeLayerCreateDis = parseInt(Math.random()*this.treeLayerSpeed + this.treeLayerSpeed) *20;
        this.treeLayerDis = 0;

    }

    /**
     * 更新树木列表
     */
    _proto.updateTreeList = function(){
        
        for (var i = 0; i < this.treeList.length; i++) {
            var t_tree = this.treeList[i];
            var t_treePoint = new Point(0,0);
            t_tree.localToGlobal(t_treePoint);

            var t_ballPoint = new Point(0,0);
            this.snowBall.localToGlobal(t_ballPoint);
            this.treeLayer.globalToLocal(t_ballPoint);

            //撞到树
            if(t_tree.hitTree(t_ballPoint)){
                Gamelog("-----撞到树");
                this.gameover();
            }
            //擦肩而过 
            if(t_tree.nearTree(t_ballPoint)){
                // Gamelog("-----与树擦肩而过");
                this.showScore(t_treePoint);
            }
            
            if(t_treePoint.y < -50){
                TreeFactory.getInstance().recoveryObgectToPool(t_tree);
                this.treeList.splice(i, 1);
            }
        }

        // Gamelog("-----树木数量 ="+this.treeList.length);

    }
    //显示增加分数
    _proto.showScore = function(_point){
        var t_sound = parseInt(Math.random()*2 +1);
        MusicManager.getInstance().playSound("res/music/score"+t_sound+".ogg");
        // var _point =this.localToGlobal(new Point(0,0));
        var _score = 10;
        this.addGameScore(_score);

         var scoreLabel = new Laya.Label("+"+_score);
        // scoreLabel.font = _fontName !=  null ? _fontName :"shuzi5Font";
        scoreLabel.font = "SimHei";
        scoreLabel.fontSize = 45;
        scoreLabel.bold = true;
        scoreLabel.color = "#000000";
        // scoreLabel.stroke = 5;
        // scoreLabel.strokeColor = "#7d10f4";
        scoreLabel.align = "center";
        // scoreLabel.anchorX = 0.5;
        // scoreLabel.anchorY = 0.5;
        scoreLabel.pos(_point.x,_point.y);
        Laya.stage.addChild(scoreLabel);
        // UIManager.getInstance().getUI("GameUI").addChild(scoreLabel);
        scoreLabel.alpha = 0;
        scoreLabel.scaleX = 0;
        scoreLabel.scaleY = 0;
        scoreLabel.zOrder = 5;

        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("show",0).to(scoreLabel,
        {
            alpha:1,
            scaleX:1,
            scaleY:1,
        },200).addLabel("go",0).to(scoreLabel,
        {
            y:_point.y - 200,
            alpha:0,
        },500);
        // this.moveOtherBubbleFinish = false;
        timeLine.play(0,false);
        timeLine.on(Laya.Event.COMPLETE,this,function(arg){
            arg.destroy();
        },[scoreLabel]);
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
        this.addGameScore(1);
    }
    
    /**增加生命 */
    _proto.addLife = function(_success){
        this.resumeGame();
        if(_success){
            this.gameTime += 11;
            // this.updateGameTime();
        }
        wxGame.getInstance().createVideoAD();
    }

    //点击界面
    _proto._clickLayerEvent = function(){
        MusicManager.getInstance().playSound("res/music/snow.ogg");
        if(this.snowBallDir == 1){
            // this.snowBallDir = -1;
            var t_num = (this.snowBallDir + 1) / 0.1;
            for (var i = 0; i < t_num; i++) {
                Laya.timer.frameOnce(i,this,function(){
                    this.snowBallDir -= 0.1;
                    if(this.snowBallDir <= -1){
                        this.snowBallDir = -1
                    }
                });            
            }
            

        }else{
            // this.snowBallDir = 1;
            var t_num = (1 - this.snowBallDir) / 0.1;
            for (var i = 0; i < t_num; i++) {
                Laya.timer.frameOnce(i,this,function(){
                    this.snowBallDir += 0.1;
                    if(this.snowBallDir >= 1){
                        this.snowBallDir = 1;
                    }
                });            
            }
        }
    }

    return GameScene;
})();