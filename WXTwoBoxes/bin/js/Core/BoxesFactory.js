/**
 * 工厂
 */
var BoxesFactory = (function(_super){

    Laya.class(BoxesFactory,"BoxesFactory",_super);
    var _proto = BoxesFactory.prototype;

    var instance;
    
    function getInstance(){
        if(instance === undefined){
            instance = new BoxesFactory();
        }
        return instance;
    }
    var BoxesPoolNum = 10;                                                 //对象池大小

    _proto.BoxesPool = null;                                               //对象池
    _proto.BoxesBox;                                                      //父元素

    function BoxesFactory(){
        this.BoxesPool = [];
    }

    _proto.initFactory = function(_box) {
        this.BoxesBox = _box;
        this.initBoxesPool();
    }

    /**初始化对象池 */
     _proto.initBoxesPool = function(){
        for (var i = 0; i < BoxesPoolNum; i++) {
            var tempBoxes = new Boxes();
            tempBoxes.pos(-1000,0);
            tempBoxes.visible = false;
            this.BoxesBox.addChild(tempBoxes);
            this.BoxesPool.push(tempBoxes);     
        }
     }

    /**从缓冲池中拿 */
    _proto.getBoxesFromPool = function(){
        var tempBoxes = null;
        if(this.BoxesPool.length == 0){
            var tempBoxes = new Boxes();
            tempBoxes.pos(-1000,0);
            tempBoxes.visible = false;
            this.BoxesBox.addChild(tempBoxes);
            this.BoxesPool.push(tempBoxes);   
        }
        tempBoxes = this.BoxesPool[0];
        this.BoxesPool.splice(0, 1);
        return tempBoxes;
    }
    /**还到对象池 */
    _proto.recoveryBoxesToPool = function(_Boxes){
        _Boxes.onDestroy();
        _Boxes.visible = false;
        _Boxes.pos(-1000,0);
        this.BoxesPool.push(_Boxes);
    }

    return{
            getInstance:getInstance
        }
})();