/**
 * 打印普通日志
 */
function Gamelog(param){
    if(GameLogVisible){
        if(typeof param === "undefined"){
            if(GameInQQ){
                BK.Console.error(param);
            }else{
                console.error(param);
            }
        }
        if(GameInQQ){
            BK.Console.log(param);
        }else{
            console.log(param);
        }
    }
}

/**
 * 打印错误日志
 */
function GameLogError(param){
    if(GameLogVisible){
        if(typeof param === "undefined"){
            if(GameInQQ){
                BK.Console.error(param);
            }else{
                console.error(param);
            }
        }
        if(GameInQQ){
            BK.Console.error(param);
        }else{
            console.error(param);
        }
    }
}


function GameLogObject(obj) {  
    var description = "";  
    for (var i in obj) {  
        description += i + " = " + obj[i] + "\n";  
    }  
    
    if(GameInQQ){
        BK.Console.log(description);
    }else{
        console.log(description);
    }
}  
