/**
 * 游戏场景
 */
var GameScene = (function (_super) {


    Laya.class(GameScene, "Core.GameScene", _super);
    _proto = GameScene.prototype;

    function GameScene() {
        // GameScene.super(this);
        this.Init();
    }

    /**
     * 游戏波次
     */
    var GameWaveList = [1,1,1,1,2,2,2,3];
    /**
     * 游戏速度增加
     */
    var GameSpeedAdd = 0.5;

    _proto.gameUI = null;                                                    //ui对象
    _proto.gameLayer = null;                                                 //游戏层
    _proto.foodList = [];                                                    //所有鸭子列表
    _proto.gameScore = 0;                                                    //游戏得分
    _proto.gameLevel = 0;                                                    //游戏等级
    _proto.gameSpeed = 3;                                                    //游戏速度
    _proto.trackList = [];                                                   //轨道
    _proto.trackMove = false;                                                //轨道是否移动
    _proto.plateList = [];                                                   //盘子列表
    _proto.selectPlateList = [];                                             //选择的盘子
    _proto.clickPlate = true;                                               //是否可以点击盘子
    _proto.isRight = false;                                                  //答案是否正确
    _proto.selectPlate1 = null;                                              //位置1盘子
    _proto.selectPlate2 = null;                                              //位置2盘子
    
  

    _proto.Init = function () {
        
        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
            // this.gameUI.visible = false;
        }
        
        this.gameLayer = this.gameUI.gameLayer;
        
        // this.gameLayer.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        // this.gameLayer.on(Laya.Event.MOUSE_UP,this,this._mouseUpEvent);

        //自动适配完后初始化
        Laya.timer.frameOnce(8, this, this.delayInitShow);
        // this.delayInitShow();

        this.createTrack();
        this.createPlateList();

        this.updateFoodList();

        this.startGame();
       
    }

    _proto.onDestroy = function () {

    }

    //自动适配完后初始化
     _proto.delayInitShow = function () {
        
     }

    /**重置游戏 */
    _proto.restartGame = function(_score){

        this.foodList = [];
        this.selectPlateList = [];
        this.gameLevel = 0;
        this.gameScore = 0;
        this.gameSpeed = 1;
        this.clickPlate = true;
        this.isRight = false;
        this.selectPlate1 = null;
        this.selectPlate2 = null;
        
    }

    /**开始游戏 */
    _proto.startGame = function () {

        this.restartGame();
        Laya.timer.frameLoop(1, this, this.onUpdate);
        
    }

    /**创建轨道 */
    _proto.createTrack = function(){
        for (var i = 0; i < 44; i++) {
            var t_piece = new Laya.Image("Game/roll.png");
            t_piece.pos(39*i-39,581);
            this.gameLayer.addChild(t_piece);
            this.trackList.push(t_piece);
        }
    }

    /**创建盘子列表 */
    _proto.createPlateList = function(){
        for (var i = 0; i < 10; i++) {
            var t_plate = new Plate();
            t_plate.pos(i*170 -170,530);
            this.gameLayer.addChild(t_plate);
            this.plateList.push(t_plate);
        }
    }

    /**暂停游戏 */
    _proto.pauseGame = function(){
        Laya.timer.clear(this,this.onUpdate);
    }

    /**恢复游戏 */
    _proto.resumeGame = function(){
        Laya.timer.frameLoop(1, this, this.onUpdate);
    }

    /**游戏结束 */
    _proto.gameover = function(_win){
        Laya.timer.clear(this,this.onUpdate);

        UIManager.getInstance().showUI("GameOverUI");
        
    }
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
       
       for (var i = 0; i < this.trackList.length; i++) {
           var t_piece = this.trackList[i];
           t_piece.x += this.gameSpeed;
           if(t_piece.x > 1664){
               t_piece.x = -39*2;
           }
       }

       for (var i = 0; i < this.plateList.length; i++) {
           var t_plate = this.plateList[i];
           t_plate.x += this.gameSpeed;
           if(t_plate.x > 1664){
               t_plate.x = -170;
           }
       }
    }

    //增加分数
    _proto.addGameScore = function(_score){
        this.gameScore +=  _score;
        this.gameUI.t_gamescore.text = this.gameScore;
    }

    //更新食物
    _proto.updateFoodList = function(){

        this.selectPlate1 = null;
        this.selectPlate2 = null;
        
        for (var x = 0; x < this.plateList.length; x++) {
            var t_plate = this.plateList[x];
            t_plate.visible = false;
        }

        this.foodList = [];
        
        var t_numList = [];
        this.targetNum = parseInt(Math.random()*5+ this.gameLevel * 10 + 5);
        Gamelog("-----this.targetNum="+this.targetNum);
        this.gameUI.t_num.text = this.targetNum;

        var t_num1 = parseInt(Math.random()* (this.targetNum - 1)+1);
        var t_num2 = this.targetNum - t_num1;
        t_numList.push(t_num1);
        t_numList.push(t_num2);

        var t_plateNum = parseInt(Math.random()*6+4);
        var t_randomNum = t_num1 > t_num2 ? t_num1 : t_num2;

        for (var i = 0; i < t_plateNum -2; i++) {
            // var t_errorNum = parseInt(Math.random(t_plateNum - 1)+1);
            t_numList.push(parseInt(Math.random()*(t_randomNum - 1)+1)); 
        }
        Gamelog("-----list length ="+t_numList.length);
 
        //产生扰乱数字
        for (i = 0; i < t_numList.length; i++) {
            var t_num = t_numList[i];
            // Gamelog("-----list num="+t_num);
            var isSame = false;
            var t_foodIndex = 0;
            do {
                isSame = false;
                t_foodIndex =  parseInt(Math.random()*this.plateList.length);
                for (var j = 0; j < this.foodList.length; j++) {
                    var t_food = this.foodList[j];
                    if(t_foodIndex == t_food){
                        isSame = true;
                        break;
                    }
                }
            } while (isSame == true);

            this.foodList.push(t_foodIndex);
            // Gamelog("-----t_foodIndex="+t_foodIndex);
            
            t_plate = this.plateList[t_foodIndex];
            t_plate.visible = true;
            //初始化盘子
            t_plate.initPlate(t_num);
        }

        this.gameLevel ++;

    }


    
    /**
     * 点击盘子
     */
    _proto.onPlateClickEvent = function(p_plate){

        if(this.selectPlate1 == null || this.selectPlate2 == null){
            p_plate.visible = false;
        }
        
        // this.selectPlateList.push(p_plate);
        if(this.selectPlate1 == null){
            this.selectPlate1 = p_plate;
        }else if(this.selectPlate2 == null){
            this.selectPlate2 = p_plate;
        }

        this.gameUI.updateSelectPlate();



        if(this.selectPlate1!= null && this.selectPlate2 != null){
            //计算结果
            this.calculateNum();
        }
    }

    //放回盘子
    _proto.resetPlate = function(p_index){
        if(p_index == 1){
            this.selectPlate1.visible = true;
            this.selectPlate1 = null;
        }else{
            this.selectPlate2.visible = true;
            this.selectPlate2 = null;
        }
    }


    /**
     * 计算结果
     */
    _proto.calculateNum = function(){
        var t_num1 = this.selectPlate1.m_num;
        var t_num2 = this.selectPlate2.m_num;
        this.isRight = (t_num1 + t_num2) == this.targetNum ? true: false;
        var t_str = t_num1 + "+" + t_num2 +"="+(t_num1+t_num2);
        this.gameUI.showCalculateText(t_str,this.isRight);
    }
  

    return GameScene;
})();