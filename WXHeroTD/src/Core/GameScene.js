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

    _proto.pointLinePanel1 = null;                                                //指引点面板
    _proto.pointLinePanel2 = null;                                                //指引点面板

    _proto.gameScore = 0;                                                    //游戏分数
    _proto.createMonstrCD = 0;                                               //产生怪物cd
    _proto.lastUpdateTime = 0;                                               //上一次更新时间

    _proto.Init = function () {
        //初始化当前类属性
        this.gameScore = 0;
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
        }

        this.monsterList = new Array();
        this.monsterPool = [];

        this.monsterBox = new Laya.Box();
        this.monsterBox.width = Laya.stage.width;
        this.monsterBox.height = Laya.stage.height;

        this.heroBox = new Laya.Box();
        this.heroBox.width = Laya.stage.width;
        this.heroBox.height = Laya.stage.height;
        this.heroBox.zOrder = 20;
        
        this.towerBox = new Laya.Box();
        this.towerBox.width = Laya.stage.width;
        this.towerBox.height = Laya.stage.height;
        this.towerBox.zOrder = 30;


        Laya.stage.addChild(this.monsterBox);
        Laya.stage.addChild(this.towerBox);
        Laya.stage.addChild(this.heroBox);

        //初始化 防御塔
        this.curTower = new Tower();
        this.curTower.pos(Laya.stage.width /2,Laya.stage.height / 2 +45);
        this.towerBox.addChild(this.curTower);

        
        // this.initMonsterPool();
        //初始化生成器
        MonsterGenerator.getInstance().initGenerator(this.monsterBox,this.curTower);

        //自动适配完后初始化
        Laya.timer.frameOnce(8, this, this.delayInitShow);
        
        

        this.initHero();
        this.initMonster();

        this.gameUI.moveBox.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        this.gameUI.moveBox.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        
        Laya.timer.frameLoop(1, this, this.onUpdate);
        
        MessageController.getInstance().AddNotification("Monster_Dead",this,this._monsterDeadEvent);
        MessageController.getInstance().AddNotification("Tower_Dead",this,this._towerDeadEvent);
       
    }

    _proto.onDestroy = function () {
        

    }
    //自动适配完后初始化
     _proto.delayInitShow = function () {

        this.gameUI.addScore(0);
        
     }
    

    /**初始化英雄 */
    _proto.initHero = function(){
        this.curHero = new Hero();
        this.heroBox.addChild(this.curHero);
        this.curHero.pos(this.curTower.x, this.curTower.y + 200);

    }

   
    /**初始化怪物 */
    _proto.initMonster = function(){


    }

    

    /**开始游戏 */
    _proto.startGame = function () {

        // this.gameUI.anim_panda.play(0, true, "pandaDaiji");
        //游戏倒计时
        // Laya.timer.loop(1000, this, this.animateTimeBased);

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

       this.updateGeneratorMonster();



    }

    /**根据时间生成怪物 */
     _proto.updateHeroZorder = function(){
     
    }
    /**根据时间生成怪物 */
     _proto.updateGeneratorMonster = function(){
        this.getCdTime();
        var t_time =  new Date().getTime();
        var t_interval = t_time  - this.lastUpdateTime;
        if(t_interval > this.createMonstrCD){
                // Gamelog("-------间隔="+t_interval+",createMonstrCD="+this.createMonstrCD);
                this.lastUpdateTime = t_time;
                this.createMonster();
        }
    }

    /**生成怪物 */
    _proto.createMonster = function(){
        var t_list = MonsterGenerator.getInstance().createMonster(1);
        this.monsterList = this.monsterList.concat(t_list);
    }
    /**获取产生怪物间隔时间 */
    _proto.getCdTime = function(){
        for (var i = MonsterRefreshData.length -1; i >=0 ; i--) {
            var t_data = MonsterRefreshData[i];
            if(this.gameScore > t_data.score){
                this.createMonstrCD = t_data.time ;
                break;
            }
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
        var t_score = notif.Content.monsterScore;
        this.gameScore += t_score;
        this.gameUI.addScore(t_score);

        for (var i = 0; i < this.monsterList.length; i++) {
            var t_monster = this.monsterList[i];
            if(t_monster == notif.Content){
                // Gamelog("------删除怪物");
                this.monsterList.splice(i, 1);
                // MonsterFactory.getInstance().recoveryMonsterToPool(t_monster);
            }

        }
    }

    _proto._towerDeadEvent = function(notif){
        Laya.timer.clear(this,this.onUpdate);
    }

    

    return GameScene;
})();