/**
 * 方块工厂
 */
var TreeFactory = (function(_super){

    Laya.class(TreeFactory,"TreeFactory",_super);
    var _proto = TreeFactory.prototype;

    var instance;
    
    function getInstance(){
        if(instance === undefined){
            instance = new TreeFactory();
        }
        return instance;
    }
    var objectPoolNum = 50;                                                 //对象池大小

    _proto.objectPool = null;                                               //对象池
    _proto.objectBox;                                                      //父元素

    function TreeFactory(){
        this.objectPool = [];
    }

    _proto.initFactory = function(_box) {
        this.objectBox = _box
        this.initobjectPool();
    }

    /**初始化对象池 */
     _proto.initobjectPool = function(){
        for (var i = 0; i < objectPoolNum; i++) {
            var tempduck = new Tree();
            tempduck.pos(-1000,0);
            tempduck.visible = false;
            this.objectBox.addChild(tempduck);
            this.objectPool.push(tempduck);     
        }
     }

    /**从缓冲池中拿 */
    _proto.getObjectFromPool = function(){
        var tempduck = null;
        if(this.objectPool.length == 0){
            var tempduck = new Tree();
            tempduck.pos(-1000,0);
            tempduck.visible = false;
            this.objectBox.addChild(tempduck);
            this.objectPool.push(tempduck);   
        }
        tempduck = this.objectPool[0];
        this.objectPool.splice(0, 1);
        return tempduck;
    }
    /**还到对象池 */
    _proto.recoveryObgectToPool = function(_duck){
        _duck.onDestroy();
        _duck.visible = false;
        _duck.pos(-1000,0);
        this.objectPool.push(_duck);
    }

    return{
            getInstance:getInstance
        }
})();