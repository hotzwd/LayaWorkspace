/**
 * 汽车类
 */
var Car = (function (_super) {


    Laya.class(Car, "Core.Car", _super);
    _proto = Car.prototype;

    function Car() {
        Car.super(this);
        this.Init();
    }
    //汽车宽高
    var CarWidth = 283;
    var CarHeight = 111;

    _proto.m_anim = null;                                                 //汽车动画
    _proto.effectAnim = null;                                           //特效动画
    _proto.m_isStartCar = false;                                          //是否发动汽车
    _proto.m_carSpeed = 2;                                                //汽车速度
    _proto.m_startPoint = null;                                           //起点坐标
    _proto.m_isArrive = false;                                            //是否到站
    _proto.m_stationPoint = null;                                         //车站坐标
    _proto.curRock = null;                                                //当前石头
    _proto.m_canCrack = false;                                            //是否可以撞击

    _proto.Init = function () {
        this.width = CarWidth;
        this.height = CarHeight;
        this.pivotX = CarWidth / 2;
        this.pivotY = CarHeight / 2;  

        this.m_anim = new Laya.Animation();
        this.m_anim.interval = 100;
        this.m_anim.play(0, true, "car_run");
        this.m_anim.pivotX = 181;
        this.m_anim.pivotY = 55;
        this.m_anim.pos(this.pivotX,this.pivotY);
        this.addChild(this.m_anim);
        this.m_anim.stop();

        this.m_isStartCar = false;
        this.m_isArrive = false;
        this.m_canCrack = false;

        // Laya.timer.frameLoop(1, this, this.onUpdate);
        this.on(Laya.Event.CLICK,this,this._catClickEvent);
       
    }

    _proto.onDestroy = function () {

    }

    /**初始化汽车 */
    _proto.initCar = function(p_startPoint,p_stationPoint){
        this.m_startPoint = p_startPoint;
        this.m_stationPoint = p_stationPoint;

        this.resetCar();
    }
    //初始化关卡
    _proto.initLevel = function(p_score){
        var t_index= SceneManager.getInstance().currentScene.curLevelIndex;
        var t_leveData = GameLevelData[t_index];

        switch (t_index) {
            case 2:
                this.m_canCrack = true;
                break;
        
            default:
                break;
        }
    }

    /**重置汽车状态 */
    _proto.resetCar = function(){
        this.x = this.m_startPoint.x;
        this.y = this.m_startPoint.y;

        this.m_anim.play(0, true, "car_run");
        this.m_anim.stop();
        this.m_anim.offAll();
        
        this.m_isArrive = false;
        this.m_isStartCar = false;
        this.m_canCrack = false;
    }

    //停止运动
    _proto.stopCar = function(){
        this.m_isStartCar = false;
        this.m_anim.stop();
    }
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.curRock == null){
            this.curRock = SceneManager.getInstance().currentScene.curRock;
        }

        if(!this.m_isStartCar)
            return;
        //出屏幕
        if(this.x > Laya.stage.width+200){
            this.x = -100;
        }
        //到站
        if(this.x >= this.m_stationPoint.x - this.m_carSpeed && this.x <= this.m_stationPoint.x + this.m_carSpeed){
            this.m_isArrive = true;
            SceneManager.getInstance().currentScene.gameover(true);
        }

        //回到起点
        if(this.m_isArrive && this.x >= this.m_startPoint.x - this.m_carSpeed && this.x <= this.m_startPoint.x + this.m_carSpeed){
            this.resetCar();
        }
        this.pos(this.x + this.m_carSpeed, this.y);

        if(this.m_canCrack){
            var t_dis = (this.x + this.width /2 ) - (this.curRock.x -20);
            if(t_dis >= 0){
                this.carCrack();
            }
        }
    }

    /**汽车撞击 */
    _proto.carCrack = function(){
        this.stopCar();
        this.m_anim.play(0, false, "car_crack1");

        MusicManager.getInstance().playSound("res/music/collide_stone.mp3");
        // this.m_anim.on(Laya.Event.COMPLETE,this,function(){
        //     SceneManager.getInstance().currentScene.gameover();
        // });

        this.curRock.rockCrack();
    }
    
    /**按下汽车监听事件 */
    _proto._catClickEvent = function(_event){
        if(!this.m_isStartCar){
            Gamelog("-----点击汽车");
            this.m_isStartCar = true;
            this.m_anim.play(0, true, "car_run");
            
            MusicManager.getInstance().playSound("res/music/car_run.mp3");
            this.curRock.setmouseEnabled(false);
        }
    }

    return Car;
})(Laya.Sprite);