
function utf8Decode(buffer: Buffer, length: number): string {
    let result = "";
    let i = 0;
    while (i < length) {
        let byte1 = buffer.getUint8(i);
        if (byte1 === 0) break;

        // 单字节字符（ASCII）
        if (byte1 < 0x80) {
            result += String.fromCharCode(byte1);
            i++;
        }
        // 双字节字符（不常见，可选支持）
        else if ((byte1 & 0xe0) === 0xc0 && i + 1 < length) {
            let byte2 = buffer.getUint8(i + 1);
            let code = ((byte1 & 0x1f) << 6) | (byte2 & 0x3f);
            result += String.fromCharCode(code);
            i += 2;
        }
        // 三字节字符（中文常见）
        else if ((byte1 & 0xf0) === 0xe0 && i + 2 < length) {
            let byte2 = buffer.getUint8(i + 1);
            let byte3 = buffer.getUint8(i + 2);

            // 检查是否为合法 UTF-8 中文编码范围
            if ((byte2 & 0xc0) === 0x80 && (byte3 & 0xc0) === 0x80) {
                let code = ((byte1 & 0x0f) << 12) |
                    ((byte2 & 0x3f) << 6) |
                    (byte3 & 0x3f);

                // 过滤非法字符（你可以注释此行调试）
                if (code >= 0x4E00 && code <= 0x9FFF) {
                    result += String.fromCharCode(code);
                } else {
                    // 不在常用中文区，可尝试输出方块或问号
                    result += "?";
                }
                i += 3;
            } else {
                i++; // 避免死循环
            }
        }
        // 其他非法字符或四字节编码（跳过）
        else {
            i++;
        }
    }
    return result;
}


