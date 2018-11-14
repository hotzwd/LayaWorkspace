/**
 * 鸭子类
 */
var Duck = (function (_super) {


    Laya.class(Duck, "Core.Duck", _super);
    _proto = Duck.prototype;

    function Duck() {
        Duck.super(this);
        this.Init();
    }
    //鸭子宽高
    var DuckWidth = 200;
    var DuckHeight = 204;

 
    _proto.m_anim = null;                                                 //动画
    _proto.m_startPoint = null;                                           //起点坐标
    _proto.m_type = 1;                                                    //种类


    _proto.Init = function () {
        this.width = DuckWidth;
        this.height = DuckHeight;
        this.pivotX = DuckWidth / 2;
        this.pivotY = DuckHeight / 2;  

        this.m_anim = new Laya.Animation();
        this.m_anim.interval = 100;
        this.m_anim.play(0, true, "duck_1_fly");
        this.m_anim.pivotX = 100;
        this.m_anim.pivotY = 102;
        this.m_anim.pos(this.pivotX,this.pivotY);
        this.addChild(this.m_anim);
        // this.m_anim.stop();

        // this.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
    }
    

    _proto.onDestroy = function () {

    }

    /**初始化 */
    _proto.initDuck = function(p_type,p_startPoint){
        this.m_startPoint = p_startPoint;
        this.m_type = p_type;

        this.m_anim.scaleX = -1;
        
        this.resetDuck();
    }


    /**重置状态 */
    _proto.resetDuck = function(){
        this.x = this.m_startPoint.x;
        this.y = this.m_startPoint.y;
    }

    
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.curRock == null){
            this.curRock = SceneManager.getInstance().currentScene.curRock;
        }
        // if(this.curCar == null){
        //     this.curCar = SceneManager.getInstance().currentScene.curCar;
        // }

        
    }

    

    /**按下移动监听事件 */
    _proto._mouseMoveEvent = function(_event){
        if(this.curRock == null)
            return;
        
        var t_scene = SceneManager.getInstance().currentScene;

        // Gamelog("---move x="+_event.stageX+",y="+_event.stageY);
        // return;
       
        var t_rad = Math.atan2(Laya.stage.height - _event.stageY,Laya.stage.width - _event.stageX) / Math.PI * 180;  //注意参数（y,x） Y在前，X在后
        // Gamelog("---rotation t_rad="+t_rad);
        t_scene.gameBox.rotation = t_rad; 
        
        if(t_rad < 0){
            t_scene.gameBox.rotation = 0; 
        }

        if(t_rad >= 6){
            t_scene.gameBox.rotation = 6; 
            this.mouseEnabled = false;
            this.curRock.m_canRotate = true;
            this.curRock.m_autoRotate = true;
            
        }
    }
    

    return Duck;
})(Laya.Sprite);