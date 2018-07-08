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
    var HeroSpeed = 12;

    /**英雄动画 */
    _proto.anim = null;
    _proto.targetPos = null;                                            //目标坐标
    _proto.targetVector = null;                                         //目标向量
    _proto.targetPos2 = null;                                           //目标坐标2
    _proto.targetVector2 = null;                                        //目标向量2

    _proto.targetTower = null;                                          //目标塔
    _proto.isMoveFinsih1 = false;                                        //是否在移动
    _proto.isMoveFinsih2 = false;                                        //是否在移动
    _proto.HeroRadios = 50;                                             //英雄的半径
    _proto.attackValue = 50;                                            //攻击力
    _proto.attackRadios = 150;                                             //英雄攻击的半径
    _proto.isAttack = false;                                            //是否在攻击
    _proto.attackMonsterList = null;                                    //可以攻击的怪物对象列表
    _proto.isResetMove = false;                                         //是否重置移动

    _proto.onInit = function(){
        this.width = HeroWidth;
        this.height = HeroHeight;
        this.pivotX = HeroWidth / 2;
        this.pivotY = HeroHeight / 2;       

         if(ShowRang){
            var rangSpAttack = new Laya.Sprite();
            rangSpAttack.graphics.drawCircle(0,0,this.attackRadios,"#84ff00","#84ff00",1);
            rangSpAttack.x = this.pivotX;
            rangSpAttack.y = this.pivotY;
            this.addChild(rangSpAttack);
        }
        
        this.anim = new Laya.Animation();
        this.anim.play(0, true, "hero_attack");
        this.anim.interval = 0;
        this.anim.pivotX = 179;
        this.anim.pivotY = 147;
        this.anim.pos(this.pivotX,this.pivotY);
        this.addChild(this.anim);

        if(ShowRang){
            var rangSp = new Laya.Sprite();
            rangSp.graphics.drawCircle(0,0,this.HeroRadios,"#ff0000","#ff0000",1);
            rangSp.x = this.pivotX;
            rangSp.y = this.pivotY;
            this.addChild(rangSp);
        }
        _proto.attackMonsterList = [];

        MessageController.getInstance().AddNotification("Tower_Dead",this,this._towerDeadEvent);
    }

    _proto.onDestroy = function(){
        
    }

    /**设置目标点 */
    _proto.setTargetPos = function(_pos){
        if(this.targetTower == null){
            this.targetTower = SceneManager.getInstance().currentScene.curTower;
        }
        if(this.pointIsInCircle(_pos))
            return;
        // Gamelog("-------目标点x="+_pos.x +",y="+_pos.y);

        this.isMoveFinsih1 = false;
        this.isMoveFinsih2 = false;

        this.targetPos = null;
        this.targetVector = null;

        this.targetPos2 = null;
        this.targetVector2 = null;

        var isCollion = this.lineIsCollisionTower(_pos);
        // Gamelog("---------线段是否相交="+isCollion);
    }

    _proto.onUpdate = function(){
        this.heroMove();
        this.attackMonster();
        
    }

    /**设置移动路径 */
    _proto.heroMove = function(){
        if((this.isMoveFinsih1 && this.isMoveFinsih2) || this.targetPos == null)
            return;
        
        if(!this.isMoveFinsih1){

            var collisionTarget1 = isCollisionWithTwoCricle(new Point(this.x,this.y),HeroSpeed,this.targetPos,HeroSpeed);
            if(collisionTarget1){
                this.isMoveFinsih1 = true;
                this.x = this.targetPos.x;
                this.y = this.targetPos.y;
            }else{
                this.pos(this.x + this.targetVector.x * HeroSpeed, this.y + this.targetVector.y * HeroSpeed); 
            }
        }else{
            if(this.targetPos2 == null){
                this.isMoveFinsih2 = true;
            }else{
                var collisionTarget2 = isCollisionWithTwoCricle(new Point(this.x,this.y),HeroSpeed,this.targetPos2,HeroSpeed);
                if(collisionTarget2){
                    this.isMoveFinsih2 = true;
                    this.x = this.targetPos2.x;
                    this.y = this.targetPos2.y;
                }else{
                    this.pos(this.x + this.targetVector2.x * HeroSpeed, this.y + this.targetVector2.y * HeroSpeed); 
                }
            }

        }
    }
    _proto.lineIsCollisionTower = function (_pos){
        //参考线段与圆相交检测
        //https://blog.csdn.net/rabbit729/article/details/4285119

        var curPos = new Point(this.x, this.y);
        this.targetPos = _pos;
        this.targetVector = PointSub(_pos,curPos);
        var targetDis2 = Math.pow(this.targetVector.x, 2) + Math.pow(this.targetVector.y, 2);
        this.targetVector.normalize();
        //当前位置到圆心向量
        var t_pos = this.targetTower.parent.localToGlobal(new Point(this.targetTower.x,this.targetTower.y),true);
        t_pos = this.parent.globalToLocal(t_pos);
        //起点到圆心的向量
        var centerDis = PointSub(t_pos,curPos);
        var centerDis2 = Math.pow(centerDis.x, 2) + Math.pow(centerDis.y, 2);
        //起点到圆心的向量 归一化
        var centerVector = PointSub(t_pos,curPos);
        centerVector.normalize();

        //点积 起点到圆心距离 与线段归一向量 投影
        var dotVector = centerDis.x * this.targetVector.x + centerDis.y * this.targetVector.y;
        var dotVector2 = Math.pow(dotVector,2);

        var jiajiao = centerVector.x * this.targetVector.x + centerVector.y * this.targetVector.y;
        // Gamelog("---------夹角="+jiajiao);
        var r2 = Math.pow(this.targetTower.TowerRadios - 0, 2);

        if (r2 > (centerDis2 - dotVector2) && jiajiao > 0 && targetDis2 > centerDis2)
        {  
            var intersectPoint = new Point(dotVector * this.targetVector.x + this.x ,dotVector * this.targetVector.y + this.y);
            var intersectVector = PointSub(intersectPoint,t_pos);
            intersectVector.normalize();
            var circlePoint = new Point((this.targetTower.TowerRadios+20) * intersectVector.x + t_pos.x,(this.targetTower.TowerRadios+20) * intersectVector.y + t_pos.y);
            // Gamelog("-------改变目标点x="+circlePoint.x +",y="+circlePoint.y);
            this.targetPos = circlePoint;
            this.targetVector = PointSub(circlePoint,curPos);
            this.targetVector.normalize();

            this.targetPos2 = _pos;
            this.targetVector2 = PointSub(_pos,circlePoint);
            this.targetVector2.normalize();
            return true;
        }else{
            return false;  
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
            var collisionTower = isCollisionWithTwoCricle(new Point(this.x,this.y),this.attackRadios,t_monster,t_monster.MonsterRadios);
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

    _proto._towerDeadEvent = function(notif){
        this.anim.interval = 300;
        this.anim.play(0, false, "hero_dead");
    }

    return Hero;
})(Laya.Sprite);