$(function(){
    
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>")
    var topicCount = topic.length;
    for(var x=0; x<topicCount;x++){
        $("#courseTable").append(
            "<tr>"+
            `<td>${x+1}</td>`+
            `<td>${startDate.getMonth()+1}/${startDate.getDate()}</td>`+
            `<td>${topic[x]}</td>`+
            "</tr>"
        );
        startDate.setDate(startDate.getDate()+7);
    }
    
});

