/**
 * 僵尸类
 */
var Zombie = (function (_super) {


    Laya.class(Zombie, "Core.Zombie", _super);
    _proto = Zombie.prototype;

    function Zombie() {
        Zombie.super(this);
        this.Init();
    }
 
    _proto.m_anim = null;                                                 //动画
    _proto.m_startPoint = null;                                           //起点坐标
    _proto.m_num = 0;                                                     //当前数字
    _proto.m_move = true;                                                 //是否移动
    _proto.m_type = 1;                                                    //类型
    _proto.m_time = 0;                                                    //时间
    


    _proto.Init = function () {

        this.width = 151;
        this.height = 171;

        this.on(Laya.Event.CLICK,this,this.ZombieClickEvent);

        // this.m_anim = new Laya.Animation();
        // this.m_anim.interval = 50;
        // this.m_anim.play(0, false, "zombie_human");
        // this.m_anim.pivotX = 75;
        // this.m_anim.pivotY = 85;
        // this.m_anim.pos(this.pivotX,this.pivotY);
        // this.addChild(this.m_anim);
        // this.m_anim.stop();
    }
    

    _proto.onDestroy = function () {
        Laya.timer.clear(this,this.updateGameTime);
    }

    /**初始化 */
    _proto.initZombie = function(p_type,p_startPoint,p_time){
        
        this.resetZombie();

        this.m_type = p_type;
        this.m_time = p_time;
       
        
    }


    /**重置状态 */
    _proto.resetZombie = function(){
    }

    

    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        
    }

    //点击盘子
    _proto.ZombieClickEvent = function(){
        // Gamelog("------ZombieClickEvent m_type="+this.m_type);
        
    }

  
    

    
    

    return Zombie;
})(Laya.Sprite);