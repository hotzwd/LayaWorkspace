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
  

    _proto.Init = function () {
        

        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
        }

        // this.gameUI.moveBox.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        // this.gameUI.moveBox.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        

       
    }

    _proto.onDestroy = function () {

    }

    

    /**开始游戏 */
    _proto.startGame = function () {
         Laya.timer.frameLoop(1, this, this.onUpdate);

         wxGame.getInstance().showAD(2);
    }

    /**重置游戏 */
    _proto.restartGame = function(_score){
       

        
    }
    /**游戏结束 */
    _proto.gameover = function(){
        wxGame.getInstance().showAD(0);
        UIManager.getInstance().showUI("GameOverUI");
        
    }
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
       

    }

    
    /**按下监听事件 */
    _proto._mouseDowmEvent = function(_event){
        var tarPos = this.heroBox.globalToLocal(new Point(_event.stageX,_event.stageY));
    }
    /**按下移动监听事件 */
    _proto._mouseMoveEvent = function(_event){
        var tarPos = this.heroBox.globalToLocal(new Point(_event.stageX,_event.stageY));
        
    }


  

    return GameScene;
})();