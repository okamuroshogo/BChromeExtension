//ロードが終わったら呼ばれる
//var imageBasePath = 'https://gitlab.planningdev.com/Camp_20160122/BChromeExtension/raw/master/images/';
var imageBasePath = 'https://gitlab.planningdev.com/Camp_20160122/BChromeExtension/raw/origin/feature_readme/images/';
//$(window).load(function () {
window.onload = function(){
    var url = location.href;
    //ページ内の画像を読み込む
    imgArray = document.getElementsByTagName( "img" );
    drawBImage(imgArray);
};

//B画像をそれぞれの要素に適用
function drawBImage(imgArray){
    var len = imgArray.length;
    for (var i=0 ; i < len; i++){
        var img = imgArray[0]; 
        if (img.complete) { synthesis(img); }
        else{
        img.onload = function() { synthesis(this); }
        }
    }
}

//Bの写真を合成する
function synthesis(img){
    //自分自身のコンテキスト-----
    var canvas = createCanvas(img);
    var ctx = createContext(canvas);
    //もとの画像をセット---------
    ctx.drawImage(img, 0, 0);
    //---------------------------
    //合成する画像---------------
    var bImage = new Image();                    
    bImage.src = bPhotoPath(99);
    bImage.onload = function(){
        var resize = reSizeImage(this,canvas);
        ctx.drawImage(this, canvas.width - resize.width, canvas.height - resize.height,resize.width,resize.height);
    }
    //---------------------------
    //もとのimg tagと入れ替える--
    img.parentNode.replaceChild(canvas, img);
    //---------------------------
}

//新しくキャンバスを作る
function createCanvas(img){
    // New Canvas----------------
    var canvas = document.createElement('canvas');
    canvas.width  = img.width;
    canvas.height = img.height;
    return canvas;
}

//キャンバスをもとにコンテキストを作る
function createContext(canvas){
     return canvas.getContext('2d');
}

//画像を比率がそのままでリサイズする
function reSizeImage(img,canvas){
    var imgW = img.width;
    var imgH = img.height;
    var canW = canvas.width;
    var canH = canvas.height;

    var subW = imgW - canW;
    var subH = imgH - canH;

    var w = 0;
    var h = 0;
    if (subW < 0 && subH < 0) {
        //そのまま入れる
        w = imgW;
        h = imgH;
    }else{
        if (subW > subH) {
            var ratio = canW / imgW;
            w = imgW * ratio; 
            h = imgH * ratio;
        }else{
            var ratio = canH / imgH;
            w = imgW * ratio;
            h = imgH * ratio;
        }
    }

    img.width = w;
    img.height = h;
    return img;
}

//Bの写真を状況に応じて返す
function bPhotoPath(num){
    var path_num = num;
    if (num == 99) {
       path_num = Math.floor( Math.random() * 10 ) ;
    }
    switch (path_num) {
    case 0: return imageBasePath + 'brian_body.png';
    case 1: return imageBasePath + 'brian_body.png';
    case 2: return imageBasePath + 'brian_laugh01.png';
    case 3: return imageBasePath + 'brian_laugh02.png';
    case 4: return imageBasePath + 'brian_laugh03.png';
    case 5: return imageBasePath + 'brian_hip01.png';
    case 6: return imageBasePath + 'brian_hip02.png';
    case 7: return imageBasePath + 'brian_naked01.png';
    case 8: return imageBasePath + 'brian_sand01.png';
    case 9: return imageBasePath + 'brian_sand02.png';
    default: return imageBasePath + 'brian_sand02.png'; 
    
    }
}

//ポアソン分布を使い境界線を無くしつつ合成する
function poissonConvert(context){
    // source image, destination image, mask image, callback function
    Poisson.load(srcImgName, dstImgName, maskImgName, function() {
        // max iteration, X offset, Y offset
        var result = Poisson.blend(100, 10, -20);
        // render to canvas
        context.putImageData(result, 0, 0);
    });
}


