var clickable = true;



var FunkPlayer = document.getElementById('FunkPlayer');
var MetalPlayer = document.getElementById('MetalPlayer');
var ExpPlayer = document.getElementById('ExpPlayer');
var plugInSFX = document.getElementById('plugInSFX');
var unplugSFX = document.getElementById('unplugSFX')
FunkPlayer.volume = .3
MetalPlayer.volume = .3
ExpPlayer.volume = .3
plugInSFX.volume = .3
unplugSFX.volume = .3


var FunkConDoc;
var MetalConDoc;
var ExpConDoc;
var FunkPlug;
var MetalPlug;
var ExpPlug; 
var FunkClicked = false;
var MetalClicked = false;
var ExpClicked = false;

var smallEye;
var largeEye;
var bodySVG;
var headSVG;
var Guitar;
var Ani = document.getElementById("Ani");
var Hair; 
var aniConDoc


//Ani animation vars
//Add idle animations
Ani.addEventListener("load", function () {
    aniConDoc = Ani.contentDocument; 
    smallEye = aniConDoc.getElementById('smallEye');
    largeEye = aniConDoc.getElementById('largeEye');
    bodySVG = aniConDoc.getElementById('Body');
    headSVG = aniConDoc.getElementById('Head');
    Guitar = aniConDoc.getElementById('Guitar')
    Hair = aniConDoc.getElementById('Hair');
    exposedEar = aniConDoc.getElementById('exposedEar');
    coveredEar = aniConDoc.getElementById('coveredEar');
    // put SVG hand ID into a JS variable
    smallEye.classList.add('smallEyeBlink');
    largeEye.classList.add('largeEyeBlink');
    bodySVG.classList.add('bodyIdle');
    headSVG.classList.add('headIdle');
    Guitar.classList.add('guitarIdle');
    Hair.classList.add('hairIdle');
    }
);

var funkTimer;
var metalTimer;
var expTimer;
var cycleCount = 0; 

/*
var inverval_timer;

//Time in milliseconds [1 second = 1000 milliseconds ]    
inverval_timer = setInterval(function() { 
    console.log("5 seconds completed");
}, 5000);
    
//IF you want to stop above timer
function stop_timer() {
    clearInterval(inverval_timer); 
}


LOOP THROUGH AND INCREASE A NUMBER FOR ANIMATION LOOPS
AFTER PLUG IS PULLED, ADD AN EVENT LISTENER FOR NUMBER CHANGED
IF NUMBER IS CHANGED, REMOVE CLASSES
*/


var speaker = document.getElementById('Amp');
var bumper
speaker.addEventListener("load", function () {
    speakerConDoc = speaker.contentDocument; 
    bumper = speakerConDoc.getElementById('speakerBump');
    // put SVG hand ID into a JS variable
    }
);

var FunkButton = document.getElementById('FunkRockImage');
var FunkButtonObj
var MetalButton = document.getElementById('MetalImage');
var MetalButtonObj
var ExpButton = document.getElementById('ExperimentalImage');
var ExpButtonObj
var controlText = document.querySelector('.controlTextOutput');





FunkButton.addEventListener("load", function () {
    FunkConDoc = FunkButton.contentDocument; 
    FunkPlug = FunkConDoc.getElementById("FunkRockPlug");
    FunkButtonObj = FunkConDoc.getElementById("FunkButtonObj");
    FunkButtonObj.addEventListener("click", FunkPlay);
    FunkButton.addEventListener("mouseover", FunkPlugHover);
    FunkButton.addEventListener("mouseout", FunkPlugHoverOff);
    // put SVG hand ID into a JS variable
    }
);

MetalButton.addEventListener("load", function () {
    MetalConDoc = MetalButton.contentDocument; 
    MetalPlug = MetalConDoc.getElementById("MetalPlug");
    MetalButtonObj = MetalConDoc.getElementById("MetalButtonObj");
    MetalButtonObj.addEventListener("click", MetalPlay);
    MetalButton.addEventListener("mouseover", MetalPlugHover);
    MetalButton.addEventListener("mouseout", MetalPlugHoverOff);
    // put SVG hand ID into a JS variable
    }
);

