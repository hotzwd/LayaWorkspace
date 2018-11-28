/**
 * 箱子类
 */
var Boxes = (function (_super) {


    Laya.class(Boxes, "Core.Boxes", _super);
    _proto = Boxes.prototype;

    function Boxes() {
        Boxes.super(this);
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

        this.on(Laya.Event.CLICK,this,this.BoxesClickEvent);

        this.m_anim = new Laya.Animation();
        // this.m_anim.interval = 50;
        this.m_anim.play(0, false, "Boxes_human");
        // this.m_anim.pivotX = 75;
        // this.m_anim.pivotY = 85;
        // this.m_anim.pos(this.pivotX,this.pivotY);
        this.addChild(this.m_anim);
        // this.m_anim.stop();
    }
    

    _proto.onDestroy = function () {
        Laya.timer.clear(this,this.updateGameTime);
    }

    /**初始化 */
    _proto.initBoxes = function(p_type,p_startPoint,p_time){
        
        this.resetBoxes();

        this.m_type = p_type;
        this.m_time = p_time;
        this.m_startPoint = p_startPoint;
        this.x = p_startPoint.x;
        this.y = p_startPoint.y;

        if(this.m_type == 0){
            this.m_anim.play(0, false, "Boxes_human");
        }else{
            var t_anim = parseInt(Math.random()* 2 +1);
            this.m_BoxesType = t_anim;
            this.m_anim.play(0, false, "Boxes_"+ t_anim);
            MusicManager.getInstance().playSound("res/music/crear"+t_anim+".wav");
        }

        //第一关不
        if(this.m_time != -1){
            Laya.timer.loop(1000,this,this.updateGameTime);
        }
        
    }


    /**重置状态 */
    _proto.resetBoxes = function(){
    }

    
    /**更新游戏时间 */
    _proto.updateGameTime = function(){
        this.m_time --;
        if(this.m_time <= 0){
            this.m_time = 0;
            this.BoxesDisappear();
        }

    }

    //消失
    _proto.BoxesDisappear = function(){
        Gamelog("------BoxesDisappear m_type="+this.m_type);
        SceneManager.getInstance().currentScene.killBoxes(this,false);
    }

    _proto.BoxesPause = function(){
        if(this.visible &&  this.m_time >0){
            Laya.timer.clear(this,this.updateGameTime);
        }
    }
    _proto.BoxesResume =function(){
        if(this.visible && this.m_time >0){
            Laya.timer.loop(1000,this,this.updateGameTime);
        }
    }

    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        
    }

    //点击盘子
    _proto.BoxesClickEvent = function(){
        // Gamelog("------BoxesClickEvent m_type="+this.m_type);
        
    }

  
    

    
    

    return Boxes;
})(Laya.Sprite);