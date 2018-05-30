
//laya初始化
Laya.init(GameConfig.GameWidth, GameConfig.GameHeight, Laya.WebGL);
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

Laya.stage.bgColor = "#000000";//设置画布的背景颜色。
//使用WebWorker加载并解码图片，把耗费cpu的工作放到worker中执行，防止js主线程卡死，从而能大大减少游戏中加载卡顿现象。
//指定worker.js所在的路径,比如放在libs目录下
//Laya.WorkerLoader.workerPath = "libs/worker.js";
//开启使用WorkerLoader来加载解码图片的功能
//Laya.WorkerLoader.enable = true;

//设置版本控制类型为使用文件名映射的方式
ResourceVersion.type = ResourceVersion.FILENAME_VERSION;
//加载版本信息文件
// ResourceVersion.enable("version.json", Handler.create(this, beginLoad));   

if(GameInFackBook){
    initializeAsync();
    beginLoad();
    FBInstant.startGameAsync().then(function() {
        console.log("-------------startGameAsync ");
        loadingCallback();
    });
}else{
    beginLoad();
}

function initializeAsync() {
    FBInstant.initializeAsync().then(function () {
        console.log("getLocale:", FBInstant.getLocale());
        console.log("getPlatform:", FBInstant.getPlatform());
        console.log("getSDKVersion", FBInstant.getSDKVersion());
        console.log("getSupportedAPIs", FBInstant.getSupportedAPIs());
        console.log("getEntryPointData", FBInstant.getEntryPointData());
    })
    // Laya.timer.once(100, this,function(){
    //    FBInstant.setLoadingProgress(100);
    // });
}


function  beginLoad(){

    var asset = [];
        //loading界面
        asset.push({
            url : "res/atlas/game.atlas",
            type:Laya.Loader.ATLAS
        }); 
        asset.push({
            url : "res/atlas/bubbles.atlas",
            type:Laya.Loader.ATLAS
        }); 
        asset.push({
            url : "game/bgGame.png",
            type:Laya.Loader.IMAGE
        }); 

    if(GameInFackBook){
        Laya.loader.load(asset, null, Handler.create(this, onLoading, null, false));
    }else
    {
        Laya.loader.load(asset, Laya.Handler.create(this, loadingCallback), null);    
    }
    
}

//加载进度
function onLoading (progress){
    console.log("loadingUI onLoading: " + progress);
    var intPro = parseInt(progress *100+"");
    console.log("loadingUI onLoading: " + intPro);
    if(intPro > 80)
        intPro = 80;
    FBInstant.setLoadingProgress(intPro);
    //取小数点后2位
    // this.loadingLabel.text = (progress).toFixed(2) * 100 +"%";
}


function loadingCallback(){
    console.log("----------loadingCallback ");
     //音乐开关
    // var soundSwitch = LocalStorage.getItem("soundSwitch");
    // if(soundSwitch === null)
    //     LocalStorage.setItem("soundSwitch",1);
    
    // MusicManager.getInstance().playMusic("res/music/1.mp3");

    Laya.Animation.createFrames(["bubbles/bomb_01.png","bubbles/bomb_02.png","bubbles/bomb_03.png","bubbles/bomb_04.png"],"bomb");
    
    Laya.Animation.createFrames(["game/img_daiji01.png","game/img_daiji02.png","game/img_daiji03.png","game/img_daiji04.png","game/img_daiji06.png"],"pandaDaiji");

    Laya.Animation.createFrames(["game/img_toulan01.png","game/img_toulan02.png"],"pandaToulan");

    SceneManager.getInstance().currentScene  = new GameScene();

    
}