// 初始指令
function sendOrder (addr: number, skew: number) {
    let buf = pins.createBuffer(1);
buf[0] = addr + skew
    pins.i2cWriteBuffer(ADDRESS, buf)
}
let code2 = 0
let ADDRESS = 36
enum enColor {
    R = 0,
    G = 1,
    B = 2
}
enum enAiType {
    //% block="Color"
    type1 = 0,
    //% block="Blob"
    type2 = 1,
    //% block="Apriltag"
    type3 = 2,
    //% block="Line"
    type4 = 3,
    //% block="20Class"
    type5 = 4,
    //% block="QRCode"
    type6 = 5,
    //% block="FaceAttr"
    type7 = 6,
    //% block="FaceID"
    type8 = 7,
    //% block="Learning"
    type9 = 8,
    //% block="Card"
    type10 = 9
}
enum enFindColor {
    //% block="Red"
    type1 = 1,
    //% block="Green"
    type2 = 2,
    //% block="Blue"
    type3 = 3,
    //% block="Yellow"
    type4 = 4,
    //% block="Black"
    type5 = 5,
    //% block="White"
    type6 = 6
}
enum enFindColorPos {
    X=0,
    Y=1,
    W=2,
    H=3
}
enum enFind20Class {
    //% block="(0)Airplane"
    type0 = 0,
    //% block="(1)Bicycle"
    type1 = 1,
    //% block="(2)Bird"
    type2 = 2,
    //% block="(3)Boat"
    type3 = 3,
    //% block="(4)Bottle"
    type4 = 4,
    //% block="(5)Bus"
    type5 = 5,
    //% block="(6)Car"
    type6 = 6,
    //% block="(7)Cat"
    type7 = 7,
    //% block="(8)Chair"
    type8 = 8,
    //% block="(9)Cow"
    type9 = 9,
    //% block="(10)Dining Table"
    type10 = 10,
    //% block="(11)Dog"
    type11 = 11,
    //% block="(12)House"
    type12 = 12,
    //% block="(13)Motorcycle"
    type13 = 13,
    //% block="(14)Person"
    type14 = 14,
    //% block="(15)Potted Plant"
    type15 = 15,
    //% block="(16)Sheep"
    type16 = 16,
    //% block="(17)Sofa"
    type17 = 17,
    //% block="(18)Ship"
    type18 = 18,
    //% block="(19)Television"
    type19 = 19,
}
enum enFaceNum{
    //% block="Face 0"
    type1 = 2,
    //% block="Face 1"
    type2 = 3,
    //% block="Face 2"
    type3 = 4,
    //% block="Face 3"
    type4 = 5,
}
enum enLearnClass {
    //% block="Class 0"
    type1 = 0,
    //% block="Class 1"
    type2 = 1
    /*
    //% block="类别2"
    type3 = 2,
    //% block="类别3"
    type4 = 3*/
    
}
enum enCardClass{
    //% block="Turn Right"
    type0 = 4,
    //% block="Turn Left"
    type1 = 1,
    //% block="Stop"
    type2 = 2,
    //% block="Honk"
    type3 = 5,
    //% block="Green Light"
    type4 = 0,
    //% block="Red Light"
    type5 = 3,
    //% block="Target"
    type6 = 6
}
enum enPosition{
    //% block="Top"
    type1 = 3,
    //% block="Middle"
    type2 = 2,
    //% block="Bottom"
    type3 = 1,
}
enum enFindFaceStats{
    // //% block="男性"
    // type1 = 0,
    //% block="Mouth Open"
    type2 = 1,
    //% block="Smiling"
    type3 = 2,
    //% block="Wearing Glasses"
    type4 = 3,
}
enum enOpen{
    //% block="On"
    type0 = 1,
    //% block="Off"
    type1 = 0,
}
enum enFXzMode {
    //% block="Not Started"
    type0 = 0,
    //% block="Connecting"
    type1 = 1,
    //% block="Standby"
    type2 = 2,
    //% block="Listening"
    type3 = 3,
    //% block="Speaking"
    type4 = 4,
    //% block="Network Config"
    type5 = 5
}
enum enFXzMoveType {
    //% block="Forward"
    type1 = 1,
    //% block="Backward"
    type2 = 2,
    //% block="Turn Left"
    type3 = 3,
    //% block="Turn Right"
    type4 = 4,
    //% block="Stop"
    type5 = 5
}
enum enXY {
    X = 0,
    Y = 1,
}
enum enButton{
    //% block="1"
    type1 = 0x20,
    //% block="2"
    type2 = 0x10,
    //% block="3"
    type3 = 0x08,
    //% block="4"
    type4 = 0x04,
    //% block="5"
    type5 = 0x02,
    //% block="6"
    type6 = 0x01,
}
enum enKeyboard {
    W = 0x08,
    A = 0x04,
    S = 0x02,
    D = 0x01,
}
//% color="#5c7cfa"  block="AI_Vision"
namespace AI_Vision {
    //% blockId=SetMode 
    //% block="Switch vision module to %choicetype"
    //%  weight=101
    export function SetMode(choicetype: enAiType): void {
        let buf2 = pins.createBuffer(2);
        buf2[0] = 0
        buf2[1] = choicetype
        pins.i2cWriteBuffer(ADDRESS, buf2);
    }

    //% blockId=GetMode 
    //% block="Current mode"
    //%  weight=100
    export function GetMode(): number {
        sendOrder(0, 0)
        let GetBuff = pins.createBuffer(1)
        GetBuff = pins.i2cReadBuffer(ADDRESS, 1)
        return GetBuff.getNumber(NumberFormat.UInt8BE, 0)
        return 0
    }

    //--------------------------颜色识别----------------------
    //% blockId=GetColor
    //% block="Recognized color %choiceColor value"
    //% group="Color" weight=3
    export function GetColor(choiceColor: enColor): number {
        sendOrder(15, 0)
        let GetBuff2 = pins.createBuffer(3)
        GetBuff2 = pins.i2cReadBuffer(ADDRESS, 3)
        return GetBuff2.getNumber(NumberFormat.UInt8BE, choiceColor)
    }

    //--------------------------色块追踪----------------------
    //% blockId=SetFindColor
    //% block="Set tracking color %choicefindcolor"
    //% group="Blob" weight=3
    export function SetFindColor(choicefindcolor: enFindColor): void {
        let buf3 = pins.createBuffer(2);
        buf3[0] = 30 //39
        buf3[1] = choicefindcolor
        pins.i2cWriteBuffer(ADDRESS, buf3);
    }

