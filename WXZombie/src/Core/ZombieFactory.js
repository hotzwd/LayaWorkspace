/**
 * 工厂
 */
var ZombieFactory = (function(_super){

    Laya.class(ZombieFactory,"ZombieFactory",_super);
    var _proto = ZombieFactory.prototype;

    var instance;
    
    function getInstance(){
        if(instance === undefined){
            instance = new ZombieFactory();
        }
        return instance;
    }
    var ZombiePoolNum = 10;                                                 //对象池大小

    _proto.ZombiePool = null;                                               //对象池
    _proto.ZombieBox;                                                      //父元素

    function ZombieFactory(){
        this.ZombiePool = [];
    }

    _proto.initFactory = function(_box) {
        this.ZombieBox = _box;
        this.initZombiePool();
    }

    /**初始化对象池 */
     _proto.initZombiePool = function(){
        for (var i = 0; i < ZombiePoolNum; i++) {
            var tempZombie = new Zombie();
            tempZombie.pos(-1000,0);
            tempZombie.visible = false;
            this.ZombieBox.addChild(tempZombie);
            this.ZombiePool.push(tempZombie);     
        }
     }

    /**从缓冲池中拿 */
    _proto.getZombieFromPool = function(){
        var tempZombie = null;
        if(this.ZombiePool.length == 0){
            var tempZombie = new Zombie();
            tempZombie.pos(-1000,0);
            tempZombie.visible = false;
            this.ZombieBox.addChild(tempZombie);
            this.ZombiePool.push(tempZombie);   
        }
        tempZombie = this.ZombiePool[0];
        this.ZombiePool.splice(0, 1);
        return tempZombie;
    }
    /**还到对象池 */
    _proto.recoveryZombieToPool = function(_Zombie){
        _Zombie.onDestroy();
        _Zombie.visible = false;
        _Zombie.pos(-1000,0);
        this.ZombiePool.push(_Zombie);
    }

    return{
            getInstance:getInstance
        }
})();