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
        
        MusicManager.getInstance().playMusic("res/music/1.mp3")

        this.gameLayer = this.gameUI.gameLayer;
        //初始化生成器
        ZombieGenerator.getInstance().initGenerator(this.gameLayer);
        
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

        for (var i = 0; i < this.zombieList.length; i++) {
            var t_zombie = this.zombieList[i];
            ZombieFactory.getInstance().recoveryZombieToPool(t_zombie);
            this.zombieList.splice(i, 1);
        }
        this.zombieList = [];
        
        
    }

    /**开始游戏 */
    _proto.startGame = function () {

        
        this.createZombieList();

        Laya.timer.frameLoop(1, this, this.onUpdate);
        // Laya.timer.loop(1000,this,this.updateGameTime);
        
    }

    /**暂停游戏 */
    _proto.pauseGame = function(){
        Laya.timer.clear(this,this.onUpdate);
        // Laya.timer.clear(this,this.updateGameTime);
        for (var i = 0; i < this.zombieList.length; i++) {
            var t_zombie = this.zombieList[i];
            t_zombie.zombiePause();
        }
    }

    /**恢复游戏 */
    _proto.resumeGame = function(){
        Laya.timer.frameLoop(1, this, this.onUpdate);
        // Laya.timer.loop(1000,this,this.updateGameTime);
        for (var i = 0; i < this.zombieList.length; i++) {
            var t_zombie = this.zombieList[i];
            t_zombie.zombieResume();
        }
    }

    /**游戏结束 */
    _proto.gameover = function(_win){
        Gamelog("------------游戏结束");
        Laya.timer.clear(this,this.onUpdate);
        // Laya.timer.clear(this,this.updateGameTime);
        for (var i = 0; i < this.zombieList.length; i++) {
            var t_zombie = this.zombieList[i];
            ZombieFactory.getInstance().recoveryZombieToPool(t_zombie);
            this.zombieList.splice(i, 1);
        }

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
        if(this.zombieList.length == 0){
            this.createZombieList();
        }
    }

    //创建僵尸
    _proto.createZombieList = function(){
        this.levelData = null;
        for (var i = LevelData.length -1 ; i >=0; i--) {
            this.levelData = LevelData[i];
            if(this.gameScore >= this.levelData.score){
                break;
            }
        }
        var t_createNum = parseInt(Math.random() * (this.levelData.num) + 1);
        Gamelog("------产生数量 ="+t_createNum);

        var t_list =ZombieGenerator.getInstance().createZombie(t_createNum);
        this.zombieList = this.zombieList.concat(t_list);
        
        this.gameUI.updateAddLifeState();

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
        // this.curSight.pos(m_mouseDownPoint.x,m_mouseDownPoint.y);

        //斩杀动画
        var t_anim = new Laya.Animation();
        // t_anim.interval = 50;
        t_anim.play(0, false, "hurt_kill");
        t_anim.on(Laya.Event.COMPLETE,this,function(){
            t_anim.destroy();
        });
        t_anim.pivotX = 64;
        t_anim.pivotY = 64;
        t_anim.pos(m_mouseDownPoint.x,m_mouseDownPoint.y);
        this.gameLayer.addChild(t_anim);


        for (var i = 0; i < this.zombieList.length; i++) {
            var t_zombie = this.zombieList[i];
            if(m_mouseDownPoint.x >= t_zombie.x && m_mouseDownPoint.x <= t_zombie.x + t_zombie.width
                && m_mouseDownPoint.y >= t_zombie.y && m_mouseDownPoint.y <= t_zombie.y + t_zombie.height){
                    this.killZombie(t_zombie,true);
                    break;
                }
        }
        

    }
    /**
     * 杀死僵尸
     */
    _proto.killZombie = function(p_zombie,p_isKiss){
        Gamelog("-----killzombie type="+ p_zombie.m_type);
        Gamelog("----killzombie pos ="+ p_zombie.x+",y="+p_zombie.y);
    
        //杀死
        if(p_isKiss){
            
            this.addCrushZombie(new Point(p_zombie.x - 50,p_zombie.y + 30));

            if(p_zombie.m_type == 0){
                //杀死人类
                this.killLive();
                MusicManager.getInstance().playSound("res/music/humano.wav");
            }else{

                //杀死僵尸
                this.addScoreAnim(new Point(p_zombie.x +80,p_zombie.y),50);
                this.addGameScore();
                MusicManager.getInstance().playSound("res/music/dead"+p_zombie.m_zombieType+".wav");
            }
        }else{
            if(p_zombie.m_type == 1){
                //僵尸逃走
                this.killLive();
            }
        }

        for (var i = 0; i < this.zombieList.length; i++) {
            var t_zombie = this.zombieList[i];
            if(t_zombie == p_zombie){
                ZombieFactory.getInstance().recoveryZombieToPool(p_zombie);
                this.zombieList.splice(i, 1);
            }
        }
        Gamelog("-----剩余僵尸数量 ="+ this.zombieList.length);


    }

    //杀死生命
    _proto.killLive = function(){
         MusicManager.getInstance().playSound("res/music/killplayer.wav");
        var t_anim = new Laya.Animation();
        // t_anim.interval = 50;
        t_anim.play(0, false, "hurt_hurt");
        t_anim.pos(161,555)
        t_anim.on(Laya.Event.COMPLETE,this,function(){
            t_anim.destroy();
        });
        this.gameLayer.addChild(t_anim);


        this.gameLive --;
        if(this.gameLive <= 0){
            this.gameLive = 0;
            this.gameover();
        }
        this.gameUI.t_life.text = "x"+this.gameLive;
    }

    //增加粉碎
    _proto.addCrushZombie = function(_point){
        var t_crush = new CrushUI();
        t_crush.pos(_point.x,_point.y);
        this.gameLayer.addChild(t_crush);

        var t_imgList = [];
        t_imgList.push("Game/sheet0.png");
        t_imgList.push("Game/sheet1.png");
        t_imgList.push("Game/sheet"+ (parseInt(Math.random() *4) + 2)+".png");
        t_imgList.push("Game/sheet"+ (parseInt(Math.random() *4) + 2)+".png");

        t_imgList.sort(function(){
            return 0.5 - Math.random();
        });
        

        for (var i = 0; i < 4; i++) {
            var t_img = t_crush.getChildByName("img"+(i+1));
            t_img.skin = t_imgList[i];
            
        }

        t_crush.ani1.play(0,false);
        t_crush.ani1.on(Laya.Event.COMPLETE,this,function(){
            t_crush.destroy();
        });
        
    }

      /** 分数文字*/
    _proto.addScoreAnim = function(_point,_score){
        var scoreLabel = new Laya.Label("+"+ _score);
        // scoreLabel.font = _fontName !=  null ? _fontName :"shuzi5Font";
        scoreLabel.font = "SimHei";
        scoreLabel.fontSize = 50;
        scoreLabel.bold = true;
        scoreLabel.color = "#ffffff";
        // scoreLabel.stroke = 5;
        // scoreLabel.strokeColor = "#7d10f4";
        scoreLabel.align = "center";
        scoreLabel.anchorX = 0.5;
        scoreLabel.anchorY = 0.5;
        scoreLabel.pos(_point.x,_point.y);
        this.gameLayer.addChild(scoreLabel);

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
            y:_point.y - 40,
            alpha:0,
        },400);
        timeLine.play(0,false);
        timeLine.on(Laya.Event.COMPLETE,this,function(arg){
            arg.destroy();
        },[scoreLabel]);
    }
    
     /**增加生命 */
    _proto.addLife = function(_success){
        this.resumeGame();
        if(_success){
            this.gameLive ++;
            this.gameUI.t_life.text = "x"+this.gameLive;
            wxGame.getInstance().createVideoAD();
        }
    }

    return GameScene;
})();