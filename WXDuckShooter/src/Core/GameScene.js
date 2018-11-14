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
    _proto.duckLayer = null;                                                 //鸭子层
    _proto.gameLayer = null;                                                 //游戏层
    _proto.curSight = null;                                                  //当前瞄准镜
    _proto.duckList = null;                                                  //所有鸭子列表
  

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

        // this.startGame();
       
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
         Laya.timer.frameLoop(1, this, this.onUpdate);
         
         this.duckList = [];
         var t_list =DuckGenerator.getInstance().createduck(1);
         this.duckList = this.duckList.concat(t_list);
    }


    /**重置游戏 */
    _proto.restartGame = function(_score){
        this.duckList = [];

        
    }
    /**游戏结束 */
    _proto.gameover = function(_win){
        // wxGame.getInstance().showAD(0);
        
        Laya.timer.clear(this,this.onUpdate);
        
        
        // var overUI = UIManager.getInstance().showUI("GameOverUI");
        // overUI.initUI(_win);


        
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
        
    }
    


  

    return GameScene;
})();