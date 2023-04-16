let topic = [
    "課程介紹",
    "環境安裝&Lab1",
    "國定假日",
    "Lab2&3",
    "Lab4"
];

var startDate = new Date();
function setMonthAndDay(startMonth,startDay){
    startDate.setMonth(startMonth-1,startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}
function renderTable(){
    var newdate = new Date(document.getElementById("startDateInput").value);

    setMonthAndDay(newdate.getMonth()+1,newdate.getDate());
    $("#courseTable").empty();

    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");

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
  }



//setMonthAndDay(newDate.getMonth()+1,newDate.getDate());


//setMonthAndDay(12,14);