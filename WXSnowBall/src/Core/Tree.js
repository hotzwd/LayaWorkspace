

 /**
 * 树类
 */
var Tree = (function (_super) {


    Laya.class(Tree, "Core.Tree", _super);
    _proto = Tree.prototype;

    function Tree() {
        Tree.super(this);
        this.Init();
    }
    //宽高
    var TreeWidth = 200;
    var TreeHeight = 204;

    _proto.m_bgSp = null;                                                 //色块底图
    _proto.m_icon = null;                                                 //图标
    _proto.m_type = 0;                                                     //种类
    _proto.m_isClick = false;                                             //是否被点击
    


    _proto.Init = function () {
        // this.width = TreeWidth;
        // this.height = TreeHeight;
        // this.pivotX = TreeWidth / 2;
        // this.pivotY = TreeHeight / 2;  

        this.m_icon = new Laya.Image();
        this.m_icon.centerX = 0;
        this.m_icon.centerY = 0;

        this.addChild(this.m_icon);

        // this.on(Laya.Event.CLICK,this,this._TreeClickEvent);
        
    }
    

    _proto.onDestroy = function () {
        // var sp = new Laya.Sprite();
        // sp.graphics.clear(true);
        // this.m_bgSp.graphics.clear(true);
    }

    /**初始化 */
    _proto.initTree = function(p_type,p_icon,p_startPoint,p_levelData){

        var t_width = p_levelData.width;
        var t_height = p_levelData.height;

        this.m_type = p_type;

        this.x = p_startPoint.x;
        this.y = p_startPoint.y;
        
    }


    /**重置状态 */
    _proto.resetTree = function(){
        this.x = this.m_startPoint.x;
        this.y = this.m_startPoint.y;

        // this.m_isHit = false;
        // this.m_anim.play(0, true, "Tree_"+this.m_type+"_fly");
        // this.y -= 300;
    }

    
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        
    }

    //点击方块
    _proto._TreeClickEvent = function(){
        
    }
    

    

    return Tree;
})(Laya.Sprite);