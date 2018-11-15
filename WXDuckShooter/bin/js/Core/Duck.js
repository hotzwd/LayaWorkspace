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
    _proto.m_endPoint = null;                                             //结束坐标
    _proto.m_isHit = false;                                               //是否被击中
    _proto.m_speed = 3;                                                   //移动速度
    _proto.targetVector = null;                                           //目标向量
    _proto.rangSp = null;                                                 //击中范围
    


    _proto.Init = function () {
        this.width = DuckWidth;
        this.height = DuckHeight;
        this.pivotX = DuckWidth / 2;
        this.pivotY = DuckHeight / 2;  

        this.m_anim = new Laya.Animation();
        this.m_anim.interval = 50;
        this.m_anim.play(0, true, "duck_1_fly");
        this.m_anim.pivotX = 100;
        this.m_anim.pivotY = 102;
        this.m_anim.pos(this.pivotX,this.pivotY);
        this.addChild(this.m_anim);
        // this.m_anim.stop();

        // this.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        
        this.rangSp = new Laya.Sprite();
        this.rangSp.width = 100;
        this.rangSp.height = 80;
        if(ShowRang){
            this.rangSp.graphics.drawRect(-50,-20,100,80,"#ff0000");
        }
        this.rangSp.x = this.pivotX;
        this.rangSp.y = this.pivotY;
        this.addChild(this.rangSp);
    }
    

    _proto.onDestroy = function () {

    }

    /**初始化 */
    _proto.initDuck = function(p_type,p_startPoint,p_endPoint){
        this.m_startPoint = p_startPoint;
        this.m_endPoint = p_endPoint;
        this.m_type = p_type;

        //方向
        if(p_endPoint.x > p_startPoint.x){
            this.m_anim.scaleX = -1;
        }else{
            this.m_anim.scaleX = 1;
        }

        var tempVector = new Point(p_endPoint.x - p_startPoint.x, p_endPoint.y - p_startPoint.y);
        tempVector.normalize();
        this.targetVector = tempVector;
        
        this.resetDuck();
        this.m_speed = SceneManager.getInstance().currentScene.duckSpeed;
        
    }


    /**重置状态 */
    _proto.resetDuck = function(){
        this.x = this.m_startPoint.x;
        this.y = this.m_startPoint.y;

        this.m_isHit = false;
        this.m_anim.play(0, true, "duck_"+this.m_type+"_fly");
        // this.y -= 300;
    }

    
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.m_isHit)
            return;
        
        this.pos(this.x + this.targetVector.x * this.m_speed, this.y + this.targetVector.y * this.m_speed);
        // Gamelog("----duck pos="+this.y)
        if(this.x < -120 || this.y < -120 || this.x > Laya.stage.width +120 || this.y > Laya.stage.height+ 120){
            SceneManager.getInstance().currentScene.deleteDuck(this,0);
        }
    }
    

    /**被击中 */
    _proto.hitDuck = function(){
        this.m_isHit = true;
        this.m_anim.play(0, true, "duck_"+this.m_type+"_hurt");
        this.m_anim.on(Laya.Event.COMPLETE,this,function(){
            this.m_anim.offAll();
            this.m_anim.play(0, true, "duck_"+this.m_type+"_fall");

            //掉落
            var t_targhtY = Laya.stage.height + 120;
            var t_time = (t_targhtY - this.y) / 1;
            Laya.Tween.to(this,{
                y:t_targhtY,
            },t_time,Laya.Ease.sineInOut,new Laya.Handler(this,function(){
                SceneManager.getInstance().currentScene.addGameScore(100);
                SceneManager.getInstance().currentScene.deleteDuck(this,1);
            }));

        });

    }
    

    return Duck;
})(Laya.Sprite);