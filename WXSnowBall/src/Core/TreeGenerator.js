/**
 * 生成器
 */
var TreeGenerator = (function(_super){

    Laya.class(TreeGenerator,"TreeGenerator",_super);
    var _proto = TreeGenerator.prototype;

    var instance;
    
    function getInstance(){
        if(instance === undefined){
            instance = new TreeGenerator();
        }
        return instance;
    }
    var birthPosArray = [];                                               //出生点
    var endPosArray = [];                                                 //结束点


    function TreeGenerator(){
    }

    _proto.targetPos;                                        //坐标
    _proto.targetTower;                                      //目标塔
    _proto.ocjectBox;                                       //怪物容器

    _proto.initGenerator = function(_objectBox)
    {
        this.ocjectBox = _objectBox;

        TreeFactory.getInstance().initFactory(this.ocjectBox);

       
    }

    /**初始化对象池 */
     _proto.createTree = function(p_num){

         var t_TreeList = [];
         for (var i = 0; i < p_num; i++) {
            var tempTree = TreeFactory.getInstance().getObjectFromPool();
            tempTree.visible = true;
            
            this.randomBlcok(tempTree);
            t_TreeList.push(tempTree);
         }
         return t_TreeList;
     }

     _proto.randomBlcok = function(_Tree){

        
        // var typeId = parseInt(Math.random()*2 +1, 10);

        // var birthIndex = parseInt(Math.random()*birthPosArray.length,10);
        // var birthPos = birthPosArray[birthIndex];

        // var endIndex = parseInt(Math.random()*endPosArray.length,10);
        // var endPos = endPosArray[endIndex];

        // //初始
        // _Tree.initTree(typeId,birthPos,endPos);

     }
    

    return{
            getInstance:getInstance
        }
})();