 /**
 * 英雄
 */
var Hero = (function(_super){

    function Hero(){
        Hero.super(this);
        this.onInit();
    }
    Laya.class(Hero,"Hero",_super);
    _proto = Hero.prototype;

    //英雄宽高
    var HeroWidth = 110;
    var HeroHeight = 110;
    var HeroSpeed = 3;

    /**英雄动画 */
    _proto.anim = null;
    _proto.targetPos = null;                                            //目标坐标
    _proto.targetVector = null;                                         //目标向量
    _proto.isMoveFinsih = false;                                        //是否在移动
    _proto.HeroRadios = 10;                                             //英雄的半径
    _proto.attackValue = 20;                                            //攻击力
    _proto.isAttack = false;                                            //是否在攻击
    _proto.attackMonsterList = null;                                    //可以攻击的怪物对象列表

    _proto.onInit = function(){
        this.width = HeroWidth;
        this.height = HeroHeight;
        this.pivotX = HeroWidth / 2;
        this.pivotY = HeroHeight / 2;

        this.anim = new Laya.Animation();
        this.anim.play(0, true, "monster001_walk_r");
        this.anim.pivotX = 140;
        this.anim.pivotY = 140;
        this.anim.pos(this.pivotX,this.pivotY);
        this.addChild(this.anim);

        _proto.attackMonsterList = [];
        // Gamelog("------ani.width="+this.anim.width);
    }

    _proto.onDestroy = function(){
        
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
        this.heroMove();
        this.attackMonster();
        
    }

    /**设置移动路径 */
    _proto.heroMove = function(){
        if(this.isMoveFinsih || this.targetPos == null)
            return;
        this.isMoveFinsih = false;
        // Gamelog("-------hero x="+this.x+",y="+this.y);
        // var tower =  SceneManager.getInstance().currentScene.curTower;
        var collisionTower = isCollisionWithTwoCricle(new Point(this.x,this.y),this.HeroRadios,this.targetPos,0);
        if(collisionTower){
            isMoveFinsih = true;
        }else{
            this.pos(this.x + this.targetVector.x * HeroSpeed, this.y + this.targetVector.y * HeroSpeed);
        }
    }
    _proto.getPointDistance = function(bu1,bu2){
        var num1 = Number(Math.pow(bu1.x - bu2.x, 2) + Math.pow(bu1.y - bu2.y, 2));
        var num2 = Number(Math.sqrt(num1));
        return num2;
    }
    /**获取可以攻击的怪物列表 */
    _proto.getAttackMonsterList = function(){
        this.attackMonsterList = [];
        var monsterList =  SceneManager.getInstance().currentScene.monsterList;
        for (var i = 0; i < monsterList.length; i++) {
            var t_monster = monsterList[i];
            var collisionTower = isCollisionWithTwoCricle(new Point(this.x,this.y),this.HeroRadios,t_monster,t_monster.MonsterRadios);
            if(collisionTower){
                this.attackMonsterList.push(t_monster);
            }
        }
    }
    /**攻击怪物 */
    _proto.attackMonster = function () {
        if(this.isAttack)
            return;
        this.getAttackMonsterList();
        var monsterNum = this.attackMonsterList.length;
        if( monsterNum == 0)
            return;

        this.isAttack = true;
        for (var i = 0; i < monsterNum; i++) {
            var t_monster = this.attackMonsterList[i];
            if(t_monster.hp > 0){
                t_monster.hurtMonster(this.attackValue);
            }
        }
        Laya.timer.once(200,this,function(){
                this.isAttack = false;
            });
        
    }

    return Hero;
})(Laya.Sprite);