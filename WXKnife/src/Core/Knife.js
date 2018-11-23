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
    _proto.m_endPoint = null;                                             //终点坐标
    _proto.m_startStep = null;                                            //开始台阶
    _proto.m_endStep = null;                                              //结束台阶
    
    


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
    _proto.initKnife = function(p_type,p_startStep,p_endStep){
        
        this.resetKnife();

        this.m_type = p_type;
        
        this.m_startStep = p_startStep;
        this.m_endStep = p_endStep;
        this.m_startPoint = new Point(this.m_startStep.x - 20 ,this.m_startStep.y -46);
        this.m_endPoint = new Point(this.m_endStep.x - 20 ,this.m_endStep.y -46);


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
        if(this.m_state == 1 || this.m_state == 2){
            this.rotation += 30;
            // this.y -= 5;
        }
    }

    _proto.setState = function(p_state){
        //1 起飞状态
        this.m_state = p_state;
        //力度
        var t_progressValue = SceneManager.getInstance().currentScene.m_progressValue;
        // t_progressValue = 0.8;
        Gamelog("------进度 t_progressValue="+t_progressValue+",y="+this.y);
        var t_gameLevel = SceneManager.getInstance().currentScene.gameLevel;
        var t_targetY = 0;
        var t_time = 0;


        if(this.m_state == 1){
            var t_dim = t_progressValue * Laya.stage.height;
                Gamelog("------高度 t_dim =" + t_dim);
            t_targetY = this.y - t_dim ;
            t_time = t_dim / 2 + 120;

            // if(t_progressValue <= 0.9){
            //     t_targetY = this.y - t_dim ;
            //     t_time = t_dim / 2 + 120;

            // }else{
            //     t_targetY = -200 ;
            //     t_time = (this.y - t_targetY) / 2 + 120;
            // }
            Gamelog("------上升 y="+t_targetY+",time="+t_time);

            this.m_startStep.setShadow(false);
            Laya.Tween.to(this,{
                y:t_targetY,
            },t_time,Laya.Ease.quadOut,Laya.Handler.create(this,function(){
                if(this.y > 0){
                    this.setState(2);
                }else{
                    this.y = -200 ;
                    Gamelog("-------飞出屏幕");
                }
            }));
        }

        //2 下落状态
        if(this.m_state == 2){
            if(this.y < this.m_endPoint.y){
                t_targetY = this.m_endPoint.y ;
                t_time = (this.m_endPoint.y - this.y) / 1 + 120; 
            }else{
                //第一关回到原点
                if(t_gameLevel == 0){
                    t_targetY =  this.m_startPoint.y;
                    t_time = (this.m_startPoint.y - this.y) / 1 +120; 
                }else{
                    t_targetY =  Laya.stage.height + 200;
                    t_time = (t_targetY - this.y) / 1; 
                }
            }
            // Gamelog("------下降 y="+t_targetY+",time="+t_time);
            Laya.Tween.to(this,{
                y:t_targetY,
            },t_time,Laya.Ease.quadIn,Laya.Handler.create(this,function(){
                this.setState(3);
                this.rotation = 0;
                if(this.y == this.m_endPoint.y){
                    this.m_endStep.setShadow(true);
                    Gamelog("---------跳跃成功");
                    SceneManager.getInstance().currentScene.jumpKnife(true);

                }else if(this.y == this.m_startPoint.y){
                    this.m_startStep.setShadow(true);
                }else{
                    Gamelog("-------掉落屏幕");
                }
            }));
        }

    }
    //点击
    _proto.KnifeClickEvent = function(){
        // Gamelog("------KnifeClickEvent m_type="+this.m_type);
        
    }

  
    

    
    

    return Knife;
})(Laya.Sprite);