    //% blockId=getFindColor
    //% block="Tracked target color?"
    //% group="Blob" weight=2
    export function getFindColor(): boolean {
        sendOrder(30,1)
        let GetBuff22 = pins.createBuffer(1)
        GetBuff22 = pins.i2cReadBuffer(ADDRESS,1)
     
        if (GetBuff22.getNumber(NumberFormat.UInt8BE, 0) == 0){
            return false;
        }else{
            return true;
        }  
    }

    //% blockId=getFindColorPos
    //% block="Get color block position info %choicefindcolorpos"
    //% group="Blob" weight=1
    export function getFindColorPos(choicefindcolorpos: enFindColorPos): number {
        sendOrder(30, 2)

        let GetBuff222 = pins.createBuffer(8)
        GetBuff222 = pins.i2cReadBuffer(ADDRESS, 8);
        let Hbuf = GetBuff222.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2)
        let Lbuf = GetBuff222.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 +1)
        let combinedData = ((Hbuf & 0xFF) << 8) | (Lbuf & 0xFF);
        return combinedData
    }


    //--------------------------标签识别----------------------
    //% blockId=getFindTagNum
    //% block="Number of recognized tags"
    //% group="Apriltag" weight=4
    export function getFindTagNum(): number {
        sendOrder(45, 0)//63
        let GetBuff3 = pins.createBuffer(1)
        GetBuff3 = pins.i2cReadBuffer(ADDRESS, 1)
        return GetBuff3.getNumber(NumberFormat.UInt8BE, 0)
    }

    //% blockId=getFindTagID
    //% block="Recognized tag content"
    //% group="Apriltag" weight=3
    export function getFindTagID(): number {
        sendOrder(45, 1)
        let GetBuff4 = pins.createBuffer(12)
        GetBuff4 = pins.i2cReadBuffer(ADDRESS, 12)
        let Hbuf2 = GetBuff4.getNumber(NumberFormat.UInt8BE, 0)
        let Lbuf2 = GetBuff4.getNumber(NumberFormat.UInt8BE, 1)
        let combinedData2 = ((Hbuf2 & 0xFF) << 8) | (Lbuf2 & 0xFF);
        return combinedData2;//GetBuff4.getNumber(NumberFormat.UInt8BE, 0)
    }

    //% blockId=getFindTagRot
    //% block="Tag rotation angle"
    //% group="Apriltag" weight=2
    export function getFindTagRot(): number {
        sendOrder(45, 1)
        let GetBuff5 = pins.createBuffer(12)
        GetBuff5 = pins.i2cReadBuffer(ADDRESS, 63 + 1)
        let Hbuf22 = GetBuff5.getNumber(NumberFormat.UInt8BE,  2)
        let Lbuf22 = GetBuff5.getNumber(NumberFormat.UInt8BE,  3)
        let combinedData22 = ((Hbuf22 & 0xFF) << 8) | (Lbuf22 & 0xFF);
        return combinedData22
    }

    //% blockId=getFindTagPos
    //% block="Recognized tag position info %choicefindcolorpos"
    //% group="Apriltag" weight=1
    export function getFindTagPos(choicefindcolorpos: enFindColorPos): number {
        sendOrder(45, 1)
        let GetBuff52 = pins.createBuffer(12)
        GetBuff52 = pins.i2cReadBuffer(ADDRESS, 63 + 1)
        let Hbuf23 = GetBuff52.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 + 4)
        let Lbuf23 = GetBuff52.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 + 5)
        let combinedData23 = ((Hbuf23 & 0xFF) << 8) | (Lbuf23 & 0xFF);
        return combinedData23
    }


    //--------------------------线条识别----------------------
    //% blockId=getFindLine
    //% block="Is a line recognized?"
    //% group="Line" weight=3
    export function getFindLine(): boolean {
        sendOrder(60, 0)//87
        let GetBuff6 = pins.createBuffer(1)
        GetBuff6 = pins.i2cReadBuffer(ADDRESS, 1)
        if (GetBuff6.getNumber(NumberFormat.UInt8BE, 0) == 0) {
            return false;
        } else {
            return true;
        }
    }

    //% blockId=getFindLinePos
    //% block="Get line position info at %choiceposition %choicefindcolorpos"
    //% group="Line" weight=1
    export function getFindLinePos(choiceposition: enPosition,choicefindcolorpos: enFindColorPos): number {
        sendOrder(60, choiceposition)
        let GetBuff7 = pins.createBuffer(8)
        GetBuff7 = pins.i2cReadBuffer(ADDRESS, 8);
        let Hbuf3 = GetBuff7.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2)
        let Lbuf3 = GetBuff7.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 + 1)
        let combinedData3 = ((Hbuf3 & 0xFF) << 8) | (Lbuf3 & 0xFF);
        return combinedData3
    }

    //--------------------------20类物体识别----------------------
    //% blockId=getFind20ClassNum
    //% block="Number of recognized objects"
    //% group="20Class" weight=3
    export function getFind20ClassNum(): number {
        sendOrder(75, 0)//111
        let GetBuff8 = pins.createBuffer(1)
        GetBuff8 = pins.i2cReadBuffer(ADDRESS, 1);
        return GetBuff8.getNumber(NumberFormat.UInt8BE, 0)
    }

    //% blockId=getFind20ClassId
    //% block="Recognized object %choicefind20class?"
    //% group="20Class" weight=2
    export function getFind20ClassId( choicefind20class: enFind20Class): boolean {
        sendOrder(75, 0)
        let num = pins.i2cReadBuffer(ADDRESS, 1);
        let readnum = num.getNumber(NumberFormat.UInt8BE, 0)
        for (let i = 1; i <= readnum; i++) {
            sendOrder(75,i)
            let GetBuff9 = pins.i2cReadBuffer(ADDRESS, 9);
            if (GetBuff9.getNumber(NumberFormat.UInt8BE, 0) == choicefind20class) {
                return true
            }
        }
        return false
    }

    //% blockId=getFind20ClassPos
    //% block="Recognized object position info %choicefindcolorpos"
    //% group="20Class" weight=1
    export function getFind20ClassPos(choicefindcolorpos: enFindColorPos): number {
        sendOrder(75, 1)
        let GetBuff10 = pins.createBuffer(9)
        GetBuff10 = pins.i2cReadBuffer(ADDRESS, 9)
        let Hbuf4 = GetBuff10.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 + 1)
        let Lbuf4 = GetBuff10.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 + 2)
        let combinedData4 = ((Hbuf4 & 0xFF) << 8) | (Lbuf4 & 0xFF);
        return combinedData4
    }

    //--------------------------二维码识别----------------------
    //% blockId=getFindQr
    //% block="Is a QR code recognized?"
    //% group="QRCode" weight=3
    export function getFindQr(): boolean {
        sendOrder(90, 0)//135
        let GetBuff11 = pins.createBuffer(1)
        GetBuff11 = pins.i2cReadBuffer(ADDRESS, 1);
        if (GetBuff11.getNumber(NumberFormat.UInt8BE, 0) == 0){
            return false
        }
        return true
    }

    //% blockId=getFindQrID
    //% block="Recognized QR code content"
    //% group="QRCode" weight=2
    export function getFindQrID(): string {
        sendOrder(90, 1)
        let length = pins.i2cReadBuffer(ADDRESS, 1);
        let readlength = length.getNumber(NumberFormat.UInt8BE, 0);

        sendOrder(90, 3)
        let buffer = pins.i2cReadBuffer(ADDRESS, 50);

        return utf8Decode(buffer, readlength);
    }


    //% blockId=getFindQrPos
    //% block="Recognized QR code position info %choicefindcolorpos"
    //% group="QRCode" weight=1
    export function getFindQrPos(choicefindcolorpos: enFindColorPos): number {
        sendOrder(90, 2)
        let GetBuff13 = pins.createBuffer(8)
        GetBuff13 = pins.i2cReadBuffer(ADDRESS, 8)
        let Hbuf5 = GetBuff13.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 )
        let Lbuf5 = GetBuff13.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 + 1)
        let combinedData5 = ((Hbuf5 & 0xFF) << 8) | (Lbuf5 & 0xFF);
        return combinedData5
    }


    //--------------------------人脸属性----------------------
    //% blockId=getFindFace
    //% block="Number of detected faces"
    //% group="FaceAttr" weight=3
    export function getFindFace(): number {
        sendOrder(105, 0)//159
        let GetBuff14 = pins.createBuffer(1)
        GetBuff14 = pins.i2cReadBuffer(ADDRESS, 1);
        return GetBuff14.getNumber(NumberFormat.UInt8BE, 0)
    }

    //% blockId=getFindFacePos
    //% block="Detected %choicefacenum position info %choicefindcolorpos"
    //% group="FaceAttr" weight=2
    export function getFindFacePos(choicefacenum: enFaceNum, choicefindcolorpos: enFindColorPos): number {
        sendOrder(105, choicefacenum-1)
        let GetBuff15 = pins.createBuffer(8)
        GetBuff15 = pins.i2cReadBuffer(ADDRESS, 8)
        let Hbuf6 = GetBuff15.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2)
        let Lbuf6 = GetBuff15.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 + 1)
        let combinedData6 = ((Hbuf6 & 0xFF) << 8) | (Lbuf6 & 0xFF);
        return combinedData6
    }

    //% blockId=getFindFaceStats
    //% block="Is %choicefacenum %choicefindfacestats?"
    //% group="FaceAttr" weight=1
    export function getFindFaceStats(choicefacenum: enFaceNum, choicefindfacestats: enFindFaceStats): boolean {
        sendOrder(105, 3+choicefacenum)
        let GetBuff16 = pins.createBuffer(4)
        GetBuff16 = pins.i2cReadBuffer(ADDRESS, 4)
        if (GetBuff16.getNumber(NumberFormat.UInt8BE, choicefindfacestats)==1){
            return true
        }
        return false
    }


    //--------------------------人脸识别----------------------
    //% blockId=setFaceRecognition
    //% block="Learn current face"
    //% group="FaceID" weight=4
    export function setFaceRecognition(): void {
        let buf4 = pins.createBuffer(2);
        buf4[0] = 120 + 6
        buf4[1] = 1
        pins.i2cWriteBuffer(ADDRESS, buf4);
    }

    //% blockId=getFaceNum
    //% block="Number of recognized faces"
    //% group="FaceID" weight=3
    export function getFaceNum(): number {
        sendOrder(120, 0)//183
        let GetBuff17 = pins.createBuffer(1)
        GetBuff17 = pins.i2cReadBuffer(ADDRESS, 1);
        return GetBuff17.getNumber(NumberFormat.UInt8BE, 0)
    }

    //% blockId=getFaceRecognition
    //% block="Is a learned face detected?"
    //% group="FaceID" weight=2
    export function getFaceRecognition(): boolean {
        sendOrder(120, 1)//183
        let GetBuff162 = pins.createBuffer(1)
        GetBuff162 = pins.i2cReadBuffer(ADDRESS, 1);

        if (GetBuff162.getNumber(NumberFormat.UInt8BE, 0) == 0) {
            return false
        }
        return true
    }

    //% blockId=getFaceRecognitionPos
    //% block="Recognized %choicefacenum position info %choicefindcolorpos"
    //% group="FaceID" weight=1
    export function getFaceRecognitionPos(choicefacenum: enFaceNum, choicefindcolorpos: enFindColorPos): number {
        sendOrder(120, choicefacenum)
        let GetBuff172 = pins.createBuffer(9)
        GetBuff172 = pins.i2cReadBuffer(ADDRESS, 9)
        let Hbuf7 = GetBuff172.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 + 1)
        let Lbuf7 = GetBuff172.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 + 2)
        let combinedData7 = ((Hbuf7 & 0xFF) << 8) | (Lbuf7 & 0xFF);
        return combinedData7
    }

    //--------------------------深度学习----------------------
    /*
    //% blockId=setLearning
    //% block="对当前图像进行学习"
    //% group="深度学习" weight=3
    export function setLearning(): void {
        let buf5 = pins.createBuffer(2);
        buf5[0] = 135 //207
        buf5[1] = 1
        pins.i2cWriteBuffer(ADDRESS, buf5);
    }
    */
    //% blockId=getLearnClass
    //% block="Is %choiceLearnClass recognized?"
    //% group="Learning" weight=2
    export function getLearnClass(choiceLearnClass: enLearnClass): boolean {
        sendOrder(135, 1)
        let GetBuff18 = pins.createBuffer(1)
        GetBuff18 = pins.i2cReadBuffer(ADDRESS, 1);
        if (GetBuff18.getNumber(NumberFormat.UInt8BE, 0) == 1){
            sendOrder(135, 2)
            let GetBuff19 = pins.createBuffer(1)
            GetBuff19 = pins.i2cReadBuffer(ADDRESS, 1);
            if (GetBuff19.getNumber(NumberFormat.UInt8BE, 0) == choiceLearnClass){
                return true
            }
        }
        return false
    }