ExpButton.addEventListener("load", function () {
    ExpConDoc = ExpButton.contentDocument; 
    ExpPlug = ExpConDoc.getElementById("ExperimentalPlug");
    ExpButtonObj = ExpConDoc.getElementById("ExpButtonObj");
    ExpButtonObj.addEventListener("click", ExpPlay);
    ExpButton.addEventListener("mouseover", ExpPlugHover);
    ExpButton.addEventListener("mouseout", ExpPlugHoverOff);
    // put SVG hand ID into a JS variable
    }
);


function FunkPlay(){
    if (clickable == true){
        clickable = false;
    if ((MetalClicked == true) || (ExpClicked == true)){
        MetalPlug.classList.remove("pluggedIn");
        ExpPlug.classList.remove("pluggedIn");
        ExpClicked = false;
        MetalClicked = false;
        MetalPlayer.pause();
        ExpPlayer.pause();
        MetalPlayer.currentTime = 0;
        FunkPlayer.currentTime = 0;
        ExpPlayer.currentTime = 0;
        unplugSFX.play();

        cycleCount = -2;

        controlText.innerHTML = "Now playing:";
        bumper.classList.remove('funkBump'); 
        bumper.classList.remove('expBump'); 
        bumper.classList.remove('metalBump'); 
        setTimeout(() => {
            funkTimer = setInterval(function(){
                cycleCount ++;
                console.log(cycleCount);
                
                if (cycleCount == -1){
                    console.log('stopping animation');
    
                    headSVG.classList.remove("aniHeadFunk");
                    bodySVG.classList.remove('aniBodyFunk');
                    Guitar.classList.remove('guitarFunk');
                    Hair.classList.remove("hairFunk");
                    largeEye.classList.remove('largeEyeClose');
                    smallEye.classList.remove('smallEyeClose');
                    smallEye.classList.add('smallEyeBlink');
                    largeEye.classList.add('largeEyeBlink');
                    exposedEar.classList.remove('exposedEarFunk');
                    coveredEar.classList.remove('coveredEarFunk');
                    cycleCount = 0;
                    clearInterval(funkTimer); 
                }
            }, 708);
    
            FunkPlug.classList.add("pluggedIn");
            MetalPlug.classList.remove("pluggedIn");
            MetalClicked = false;
            ExpPlug.classList.remove("pluggedIn");
            ExpClicked = false;
            FunkPlug.classList.remove('plugHover');
            
            plugInSFX.play();
            FunkClicked = true;
            controlText.innerHTML = "Now playing: Forget It";
    
            headSVG.classList.add("aniHeadFunk");
            bodySVG.classList.add('aniBodyFunk');
            Guitar.classList.add('guitarFunk');
            Hair.classList.add("hairFunk");
            smallEye.classList.remove('smallEyeBlink');
            largeEye.classList.remove('largeEyeBlink');
            largeEye.classList.add('largeEyeClose');
            smallEye.classList.add('smallEyeClose');
            exposedEar.classList.add('exposedEarFunk');
            coveredEar.classList.add('coveredEarFunk');
            
            setTimeout(() => {
            bumper.classList.remove('expBump'); 
            bumper.classList.remove('metalBump'); 
            bumper.classList.add('funkBump'); 
            FunkPlayer.play();
            clickable = true;
            }, 300);  
          }, 750);

    }
    else if (FunkClicked == false){
        funkTimer = setInterval(function(){
            cycleCount ++;
            console.log(cycleCount);

            if (cycleCount == -1){
                console.log('stopping animation');

                headSVG.classList.remove("aniHeadFunk");
                bodySVG.classList.remove('aniBodyFunk');
                Guitar.classList.remove('guitarFunk');
                Hair.classList.remove("hairFunk");
                largeEye.classList.remove('largeEyeClose');
                smallEye.classList.remove('smallEyeClose');
                smallEye.classList.add('smallEyeBlink');
                largeEye.classList.add('largeEyeBlink');
                exposedEar.classList.remove('exposedEarFunk');
                coveredEar.classList.remove('coveredEarFunk');
                cycleCount = 0;
                clearInterval(funkTimer); 
            }
        }, 708);

        FunkPlug.classList.add("pluggedIn");
        MetalPlug.classList.remove("pluggedIn");
        MetalClicked = false;
        ExpPlug.classList.remove("pluggedIn");
        ExpClicked = false;
        FunkPlug.classList.remove('plugHover');
        
        plugInSFX.play();
        FunkClicked = true;
        controlText.innerHTML = "Now playing: Forget It";

        headSVG.classList.add("aniHeadFunk");
        bodySVG.classList.add('aniBodyFunk');
        Guitar.classList.add('guitarFunk');
        Hair.classList.add("hairFunk");
        smallEye.classList.remove('smallEyeBlink');
        largeEye.classList.remove('largeEyeBlink');
        largeEye.classList.add('largeEyeClose');
        smallEye.classList.add('smallEyeClose');
        exposedEar.classList.add('exposedEarFunk');
        coveredEar.classList.add('coveredEarFunk');
        
        setTimeout(() => {
        bumper.classList.remove('expBump'); 
        bumper.classList.remove('metalBump'); 
        bumper.classList.add('funkBump'); 
        FunkPlayer.play();
        clickable = true;
        }, 300);
        

    } else if (FunkClicked == true){
        FunkPlug.classList.remove("pluggedIn");
        FunkPlayer.pause();
        MetalPlayer.currentTime = 0;
        FunkPlayer.currentTime = 0;
        ExpPlayer.currentTime = 0;
        unplugSFX.play();
        FunkClicked = false;
        controlText.innerHTML = "Now playing:";
        bumper.classList.remove('funkBump'); 
        cycleCount = -2;
        setTimeout(() => {
            clickable = true;
        }, 500);
    }
    
};
};


