var SpeechRecognition = window.webkitSpeechRecognition;    
var recognition = new SpeechRecognition();  

function start() {
    document.getElementById("textarea").innerHTML = "";  
    document.getElementById("info").innerHTML = "wait for a moment......";          
    recognition.start(); 
    var img=document.getElementById("cam");
    navigator.mediaDevices.getUserMedia({video:true})
    .then(stream=>{
        img.srcObject=stream;
        document.getElementById("info").innerHTML = "";
    }).catch(function(err){
       console.log(err);
       document.getElementById("info").innerHTML = "Error , Try Again";
    });
}    
    recognition.onresult = function(event) {   
        var Content = event.results[0][0].transcript;      
        document.getElementById("textarea").innerHTML = Content;     
        console.log(Content);       
        if(Content =="take my selfie")       
        {         
            console.log("taking selfie --- ");         
            speak();       
        } 
}   
function speak(){     
    var synth = window.speechSynthesis;      
    speak_data = "Taking your selfie in 5 seconds";      
    var utterThis = new SpeechSynthesisUtterance(speak_data);      
    synth.speak(utterThis);
    
    //Webcam.attach(camera);

    setTimeout(function(){
        take_snapshot();
    },5000);
    save();

}

link_to_download="";

camera=document.getElementById("camera");

//Webcam.set({
//    width:360,
//    height:250,
//    image_format:'jpeg',
//    jpeg_quality:90
//});

function take_snapshot() {
    //Webcam.snap(function(data_url){
    //    document.getElementById("result").innerHTML='<img id="selfie_image" src="'+data_url+'"/>'
    //});   
    var canvas=document.getElementById("camImg");
    var video=document.getElementById("cam");
    var ctx=canvas.getContext("2d");
    link_to_download=video;
    ctx.drawImage(video,0,0,350,150);
}

function save() {
    link=document.getElementById("link");
    image=document.getElementById("download");
    link.href=link_to_download;
    link.click();
}