$(function(){
    var currentQuiz = null;
    $("#startButton").on("click",function(){
        if(currentQuiz==null){
            currentQuiz=0;
            $("#question").text(questions[0]);
            $("#options").empty();
            for(var i = 0; i<answers.length;i++){
            $("#options").append(`<input name='options' type='radio'
                value='${answers[i][1]}'><label>${answers[i][0]}</label><br><br>`);
            }
            $("#startButton").attr("value","Next");
            $("input[name='options']").on("click",function(){
                if (!$("input[name='options']:checked").val()) {
                    alert("請選擇一個答案!");
                    return false;
                }
                selectedAnswer[currentQuiz] = $(this).val();
            });
        }
        else{
            if(currentQuiz==30)
            {
                //Tiger , PeaCock , Koala , Owl , Chameleon
                finalscores["Tiger"]=Number(selectedAnswer[4])+Number(selectedAnswer[9])+Number(selectedAnswer[13])+Number(selectedAnswer[17])+Number(selectedAnswer[23])+Number(selectedAnswer[29]);
                finalscores["PeaCock"]=Number(selectedAnswer[2])+Number(selectedAnswer[5])+Number(selectedAnswer[12])+Number(selectedAnswer[19])+Number(selectedAnswer[21])+Number(selectedAnswer[28]);
                finalscores["Koala"]=Number(selectedAnswer[1])+Number(selectedAnswer[7])+Number(selectedAnswer[14])+Number(selectedAnswer[16])+Number(selectedAnswer[24])+Number(selectedAnswer[27]);
                finalscores["Owl"]=Number(selectedAnswer[0])+Number(selectedAnswer[6])+Number(selectedAnswer[10])+Number(selectedAnswer[15])+Number(selectedAnswer[20])+Number(selectedAnswer[25]);
                finalscores["Chameleon"]=Number(selectedAnswer[3])+Number(selectedAnswer[8])+Number(selectedAnswer[11])+Number(selectedAnswer[18])+Number(selectedAnswer[22])+Number(selectedAnswer[26]);

                $("#question").text("各項總分");
                $("#options").empty();
                for(var key in finalscores)
                $("#options").append(`${key} Score : ${finalscores[key]}<br><br>`);
            }

                    
            else{  
                //檢查是否有選擇答案
                 if(selectedAnswer[currentQuiz]==0)
                    {
                        alert("請選擇一個答案!");
                        return false;
                    }

                    //指定下一題，原始資料從1開始，所以要-1
                     currentQuiz++;
                    //顯示新的題目
                    $("#question").text(questions[currentQuiz]);
                    $("#options").empty();
               

                    for(var i = 0; i<answers.length;i++){
                        $("#options").append(`<input name='options' type='radio'
                        value='${answers[i][1]}'><label>${answers[i][0]}</label><br><br>`);
                    }
                    //計算option 的值丟到selectedAnswer
                    $("input[name='options']").on("click",function(){
                    selectedAnswer[currentQuiz] = $(this).val();

                    });                    

            }
                    }
                    return false;
                }
            );
        
    });
