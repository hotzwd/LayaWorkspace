/**
 * 石头类
 */
var Rock = (function (_super) {


    Laya.class(Rock, "Core.Rock", _super);
    _proto = Rock.prototype;

    function Rock() {
        Rock.super(this);
        this.Init();
    }
    //汽车宽高
    var RockWidth = 128;
    var RockHeight = 132;

    var rockFallPosX = [422,440,460,490,530];
    var rockBreakImgs = ["game_resoure/stone.png","game_resoure/stoneCrack1.png","game_resoure/stoneCrack2.png","game_resoure/stoneCrack3.png"];

    _proto.m_anim = null;                                                 //汽车动画
    _proto.m_isStartCar = false;                                          //是否发动汽车
    _proto.m_Speed = 2;                                                   //速度
    _proto.m_startPoint = null;                                           //起点坐标
    _proto.m_canRotate = false;                                           //是否旋转
    _proto.m_isRotate = false;                                            //是否正在旋转
    _proto.m_isCrack = false;                                             //是否撞击
    _proto.curCar = null;                                                 //当前汽车
    _proto.m_canClick = false;                                            //是否可以点击
    _proto.m_isDrop = false;                                              //是否正在下降
    _proto.m_canMove = false;                                             //是否按下
    _proto.m_dropCrack = false;                                           //掉落损坏
    _proto.m_breakCrack = false;                                          //碎裂
    _proto.curGround = null;                                              //当前地面
    _proto.m_createBomb = false;                                          //创建炸弹
    _proto.m_autoRotate =false;                                           //自动滚动

    _proto.Init = function () {
        this.width = RockWidth;
        this.height = RockHeight;
        this.pivotX = RockWidth / 2;
        this.pivotY = RockHeight / 2;  

        this.m_anim = new Laya.Animation();
        this.m_anim.interval = 100;
        // this.m_anim.play(0, false, "stoneShatter");
        // this.m_anim.pivotX = 113;
        // this.m_anim.pivotY = 113;
        // this.m_anim.pos(this.pivotX,this.pivotY);
        // this.addChild(this.m_anim);
        // // this.m_anim.stop();
        // this.m_anim.visible = false;

        this.loadImage("game_resoure/stone.png");

        // this.m_canRotate = false;
        // this.m_isCrack = false;
        // this.m_isRotate = false;
        // this.m_canClick = false;
        // this.m_isDrop = false;
        // this.setmouseEnabled(false);
        
        this.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        this.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        this.on(Laya.Event.MOUSE_OUT,this,this._mouseUpEvent);
        this.on(Laya.Event.CLICK,this,this._clickEvent);
    }
    

    _proto.onDestroy = function () {

    }

    /**初始化石头 */
    _proto.initRock = function(p_startPoint){
        this.m_startPoint = p_startPoint;
        rockFallPosX[0] = p_startPoint.y;

        this.resetRock();
    }

    //初始化关卡
    _proto.initLevel = function(p_score){
        var t_index= SceneManager.getInstance().currentScene.curLevelIndex;
        var t_leveData = GameLevelData[t_index];

        switch (t_index) {
            case 1:
                this.m_canRotate = true;
                break;
            case 2:
                this.setmouseEnabled(true);
                this.m_canClick = true;
                this.m_dropCrack = true;
                break;
            case 3:
                this.setmouseEnabled(true);
                this.m_canClick = true;
                this.m_createBomb = true;
                break;
            case 4:
                this.setmouseEnabled(true);
                this.m_canClick = true;
                break;
            case 5:
                this.setmouseEnabled(true);
                this.m_canClick = true;
                this.m_breakCrack = true; 
                break;
            case 6:
                this.setmouseEnabled(true);
                this.m_canClick = true;
                break;
        
            default:
                break;
        }
    }

    /**重置石头状态 */
    _proto.resetRock = function(){
        this.visible = true;
        this.x = this.m_startPoint.x;
        this.y = this.m_startPoint.y;
        this.rotation = 0;

        this.loadImage("game_resoure/stone.png");
        this.stopRock();
        this.m_anim.visible = false;

        this.m_canRotate = false;
        this.m_isCrack = false;
        this.m_isRotate = false;
        this.m_canClick = false;
        this.m_isDrop = false;
        this.setmouseEnabled(false);

        this.m_dropCrack = false;
        this.m_createBomb = false;
        this.m_breakCrack = false; 
        this.m_autoRotate =false; 
    }

    _proto.stopRock = function(){
        Laya.timer.clearAll(this);
        this.stopSoundRoll();
        
        this.m_anim.stop();
    }

    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.curCar == null){
            this.curCar = SceneManager.getInstance().currentScene.curCar;
        }
        if(this.curGround == null){
            this.curGround = SceneManager.getInstance().currentScene.curGround;
        }

        if(this.m_canRotate && !this.m_autoRotate){
            var t_dis = (this.curCar.x + this.curCar.width /2 ) - (this.x -20);
            if(t_dis >= 0 && this.curCar.x < this.x && this.curCar.y < this.y + 100){
                this.m_isCrack = true;
                this.m_autoRotate = true;
            }else{
                return;
            }

        }

        if(!this.m_canRotate || !this.m_autoRotate )
            return;
        this.pos(this.x + this.m_Speed, this.y);
        // var t_sp = new Laya.Sprite();
        // t_sp.mouseThrough
        this.rotation += this.m_Speed;
        if(!this.m_isRotate)
            this.playSoundRoll();
        this.m_isRotate = true;

        if(this.x > Laya.stage.width + 130){
            this.stopSoundRoll();
        }
        
    }

    _proto.playSoundRoll = function(){
        MusicManager.getInstance().playSound("res/music/stone_roll.mp3");
        Laya.timer.loop(2000,this,function(){
            MusicManager.getInstance().playSound("res/music/stone_roll.mp3");
        })
    }
    _proto.stopSoundRoll = function(){
        
        Laya.SoundManager.stopSound("res/music/stone_roll.mp3");
    }


    _proto._mouseDowmEvent = function (_event) {
        if(!this.m_canClick)
            return;
        
    }
    _proto._mouseMoveEvent = function (_event) {
        if(!this.m_canClick)
            return;

        var tarPos = this.parent.globalToLocal(new Point(_event.stageX,_event.stageY));
        if(tarPos.y >= this.m_startPoint.y){
            tarPos.y = this.m_startPoint.y;
        }
        this.y = tarPos.y;
    }
    _proto._mouseUpEvent = function (_event) {
        if(!this.m_canClick)
            return;
        //掉落
        this.rockDrop();
    }

    //点击事件
    _proto._clickEvent = function(_event){
        //生成炸弹
        if(this.m_createBomb){
            this.m_canClick = false;
            // Gamelog("---mouseup="+_event.stageX);
            SceneManager.getInstance().currentScene.createBomb(new Point(_event.stageX,_event.stageY));
        }
    }

    //石头掉落
    _proto.rockDrop = function(){
        this.m_canClick = false;

        //最低高度 必须大于高度才能砸凹地面
        var t_minHeight = 250;
        var t_posY = rockFallPosX[0];
        var t_height = t_posY - this.y;

        if(this.m_dropCrack){
            t_posY = rockFallPosX[this.curGround.m_crackNum -1];
            if(t_height > t_minHeight){
                t_posY = rockFallPosX[this.curGround.m_crackNum];
            }
        }
        
        Laya.Tween.to(this,{
            y:t_posY,
        },300,Laya.Ease.linearNone,new Laya.Handler(this,function(){
            this.m_canClick = true;
            MusicManager.getInstance().playSound("res/music/stone_fall.mp3");
            if(t_height > t_minHeight){
                if(this.m_dropCrack){
                    this.dropCrack();
                }
                if(this.m_breakCrack){
                    this.breakCrack();
                }
            }
        }));
    }

    //掉落地面砸坑
    _proto.dropCrack = function(){
        if(this.curGround.m_crackNum == 4){
            this.setmouseEnabled(false);
            this.curCar.m_canCrack = false;
        }
        this.curGround.rockCrackGround();
    }

    //石头碎裂
    _proto.breakCrack = function(){
        if(this.curGround.m_crackNum == 4){
            this.setmouseEnabled(false);
            this.curCar.m_canCrack = false;

            this.visible = false;

            var t_anim = new Laya.Animation();
            t_anim.interval = 300;
            t_anim.play(0, false, "stoneShatter");
            t_anim.pivotX = 63;
            t_anim.pivotY = 63;
            t_anim.pos(this.x,this.y);
            SceneManager.getInstance().currentScene.gameBox.addChild(t_anim);

            MusicManager.getInstance().playSound("res/music/boom.mp3");
            t_anim.on(Laya.Event.COMPLETE,this,function(){
                t_anim.destroy();
                //通过关卡
                this.curCar.m_canCrack = false;
            });

        }else{
            this.loadImage(rockBreakImgs[this.curGround.m_crackNum]);
            this.curGround.m_crackNum++;
        }
        
    }

    //设置是否可以接受点击事件
    _proto.setmouseEnabled = function(_visible){
        this.mouseEnabled = _visible;
    }

    //石头被撞击
    _proto.rockCrack = function(){
        var t_posY = this.m_startPoint.x + 50;
        var t_rotation = 360;
        //下陷则不滚动
        if(this.y > this.m_startPoint.y){
            t_rotation = 0;
            t_posY  = this.m_startPoint.x;
        }
        Laya.Tween.to(this,{
            rotation:t_rotation,
            x:t_posY,
        },1000,Laya.Ease.linearNone,new Laya.Handler(this,function(){
            SceneManager.getInstance().currentScene.gameover(false);
        }));
    }

    return Rock;
})(Laya.Sprite);