/**
 * 盘子类
 */
var Plate = (function (_super) {


    Laya.class(Plate, "Core.Plate", _super);
    _proto = Plate.prototype;

    function Plate() {
        Plate.super(this);
        this.Init();
    }
 
    _proto.m_anim = null;                                                 //动画
    _proto.m_startPoint = null;                                           //起点坐标
    _proto.m_num = 0;                                                     //当前数字
    _proto.m_move = true;                                                 //是否移动
    _proto.m_type = 1;                                                    //类型
    


    _proto.Init = function () {

        this.on(Laya.Event.CLICK,this,this.plateClickEvent);
    }
    

    _proto.onDestroy = function () {

    }

    /**初始化 */
    _proto.initPlate = function(p_num,p_startPoint){
        
        this.resetPlate();

        this.m_num = p_num;
        this.t_num.text = p_num;

        this.m_type = parseInt(Math.random()*10 + 1);
        //随机图片
        this.img_food.skin = "Game/food"+this.m_type+".png";
        
    }


    /**重置状态 */
    _proto.resetPlate = function(){
    }

    
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        
    }

    //点击盘子
    _proto.plateClickEvent = function(){
        // Gamelog("------plateClickEvent num="+this.m_num);
        if(SceneManager.getInstance().currentScene.clickPlate){

            SceneManager.getInstance().currentScene.onPlateClickEvent(this);
        }
        MusicManager.getInstance().playSound("res/music/plate1.wav");
    }
    

    
    

    return Plate;
})(PlateUI);