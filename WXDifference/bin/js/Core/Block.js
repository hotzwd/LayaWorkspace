
/**
 * 方块种类
 */
BlockType = {
    /**普通色块 */
    Normal:0,
    /**不同的色块 */
    Difference:1,
};
 /**
 * 方块类
 */
var Block = (function (_super) {


    Laya.class(Block, "Core.Block", _super);
    _proto = Block.prototype;

    function Block() {
        Block.super(this);
        this.Init();
    }
    //鸭子宽高
    var BlockWidth = 200;
    var BlockHeight = 204;

    _proto.m_bgSp = null;                                                 //色块底图
    _proto.m_icon = null;                                                 //图标
    _proto.m_type = BlockType.Normal;                                     //种类
    _proto.m_isClick = false;                                             //是否被点击
    


    _proto.Init = function () {
        // this.width = BlockWidth;
        // this.height = BlockHeight;
        // this.pivotX = BlockWidth / 2;
        // this.pivotY = BlockHeight / 2;  

        this.m_bgSp = new Laya.Sprite();
        this.addChild(this.m_bgSp);

        this.m_icon = new Laya.Image();
        this.m_icon.centerX = 0;
        this.m_icon.centerY = 0;

        this.addChild(this.m_icon);

        this.on(Laya.Event.CLICK,this,this._blockClickEvent);
        
    }
    

    _proto.onDestroy = function () {
        // var sp = new Laya.Sprite();
        // sp.graphics.clear(true);
        this.m_bgSp.graphics.clear(true);
    }

    /**初始化 */
    _proto.initBlock = function(p_type,p_icon,p_startPoint,p_levelData){

        var t_width = p_levelData.width;
        var t_height = p_levelData.height;

        this.m_type = p_type;

        this.width = t_width;
        this.height = t_height;

        this.m_bgSp.width = t_width;
        this.m_bgSp.height = t_height;

        this.m_bgSp.graphics.drawRect(0,0,t_width,t_height,GetRandomColor());


        this.m_icon.skin = p_icon;
        if(t_width >= 220){
            this.m_icon.width = 220;
        }else{
            this.m_icon.width = t_width;
        }
        if(t_height>= 220){
            this.m_icon.height = 220;
        }else{
            this.m_icon.height = t_height;
        }

        this.x = p_startPoint.x;
        this.y = p_startPoint.y;
        
    }


    /**重置状态 */
    _proto.resetBlock = function(){
        this.x = this.m_startPoint.x;
        this.y = this.m_startPoint.y;

        this.m_isHit = false;
        this.m_anim.play(0, true, "Block_"+this.m_type+"_fly");
        // this.y -= 300;
    }

    
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        
    }

    //点击方块
    _proto._blockClickEvent = function(){
        // Gamelog("-----点击方块="+this.m_type);
        if(this.m_type == BlockType.Difference){
             SceneManager.getInstance().currentScene.updateLevel();
             MusicManager.getInstance().playSound("res/music/found.wav");
        }else{
            MusicManager.getInstance().playSound("res/music/select.wav");
        }
    }
    

    

    return Block;
})(Laya.Sprite);