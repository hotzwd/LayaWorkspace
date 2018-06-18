 /**
 * 怪物
 */
var Monster = (function(_super){

    function Monster(){
        Monster.super(this);
        this.onInit();
    }
    Laya.class(Monster,"Monster",_super);
    _proto = Monster.prototype;

    var MonsterWidth = 110;                                            //怪物宽高
    var MonsterHeight = 110;
    var MONSTER_SPEED = 2;                                              //移动速度

    /**怪物动画 */
    _proto.anim = null;
    _proto.targetPos = null;                                           //目标坐标
    _proto.targetVector = null;                                        //目标向量

    _proto.MonsterRadios = 5;                                          //怪物的半径
    _proto.targetTower = null;                                         //目标塔
    _proto.targetHero = null;                                          //目标英雄
    _proto.hp = 100;                                                   //血量
    _proto.maxHp = 100;                                                //最高血量
    _proto.hpProgress = null;                                          //血量进度条
    _proto.attackValue = 50;                                           //攻击力
    _proto.isAttack = false;                                           //是否在攻击
    _proto.isHurt = false;                                             //是否被攻击

    _proto.onInit = function(){
        this.width = MonsterWidth;
        this.height = MonsterHeight;
        this.pivotX = MonsterWidth / 2;
        this.pivotY = MonsterHeight / 2;

        this.anim = new Laya.Animation();
        this.anim.play(0, true, "monster001_walk_r");
        this.anim.pivotX = 140;
        this.anim.pivotY = 140;
        this.anim.pos(this.pivotX,this.pivotY);
        this.addChild(this.anim);

        // var test = new Laya.ProgressBar("game/progress.png");
        this.hpProgress = new Laya.ProgressBar("game/progress.png");
        this.hpProgress.anchorX = 0.5;
        this.hpProgress.anchorY = 0.5;
        this.hpProgress.value = 1;
        this.addChild(this.hpProgress);
        this.hpProgress.pos(MonsterWidth / 2,0);
    }

    _proto.onDestroy = function(){
        _proto.targetTower = null;
        _proto.targetHero = null;
        _proto.isAttack = false;
        _proto.isHurt = false;
    }
    /**设置目标点 */
    _proto.setTargetPos = function(_pos){
        this.targetPos = _pos;
        var curPos = new Point(this.x, this.y);
        var tempVector = PointSub(_pos,curPos);
        tempVector.normalize();
        this.targetVector = tempVector;
    }

    _proto.onUpdate = function(){
        if(this.targetTower == null){
            this.targetTower = SceneManager.getInstance().currentScene.curTower;
        }
        if(this.targetHero == null){
            this.targetHero = SceneManager.getInstance().currentScene.curHero;
        }
        if(this.targetPos != null){

            if(this.hp > 0){
                var collisionTower = isCollisionWithTwoCricle(new Point(this.x,this.y),this.MonsterRadios,this.targetTower,this.targetTower.TowerRadios);
                if(!collisionTower){
                    this.pos(this.x + this.targetVector.x * MONSTER_SPEED, this.y + this.targetVector.y * MONSTER_SPEED);
                }else{
                    this.attackTower();
                }
            }else{
                this.monsterDead();
            }
        }

    }
    /**攻击防御塔 */
    _proto.attackTower = function () {
        if(this.isAttack)
            return;
        this.isAttack = true;
        if(this.targetTower.hp > 0){
            this.targetTower.hurtMonster(this.attackValue);
            Laya.timer.once(1000,this,function(){
                this.isAttack = false;
            });
        }
        
    }
    /**被攻击处理 */
    _proto.hurtMonster = function(attackValue){
        this.isHurt = true;
        this.hp -= attackValue;
        if(this.hp >0){
            this.hpProgress.value = this.hp / this.maxHp;
        }else{
            this.monsterDead();
        }
    }

    /**怪物死亡 */
    _proto.monsterDead = function(){
        Gamelog("----------怪物挂掉了-----");
        this.hpProgress.value = 0;
        var notif = new Notification("Monster_Dead",this,this);
        MessageController.getInstance().SendNotification(notif);
        

    }
    return Monster;
})(Laya.Sprite);