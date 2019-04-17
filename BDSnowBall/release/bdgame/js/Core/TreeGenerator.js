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
     _proto.createTree = function(p_num,p_birthY){

        this.m_birthY = p_birthY;
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

        var t_birthX = parseInt(Math.random()*(GameConfig.GameWidth - 40) +20,10);
        var birthPos = new Point(t_birthX,this.m_birthY);

        var t_scale = parseInt(Math.random()*5 + 10,10) / 10;

        // //初始
        _Tree.initTree(1,birthPos,t_scale);

     }
    

    return{
            getInstance:getInstance
        }
})();