/*
    //% blockId=getLearnClassValue
    //% block="识别到 %choiceLearnClass 的可信度"
    //% group="深度学习" weight=1
    export function getLearnClassValue(choiceLearnClass: enLearnClass): number {
        sendOrder(135, 3)
        let GetBuff182 = pins.createBuffer(4)
        GetBuff182 = pins.i2cReadBuffer(ADDRESS, 4);
        return GetBuff182.getNumber(NumberFormat.UInt8BE, choiceLearnClass)
    }*/

    //--------------------------路标识别----------------------
    //% blockId=getCardNum
    //% block="Number of recognized card"
    //% group="Card" weight=3
    export function getCardNum(): number {
        sendOrder(150, 0)//231
        let GetBuff192 = pins.createBuffer(1)
        GetBuff192 = pins.i2cReadBuffer(ADDRESS, 1);
        return GetBuff192.getNumber(NumberFormat.UInt8BE, 0)
    }

    //% blockId=getCardClass
    //% block="Recognized card %cardClass?"
    //% group="Card" weight=2
    export function getCardClass(cardClass: enCardClass): boolean {
        sendOrder(150, 0)
        let GetBuff1922 = pins.createBuffer(1)
        GetBuff1922 = pins.i2cReadBuffer(ADDRESS, 1)
        if (GetBuff1922.getNumber(NumberFormat.UInt8BE, 0) > 0){
            sendOrder(150, 1)
            let GetBuff193 = pins.createBuffer(9)
            GetBuff193 = pins.i2cReadBuffer(ADDRESS, 9);
            if (GetBuff193.getNumber(NumberFormat.UInt8BE, 0) == cardClass) {
                return true
            }
        }
        return false
    }

    //% blockId=getCardPos
    //% block="Recognized card position info %choicefindcolorpos"
    //% group="Card" weight=1
    export function getCardPos(choicefindcolorpos: enFindColorPos): number {
        sendOrder(150, 1)
        let GetBuff194 = pins.createBuffer(9)
        GetBuff194 = pins.i2cReadBuffer(ADDRESS, 9);
        let Hbuf72 = GetBuff194.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 + 1)
        let Lbuf72 = GetBuff194.getNumber(NumberFormat.UInt8BE, choicefindcolorpos * 2 + 2)
        let combinedData72 = ((Hbuf72 & 0xFF) << 8) | (Lbuf72 & 0xFF);
        return combinedData72
    }

    //--------------------------对话模式----------------------
    //% blockId=getXzMode
    //% block="Current state is %choiceXzMode ?"
    //% group="AI Chat" weight=4
    export function getXzMode(choiceXzMode: enFXzMode): boolean {
        sendOrder(165, 4)
        let GetBuff = pins.createBuffer(1)
        GetBuff = pins.i2cReadBuffer(ADDRESS, 1);
        if (GetBuff.getNumber(NumberFormat.UInt8BE, 0) == choiceXzMode) {
            return true
        }
        return false
    }
    //% blockId=getXzMoveType
    //% block="Detected motion command %choiceXzMoveType ?"
    //% group="AI Chat" weight=3
    export function getXzMoveType(choiceXzMoveType: enFXzMoveType): boolean {
        sendOrder(165, 5)
        let GetBuff = pins.createBuffer(2)
        GetBuff = pins.i2cReadBuffer(ADDRESS, 2);
        if (GetBuff.getNumber(NumberFormat.UInt8BE, 0) == choiceXzMoveType) {
            return true
        }
        return false
    }
    //% blockId=getXzMoveSpeed
    //% block="Detected motion speed"
    //% group="AI Chat" weight=2
    export function getXzMoveSpeed(): number {
        sendOrder(165, 5)
        let GetBuff = pins.createBuffer(2)
        GetBuff = pins.i2cReadBuffer(ADDRESS, 2);
        return GetBuff.getNumber(NumberFormat.UInt8BE, 1)
    }
    //% blockId=getCustom
    //% block="Detected custom command"
    //% group="AI Chat" weight=1
    export function getCustom(): number {
        sendOrder(165, 6)
        let GetBuff = pins.createBuffer(1)
        GetBuff = pins.i2cReadBuffer(ADDRESS, 1);
        return GetBuff.getNumber(NumberFormat.UInt8BE, 0)
    }

    //--------------------------WIFI图传----------------------
    //% blockId=getWIFIJoystick
    //% block="Get joystick position %choiceXY"
    //% group="WiFi Stream" weight=3
    export function getWIFIJoystick(choiceXY: enXY): number {
        sendOrder(165, 7)
        let buf = pins.i2cReadBuffer(ADDRESS, 2)
        let v = buf.getNumber(NumberFormat.UInt8BE, choiceXY)
        if (v > 127) {
            v = v - 256
        }
        return v
    }

    //% blockId=getWIFIButton
    //% block="Button %choiceButton pressed ?"
    //% group="WiFi Stream" weight=2
    export function getWIFIButton(choiceButton: enButton): boolean {
        sendOrder(165, 8)
        let GetBuff = pins.createBuffer(1)
        GetBuff = pins.i2cReadBuffer(ADDRESS, 1);
        return !!(GetBuff.getNumber(NumberFormat.Int8BE, 0) & choiceButton)
    }


    //% blockId=getWIFIKeyboard
    //% block="Keyboard %choiceKeyboard pressed ?"
    //% group="WiFi Stream" weight=1
    export function getWIFIKeyboard(choiceKeyboard: enKeyboard): boolean {
        sendOrder(165, 9)
        let GetBuff = pins.createBuffer(1)
        GetBuff = pins.i2cReadBuffer(ADDRESS, 1);
        return !!(GetBuff.getNumber(NumberFormat.UInt8BE, 0) & choiceKeyboard)
    }


    //--------------------------设置----------------------
    //% blockId=openfilllight
    //% block="%open fill light"
    //% group="Settings" weight=4
    export function openfilllight(open: enOpen): void {
        let buf24 = pins.createBuffer(2);
        buf24[0] = 180 + 1
        buf24[1] = open
        pins.i2cWriteBuffer(ADDRESS, buf24);
    }
    //% blockId=setfilllight
    //% block="Set fill light brightness %light"
    //% light.min=0 light.max=10 light.defl=0  
    //% group="Settings" weight=3
    export function setfilllight(light: number): void {
        light = Math.clamp(0, 10, light)
        let buf24 = pins.createBuffer(2);
        buf24[0] = 180 + 0
        buf24[1] = light
        pins.i2cWriteBuffer(ADDRESS, buf24);
    }
    //% blockId=getfilllight
    //% block="Fill light brightness"
    //% group="Settings" weight=2
    export function getfilllight(): number {
        sendOrder(180, 0)
        let GetBuff20 = pins.createBuffer(1)
        GetBuff20 = pins.i2cReadBuffer(ADDRESS, 1);
        return GetBuff20.getNumber(NumberFormat.UInt8BE, 0)
    }
}
