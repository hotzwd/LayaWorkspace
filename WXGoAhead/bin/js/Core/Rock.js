/**
 * 石头类
 */
var Rock = (function (_super) {


    Laya.class(Rock, "Core.Rock", _super);
    _proto = Rock.prototype;

    function Rock() {
        Rock.super(this);
        this.Init();
    }
    //汽车宽高
    var RockWidth = 283;
    var RockHeight = 111;

    _proto.m_anim = null;                                                 //汽车动画


    _proto.Init = function () {
        
       
    }

    _proto.onDestroy = function () {

    }

    /**初始化汽车 */
    _proto.initRock = function(p_startPoint,p_stationPoint){
        
    }



    return Rock;
})(Laya.Sprite);