function FunkPlugHover(){
    if (FunkClicked == false){
        FunkPlug.classList.add("plugHover");
    };
};

function FunkPlugHoverOff(){
    if (FunkClicked == false){
        FunkPlug.classList.remove("plugHover");
    };
};

function MetalPlay(){
    if (clickable == true){
        clickable = false;
    if ((FunkClicked == true) || (ExpClicked == true)){
        FunkPlug.classList.remove("pluggedIn");
        ExpPlug.classList.remove("pluggedIn");
        FunkClicked = false;
        ExpClicked = false;
        FunkPlayer.pause();
        ExpPlayer.pause();
        MetalPlayer.currentTime = 0;
        FunkPlayer.currentTime = 0;
        ExpPlayer.currentTime = 0;
        unplugSFX.play();

        cycleCount = -2;
        controlText.innerHTML = "Now playing:";
        bumper.classList.remove('funkBump'); 
        bumper.classList.remove('expBump'); 
        bumper.classList.remove('metalBump'); 

        setTimeout(() => {
            metalTimer = setInterval(function(){
                cycleCount ++;
                console.log(cycleCount);
    
                if (cycleCount == -1){
                    console.log('stopping animation');
                    headSVG.classList.remove("aniHeadMetal");
                    bodySVG.classList.remove('aniBodyMetal');
                    Guitar.classList.remove('guitarMetal');
                    Hair.classList.remove("hairMetal");
                    smallEye.classList.add('smallEyeBlink');
                    largeEye.classList.add('largeEyeBlink');
                    largeEye.classList.remove('largeEyeClose');
                    smallEye.classList.remove('smallEyeClose');
                    exposedEar.classList.remove('exposedEarMetal');
                    coveredEar.classList.remove('coveredEarMetal');
                    cycleCount = 0;
                    clearInterval(metalTimer); 
                }
            }, 480);
    
            MetalPlug.classList.add("pluggedIn");
            MetalPlug.classList.remove('plugHover');
            plugInSFX.play();
            MetalClicked = true;
            controlText.innerHTML = "Now playing: Burning Skies";

            headSVG.classList.add("aniHeadMetal");
        bodySVG.classList.add('aniBodyMetal');
        Guitar.classList.add('guitarMetal');
        Hair.classList.add("hairMetal");
        smallEye.classList.remove('smallEyeBlink');
        largeEye.classList.remove('largeEyeBlink');
        largeEye.classList.add('largeEyeClose');
        smallEye.classList.add('smallEyeClose');
        exposedEar.classList.add('exposedEarMetal');
        coveredEar.classList.add('coveredEarMetal');
            
            setTimeout(() => {
                bumper.classList.remove('expBump'); 
                bumper.classList.add('metalBump'); 
                bumper.classList.remove('funkBump'); 
               MetalPlayer.play();
               clickable = true;
                }, 240);    
          }, 750);

         }else if (MetalClicked == false){

            metalTimer = setInterval(function(){
                cycleCount ++;
                console.log(cycleCount);
    
                if (cycleCount == -1){
                    console.log('stopping animation');
                    headSVG.classList.remove("aniHeadMetal");
                    bodySVG.classList.remove('aniBodyMetal');
                    Guitar.classList.remove('guitarMetal');
                    Hair.classList.remove("hairMetal");
                    smallEye.classList.add('smallEyeBlink');
                    largeEye.classList.add('largeEyeBlink');
                    largeEye.classList.remove('largeEyeClose');
                    smallEye.classList.remove('smallEyeClose');
                    exposedEar.classList.remove('exposedEarMetal');
                    coveredEar.classList.remove('coveredEarMetal');
                    cycleCount = 0;
                    clearInterval(metalTimer); 
                }
            }, 480);

        MetalPlug.classList.add("pluggedIn");
        MetalPlug.classList.remove('plugHover');
            plugInSFX.play();
        MetalClicked = true;
        controlText.innerHTML = "Now playing: Burning Skies"

        headSVG.classList.add("aniHeadMetal");
        bodySVG.classList.add('aniBodyMetal');
        Guitar.classList.add('guitarMetal');
        Hair.classList.add("hairMetal");
        smallEye.classList.remove('smallEyeBlink');
        largeEye.classList.remove('largeEyeBlink');
        largeEye.classList.add('largeEyeClose');
        smallEye.classList.add('smallEyeClose');
        exposedEar.classList.add('exposedEarMetal');
        coveredEar.classList.add('coveredEarMetal');

        setTimeout(() => {
            bumper.classList.remove('expBump'); 
            bumper.classList.add('metalBump'); 
            bumper.classList.remove('funkBump'); 
           MetalPlayer.play();
           clickable = true;
            }, 240);

    } else if (MetalClicked == true){
        MetalPlug.classList.remove("pluggedIn");
        MetalPlayer.pause();
        MetalPlayer.currentTime = 0;
        FunkPlayer.currentTime = 0;
        ExpPlayer.currentTime = 0;
        unplugSFX.play();
        MetalClicked = false;
        controlText.innerHTML = "Now playing:";
        bumper.classList.remove('metalBump'); 
        cycleCount = -2;
        setTimeout(() => {
            clickable = true;
        }, 500);
    }
    
};
};

