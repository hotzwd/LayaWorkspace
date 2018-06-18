/**
 * 游戏场景
 */
var GameScene = (function (_super) {


    Laya.class(GameScene, "Core.GameScene", _super);
    _proto = GameScene.prototype;

    function GameScene() {
        // GameScene.super(this);
        this.Init();
    }

    /**游戏层级 */
    var GameIndex = {
        /**怪物的层级 */
        monsterBoxIndex:10,
        /**英雄的层级 */
        heroBoxIndex:20,
        /**防御塔的层级 */
        towerBoxIndex:30,

    }

    var MonsterPoolNum = 50;                                                 //怪物对象池大小

    _proto.gameUI = null;                                                    //ui对象
    _proto.curHero = null;                                                   //当前英雄
    _proto.curTower = null;                                                  //当前防御塔
    _proto.heroBox = null;                                                   //存放英雄对象的盒子
    _proto.monsterBox = null;                                                //存放怪物对象的盒子
    _proto.towerBox = null;                                                  //存放防御塔对象的盒子
    _proto.monsterList = null;                                               //怪物对象列表
    _proto.monsterPool = null;                                               //怪物对象池
    _proto.towerGlobaPos = null;                                             //防御塔坐标
    

    _proto.Init = function () {
        //初始化当前类属性

        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
        }

        this.monsterList = [];
        this.monsterPool = [];

        this.monsterBox = new Laya.Box();
        this.monsterBox.width = Laya.stage.width;
        this.monsterBox.height = Laya.stage.height;

        this.heroBox = new Laya.Box();
        this.heroBox.width = Laya.stage.width;
        this.heroBox.height = Laya.stage.height;
        
        this.towerBox = new Laya.Box();
        this.towerBox.width = Laya.stage.width;
        this.towerBox.height = Laya.stage.height;

        Laya.stage.addChild(this.monsterBox);
        Laya.stage.addChild(this.towerBox);
        Laya.stage.addChild(this.heroBox);


        this.initMonsterPool();

        this.curTower = new Tower();
        this.curTower.pos(Laya.stage.width /2,Laya.stage.height / 2);
        this.towerBox.addChild(this.curTower);


        //自动适配完后初始化
        // Laya.timer.frameOnce(8, this, this.delayInitShow);


        this.initHero();
        this.initMonster();

        this.gameUI.moveBox.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        this.gameUI.moveBox.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        
        Laya.timer.frameLoop(1, this, this.onUpdate);
        
        MessageController.getInstance().AddNotification("Monster_Dead",this,this._monsterDeadEvent);
       
    }

    _proto.onDestroy = function () {
        

    }
    //自动适配完后初始化
     _proto.delayInitShow = function () {

        var centerGlobalPos = this.gameUI.centerBox.localToGlobal(new Point(this.gameUI.centerBox.width / 2, this.gameUI.centerBox.height / 2));
        this.towerGlobaPos = centerGlobalPos;

        this.initHero();
        this.initMonster();

        this.gameUI.moveBox.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        this.gameUI.moveBox.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
     }
    

    /**初始化英雄 */
    _proto.initHero = function(){
        this.curHero = new Hero();
        this.heroBox.addChild(this.curHero);

    }
    /**初始化怪物 */
    _proto.initMonster = function(){

        var tempMonster = this.getMonsterFromPool();
        tempMonster.visible = true;
        this.monsterList.push(tempMonster);

        //出生点
        var birthPos = new Point(-50,200);
        tempMonster.pos(birthPos.x,birthPos.y);

        var centerGlobalPos = this.gameUI.centerBox.localToGlobal(new Point(this.gameUI.centerBox.width / 2, this.gameUI.centerBox.height / 2));
        var targetPos = GetPointOnCircle(centerGlobalPos,80,200);

        tempMonster.setTargetPos(targetPos);
        // Laya.Tween.to(tempMonster,
        //         {
        //             x:targetPos.x,
        //             y: targetPos.y,
        //         }, 5000);
    }

    /**开始游戏 */
    _proto.startGame = function () {

        // this.gameUI.anim_panda.play(0, true, "pandaDaiji");
        //游戏倒计时
        // Laya.timer.loop(1000, this, this.animateTimeBased);

    }   
     /**初始化对象池 */
     _proto.initMonsterPool = function(){
        for (var i = 0; i < MonsterPoolNum; i++) {
            var tempMonster = new Monster();
            tempMonster.pos(-1000,0);
            tempMonster.visible = false;
            this.monsterBox.addChild(tempMonster);
            this.monsterPool.push(tempMonster);     
        }
     }

    /**从缓冲池中拿怪物 */
    _proto.getMonsterFromPool = function(){
        var tempMonster = null;
        if(this.monsterPool.length == 0){
            var tempMonster = new Monster();
            tempMonster.pos(-1000,0);
            tempMonster.visible = false;
            this.monsterBox.addChild(tempMonster);
            this.monsterPool.push(tempMonster);   
        }
        tempMonster = this.monsterPool[0];
        this.monsterPool.splice(0, 1);
        return tempMonster;
    }
    /**怪物还到对象池 */
    _proto.recoveryMonsterToPool = function(_monster){
        _monster.onDestroy();
        _monster.visible = false;
        _monster.pos(-1000,0);
        this.monsterPool.push(_monster);
    }

    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.monsterList.length > 0){
            for (var i = 0; i < this.monsterList.length; i++) {
                var tempMon = this.monsterList[i];
                tempMon.onUpdate();
            }
        }
        if(this.curHero != null){
            this.curHero.onUpdate();
        }
        if(this.curTower != null){
            this.curTower.onUpdate();
        }

    }
    /**按下监听事件 */
    _proto._mouseDowmEvent = function(_event){
        // Gamelog("------_mouseDowmEvent="+_event.stageX+",stageY="+_event.stageY);
        // this.heroBox.globalToLocal(_event.stageX,_event.stageY);
        var tarPos = this.heroBox.globalToLocal(new Point(_event.stageX,_event.stageY));
        this.curHero.setTargetPos(tarPos);
       
    
        
    }
    /**按下移动监听事件 */
    _proto._mouseMoveEvent = function(_event){
        // this.curHero.setTargetPos(_event.stageX,_event.stageY);
        var tarPos = this.heroBox.globalToLocal(new Point(_event.stageX,_event.stageY));
        this.curHero.setTargetPos(tarPos);
    }


    _proto._monsterDeadEvent = function(notif){
        // Gamelog("-----_monsterDeadEvent");
        for (var i = 0; i < this.monsterList.length; i++) {
            var t_monster = this.monsterList[i];
            if(t_monster == notif.Content){
                // Gamelog("------删除怪物");
                this.monsterList.splice(i, 1);
                this.recoveryMonsterToPool(t_monster);
            }

        }
    }

    return GameScene;
})();