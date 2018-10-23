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
            case 2:
                break;
        
            default:
                break;
        }
    }

    /**重置石头状态 */
    _proto.resetGround = function(){
        this.m_left.skin = "game_resoure/groundLeft.png";
        this.m_right.skin ="game_resoure/groundRight.png";

        this.m_crackNum = 1;
    }

    
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
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

    

    return Ground;
})(Laya.Sprite);