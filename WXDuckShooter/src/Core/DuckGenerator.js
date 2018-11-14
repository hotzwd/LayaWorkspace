/**
 * 鸭子生成器
 */
var DuckGenerator = (function(_super){

    Laya.class(DuckGenerator,"DuckGenerator",_super);
    var _proto = DuckGenerator.prototype;

    var instance;
    
    function getInstance(){
        if(instance === undefined){
            instance = new DuckGenerator();
        }
        return instance;
    }
    var duckPoolNum = 50;                                                 //对象池大小
    var birthPosArray = [];                                               //出生点
    var endPosArray = [];                                                 //结束点


    function DuckGenerator(){
    }

    _proto.targetPos;                                        //中心塔在duckBox坐标
    _proto.targetTower;                                      //目标塔
    _proto.duckBox;                                       //怪物容器

    _proto.initGenerator = function(_duckBox)
    {
        this.duckBox = _duckBox;

        DuckFactory.getInstance().initFactory(this.duckBox);

        
    }

    /**初始化对象池 */
     _proto.createduck = function(p_num){

         var t_duckList = [];
         for (var i = 0; i < p_num; i++) {
            var tempduck = DuckFactory.getInstance().getduckFromPool();
            tempduck.visible = true;
            
            this.randomduckPos(tempduck);
            t_duckList.push(tempduck);
         }
         return t_duckList;
     }

     _proto.randomduckPos = function(_mos){


        //  var posTypeId = Math.random()*1 + 1;
        //  posTypeId = parseInt(posTypeId, 10);
        //  posTypeId = 3;

        var duckRanomNum = parseInt(Math.random()*10, 10);
        duckRanomNum =1;
        var typeId = parseInt(Math.random()*1 +1, 10);

        var birthPos;

         birthPos = new Point(500,200);
         //左上
        //  if(posTypeId == 1){
        //     birthPos = new Point(-50 - Math.random()*200, Math.random()*200); // 180 -270度
        //  }

        //  Gamelog("----生成怪物 pos="+birthPos +",角度="+t_anlge);
        //初始
        _mos.initDuck(typeId,birthPos);

     }
    

    return{
            getInstance:getInstance
        }
})();