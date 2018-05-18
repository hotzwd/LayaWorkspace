/**
 * 聊天对话条
 * by lzq
 */
var ChatLineView = (function(_super){
    
    Laya.class(ChatLineView,"Game.BaskerBall.Tool.ChatLineView",_super);
    var _proto = ChatLineView.prototype;
    
    function ChatLineView(){
        ChatLineView.super(this);
    }
    
    //表情文字显示
    // var FaceNameArray = ["[微笑]","[酷]","[囧]","[表情4]","[表情5]","[表情6]","[表情7]","[表情8]","[表情9]","[表情10]",
    // "[表情11]","[表情12]","[表情13]","[表情14]","[表情15]","[表情16]","[表情17]","[表情18]"];

     //初始化对话条
    _proto.initChatView = function(_name,_content,_type){
        //根据类型显示
        switch (_type) {
            case ChatViewType.Text:
                this.popText(_name,_content,_type);
                break;
            case ChatViewType.Sound:
                this.popSound(_name,_content,_type);
                break;
            // case ChatViewType.Flower:
            //     this.popFlower(_name,_content,_type);
                // break;
        
        }
        
    }

    //文字对话框
    _proto.popText = function(_name,_content,_type){

        this.div = new Laya.HTMLDivElement();
        var faceNum = this.matchFaceStringNum(_content);
        var stringNum = this.GetStringNum(GetFormtName(_name)+":" +_content);
        //内容中的表情减掉多余占用的字符
        if(faceNum > 0){
            stringNum -= faceNum;
        }

        var minHeight = 35;
        var minWidth = 45;

        var height = minHeight *2;
        var width = minWidth *2;
        var maxNum = 45;
        if(stringNum > 2 && stringNum <= maxNum){
            width = (minWidth*2-55-4) / 2 * stringNum + 55;
        }
        else if(stringNum > maxNum){
            width = (minWidth*2-55-4) / 2 * maxNum + 55;
            height = (minHeight - 6) * ((stringNum/maxNum)+1) + 40;
        }
        // Gamelog("---------label=height="+height+",width="+width);

        //文本宽
        this.div.width = width - 55;
        this.div.height = height - 40;
        //文本颜色样式
        this.div.style.color = "#6c6c69";
        // 文本字体
        this.div.style.fontFamily="黑体";
        // 文本字体大小样式
        this.div.style.fontSize = 30;
        //文本对齐样式
        // this.div.style.valign = "middle";
        var titleHtml = "<span style='display:inline-block; float:left; color:#ff9900;'>"+GetFormtName(this.converToString(_name))+":</span>";
        
        this.div.innerHTML = titleHtml+this.getFaceHtmlText(this.converToString(_content));

        // this.div.x = 20;
        // this.div.y = 20;
        this.addChild(this.div);

        
    }

    // "<" "&" 转换为字符实体
    _proto.converToString = function(_s){
        var str;
        _s=_s.replace(/&/g,"&amp;");
        _s=_s.replace(/</g,"&lt;");
        str = _s;
        return str;
    }

    
    
    //语音对话框
    _proto.popSound = function(_name,_content,_type){
        var nameLabel = new Laya.Label(GetFormtName(_name)+":");
       
        nameLabel.fontSize = 30;
        nameLabel.font = "SimHei";
        nameLabel.color = "#ff9900";
        this.addChild(nameLabel);

        var imageBg = new Laya.Button("Room/image_lvseduihuakuang-.png");
        imageBg.severId = _content.severId;
        imageBg.stateNum = 1;
        imageBg.sizeGrid = "20,35,20,20";
        imageBg.width = 200;
        imageBg.height = 60;
        imageBg.anchorX = 0.5;
        imageBg.y = 10;
        imageBg.x = 86 + 20 +nameLabel.width;
        imageBg.scaleX = -1;
       
        imageBg.on(Laya.Event.CLICK,this,this.onSoundClick);

        //增加气泡图片
        this.addChild(imageBg);
        //语音标志
        var yuyinImg = new Laya.Image("Room/img_duihua_yuyin.png");
        yuyinImg.x = imageBg.width - 80;
        yuyinImg.y = 10;
        // yuyinImg.scaleX = -1;
        imageBg.addChild(yuyinImg);


        //时间
        var talkTime = Math.round(parseInt(_content.time)/1000);
        var soundTime = new Laya.Label(talkTime +"''");
        soundTime.fontSize = 25;
        soundTime.x = imageBg.x + imageBg.width /2 + 15;
        soundTime.y = imageBg.y + 20;
        this.addChild(soundTime);

    }

    //播放语言
    _proto.onSoundClick = function(e){
        e.currentTarget.gray = true;
        playVoice( e.currentTarget.severId);   
        Gamelog("-------播放语言");
    }

    //获得表情个数
    _proto.matchFaceStringNum = function(_data){
        var newChatStr = _data;
        var num = 0;
         //将表情文本替换为html图片样式
        for(var i=0; i<FaceNameArray.length; i++){
            var name = FaceNameArray[i].substr(1,FaceNameArray[i].length -2);
            var reg=new RegExp("\\["+name+"\\]","g"); 
            if(newChatStr.match(reg) !=null){
                var nameNum = this.GetStringNum(name) + 1;
                // Gamelog("---match = "+newChatStr.match(reg).length+",nameNum="+nameNum);
                num += newChatStr.match(reg).length * nameNum;
            }

        }
        return num;
    }

    /** 将聊天内容中的头像进行html格式替换 **/
     _proto.getFaceHtmlText = function(_data){
         var newChatStr = _data;
         
         //将表情文本替换为html图片样式
        for(var i=0; i<FaceNameArray.length; i++){
            var name = FaceNameArray[i].substr(1,FaceNameArray[i].length -2);
            var reg=new RegExp("\\["+name+"\\]","g"); 
            var imgHtml = "<img src='Face/emoji-"+(i+1)+".png' style='width:45px; height:45px'></img>";
            newChatStr = newChatStr.replace(reg,imgHtml);
            // Gamelog("-----name="+newChatStr);
        }
        return newChatStr;
     }
     //获得字符个数
     _proto.GetStringNum = function(name){
        var nameNum = 0;
        for(var i=0; i<name.length; i++){
            var reg = /^[0-9a-zA-Z]*$/g;
            if (reg.test(name[i])){
                // Gamelog("----是字母数字");
                nameNum += 1;
            }else{
                nameNum += 2;
            }
            
        }
        return nameNum;
    }

    return ChatLineView;
})(Laya.Box);