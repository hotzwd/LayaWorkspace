

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
    var TreeWidth = 52;
    var TreeHeight = 44;

    _proto.m_bgSp = null;                                                 //色块底图
    _proto.m_icon = null;                                                 //图标
    _proto.m_type = 0;                                                     //种类
    _proto.m_isClick = false;                                             //是否被点击
    


    _proto.Init = function () {
        this.width = TreeWidth;
        this.height = TreeHeight;
        // this.pivotX = TreeWidth / 2;
        // this.pivotY = TreeHeight / 2;  

        this.m_icon = new Laya.Image("Game/img_tree.png");
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
    _proto.initTree = function(p_type,p_startPoint,p_scale){

        this.resetTree();
        // var t_width = p_levelData.width;
        // var t_height = p_levelData.height;

        this.m_type = p_type;

        this.x = p_startPoint.x;
        this.y = p_startPoint.y;

        this.m_scale = p_scale;
        this.scaleX = this.m_scale;
        this.scaleY = this.m_scale;

        // Gamelog("-----tree width="+this.width);
        
    }


    /**重置状态 */
    _proto.resetTree = function(){
        // this.x = this.m_startPoint.x;
        // this.y = this.m_startPoint.y;

        this.m_isNear = false;
    }  

    //是否撞到树
    _proto.hitTree = function(p_ballPoint){
        var t_isHit = false;
        if(p_ballPoint.x >= this.x && p_ballPoint.x <= this.x+this.width /2 *this.m_scale 
            && p_ballPoint.y >= this.y+ this.height/3 * this.m_scale && p_ballPoint.y <= this.y + this.height * this.m_scale){
                t_isHit = true;
            } 
        return t_isHit;
    }

    //与树擦肩而过
    _proto.nearTree = function(p_ballPoint){
        if(this.m_isNear)
            return;
        var t_isNear = false;
        if(p_ballPoint.y >= this.y + this.height * this.m_scale && p_ballPoint.y <= this.y + this.height * this.m_scale + this.height/2 * this.m_scale){
            if((p_ballPoint.x >= this.x- this.width /2 *this.m_scale && p_ballPoint.x <= this.x )
                || ( p_ballPoint.x >= this.x+this.width /2 *this.m_scale && p_ballPoint.x <= this.x+this.width *this.m_scale)
                ){
                    t_isNear = true;
                    this.m_isNear = true;
                    this.scaleX = 1.5;
                    this.scaleY = 1.5;
                } 
        }
        return t_isNear;
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