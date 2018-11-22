/**
 * 飞刀类
 */
var Knife = (function (_super) {


    Laya.class(Knife, "Core.Knife", _super);
    _proto = Knife.prototype;

    function Knife() {
        Knife.super(this);
        this.Init();
    }
 
    _proto.m_anim = null;                                                 //动画
    _proto.m_img = null;                                                  //图片
    _proto.m_startPoint = null;                                           //起点坐标
    _proto.m_num = 0;                                                     //当前数字
    _proto.m_move = true;                                                 //是否移动
    _proto.m_type = 1;                                                    //类型
    _proto.m_time = 0;                                                    //时间
    _proto.m_state = 0;                                                   //状态
    


    _proto.Init = function () {

        this.width = 79;
        this.height = 63;
        this.pivotX = 31;
        this.pivotY = 30;

        this.on(Laya.Event.CLICK,this,this.KnifeClickEvent);

        this.m_img = new Laya.Image("Game/player-sheet0.png");
        // this.m_img.pivotX = 31;
        // this.m_img.pivotY = 30;
        this.addChild(this.m_img);
    }
    

    _proto.onDestroy = function () {
        
    }

    /**初始化 */
    _proto.initKnife = function(p_type,p_startPoint){
        
        this.resetKnife();

        this.m_type = p_type;
        // this.m_time = p_time;
        this.m_startPoint = p_startPoint;
        this.x = this.m_startPoint.x;
        this.y = this.m_startPoint.y;
       
        
    }


    /**重置状态 */
    _proto.resetKnife = function(){
    }

    

    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        //起飞
        if(this.m_state == 1){
            this.rotation += 20;
            this.y -= 5;
        }
    }

    _proto.setState = function(p_state){
        //起飞状态
        this.m_state = p_state;
    }
    //点击
    _proto.KnifeClickEvent = function(){
        // Gamelog("------KnifeClickEvent m_type="+this.m_type);
        
    }

  
    

    
    

    return Knife;
})(Laya.Sprite);