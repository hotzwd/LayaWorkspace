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
    _proto.targetTower = null;                                          //目标塔
    _proto.isMoveFinsih = false;                                        //是否在移动
    _proto.HeroRadios = 10;                                             //英雄的半径
    _proto.attackValue = 20;                                            //攻击力
    _proto.isAttack = false;                                            //是否在攻击
    _proto.attackMonsterList = null;                                    //可以攻击的怪物对象列表
    _proto.isResetMove = false;                                         //是否重置移动

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
        if(this.targetTower == null){
            this.targetTower = SceneManager.getInstance().currentScene.curTower;
        }

        this.targetPos = _pos;
        var curPos = new Point(this.x, this.y);
        var tempVector = PointSub(_pos,curPos);
        tempVector.normalize();
        this.targetVector = tempVector;
        this.isResetMove = true;
        Gamelog("---------线段是否相交="+this.lineIsCollisionTower());
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
        var collisionTarget = isCollisionWithTwoCricle(new Point(this.x,this.y),this.HeroRadios,this.targetPos,0);
        var collisionTower = isCollisionWithTwoCricle(new Point(this.x,this.y),this.HeroRadios,this.targetTower,this.targetTower.TowerRadios);
        if(collisionTarget){
            isMoveFinsih = true;
        }else{
            
            if(!collisionTower ){
                this.pos(this.x + this.targetVector.x * HeroSpeed, this.y + this.targetVector.y * HeroSpeed);
            }else if(this.isResetMove){
                var t_pos = this.parent.localToGlobal(new Point(this.targetPos.x,this.targetPos.y),true);
                var isIn = this.targetTower.isInCircle(t_pos);
                if(!isIn){
                    this.pos(this.x + this.targetVector.x * HeroSpeed, this.y + this.targetVector.y * HeroSpeed);
                    this.isResetMove = false;
                }
            }

        }
    }
    _proto.lineIsCollisionTower = function (targetPoint,middlePoint){
        //参考线段与圆相交检测
        //https://blog.csdn.net/rabbit729/article/details/4285119

        //当前位置到圆心向量
        var t_pos = this.targetTower.parent.localToGlobal(new Point(this.targetTower.x,this.targetTower.y),true);
        t_pos = this.parent.globalToLocal(t_pos);
        var curPos = new Point(this.x, this.y);
        //起点到圆心的向量
        var centerDis = PointSub(t_pos,curPos);
        var centerDis2 = Math.pow(centerDis.x, 2) + Math.pow(centerDis.y, 2);
        //起点到圆心的向量 归一化
        var centerVector = PointSub(t_pos,curPos).normalize();

        //点积 起点到圆心距离 与线段归一向量 投影
        var dotVector = centerDis.x * this.targetVector.x + centerDis.y * this.targetVector.y;
        var dotVector2 = Math.pow(dotVector,2);

        var r2 = Math.pow(this.targetTower.TowerRadios, 2);

        if ((r2 - (centerDis2 - dotVector2)) < 0)  
        {  
            return false;  
        }else{
            var intersectPoint = new Point(dotVector * this.targetVector.x + this.x ,dotVector * this.targetVector.x + this.y);
            var intersectVector = PointSub(intersectPoint,t_pos);
            intersectVector.normalize();
            var circlePoint = new Point(this.targetTower.TowerRadios * intersectVector.x + t_pos.x,this.targetTower.TowerRadios * intersectVector.y + t_pos.y);
            Gamelog("-------改变目标点x="+circlePoint.x +",y="+circlePoint.y);
            return true;
        }

    }
    /**是否在圆内 */
    _proto.pointIsInCircle = function(p){
        var t_pos = this.targetTower.parent.globalToLocal(new Point(p.x,p.y),true);

        var num1 = Number(Math.pow(t_pos.x - this.targetTower.x, 2) + Math.pow(t_pos.y - this.targetTower.y, 2));
        var num2 = Math.pow(this.targetTower.TowerRadios,2);
        if(num1 <num2){
            return true
        }else{
            return false;
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