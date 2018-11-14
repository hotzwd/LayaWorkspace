/**
 * 鸭子工厂
 */
var DuckFactory = (function(_super){

    Laya.class(DuckFactory,"DuckFactory",_super);
    var _proto = DuckFactory.prototype;

    var instance;
    
    function getInstance(){
        if(instance === undefined){
            instance = new DuckFactory();
        }
        return instance;
    }
    var duckPoolNum = 10;                                                 //对象池大小

    _proto.duckPool = null;                                               //对象池
    _proto.duckBox;                                                      //父元素

    function DuckFactory(){
        this.duckPool = [];
    }

    _proto.initFactory = function(_box) {
        this.duckBox = _box
        this.initduckPool();
    }

    /**初始化对象池 */
     _proto.initduckPool = function(){
        for (var i = 0; i < duckPoolNum; i++) {
            var tempduck = new Duck();
            tempduck.pos(-1000,0);
            tempduck.visible = false;
            this.duckBox.addChild(tempduck);
            this.duckPool.push(tempduck);     
        }
     }

    /**从缓冲池中拿 */
    _proto.getduckFromPool = function(){
        var tempduck = null;
        if(this.duckPool.length == 0){
            var tempduck = new Duck();
            tempduck.pos(-1000,0);
            tempduck.visible = false;
            this.duckBox.addChild(tempduck);
            this.duckPool.push(tempduck);   
        }
        tempduck = this.duckPool[0];
        this.duckPool.splice(0, 1);
        return tempduck;
    }
    /**还到对象池 */
    _proto.recoveryduckToPool = function(_duck){
        _duck.onDestroy();
        _duck.visible = false;
        _duck.pos(-1000,0);
        this.duckPool.push(_duck);
    }

    return{
            getInstance:getInstance
        }
})();