function MetalPlugHover(){
    if (MetalClicked == false){
        MetalPlug.classList.add("plugHover");
    };
};

function MetalPlugHoverOff(){
    if (MetalClicked == false){
        MetalPlug.classList.remove("plugHover");
    };
};


function ExpPlay(){
    if (clickable == true){
        clickable = false;
    if ((FunkClicked == true) || (MetalClicked == true)){
        FunkPlug.classList.remove("pluggedIn");
        MetalPlug.classList.remove("pluggedIn");
        FunkClicked = false;
        MetalClicked = false;
        MetalPlayer.pause();
        MetalPlayer.currentTime = 0;
        FunkPlayer.currentTime = 0;
        ExpPlayer.currentTime = 0;
        FunkPlayer.pause();
        unplugSFX.play();
        
        controlText.innerHTML = "Now playing:";
        bumper.classList.remove('funkBump'); 
        bumper.classList.remove('expBump'); 
        bumper.classList.remove('metalBump'); 
   

        cycleCount = -2;

        setTimeout(() => {
            expTimer = setInterval(function(){
                cycleCount ++;
                console.log(cycleCount);
    
                if (cycleCount == -1){
                    console.log('stopping animation');

                    headSVG.classList.remove("aniHeadExp");
                    bodySVG.classList.remove('aniBodyExp');
                    Guitar.classList.remove('guitarExp');
                    Hair.classList.remove("hairExp");
                    largeEye.classList.remove('largeEyeLook');
                    smallEye.classList.remove('smallEyeLook');
                    exposedEar.classList.remove('exposedEarExp');
                    coveredEar.classList.remove('coveredEarExp');
                    cycleCount = 0;
                    clearInterval(expTimer); 
                }
            }, 430);

            ExpPlug.classList.add("pluggedIn");
            ExpPlug.classList.remove('plugHover');
            
            plugInSFX.play();
            ExpClicked = true;
            controlText.innerHTML = "Now playing: Refusal";
            
            headSVG.classList.add("aniHeadExp");
        bodySVG.classList.add('aniBodyExp');
        Guitar.classList.add('guitarExp');
        Hair.classList.add("hairExp");
        smallEye.classList.remove('smallEyeBlink');
        largeEye.classList.remove('largeEyeBlink');
        largeEye.classList.add('largeEyeLook');
        smallEye.classList.add('smallEyeLook');
        exposedEar.classList.add('exposedEarExp');
        coveredEar.classList.add('coveredEarExp');
            
            setTimeout(() => {
                bumper.classList.add('expBump'); 
                bumper.classList.remove('metalBump'); 
                bumper.classList.remove('funkBump'); 
               ExpPlayer.play();
               clickable = true;
                }, 215);    
          }, 750);

         }else if (ExpClicked == false){

            expTimer = setInterval(function(){
                cycleCount ++;
                console.log(cycleCount);
                if (cycleCount == -1){
                headSVG.classList.remove("aniHeadExp");
                bodySVG.classList.remove('aniBodyExp');
                Guitar.classList.remove('guitarExp');
                Hair.classList.remove("hairExp");
                smallEye.classList.add('smallEyeBlink');
                largeEye.classList.add('largeEyeBlink');
                largeEye.classList.remove('largeEyeLook');
                smallEye.classList.remove('smallEyeLook');
                exposedEar.classList.remove('exposedEarExp');
                coveredEar.classList.remove('coveredEarExp');

                cycleCount = 0;
                    clearInterval(expTimer); 
                }
            }, 430);

        ExpPlug.classList.add("pluggedIn");
        ExpPlug.classList.remove('plugHover');
        plugInSFX.play();
        ExpClicked = true;
        controlText.innerHTML = "Now playing: Refusal";


        headSVG.classList.add("aniHeadExp");
        bodySVG.classList.add('aniBodyExp');
        Guitar.classList.add('guitarExp');
        Hair.classList.add("hairExp");
        smallEye.classList.remove('smallEyeBlink');
        largeEye.classList.remove('largeEyeBlink');
        largeEye.classList.add('largeEyeLook');
        smallEye.classList.add('smallEyeLook');
        exposedEar.classList.add('exposedEarExp');
        coveredEar.classList.add('coveredEarExp');

        setTimeout(() => {
            bumper.classList.add('expBump'); 
            bumper.classList.remove('metalBump'); 
            bumper.classList.remove('funkBump'); 
            ExpPlayer.play();
            clickable = true;
            }, 215);

    } else if (ExpClicked == true){
        ExpPlug.classList.remove("pluggedIn");
        ExpPlayer.pause();
        MetalPlayer.currentTime = 0;
        FunkPlayer.currentTime = 0;
        ExpPlayer.currentTime = 0;
        unplugSFX.play();
        ExpClicked = false;
        controlText.innerHTML = "Now playing:";
        bumper.classList.remove('expBump'); 

        cycleCount = -2;
        setTimeout(() => {
            clickable = true;
        }, 500);
    }
    
};
};

function ExpPlugHover(){
    if (ExpClicked == false){
        ExpPlug.classList.add("plugHover");
    };
};

function ExpPlugHoverOff(){
    if (ExpClicked == false){
        ExpPlug.classList.remove("plugHover");
    };
};

