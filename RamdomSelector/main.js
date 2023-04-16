// window.onload = function(){
//     // alert("hi");
// };

let imageURL_Array = [
    "https://photo.518.com.tw/selfmedia/articles/1822/166184376108829.jpeg",
    "https://lordcat.tw/wp-content/uploads/2021/09/1631538408-378fce845ce05de4c29be3e870b50e13.jpg",
    "https://pic03.eapple.com.tw/siangnong/xn_i_img02.png",
    "https://tokyo-kitchen.icook.network/uploads/recipe/cover/372073/60ad2eda9638fa38.jpg"
];
var Kcals = [
    436.2,228,200,266
];

$(function(){
    $("input").on("click",function(){
        
        // alert("Hi");
        // $("h1").text("Hello");
        var numberOfListItem = $("li").length;
        // 3
        // 0 ~ 1 => 0 ~ 3
        var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        console.log(randomChildNumber);
        $("h1").text($("li").eq(randomChildNumber).text());
        $("h2").text(Kcals[randomChildNumber]+"Kcal/100g");
        // change image -> change image element's src
        $("img").attr("src",imageURL_Array[randomChildNumber]);
        //alert(Kcals[randomChildNumber]+"Kcal/100g");
    });
});