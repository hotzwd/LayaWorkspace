function ParseMain()
{
	console.log("-----ParseMain");

    var jsonName = "images_3";
    var parseObject = Laya.loader.getRes("res/"+jsonName+".json");

    console.log("-----ParseMain getRes");

    var xmlString = createXML();

    var xmlDOM = createXMLDOM();
    var plistElement = xmlDOM.createElement('plist');
    plistElement.setAttribute('version', '1.0');

    var dictElement1 = xmlDOM.createElement('dict');
    var keyElement1 = xmlDOM.createElement('key');
    keyElement1.textContent = "frames";
    dictElement1.appendChild(keyElement1);

    var dictElement2 = xmlDOM.createElement('dict');

    for (var keyImg in parseObject.frames) {
        var t_framObject = parseObject.frames[keyImg];

        //----名称
        var t_keyName = xmlDOM.createElement('key');
        t_keyName.textContent = keyImg+".png";
        dictElement2.appendChild(t_keyName);

        //----属性
        var t_dict = xmlDOM.createElement('dict');
        
        //坐标
        var t_keyFrame = xmlDOM.createElement('key');
        t_keyFrame.textContent = "frame";
        t_dict.appendChild(t_keyFrame);

        var t_stringFrame = xmlDOM.createElement('string');
        var t_framAtt = t_framObject["frame"];

        t_stringFrame.textContent ="{{"+t_framAtt.x+","+t_framAtt.y+"},{"+t_framAtt.w+","+t_framAtt.h+"}}";
        t_dict.appendChild(t_stringFrame);

        // dictElement2.appendChild(t_dict);

        //大小
        var t_keySourceSize = xmlDOM.createElement('key');
        t_keySourceSize.textContent = "sourceSize";
        t_dict.appendChild(t_keySourceSize);

        var t_stringSourceSize = xmlDOM.createElement('string');
        t_stringSourceSize.textContent ="{"+t_framAtt.w+","+t_framAtt.h+"}";
        t_dict.appendChild(t_stringSourceSize);

        //旋转
        var t_keyColorRotated = xmlDOM.createElement('key');
        t_keyColorRotated.textContent = "rotated";
        t_dict.appendChild(t_keyColorRotated);

        var t_falseRotated = xmlDOM.createElement('false');
        t_dict.appendChild(t_falseRotated);

        //颜色大小
        var t_keyColorRect = xmlDOM.createElement('key');
        t_keyColorRect.textContent = "sourceColorRect";
        t_dict.appendChild(t_keyColorRect);

        var t_stringColorRect = xmlDOM.createElement('string');
        t_stringColorRect.textContent ="{{0,0},{"+t_framAtt.w+","+t_framAtt.h+"}}";
        t_dict.appendChild(t_stringColorRect);


        dictElement2.appendChild(t_dict);


    }
    dictElement1.appendChild(dictElement2);

    //图集源文件
    var keyElement2 = xmlDOM.createElement('key');
    keyElement2.textContent = "metadata";
    dictElement1.appendChild(keyElement2);

    var dictElement3 = xmlDOM.createElement('dict');
    //格式
    var keyElementFormat = xmlDOM.createElement('key');
    keyElementFormat.textContent = "format";
    dictElement3.appendChild(keyElementFormat);

    var integerElementFormat = xmlDOM.createElement('integer');
    integerElementFormat.textContent = "2";
    dictElement3.appendChild(integerElementFormat);

    //图片名称
    var keyElementName = xmlDOM.createElement('key');
    keyElementName.textContent = "realTextureFileName";
    dictElement3.appendChild(keyElementName);

    var stringElementName = xmlDOM.createElement('string');
    stringElementName.textContent = jsonName+".png";
    dictElement3.appendChild(stringElementName);

    //图片大小
    var keyElementSize = xmlDOM.createElement('key');
    keyElementSize.textContent = "size";
    dictElement3.appendChild(keyElementSize);

    var stringElementSize = xmlDOM.createElement('string');
    stringElementSize.textContent = "{1024,2048}";
    dictElement3.appendChild(stringElementSize);

    dictElement1.appendChild(dictElement3);

    plistElement.appendChild(dictElement1);
    xmlDOM.appendChild(plistElement);
    xmlString = parserXMLToString(xmlDOM);

    console.log("-----ParseMain ="+xmlString);
}

function createXMLDOM() {
    var xmlDOM;
    if (window.ActiveXObject) {
        xmlDOM = new ActiveXObject('Microsoft.XMLDOM');
    } else if (document.implementation
            && document.implementation.createDocument) {
        xmlDOM = document.implementation.createDocument('', '', null);
    } else {
        alert('您的浏览器不支持文档对象XMLDOM');
        return;
    }
    return xmlDOM;
}

/**
 * 创建XML 文件例子:
 * <graph>
 *     <set name='1' value='1'></set>
 *     <set name='2' value='2'></set>
 * </graph>
 */
function createXML() {
    var xmlDOM = createXMLDOM();
    if (xmlDOM) {
        var graph = xmlDOM.createElement('graph');
        for (var i = 0; i < 2; i++) {
            var set_name_value = xmlDOM.createElement('set');
            set_name_value.setAttribute('name', i + 1);
            set_name_value.setAttribute('value', i + 1);
            set_name_value.textContent = i;
            graph.appendChild(set_name_value);
        }
        xmlDOM.appendChild(graph);
        return parserXMLToString(xmlDOM);
    }
    return;
}

function parserXMLToString(xmlDOM) {
    if (window.ActiveXObject) {
        return xmlDOM.xml;
    } else if (document.implementation
            && document.implementation.createDocument) {
        return new XMLSerializer().serializeToString(xmlDOM);
    }
}

