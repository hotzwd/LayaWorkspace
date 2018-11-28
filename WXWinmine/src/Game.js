//初始化微信小游戏
Laya.MiniAdpter.init(true);
//laya初始化
Laya.init(GameConfig.GameWidth, GameConfig.GameHeight, Laya.WebGL);

wxGame.getInstance().Init();

//FPS
// Laya.Stat.show(0,0);
//设置适配模式 宽度不变，高度根据屏幕比缩放
Laya.stage.scaleMode = "fixedauto";
//场景布局类型 自动竖屏
Laya.stage.screenMode = "vertical";
//设置水平居中对齐
Laya.stage.alignH = "center";
//垂直居中对齐
Laya.stage.alignV = "middle";

Laya.stage.bgColor = "#dadd8e";//设置画布的背景颜色。
//使用WebWorker加载并解码图片，把耗费cpu的工作放到worker中执行，防止js主线程卡死，从而能大大减少游戏中加载卡顿现象。
//指定worker.js所在的路径,比如放在libs目录下
//Laya.WorkerLoader.workerPath = "libs/worker.js";
//开启使用WorkerLoader来加载解码图片的功能
//Laya.WorkerLoader.enable = true;

//设置版本控制类型为使用文件名映射的方式
// ResourceVersion.type = ResourceVersion.FILENAME_VERSION;
// //加载版本信息文件
// ResourceVersion.enable("version.json", Handler.create(this, beginLoad));   

beginLoad();
function  beginLoad(){
    var arr = [
                //图集
                ["res/atlas/WXGameUI.atlas",Laya.Loader.ATLAS],
                ["res/atlas/BeginUI.atlas",Laya.Loader.ATLAS],
                //图片
                // ["WXGameUI/img_beijing.jpg",Laya.Loader.IMAGE],
                ["WXGameUI/img_diban.jpg",Laya.Loader.IMAGE],
                ["WXGameUI/img_dikuang.jpg",Laya.Loader.IMAGE],
                ["BeginUI/img_yindao.png",Laya.Loader.IMAGE],
                // ["BeginUI/2.png",Laya.Loader.IMAGE],
                // ["BeginUI/3.png",Laya.Loader.IMAGE],
                // ["BeginUI/4.png",Laya.Loader.IMAGE],
                // ["BeginUI/5.png",Laya.Loader.IMAGE],
                //字体
                // ["bitmapFont/shuzi.fnt",Laya.Loader.FONT],
                //声音
                // ["res/music/1.mp3",Laya.Loader.SOUND],

                ];

    var asset = [];
    for(var i=0; i<arr.length; i++){
        asset.push({
            url : [
                arr[i][0]
            ],
            type:arr[i][1]
        }); 
    }

    //loading 界面需要的图集
    Laya.loader.load(asset,Laya.Handler.create(this,loadingCallback),null);
}

function loadingCallback(){

    

    SceneManager.getInstance().currentScene  = new GameSceneMain();
    wxGame.getInstance().createVideoAD();
    
}
