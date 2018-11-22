/**
 * 台阶类
 */
var Step = (function (_super) {


    Laya.class(Step, "Core.Step", _super);
    _proto = Step.prototype;

    function Step() {
        Step.super(this);
        this.Init();
    }
 
    _proto.m_anim = null;                                                 //动画
    _proto.m_startPoint = null;                                           //起点坐标
    _proto.m_num = 0;                                                     //当前数字
    _proto.m_move = true;                                                 //是否移动
    _proto.m_type = 1;                                                    //类型
    _proto.m_time = 0;                                                    //时间
    _proto.m_level = -1;                                                  //等级
    


    _proto.Init = function () {

        // this.width = 151;
        // this.height = 171;

        this.on(Laya.Event.CLICK,this,this.StepClickEvent);


    }
    

    _proto.onDestroy = function () {
        
    }

    /**初始化 */
    _proto.initStep = function(p_type,p_startPoint,p_level){
        
        this.resetStep();

        this.m_startPoint = p_startPoint;
        this.m_type = p_type;
        this.m_level = p_level;

        this.img_step.skin = "Game/suelo1-sheet0.png";
        this.t_level.text = p_level;
        this.t_level.visible = true;
        this.img_shadow.visible = false;

        // var sp = new Sprite();

        // 1 终点  2 起点
        if(this.m_type == 1){
            this.x = this.m_startPoint.x;
            this.y = this.m_startPoint.y;
        }else{
            this.img_shadow.visible = true;
            this.x = this.m_startPoint.x;
            this.y = this.m_startPoint.y;
        }
       
        
    }


    /**重置状态 */
    _proto.resetStep = function(){
    }

    

    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        
    }

    //点击盘子
    _proto.StepClickEvent = function(){
        // Gamelog("------StepClickEvent m_type="+this.m_type);
        
    }

  
    

    
    

    return Step;
})(StepUI);