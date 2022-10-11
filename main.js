Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function takephoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captureimage"'+' src="'+data_uri+'">'
    });
}
console.log('ml5.version',ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Bs1MWVzhm/model.json", model_loaded);
function model_loaded(){
    console.log("Model has been loaded successfully");
}
var prediction_1="";
var prediction_2="";
function speak(){
    var synth= window.speechSynthesis;
    speak_1="The first prediction is"+prediction_1;
    speak_2="The second prediction is"+ prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_1+speak_2);
    synth.speak(utterthis);
}
function predict(){
    img=document.getElementById("captureimage");
    classifier.classify(img,gotResults);
}
function gotResults(error,results){
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
            document.getElementById("result_emotion_name1").innerHTML=results[0].label;
            document.getElementById("result_emotion_name2").innerHTML=results[1].label; 
            prediction_1=results[0].label;
            prediction_2=results[1].label;
            speak();
            if(results[0].label=="happy"){
                document.getElementById("update_emoji1").innerHTML="&#128522;";
            }
            if(results[0].label=="sad"){
                document.getElementById("update_emoji1").innerHTML="&#128532;";
            }
            if(results[0].label=="angry"){
                document.getElementById("update_emoji1").innerHTML="&#128545;";
            }
            if(results[1].label=="happy"){
                document.getElementById("update_emoji2").innerHTML="&#128522;";
            }
            if(results[1].label=="sad"){
                document.getElementById("update_emoji2").innerHTML="&#128532;";
            }
            if(results[1].label=="angry"){
                document.getElementById("update_emoji2").innerHTML="&#128545;";
            }
        }
}