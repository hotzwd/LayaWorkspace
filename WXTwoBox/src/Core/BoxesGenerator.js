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

    _proto.bengbenginitGenerator = function(_BoxesBox)
    {
        this.BoxesBox = _BoxesBox;

        BoxesFactory.getInstance().bengbenginitFactory(this.BoxesBox);
        // var sp = new Laya.Sprite();
        birthPosArray = [];
    }

    /**初始化对象池 */
     _proto.bengbengcreateBoxes = function(p_num){

         var t_BoxesList = [];
         for (var i = 0; i < p_num; i++) {
            var tempBoxes = BoxesFactory.getInstance().getBoxesFromPool();
            tempBoxes.visible = true;
            
            this.bengbengrandomBoxesPos(tempBoxes);
            t_BoxesList.push(tempBoxes);
            // MusicManager.getInstance().playSound("res/music/ds_Boxes_intro.wav");
         }
         return t_BoxesList;
     }

     _proto.bengbengrandomBoxesPos = function(_mos,_pos){

       
        // Gamelog("----cretate pos ="+ birthPos.x+",y="+birthPos.y);
        var typeId = parseInt(Math.random()*2 + 1); //1方形 2三角形
        var birthPos = new Laya.Point(238,800);
        var t_dir = parseInt(Math.random()*2 + 1);;//1左边 2右边
        
        // typeId =2;
        // t_dir = 2;
        
        if(typeId == 1){
            if(t_dir == 1){
                birthPos = new Laya.Point(238,-100);
            }else{
                birthPos = new Laya.Point(504,-100);
            }
        }else{
            if(t_dir == 1){
                birthPos = new Laya.Point(347,-100);
            }else{
                birthPos = new Laya.Point(504,-100);
            }
        }

        //初始
        _mos.initBoxes(typeId,t_dir,birthPos);

     }
    

    return{
            getInstance:getInstance
        }
})();