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
    _proto.TowerRadios = 80;                                                    //防御塔半径
    _proto.hp = 500;                                                            //防御塔血量
    _proto.hpProgress = null;                                                   //血量进度条

    /**防御塔动画 */
    _proto.anim = null;

    _proto.onInit = function(){
        this.width = TowerWidth;
        this.height = TowerHeight;
        this.pivotX = TowerWidth / 2;
        this.pivotY = TowerHeight / 2;

        this.anim = new Laya.Animation();
        this.anim.play(0, true, "tower_idle");
        this.anim.pivotX = 132;
        this.anim.pivotY = 132;
        this.anim.interval = 150
        this.anim.pos(this.pivotX,this.pivotY);
        this.addChild(this.anim);

        this.hpProgress = new Laya.ProgressBar("game/progress.png");
        this.hpProgress.anchorX = 0.5;
        this.hpProgress.anchorY = 0.5;
        this.hpProgress.value = 1;
        this.addChild(this.hpProgress);
        this.hpProgress.pos(TowerWidth / 2,0);
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

    return Tower;
})(Laya.Sprite);