let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
let getSword = 0;
let player;
let currentPlay = 0;
let video1played=0;
const gridLength = 200;
//YouTube API ready
function onYouTubeIframeAPIReady() {
    console.log("123");
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: playList[currentPlay],
        playerVars: {
            autoplay: 0,
            control: 0,
            start: playTime[currentPlay][0],
            end: playTime[currentPlay][1],
            iv_load_policy: 3
        },
         events: {
             onReady: onPlayerReady,
             onStateChange: onPlayerStateChange
         }
    });
}

function onPlayerReady(event) {
    // $("#playButton").on("click", function () {
    //     $("h2").text(player.getVideoData().title);
    //     player.playVideo();
    // });

}
function onPlayerStateChange(event) {
    /*if (Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]) {
        if (currentPlay < playList.length - 1) {
            currentPlay++;
            player.loadVideoById({
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        }
        else {
            currentPlay=0;
            player.cueVideoById({
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
            $("h2").text("");
        }
    }
*/
}
function VP(videoNumber)//video 0 or 1
{

    console.log(123123);
    player.loadVideoById({
        videoId:playList[videoNumber],
        startSeconds:playTime[videoNumber][0],
        endSeconds:playTime[videoNumber][1],
        suggestedQuality:"large"
    });
    player.playVideo();
}
//initial
$(function () {
    //$("#talkBox").text("有時候右邊影片跑不出來 可能需要重整幾次才有");
    // 0: avaliable, 1: Mountain, 2: FinalStop, 3 : Enemy 4: treasure
    mapArray = [
        [0, 1, 1, 4],
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [3, 0, 0, 2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        x: 0,
        y: 0
    };

    imgMain.onload = function () {
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    };
    let sources = {
        Mountain: "images/material.png",
        Enemy: "images/Enemy.png",
        Sword: "images/sword.png",
        Flag: "images/flag.png"
    }
    function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            images[src] = new Image();
            images[src].onload = function () {
                if (++loadedImages >= numImages) {
                    callback(images);
                }
            };
            images[src].src = sources[src];
        }
    }
    // imgMountain = new Image();
    // imgMountain.src = "images/material.png";
    // imgEnemy = new Image();
    // imgEnemy.src = "images/Enemy.png";

    loadImages(sources, function (images) {
        for (let x in mapArray) {
            for (let y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    ctx.drawImage(images.Mountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                else if (mapArray[x][y] == 2) {
                    ctx.drawImage(images.Flag, 10, 10, 200, 200, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                else if (mapArray[x][y] == 3) {
                    ctx.drawImage(images.Enemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                }
                else if (mapArray[x][y]== 4){
                    ctx.drawImage(images.Sword, 50, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                }

            }
        }
    });

    // imgMountain.onload = function () {
    //     imgEnemy.onload = function () {
    //         for (let x in mapArray) {
    //             for (let y in mapArray[x]) {
    //                 if (mapArray[x][y] == 1) {
    //                     ctx.drawImage(imgMountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
    //                 }
    //                 else if (mapArray[x][y] == 3) {
    //                     ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
    //                 }
    //             }
    //         }
    //     }
    // }
});
// click event
$(document).on("keydown", function (event) {
    let targetImg, targetBlock, cutImagePositionX;
    //cutImagePositionX決定主角臉朝哪個方向
    targetImg = {
        "x": -1,
        "y": -1
    };
    targetBlock = {
        "x": -1,
        "y": -1
    };
    switch (event.code) {
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            //臉朝左
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;
            //臉朝上
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            //臉朝右
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            //臉朝下
            break;
        default:
            //其他按鍵不處理
            return;
    }
    if (targetImg.x <= 600 && targetImg.x >= 0 && targetImg.y <= 600 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }
    else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if (targetBlock.x != -1 && targetBlock.y != -1) {
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有山");
                break;
            case 2:
                $("#talkBox").text("抵達終點,請重整網頁");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
            case 3:
                if (getSword == 0) {
                    $("#talkBox").text("沒有打刀是打不贏他的");
                    VP(0);
                }
                else if(video1played==0){
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;
                    VP(1);
                    video1played=1;
                    $("#talkBox").text("The enemy is defeated");
                }
                else{
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;
                }
                break;
            case 4:
                if(getSword==0)
                {
                $("#talkBox").text("You got the sword!");
                getSword = 1;
                VP(2);
                }
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                break;
        }
    } else {
        $("#talkBox").text("邊界");
    }
    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    event.preventDefault();
});


