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
        
    }

    
    
    /**开枪 */
    _proto._tapShot = function(p_stagePoint){
        // Gamelog("-----开枪");



        var m_mouseDownPoint = new Point(p_stagePoint.x,p_stagePoint.y);
        var t_currentScene = SceneManager.getInstance().currentScene;
        t_currentScene.gameLayer.globalToLocal(m_mouseDownPoint);

        if(t_currentScene.bulletNum <= 0){
            t_currentScene.bulletNum = 0;
            //没有子弹
            MusicManager.getInstance().playSound("res/music/ds_no_bullets.wav");
            return;

        }

        t_currentScene.bulletNum --;
        t_currentScene.gameUI.updateBulletData();

        var t_anim = new Laya.Animation();
        t_anim.interval = 50;
        t_anim.play(0, true, "tap_shot");
        t_anim.pivotX = 100;
        t_anim.pivotY = 100;
        t_anim.pos(m_mouseDownPoint.x,m_mouseDownPoint.y);
        t_currentScene.gameLayer.addChild(t_anim);

        t_anim.on(Laya.Event.COMPLETE,this,function(){
            t_anim.destroy();
        });
        MusicManager.getInstance().playSound("res/music/ds_shot.wav");

        //检测是否击中
        if(t_currentScene.duckList.length > 0){
            for (var i = 0; i < t_currentScene.duckList.length; i++) {
                var t_duck = t_currentScene.duckList[i];
                var t_duckPoint = t_duck.globalToLocal(p_stagePoint,true);
                if(!t_duck.m_isHit && t_duckPoint.x >= t_duck.rangSp.x - t_duck.rangSp.width/2 && t_duckPoint.x <= t_duck.rangSp.x + t_duck.rangSp.width/2
                    && t_duckPoint.y >= t_duck.rangSp.y - t_duck.rangSp.height/2 && t_duckPoint.y <= t_duck.rangSp.y + t_duck.rangSp.height/2){
                        // Gamelog("-----开枪 击中");
                        t_duck.hitDuck();
                        MusicManager.getInstance().playSound("res/music/ds_duck_hit.wav");
                    }
            }
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