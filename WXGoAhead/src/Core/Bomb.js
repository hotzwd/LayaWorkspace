/**
 * 炸弹类
 */
var Bomb = (function (_super) {


    Laya.class(Bomb, "Core.Bomb", _super);
    _proto = Bomb.prototype;

    function Bomb() {
        Bomb.super(this);
        this.Init();
    }
    //汽车宽高
    var BombWidth = 68;
    var BombHeight = 48;

    var BombFallPosX = [422,440,460,490,530];

    _proto.m_anim = null;                                                 //爆炸动画
    _proto.m_startPoint = null;                                           //起点坐标
    _proto.m_isCrack = false;                                             //是否撞击
    _proto.curCar = null;                                                 //当前汽车
    _proto.curGround = null;                                              //当前地面
    _proto.curRock = null;                                                //当前石头
    _proto.m_isBomb = false;                                              //是否爆炸

    _proto.Init = function () {
        this.width = BombWidth;
        this.height = BombHeight;
        this.pivotX = BombWidth / 2;
        this.pivotY = BombHeight / 2;  

        this.m_anim = new Laya.Animation();
        this.m_anim.interval = 200;
        this.m_anim.play(0, true, "bombIgnite");
        this.m_anim.pivotX = 34;
        this.m_anim.pivotY = 24;
        this.m_anim.pos(this.pivotX,this.pivotY);
        this.addChild(this.m_anim);
        this.m_anim.stop();

        
        // this.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        // this.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        // this.on(Laya.Event.MOUSE_OUT,this,this._mouseUpEvent);
    }
    

    _proto.onDestroy = function () {

    }

    /**初始化石头 */
    _proto.initBomb = function(p_startPoint){
        this.m_startPoint = p_startPoint;

        this.resetBomb();
    }

    //初始化关卡
    _proto.initLevel = function(p_score){
        var t_index= SceneManager.getInstance().currentScene.curLevelIndex;
        var t_leveData = GameLevelData[t_index];

        switch (t_index) {
        
            default:
                break;
        }
    }

    /**重置状态 */
    _proto.resetBomb = function(){
        this.m_isBomb = false; 
    }

   

    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.curCar == null){
            this.curCar = SceneManager.getInstance().currentScene.curCar;
        }
        if(this.curGround == null){
            this.curGround = SceneManager.getInstance().currentScene.curGround;
        }
        if(this.curRock == null){
            this.curRock = SceneManager.getInstance().currentScene.curRock;
        }

        if(!this.m_isBomb && this.x >= this.curRock.x - this.curRock.width/2 && this.x <= this.curRock.x + this.curRock.width/2 &&
        this.y >= this.curRock.y - this.curRock.height/2 && this.y <= this.curRock.y + this.curRock.height/2){
            this.m_isBomb = true; 
            this.m_anim.play(0, false, "bombIgnite");
            this.m_anim.on(Laya.Event.COMPLETE,this,this.playBomb);
        }
        
    }

    //播放爆炸
    _proto.playBomb =function(){
        var t_anim = new Laya.Animation();
        t_anim.interval = 200;
        t_anim.play(0, false, "bombBlast");
        // t_anim.pivotX = 140;
        // t_anim.pivotY = 130;
        t_anim.pos(-90,-130);
        this.addChild(t_anim);

        MusicManager.getInstance().playSound("res/music/boom.mp3");
        t_anim.on(Laya.Event.COMPLETE,this,function(){
            this.destroy();
            //通过关卡
            this.curCar.m_canCrack = false;
            this.curRock.visible = false;
        });
    }


   

    return Bomb;
})(Laya.Sprite);