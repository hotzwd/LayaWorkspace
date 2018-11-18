/**
 * 生成器
 */
var BlockGenerator = (function(_super){

    Laya.class(BlockGenerator,"BlockGenerator",_super);
    var _proto = BlockGenerator.prototype;

    var instance;
    
    function getInstance(){
        if(instance === undefined){
            instance = new BlockGenerator();
        }
        return instance;
    }
    var birthPosArray = [];                                               //出生点
    var endPosArray = [];                                                 //结束点


    function BlockGenerator(){
    }

    _proto.targetPos;                                        //坐标
    _proto.targetTower;                                      //目标塔
    _proto.ocjectBox;                                       //怪物容器

    _proto.initGenerator = function(_objectBox)
    {
        this.ocjectBox = _objectBox;

        BlockFactory.getInstance().initFactory(this.ocjectBox);

       
    }

    /**初始化对象池 */
     _proto.createBlock = function(p_num){

         var t_blockList = [];
         for (var i = 0; i < p_num; i++) {
            var tempBlock = BlockFactory.getInstance().getObjectFromPool();
            tempBlock.visible = true;
            
            this.randomBlcok(tempBlock);
            t_blockList.push(tempBlock);
         }
         return t_blockList;
     }

     _proto.randomBlcok = function(_block){

        
        // var typeId = parseInt(Math.random()*2 +1, 10);

        // var birthIndex = parseInt(Math.random()*birthPosArray.length,10);
        // var birthPos = birthPosArray[birthIndex];

        // var endIndex = parseInt(Math.random()*endPosArray.length,10);
        // var endPos = endPosArray[endIndex];

        // //初始
        // _block.initBlock(typeId,birthPos,endPos);

     }
    

    return{
            getInstance:getInstance
        }
})();