/**
 * 瞄准镜类
 */
var Sight = (function (_super) {


    Laya.class(Sight, "Core.Sight", _super);
    _proto = Sight.prototype;

    function Sight() {
        Sight.super(this);
        this.Init();
    }
    //宽高
    var SightWidth = 176;
    var SightHeight = 176;

    _proto.m_anim = null;                                                 //射击动画
    _proto.m_img = null;                                                  //图片
    _proto.m_startPoint = null;                                           //初始位置

    _proto.Init = function () {
        this.width = SightWidth;
        this.height = SightHeight;
        this.pivotX = SightWidth / 2;
        this.pivotY = SightHeight / 2;  

        // this.m_anim = new Laya.Animation();
        // this.m_anim.interval = 100;
        // this.m_anim.play(0, true, "Sight_run");
        // this.m_anim.pivotX = 181;
        // this.m_anim.pivotY = 55;
        // this.m_anim.pos(this.pivotX,this.pivotY);
        // this.addChild(this.m_anim);
        // this.m_anim.stop();
        m_img = new Laya.Image("Game/gun_sight.png");
        this.addChild(m_img);
        


        // this.on(Laya.Event.CLICK,this,this._catClickEvent);
        // this.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        // this.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        // this.on(Laya.Event.MOUSE_OUT,this,this._mouseUpEvent);
       
        
    }

    _proto.onDestroy = function () {

    }

    /**初始化汽车 */
    _proto.initSight = function(p_startPoint){
        this.m_startPoint = p_startPoint;

        this.resetSight();
    }


    /**重置状态 */
    _proto.resetSight = function(){
        this.x = this.m_startPoint.x;
        this.y = this.m_startPoint.y;

        // this.m_anim.play(0, true, "Sight_run");
        // this.m_anim.stop();
        // this.m_anim.offAll();
        
    }

    
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.curRock == null){
            this.curRock = SceneManager.getInstance().currentScene.curRock;
        }

        if(!this.m_isStartSight)
            return;
        //出屏幕
        if(this.x > Laya.stage.width+200){
            this.x = -100;
        }
        if(this.x < -200){
            this.x = Laya.stage.width+200;
        }
        //到站
        if(this.x >= this.m_stationPoint.x - this.m_SightSpeed && this.x <= this.m_stationPoint.x + this.m_SightSpeed){
            this.m_isArrive = true;
            SceneManager.getInstance().currentScene.gameover(true);
        }

        //回到起点
        if(this.m_isArrive && this.x >= this.m_startPoint.x - this.m_SightSpeed && this.x <= this.m_startPoint.x + this.m_SightSpeed){
            this.resetSight();
        }
        if(this.scaleX == -1){
            this.pos(this.x - this.m_SightSpeed, this.y);
        }else{
            this.pos(this.x + this.m_SightSpeed, this.y);
        }

        if(this.m_canCrack){
            var t_dis = (this.x + this.width /2 ) - (this.curRock.x -20);
            if(t_dis >= 0 && this.x < this.curRock.x && this.y < this.curRock.y + 100){
                this.SightCrack();
            }
        }
    }

    
    
    /**按下汽车监听事件 */
    _proto._catClickEvent = function(_event){
        if(!this.m_isStartSight){
            Gamelog("-----点击汽车");
            this.m_isStartSight = true;
            this.m_anim.play(0, true, "Sight_run");
            
            MusicManager.getInstance().playSound("res/music/Sight_run.mp3");
            this.curRock.setmouseEnabled(false);
        }
    }

    _proto._mouseDowmEvent = function (_event) {
        
    }
    _proto._mouseMoveEvent = function (_event) {
        

    }
    _proto._mouseUpEvent = function (_event) {
        
    }

    return Sight;
})(Laya.Sprite);