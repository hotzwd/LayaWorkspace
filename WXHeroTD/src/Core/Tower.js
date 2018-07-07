 /**
 * 防御塔
 */
var Tower = (function(_super){

    function Tower(){
        Tower.super(this);
        this.onInit();
    }
    Laya.class(Tower,"Tower",_super);
    _proto = Tower.prototype;

    //防御塔宽高
    var TowerWidth = 110;
    var TowerHeight = 110;
    var TowerMaxHp = 500;                                                       //防御塔最高血量
    /**防御塔半径 */
    _proto.TowerRadios = 150;                                                    //防御塔半径
    _proto.hp = 500;                                                            //防御塔血量
    _proto.hpProgress = null;                                                   //血量进度条

    /**防御塔动画 */
    _proto.anim = null;

    _proto.onInit = function(){
        this.width = TowerWidth;
        this.height = TowerHeight;
        this.pivotX = TowerWidth / 2;
        this.pivotY = TowerHeight / 2;

        if(ShowRang){
            var rangSp = new Laya.Sprite();
            rangSp.graphics.drawCircle(0,0,this.TowerRadios,"#ff0000","#ff0000",1);
            rangSp.x = this.pivotX;
            rangSp.y = this.pivotY;
            this.addChild(rangSp);
        }

        // this.anim = new Laya.Animation();
        // this.anim.play(0, true, "tower_idle");
        // this.anim.pivotX = 132;
        // this.anim.pivotY = 132;
        // this.anim.interval = 150
        // this.anim.pos(this.pivotX,this.pivotY);
        // this.addChild(this.anim);
        this.anim = new Laya.Image("game/tower.png");
        this.anim.pivotX = 70;
        this.anim.pivotY = 100;
        this.anim.pos(this.pivotX,this.pivotY -30);
        this.addChild(this.anim);

        this.hpProgress = new Laya.ProgressBar("game/progress_xuetiao.png");
        this.hpProgress.anchorX = 0.5;
        this.hpProgress.anchorY = 0.5;
        this.hpProgress.value = 1;
        this.addChild(this.hpProgress);
        this.hpProgress.pos(TowerWidth / 2,-100);
    }

    _proto.onDestroy = function(){
    }

    _proto.onUpdate = function(){
        if(this.hp < TowerMaxHp){
            this.hpProgress.value = this.hp / TowerMaxHp;
        }
    }
    /**被攻击处理 */
    _proto.hurtMonster = function(attackValue){
        this.hp -= attackValue;
        if(this.hp >0){
            this.hpProgress.value = this.hp / TowerMaxHp;
        }else{
            this.towerDead();
        }
    }
    /**防御塔死亡 */
    _proto.towerDead = function(){
        this.hpProgress.value = 0;
        Gamelog("----------防御塔挂掉了-----");
    }
    /**是否在圆内 */
    _proto.isInCircle = function(p){
        var t_pos = this.parent.globalToLocal(new Point(p.x,p.y),true);

        var num1 = Number(Math.pow(t_pos.x - this.x, 2) + Math.pow(t_pos.y - this.y, 2));
        var num2 = Math.pow(this.TowerRadios,2);
        if(num1 <num2){
            return true
        }else{
            return false;
        }
    }

    return Tower;
})(Laya.Sprite);