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
     * 游戏波次
     */
    var GameWaveList = [1,1,1,1,2,2,2,3];
    /**
     * 游戏速度增加
     */
    var GameSpeedAdd = 0.5;

    _proto.gameUI = null;                                                    //ui对象
    _proto.duckLayer = null;                                                 //鸭子层
    _proto.gameLayer = null;                                                 //游戏层
    _proto.curSight = null;                                                  //当前瞄准镜
    _proto.duckList = null;                                                  //所有鸭子列表
    _proto.gameScore = 0;                                                    //游戏得分
    _proto.curGameWaveIndex = 0;                                             //当前游戏波次
    _proto.duckSpeed = 3;                                                    //鸭子速度
    _proto.bulletNum = 3;                                                    //子弹个数
    _proto.hitDuckList = null;                                               //击中鸭子状态列表
    _proto.gamelife = 4;                                                     //游戏生命数
  

    _proto.Init = function () {
        
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
            this.gameUI.visible = false;
        }

        // this.gameBox = new Laya.Box();
        // this.gameBox.width = Laya.stage.width;
        // this.gameBox.height = Laya.stage.height;
        // this.gameBox.zOrder = 10;
        // this.gameBox.mouseEnabled = true;
        // this.gameBox.mouseThrough = true;
        
        // Laya.stage.addChild(this.gameBox);
        this.gameLayer = this.gameUI.gameLayer;
        this.duckLayer = this.gameUI.duckLayer;
        //初始化生成器
        DuckGenerator.getInstance().initGenerator(this.duckLayer);
        
        this.gameLayer.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        this.gameLayer.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        this.gameLayer.on(Laya.Event.MOUSE_UP,this,this._mouseUpEvent);

        //自动适配完后初始化
        Laya.timer.frameOnce(8, this, this.delayInitShow);
        // this.delayInitShow();

        // this.restartGame();
       
    }

    _proto.onDestroy = function () {

    }

    //自动适配完后初始化
     _proto.delayInitShow = function () {

        //初始化瞄准镜
        this.curSight = new Sight();
        var t_sightPoint = new Point(this.gameUI.img_sight.x,this.gameUI.img_sight.y);
        this.curSight.initSight(t_sightPoint);
        this.gameLayer.addChild(this.curSight);
        this.gameUI.img_sight.visible =false;

        // this.startGame();

        
     }

    /**开始游戏 */
    _proto.startGame = function () {

        this.restartGame();
        Laya.timer.frameLoop(1, this, this.onUpdate);
        
    }


    /**重置游戏 */
    _proto.restartGame = function(_score){
        this.duckList = [];
        this.gameScore = 0;
        this.gameUI.t_gamescore.text = this.gameScore;
        this.curGameWaveIndex = 0;
        this.duckSpeed = 3;
        GameWaveList.sort(function(){
            return 0.5 - Math.random();
        });
        this.bulletNum = 3;
        this.hitDuckList = [];
        this.gameUI.updateHitDuckData();
        this.gamelife = 4;
        this.gameUI.t_life.text = "x"+this.gamelife;
        
    }
    /**游戏结束 */
    _proto.gameover = function(_win){
        Laya.timer.clear(this,this.onUpdate);

        UIManager.getInstance().showUI("GameOverUI");
        
    }
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.duckList.length != 0){
            for (var i = 0; i < this.duckList.length; i++) {
                var t_duck = this.duckList[i];
                t_duck.onUpdate();
            }
        }else{
            //生成鸭子
            var t_list =DuckGenerator.getInstance().createduck(GameWaveList[this.curGameWaveIndex]);
            this.duckList = this.duckList.concat(t_list);
            this.curGameWaveIndex++;
            if(this.curGameWaveIndex >= GameWaveList.length){
                this.curGameWaveIndex = 0;
                this.duckSpeed += GameSpeedAdd;
                GameWaveList.sort(function(){
                    return 0.5 - Math.random();
                });
            }
            this.bulletNum = 3;
            this.gameUI.updateBulletData();
        }
       
    }



    
    /**按下监听事件 */
    _proto._mouseDowmEvent = function(_event){
        var m_mouseDownPoint = new Point(_event.stageX,_event.stageY);
        this.gameLayer.globalToLocal(m_mouseDownPoint);
        this.curSight.pos(m_mouseDownPoint.x,m_mouseDownPoint.y);


    }
     /**按下移动监听事件 */
    _proto._mouseMoveEvent = function (_event) {
        var m_mouseDownPoint = new Point(_event.stageX,_event.stageY);
        this.gameLayer.globalToLocal(m_mouseDownPoint);
        this.curSight.pos(m_mouseDownPoint.x,m_mouseDownPoint.y);

    }
     /**抬起监听事件 */
    _proto._mouseUpEvent = function (_event) {
        //开枪
        this.curSight._tapShot(new Point(_event.stageX,_event.stageY));
        
        

    }

    //增加分数
    _proto.addGameScore = function(_score){
        this.gameScore +=  _score;
        this.gameUI.t_gamescore.text = this.gameScore;
    }
    

    //删除鸭子
    _proto.deleteDuck = function(p_duck,p_isHit){
        for (var i = 0; i < this.duckList.length; i++) {
            var t_duck = this.duckList[i];
            if(t_duck == p_duck){
                DuckFactory.getInstance().recoveryduckToPool(t_duck);
                // Gamelog("------删除鸭子");
                this.duckList.splice(i, 1);
            }

        }
        //检测子弹
        if(this.hitDuckList.length >= 10){
            this.hitDuckList.shift();
        }
        this.hitDuckList.push(p_isHit);
        this.gameUI.updateHitDuckData();

        //检测生命
        if(p_isHit == 0){
            this.gamelife--;
            this.gameUI.t_life.text = "x"+this.gamelife;
            if(this.gamelife == 0){
                //游戏结束
                this.gameover();
            }
        }
    }


  

    return GameScene;
})();