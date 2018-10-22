/**
 * 石头类
 */
var Rock = (function (_super) {


    Laya.class(Rock, "Core.Rock", _super);
    _proto = Rock.prototype;

    function Rock() {
        Rock.super(this);
        this.Init();
    }
    //汽车宽高
    var RockWidth = 128;
    var RockHeight = 132;

    _proto.m_anim = null;                                                 //汽车动画
    _proto.m_isStartCar = false;                                          //是否发动汽车
    _proto.m_Speed = 2;                                                   //速度
    _proto.m_startPoint = null;                                           //起点坐标
    _proto.m_canRotate = false;                                           //是否旋转
    _proto.m_isRotate = false;                                            //是否正在旋转
    _proto.m_isCrack = false;                                             //是否撞击
    _proto.curCar = null;                                                 //当前汽车

    _proto.Init = function () {
        this.width = RockWidth;
        this.height = RockHeight;
        this.pivotX = RockWidth / 2;
        this.pivotY = RockHeight / 2;  

        this.m_anim = new Laya.Animation();
        this.m_anim.interval = 100;
        // this.m_anim.play(0, true, "car_run");
        // this.m_anim.pivotX = 181;
        // this.m_anim.pivotY = 55;
        // this.m_anim.pos(this.pivotX,this.pivotY);
        // this.addChild(this.m_anim);
        // this.m_anim.stop();

        this.loadImage("game_resoure/stone.png");

        this.m_canRotate = false;
        this.m_isCrack = false;
        this.m_isRotate = false;
       
    }

    _proto.onDestroy = function () {

    }

    /**初始化石头 */
    _proto.initRock = function(p_startPoint){
        this.m_startPoint = p_startPoint;

        this.resetRock();
    }

    //初始化关卡
    _proto.initLevel = function(p_score){
        var t_index= SceneManager.getInstance().currentScene.curLevelIndex;
        var t_leveData = GameLevelData[t_index];

        switch (t_index) {
            case 1:
                this.m_canRotate = true;
                break;
        
            default:
                break;
        }
    }

    /**重置石头状态 */
    _proto.resetRock = function(){
        this.x = this.m_startPoint.x;
        this.y = this.m_startPoint.y;
        this.rotation = 0;

        this.stopRock();

        this.m_canRotate = false;
        this.m_isCrack = false;
        this.m_isRotate = false;
    }

    _proto.stopRock = function(){
        Laya.timer.clearAll(this);
        this.stopSoundRoll();
        
        this.m_anim.stop();
    }

    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.curCar == null){
            this.curCar = SceneManager.getInstance().currentScene.curCar;
        }

        if(!this.m_isCrack){
            var t_dis = (this.curCar.x + this.curCar.width /2 ) - (this.x -20);
            if(t_dis >= 0){
                this.m_isCrack = true;
            }else{
                return;
            }

        }


        if(!this.m_canRotate)
            return;
        this.pos(this.x + this.m_Speed, this.y);
        // var t_sp = Laya.Sprite();
        // t_sp.rotation
        this.rotation += this.m_Speed;
        if(!this.m_isRotate)
            this.playSoundRoll();
        this.m_isRotate = true;
        
    }

    _proto.playSoundRoll = function(){
        MusicManager.getInstance().playSound("res/music/stone_roll.mp3");
        Laya.timer.loop(2000,this,function(){
            MusicManager.getInstance().playSound("res/music/stone_roll.mp3");
        })
    }
    _proto.stopSoundRoll = function(){
        
        Laya.SoundManager.stopSound("res/music/stone_roll.mp3");
    }


    return Rock;
})(Laya.Sprite);