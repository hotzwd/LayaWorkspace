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
    
    //霓虹宽度
    var neonWidth = 13;

    _proto.m_icon = null;                                                 //图标
    _proto.m_anim = null;                                                 //动画
    _proto.m_startPoint = null;                                           //起点坐标
    _proto.m_num = 0;                                                     //当前数字
    _proto.m_move = true;                                                 //是否移动
    _proto.m_type = 1;                                                    //类型
    _proto.m_time = 0;                                                    //时间
    _proto.boxLeft = null;
    _proto.boxRight = null;
    


    _proto.Init = function () {

        this.width = 218;
        this.height = 92;

        // this.on(Laya.Event.CLICK,this,this.BoxesClickEvent);

        this.m_icon = new Laya.Image();
        this.addChild(this.m_icon);
    }
    

    _proto.onDestroy = function () {
        
    }

    /**初始化 */
    _proto.initBoxes = function(p_type,p_dir,p_startPoint){
        
        this.bengbengresetBoxes();

        this.m_type = p_type;
        this.m_dir = p_dir;
        this.m_startPoint = p_startPoint;
        this.x = p_startPoint.x;
        this.y = p_startPoint.y;

        this.boxLeft = SceneManager.getInstance().currentScene.m_boxLeft;
        this.boxRight = SceneManager.getInstance().currentScene.m_boxRight;
        //方形
        if(this.m_type == 1){
            this.m_icon.skin = "Game/fang"+p_dir+".png";
            this.width = 218;
            this.height = 92;

        }else{
            this.m_icon.skin = "Game/san"+p_dir+".png";
            this.width = 112;
            this.height =122;
        }
        
    }


    /**重置状态 */
    _proto.bengbengresetBoxes = function(){
    }

    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        // this.y += 10;
        // this.y += 35;
        this.y += SceneManager.getInstance().currentScene.levelData.speed;
        //左边
        if(this.m_dir == 1){
            if(this.boxLeft.x + this.boxLeft.width /2 - neonWidth *2>= this.x && this.y + this.height -neonWidth*2 >= this.boxLeft.y - this.boxLeft.height / 2 && this.y <= this.boxLeft.y + this.boxLeft.height/2 - neonWidth*2){
                Gamelog("----撞到左边")
                SceneManager.getInstance().currentScene.gameover();
            }
        }else{
            if( this.x + this.width - neonWidth*2 >= this.boxRight.x - this.boxRight.width /2 && this.y + this.height - neonWidth*2 >= this.boxRight.y - this.boxRight.height / 2 && this.y <= this.boxRight.y + this.boxRight.height/2 -neonWidth*2){
                Gamelog("----撞到右边")
                SceneManager.getInstance().currentScene.gameover();
            }
        }

        //出屏幕
        if(this.y > Laya.stage.height +120){
            SceneManager.getInstance().currentScene.deleteBox(this);
        }

       
    }

    //点击盘子
    _proto.BoxesClickEvent = function(){
        // Gamelog("------BoxesClickEvent m_type="+this.m_type);
        
    }

    return Boxes;
})(Laya.Sprite);