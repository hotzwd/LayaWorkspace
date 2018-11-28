/**
 * 生成器
 */
var BoxesGenerator = (function(_super){

    Laya.class(BoxesGenerator,"BoxesGenerator",_super);
    var _proto = BoxesGenerator.prototype;

    var instance;
    
    function getInstance(){
        if(instance === undefined){
            instance = new BoxesGenerator();
        }
        return instance;
    }
    var BoxesPoolNum = 9;                                                 //对象池大小
    var birthPosArray = [];                                               //出生点
    var endPosArray = [];                                                 //结束点


    function BoxesGenerator(){
    }

    _proto.BoxesBox;                                       //怪物容器

    _proto.initGenerator = function(_BoxesBox)
    {
        this.BoxesBox = _BoxesBox;

        BoxesFactory.getInstance().initFactory(this.BoxesBox);
        // var sp = new Laya.Sprite();
        birthPosArray = [];
    }

    /**初始化对象池 */
     _proto.createBoxes = function(p_num){

        var t_indexList = [];
        for (var x = 0; x < p_num; x++) {
            t_indexList.push(parseInt(Math.random()* 9));       
        }

        //产生扰乱数字
        for (i = 0; i < t_indexList.length; i++) {
            // var t_num = t_indexList[i];
            // Gamelog("-----list num="+t_num);
            var isSame = false;
            var t_Index = 0;
            do {
                isSame = false;
                t_Index =  parseInt(Math.random()*9);
                for (var j = 0; j < t_indexList.length; j++) {
                    var t_Index2 =t_indexList[j];
                    if(t_Index == t_Index2){
                        isSame = true;
                        break;
                    }
                }
            } while (isSame == true);
            t_indexList[i] = t_Index;
            Gamelog("-----list t_Index="+t_Index);
        }

         var t_BoxesList = [];
         for (var i = 0; i < p_num; i++) {
            var tempBoxes = BoxesFactory.getInstance().getBoxesFromPool();
            tempBoxes.visible = true;
            
            this.randomBoxesPos(tempBoxes,t_indexList[i]);
            t_BoxesList.push(tempBoxes);
            // MusicManager.getInstance().playSound("res/music/ds_Boxes_intro.wav");
         }
         return t_BoxesList;
     }

     _proto.randomBoxesPos = function(_mos,_pos){

        var t_levelData = SceneManager.getInstance().currentScene.levelData;
        var typeId = parseInt(Math.random()*100, 10);
        if(t_levelData.level == 1){
            typeId = 1;
        }else{
            if(typeId < 90){
                typeId = 1;
            }else{
                typeId = 0;
            }
        }

        // var birthIndex = parseInt(Math.random()*birthPosArray.length,10);
        var birthPos = birthPosArray[_pos];
        Gamelog("----cretate pos ="+ birthPos.x+",y="+birthPos.y);
        var t_time = t_levelData.time;
        //初始

        _mos.initBoxes(typeId,birthPos,t_time);

     }
    

    return{
            getInstance:getInstance
        }
})();