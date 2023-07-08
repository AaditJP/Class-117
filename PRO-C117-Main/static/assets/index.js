var date = new Date()
let display_date= "Date:" + date.toLocaleDateString()

$(document).ready(function () {
    $("#display_date").html(display_date)
    $('#save_button').prop('disabled', true);
})

let predicted_emotion;
$(function () {
    $("#predict_button").click(function () {
        let input_data = {
            "text": $("#text").val()
        }
        $.ajax({
            type:'POST',
            url : "/predicted-emotion",
            data:JSON.stringify(input_data),
            dataType:"json",
            contentType:"application/json",
            success:function(result){
                predicted_emotion=rresult.data.predicted_emotion
                emo_url=result.data.predicted_emotion_img_url
                $("#prediction").html(predicted_emotion)
                $("#prediction").css("display","")
                $("#emo_img_url").attr('src',result.data.predicted_emotion_img_url)
                $("#emo_img_url").css("display","")

                
            
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
        });
    });
    $("#save_button").click(function () {
        save_data = {
            "date": display_date,
            "text": $("#text").val(),
            "emotion": predicted_emotion
        }
        $.ajax({
            type: 'POST',
            url: "/save-entry",
            data: JSON.stringify(save_data),
            dataType: "json",
            contentType: 'application/json',
            success: function () {
                alert("Your entry has been saved successfully!")
                window.location.reload()
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
        });

    });
})

