/**
 * 地面类
 */
var Ground = (function (_super) {


    Laya.class(Ground, "Core.Ground", _super);
    _proto = Ground.prototype;

    function Ground() {
        Ground.super(this);
        this.Init();
    }
    //地面宽高
    var GroundWidth = 890;
    var GroundHeight = 160;

    _proto.m_left = null;                                                 //左侧地面
    _proto.m_right = null;                                                //右侧地面
    _proto.m_anim = null;                                                 //地面动画
    _proto.m_crackNum = 1;                                                //撞击次数
    _proto.m_startPoint = null;                                           //起点坐标
    _proto.curRock = null;                                                //当前石头


    _proto.Init = function () {
        this.width = GroundWidth;
        this.height = GroundHeight;
        this.pivotX = GroundWidth / 2;
        this.pivotY = GroundHeight / 2;  

        this.m_anim = new Laya.Animation();
        this.m_anim.interval = 100;
        // this.m_anim.play(0, true, "car_run");
        // this.m_anim.pivotX = 181;
        // this.m_anim.pivotY = 55;
        // this.m_anim.pos(this.pivotX,this.pivotY);
        // this.addChild(this.m_anim);
        // this.m_anim.stop();

        this.m_left = new Laya.Image("game_resoure/groundLeft.png");
        this.m_left.pos(0,3);
        this.addChild(this.m_left);

        this.m_right = new Laya.Image("game_resoure/groundRight.png");
        this.m_right.pos(492,0);
        this.addChild(this.m_right);

        this.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
    }
    

    _proto.onDestroy = function () {

    }

    /**初始化石头 */
    _proto.initGround = function(p_startPoint){
        this.m_startPoint = p_startPoint;

        this.resetGround();
    }

    //初始化关卡
    _proto.initLevel = function(p_score){
        var t_index= SceneManager.getInstance().currentScene.curLevelIndex;
        var t_leveData = GameLevelData[t_index];

        switch (t_index) {
            case 6:
                this.mouseEnabled = true;
                this.mouseEnabled = true;
                break;
        
            default:
                this.mouseEnabled = false;
                break;
        }
    }

    /**重置石头状态 */
    _proto.resetGround = function(){
        this.m_left.skin = "game_resoure/groundLeft.png";
        this.m_right.skin ="game_resoure/groundRight.png";

        this.m_crackNum = 1;
        this.mouseEnabled = false;
    }

    
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.curRock == null){
            this.curRock = SceneManager.getInstance().currentScene.curRock;
        }
        // if(this.curCar == null){
        //     this.curCar = SceneManager.getInstance().currentScene.curCar;
        // }

        
    }

    //石头撞击地面
    _proto.rockCrackGround = function(){
        if(this.m_crackNum >= 1 && this.m_crackNum <= 4){
            this.m_left.skin = "game_resoure/sunkenLeft"+this.m_crackNum+".png";
            this.m_right.skin ="game_resoure/sunkenRight"+this.m_crackNum+".png";
        }
        if(this.m_crackNum == 4){
            return;
        }
        this.m_crackNum++;
    }

    /**按下移动监听事件 */
    _proto._mouseMoveEvent = function(_event){
        if(this.curRock == null)
            return;
        
        var t_scene = SceneManager.getInstance().currentScene;

        // Gamelog("---move x="+_event.stageX+",y="+_event.stageY);
        // return;
       
        var t_rad = Math.atan2(Laya.stage.height - _event.stageY,Laya.stage.width - _event.stageX) / Math.PI * 180;  //注意参数（y,x） Y在前，X在后
        // Gamelog("---rotation t_rad="+t_rad);
        t_scene.gameBox.rotation = t_rad; 
        
        if(t_rad < 0){
            t_scene.gameBox.rotation = 0; 
        }

        if(t_rad >= 6){
            t_scene.gameBox.rotation = 6; 
            this.mouseEnabled = false;
            this.curRock.m_canRotate = true;
            this.curRock.m_autoRotate = true;
            
        }
    }
    

    return Ground;
})(Laya.Sprite);