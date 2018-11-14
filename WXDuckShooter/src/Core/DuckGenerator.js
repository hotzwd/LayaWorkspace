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

        birthPosArray = [];
        for (var t_x = 300; t_x < GameConfig.GameWidth; ) {
            var t_pos = new Point(t_x,700);
            t_x += 50;
            birthPosArray.push(t_pos);
        }

        endPosArray = [];
        endPosArray.push(new Point(-120,400));
        endPosArray.push(new Point(-120,200));
        endPosArray.push(new Point(Laya.stage.width + 120,200));
        endPosArray.push(new Point(Laya.stage.width + 120,200));
        endPosArray.push(new Point(500,-120));
        endPosArray.push(new Point(1200,-120));
        endPosArray.push(new Point(250,-120));
        endPosArray.push(new Point(750,-120));
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

        var duckRanomNum = parseInt(Math.random()*10, 10);
        duckRanomNum =1;
        var typeId = parseInt(Math.random()*1 +1, 10);

        var birthIndex = parseInt(Math.random()*birthPosArray.length,10);
        var birthPos = birthPosArray[birthIndex];

        var endIndex = parseInt(Math.random()*endPosArray.length,10);
        var endPos = endPosArray[endIndex];

        //初始
        _mos.initDuck(typeId,birthPos,endPos);

     }
    

    return{
            getInstance:getInstance
        }
})();