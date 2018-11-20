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

Laya.stage.bgColor = "#534135";//设置画布的背景颜色。
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
                ["res/atlas/Left.atlas",Laya.Loader.ATLAS],
                ["res/atlas/Right.atlas",Laya.Loader.ATLAS],
                ["res/atlas/Face.atlas",Laya.Loader.ATLAS],
                // //图片
                ["Game/background.jpg",Laya.Loader.IMAGE],
                ["Game/human0001.png",Laya.Loader.IMAGE],
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

    Laya.Animation.createFrames(["Face/human_face_Spritesheet6x5_01.png","Face/human_face_Spritesheet6x5_02.png","Face/human_face_Spritesheet6x5_03.png","Face/human_face_Spritesheet6x5_04.png"
        ,"Face/human_face_Spritesheet6x5_05.png","Face/human_face_Spritesheet6x5_06.png","Face/human_face_Spritesheet6x5_07.png","Face/human_face_Spritesheet6x5_08.png"
        ,"Face/human_face_Spritesheet6x5_09.png","Face/human_face_Spritesheet6x5_10.png","Face/human_face_Spritesheet6x5_11.png","Face/human_face_Spritesheet6x5_12.png"
        ,"Face/human_face_Spritesheet6x5_13.png","Face/human_face_Spritesheet6x5_14.png","Face/human_face_Spritesheet6x5_15.png","Face/human_face_Spritesheet6x5_16.png"
        ,"Face/human_face_Spritesheet6x5_17.png","Face/human_face_Spritesheet6x5_18.png","Face/human_face_Spritesheet6x5_19.png","Face/human_face_Spritesheet6x5_20.png"
        ,"Face/human_face_Spritesheet6x5_21.png"], "face_eat");
    Laya.Animation.createFrames(["Face/human_face_Spritesheet6x5_22.png","Face/human_face_Spritesheet6x5_23.png","Face/human_face_Spritesheet6x5_24.png","Face/human_face_Spritesheet6x5_25.png"
        ,"Face/human_face_Spritesheet6x5_26.png","Face/human_face_Spritesheet6x5_27.png","Face/human_face_Spritesheet6x5_28.png","Face/human_face_Spritesheet6x5_29.png"
        ,"Face/human_face_Spritesheet6x5_30.png"], "face_fail");
    Laya.Animation.createFrames(["Left/human_left_Spritesheet5x4_01.png","Left/human_left_Spritesheet5x4_02.png","Left/human_left_Spritesheet5x4_03.png","Left/human_left_Spritesheet5x4_04.png"
        ,"Left/human_left_Spritesheet5x4_05.png","Left/human_left_Spritesheet5x4_06.png","Left/human_left_Spritesheet5x4_07.png","Left/human_left_Spritesheet5x4_08.png"
        ,"Left/human_left_Spritesheet5x4_09.png","Left/human_left_Spritesheet5x4_10.png","Left/human_left_Spritesheet5x4_11.png","Left/human_left_Spritesheet5x4_12.png"
        ,"Left/human_left_Spritesheet5x4_13.png","Left/human_left_Spritesheet5x4_14.png","Left/human_left_Spritesheet5x4_15.png","Left/human_left_Spritesheet5x4_16.png"
        ,"Left/human_left_Spritesheet5x4_17.png","Left/human_left_Spritesheet5x4_18.png","Left/human_left_Spritesheet5x4_19.png","Left/human_left_Spritesheet5x4_20.png"], "human_left");
    Laya.Animation.createFrames(["Right/human_right_Spritesheet5x4_01.png","Right/human_right_Spritesheet5x4_02.png","Right/human_right_Spritesheet5x4_03.png","Right/human_right_Spritesheet5x4_04.png"
        ,"Right/human_right_Spritesheet5x4_05.png","Right/human_right_Spritesheet5x4_06.png","Right/human_right_Spritesheet5x4_07.png","Right/human_right_Spritesheet5x4_08.png"
        ,"Right/human_right_Spritesheet5x4_09.png","Right/human_right_Spritesheet5x4_10.png","Right/human_right_Spritesheet5x4_11.png","Right/human_right_Spritesheet5x4_12.png"
        ,"Right/human_right_Spritesheet5x4_13.png","Right/human_right_Spritesheet5x4_14.png","Right/human_right_Spritesheet5x4_15.png","Right/human_right_Spritesheet5x4_16.png"
        ,"Right/human_right_Spritesheet5x4_17.png","Right/human_right_Spritesheet5x4_18.png","Right/human_right_Spritesheet5x4_19.png","Right/human_right_Spritesheet5x4_20.png"], "human_right");


    
    // Laya.Animation.createFrames(["game_resoure/bomb.png","game_resoure/bombIgnite1.png","game_resoure/bombIgnite2.png"], "bombIgnite");
    
    SceneManager.getInstance().currentScene = new GameScene();
    UIManager.getInstance().showUI("GameStartUI");
    wxGame.getInstance().createVideoAD();
    // laya.net.LocalStorage.clear();

}