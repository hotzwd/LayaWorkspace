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
Laya.stage.screenMode = "horizontal";
//设置水平居中对齐
Laya.stage.alignH = "center";
//垂直居中对齐
Laya.stage.alignV = "middle";

Laya.stage.bgColor = "#000000";//设置画布的背景颜色。
//使用WebWorker加载并解码图片，把耗费cpu的工作放到worker中执行，防止js主线程卡死，从而能大大减少游戏中加载卡顿现象。
//指定worker.js所在的路径,比如放在libs目录下
//Laya.WorkerLoader.workerPath = "libs/worker.js";
//开启使用WorkerLoader来加载解码图片的功能
//Laya.WorkerLoader.enable = true;

//设置版本控制类型为使用文件名映射的方式
// ResourceVersion.type = ResourceVersion.FILENAME_VERSION;
//加载版本信息文件
// ResourceVersion.enable("version.json", Handler.create(this, beginLoad));

beginLoadGoHead();
function beginLoadGoHead() {
     var arr = [
                //图集
                // ["res/atlas/game.atlas",Laya.Loader.ATLAS],
                ["res/atlas/Game.atlas",Laya.Loader.ATLAS],
                ["res/atlas/Ducks/Duck1.atlas",Laya.Loader.ATLAS],
                ["res/atlas/Ducks/Duck2.atlas",Laya.Loader.ATLAS],
                ["res/atlas/Shot.atlas",Laya.Loader.ATLAS],
                // //图片
                ["Game/bg_game.jpg",Laya.Loader.IMAGE],
                ["Game/bg_menu.jpg",Laya.Loader.IMAGE],
                ["Game/grass.png",Laya.Loader.IMAGE],
                ["Game/hit_panel.png",Laya.Loader.IMAGE],
                ["Game/img_box.png",Laya.Loader.IMAGE],
                ["Game/img_tree.png",Laya.Loader.IMAGE],
                // //字体
                // ["bitmapFont/shuzi.fnt",Laya.Loader.FONT],
                //声音
                // ["res/music/1.mp3",Laya.Loader.SOUND],
                // ["res/music/1.wav",Laya.Loader.SOUND],

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
    // Laya.loader.load(asset,Laya.Handler.create(this,showLoaded),null);
    Laya.loader.load(asset, Laya.Handler.create(this, loadingCallbackGO), null);
}

function loadingCallbackGO() {

    Laya.Animation.createFrames(["Ducks/Duck1/duck_1_01.png","Ducks/Duck1/duck_1_02.png","Ducks/Duck1/duck_1_03.png","Ducks/Duck1/duck_1_04.png"
        ,"Ducks/Duck1/duck_1_05.png","Ducks/Duck1/duck_1_06.png","Ducks/Duck1/duck_1_07.png"], "duck_1_fly");
    Laya.Animation.createFrames(["Ducks/Duck1/duck_1_08.png","Ducks/Duck1/duck_1_09.png","Ducks/Duck1/duck_1_10.png","Ducks/Duck1/duck_1_11.png","Ducks/Duck1/duck_1_12.png"
        ,"Ducks/Duck1/duck_1_13.png","Ducks/Duck1/duck_1_14.png","Ducks/Duck1/duck_1_15.png","Ducks/Duck1/duck_1_16.png"], "duck_1_hurt");
    Laya.Animation.createFrames(["Ducks/Duck1/duck_1_17.png","Ducks/Duck1/duck_1_18.png","Ducks/Duck1/duck_1_19.png","Ducks/Duck1/duck_1_20.png"
        ,"Ducks/Duck1/duck_1_21.png","Ducks/Duck1/duck_1_22.png","Ducks/Duck1/duck_1_23.png","Ducks/Duck1/duck_1_24.png"], "duck_1_fall");
    
    Laya.Animation.createFrames(["Ducks/Duck2/duck_2_01.png","Ducks/Duck2/duck_2_02.png","Ducks/Duck2/duck_2_03.png","Ducks/Duck2/duck_2_04.png"
        ,"Ducks/Duck2/duck_2_05.png","Ducks/Duck2/duck_2_06.png","Ducks/Duck2/duck_2_07.png"], "duck_2_fly");
    Laya.Animation.createFrames(["Ducks/Duck2/duck_2_08.png","Ducks/Duck2/duck_2_09.png","Ducks/Duck2/duck_2_10.png","Ducks/Duck2/duck_2_11.png","Ducks/Duck2/duck_2_12.png"
        ,"Ducks/Duck2/duck_2_13.png","Ducks/Duck2/duck_2_14.png","Ducks/Duck2/duck_2_15.png","Ducks/Duck2/duck_2_16.png"], "duck_2_hurt");
    Laya.Animation.createFrames(["Ducks/Duck2/duck_2_17.png","Ducks/Duck2/duck_2_18.png","Ducks/Duck2/duck_2_19.png","Ducks/Duck2/duck_2_20.png"
        ,"Ducks/Duck2/duck_2_21.png","Ducks/Duck2/duck_2_22.png","Ducks/Duck2/duck_2_23.png","Ducks/Duck2/duck_2_24.png"], "duck_2_fall");

    Laya.Animation.createFrames(["Shot/tap_shot_01.png","Shot/tap_shot_02.png","Shot/tap_shot_03.png","Shot/tap_shot_04.png","Shot/tap_shot_05.png"
        ,"Shot/tap_shot_06.png","Shot/tap_shot_07.png","Shot/tap_shot_08.png","Shot/tap_shot_09.png","Shot/tap_shot_10.png","Shot/tap_shot_11.png"
        ,"Shot/tap_shot_12.png","Shot/tap_shot_13.png","Shot/tap_shot_14.png","Shot/tap_shot_15.png","Shot/tap_shot_16.png","Shot/tap_shot_17.png"], "tap_shot");
    // Laya.Animation.createFrames(["game_resoure/bomb.png","game_resoure/bombIgnite1.png","game_resoure/bombIgnite2.png"], "bombIgnite");
    
    SceneManager.getInstance().currentScene = new GameScene();
    UIManager.getInstance().showUI("GameStartUI");
    wxGame.getInstance().createVideoAD();
    // laya.net.LocalStorage.clear();

}