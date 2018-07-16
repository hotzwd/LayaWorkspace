 /**
 * 方块类型
 */
var SquareTypes = {
    /**未点击 */
    NoClick:-1,
    /**已点击 */
    Clicked:-2,
    /**地雷 */
    Mine:-3,
    /**插旗 */
    Flag:-4,

}

 /**
 * 方块
 */
var Square = (function(_super){

    function Square(){
        Square.super(this);
        this.onInit();
    }
    Laya.class(Square,"Square",_super);
    _proto = Square.prototype;

    //泡泡所有位置的行和列
	this.m_nRowIndex = -1;
    this.m_nColIndex = -1;
    this.type = SquareTypes.NoClick;                                  //类型
    this.aroundMineNum = 0;                                           //方块周围地雷数
    this.isClicked = false;                                           //是否已经点击过
    this.mouseDownTime = 0;                                           //按下时间
    this.isFlag = false;                                              //是否已经插旗
    this.qiAnim = null;                                               //插旗动画

    _proto.onInit = function(){
        this.m_nRowIndex = -1;
        this.m_nColIndex = -1;
        this.type = SquareTypes.NoClick;

        this.width = SQUAREWIDTH;
        this.height = SQUAREWIDTH;
        this.isClicked = false;
        this.mouseDownTime = 0;
        this.isFlag = false;
        this.qiAnim = null; 

        //图标
        // this.icon = new Laya.Image();
        var shikuaiNum = parseInt(Math.random()*4 +1,10);
        this.icon = new Laya.Image("GameUI/img_shikuai"+shikuaiNum+".png");
        this.icon.anchorX  = 0.5;
        this.icon.anchorY  = 0.5;
        this.icon.x = this.width/2;
        this.icon.y = this.height/2;

        this.addChild(this.icon);
        

    }

    _proto.initUI = function(){
        Laya.timer.once(10,this,function(){

            this.squareUI = new SquareUI();
            var b_point  = new Point(0,0);
            b_point = this.localToGlobal(b_point);
            this.squareUI.pos(b_point.x,b_point.y);
            this.squareUI.zOrder =2;
            Laya.stage.addChild(this.squareUI);
        });
    }

    _proto.onDestroy = function(){
    }

    _proto.setRowColIndex = function(row,col){
        this.m_nRowIndex = row;
        this.m_nColIndex = col;
    }

    //根据类型设置方块
    _proto.UpdateByType = function(){
        if(!this.isClicked){
            if(this.type != SquareTypes.Flag && !this.isFlag){
                //播放碎裂动画
                this.playAnimation("suilie",true,null);
                Laya.timer.once(200,this,this.UpdateEffect);
            }
        }

        
    }
    //更新旗帜
    _proto.UpdateFlag =function(){
        if(!this.isClicked){
            if(this.isFlag){
                if(this.qiAnim != null)
                    this.qiAnim.destroy();
                this.isFlag = false;
            }else{
                this.qiAnim = this.playAnimation("chaqi",false,null);
                this.qiAnim.y -= 40;
                this.qiAnim.x += 15;
                this.isFlag = true;
                
            }

        }
    }
    _proto.UpdateEffect = function(){
        this.icon.visible = false;
        if(this.type == SquareTypes.NoClick){
            if(this.aroundMineNum == 0){
                this.icon.visible = false;
            }else{
                this.icon.visible = true;
                this.icon.skin = "GameUI/img_zhouweileishu-"+this.aroundMineNum+".png";
            }
        }
        if(this.type == SquareTypes.Mine){
            var animNum = parseInt(Math.random()*4+1,10);
            // var animNum =4;
            var mineAnim = this.playAnimation("mineAnim"+animNum,true,function(e){
                e[0].icon.visible = true;
                e[0].icon.skin = "GameUI/img_kulou.png";
            },[this]);
            if(animNum == 1 || animNum == 2){
                mineAnim.y -= 20;
            }
            if(animNum == 3){
                mineAnim.y -= 60;
            }

        }

    }
    _proto.playAnimation = function(_name,_isDestroy,_call,_callArg){
        //动画
        var squareAnim = new Laya.Animation();
        squareAnim.interval = 100;
        squareAnim.zOrder = 1;
        var b_point  = new Point(0,0);
        b_point = this.localToGlobal(b_point);

        Laya.stage.addChild(squareAnim);
        squareAnim.play(0,false,_name);
         //获取动画大小区域
        var bound = squareAnim.getBounds();
        squareAnim.pos(b_point.x + (this.width/2 - bound.width/2),b_point.y + ((this.height/2 - bound.height/2)));
        if(_isDestroy){
            var _args = [squareAnim];
            squareAnim.once(Laya.Event.COMPLETE,this,function(e){
                e.destroy();
                if(_call != null){
                    if(_callArg !=null){
                        _call(_callArg);
                    }else{
                        _call();
                    }
                }
            },_args);
        }

        return squareAnim;
    }

    return Square;
})(Laya.Box);