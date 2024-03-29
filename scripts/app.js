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
var strumHand;
var fretHand;

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
    strumHand = aniConDoc.getElementById('strumHand');
    fretHand = aniConDoc.getElementById('fretHand');

    pointer = aniConDoc.getElementById('pointerFinger');
    middle = aniConDoc.getElementById('middleFinger');
    ring = aniConDoc.getElementById('ringFinger');
    pinkie = aniConDoc.getElementById('pinkieFinger');

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

function strum(){
    if (strumHand.style.transform == "rotate(50deg)"){
        strumHand.style.transform = "rotate(0deg)";
    }else{
        strumHand.style.transform = "rotate(50deg)";
    }
}  

// HAND MOVEMENT PATTERNS
var expStrumTimes = [0, 215, 323, 645, 860, 968, 1290, 1505, 1613, 1935, 2150, 2258, 2580, 2795, 2903, 3225, 3400, 3508, 
    3870, 4085, 4193, 4515, 4730, 4838, 5160, 5375, 5483, 5805, 6020, 6128, 6235, 6343, 6450, 6558, 6665, 6773, 6880, 
    7095, 7203, 7535, 7740, 7848, 8170, 8385, 8493, 8815, 9030, 9138, 9460, 9675, 9783, 10105, 10320, 10428, 10750, 
    10965, 11073, 11395, 11610, 11718, 12040, 12255, 12363, 12685, 12900, 13008, 13115, 13223, 
    
    13760, 13975, 14083, 14405, 14620, 14728, 15050, 15265, 15373, 15695, 15910, 16018, 16340, 16555, 16663, 16985, 
    17160, 17268, 17630, 17845, 17953, 18275, 18490, 18598, 18920, 19135, 19243, 19565, 19780, 19888, 19995, 20103, 
    20210, 20318, 20425, 20533, 20640, 20855, 20963, 21295, 21500, 21608, 21930, 22145, 22253, 22575, 22790, 22898, 23220, 23435,
    23543, 23865, 24080, 24403, 24725, 25048, 25370, 25692, 26015, 26338, 26660, 26983];

var expFretTimes = [0, 215, 645, 860, 1290, 1505, 1935, 2150, 2580, 2795, 3225, 3400, 3870, 4085, 4515, 4730, 5160,
5375, 5805, 6020, 6880, 7095, 7535, 7740, 8170, 8385, 8815, 9030, 9460, 9675, 10105, 10320, 10750, 10965, 11395, 
11610, 12040, 12255, 12685, 12900, 13330, 13760, 13975, 14405, 14620, 15050, 15265, 15695, 15910, 16340, 16555, 
16985, 17160, 17630, 17845, 18275, 18490, 18920, 19135, 19565, 19780, 20640, 20855, 21295, 21500, 21930, 22145, 
22575, 22790, 23220, 23435, 23865, 24080, 26983];

var expFretSwitch = [2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 12, 1, 12, 1, 12, 1, 12, 1, 12, 23, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0,
12, 1, 12, 1, 12, 1, 12, 1, 12, 24, 0, 13, 0, 13, 0, 13, 0, 13, 0, 13, 0, 123, 1, 123, 1, 123, 1, 123, 1, 123, 234, 
13, 0, 13, 0, 13, 0, 13, 0, 13, 0, 13, 124, 0];



var metalStrumTimes = [0, 240, 600, 720, 960, 1320, 1680, 2040, 2400, 2640, 3000, 3600, 4200, 4320, 4680, 5040, 
    5280, 5520, 5760, 6000, 6240, 6480, 6720, 6960, 7200, 7440, 7680, 7920, 8400, 8520, 8640, 8760, 8880, 9000, 
9120, 9240, 9360, 9480, 9600, 9960, 10080, 10320, 10680, 10800, 11040, 11280, 11520, 11760, 12240, 12360, 12480, 
12600, 12720, 12840, 12960, 13080, 13200, 13320, 13440, 13560, 13680, 13800, 13920, 14040, 14160, 14280, 14400, 
14520, 14640, 14760, 14880, 15000, 15120,

15360, 23040, 24960, 26880, 28800];

var metalFretTimes = [0, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440, 1500, 1560, 1620, 1680, 1740, 
    1800, 1860, 1920, 1980, 2040, 2400, 2640, 2760, 3360, 3720, 3840, 3960, 4020, 4080, 4200, 4320, 4440, 4560, 4680, 
    5520, 5760, 6000, 6480, 6720, 7200, 7680, 7920, 9240, 9480, 9600, 10080, 10320, 10800, 11040, 11280, 11760, 
    13080, 


    15360, 15440, 15520, 15600, 15680, 15760, 15840, 15920, 16000, 16080, 16160, 16240, 16320, 16400, 16480, 16560, 
    16640, 16720, 16800, 16880, 16960, 17040, 17120, 17200, 17280, 17360, 17440, 17520, 17600, 17680, 17760, 17840, 
    17920, 18000, 18080, 18160, 18240, 18320, 18400, 18480, 18560, 18640, 18720, 18800, 18880, 18960, 19040, 19120, 
    19200, 19280, 19360, 19440, 19520, 19600, 19680, 19760, 19840, 19920, 20000, 20080, 20160, 20240, 20320, 20400, 
    20480, 20560, 20640, 20720, 20800, 20880, 20960, 21040, 21120, 21200, 21280, 21360, 21440, 21520, 21600, 21680, 
    21760, 21850, 21920, 22000, 22080, 22160, 22240, 22320, 22400, 22480, 22560, 22640, 22720, 22800, 22880, 22960, 

    23040, 23160, 23280, 23400, 23520, 23640, 23760, 23880, 24000, 24120, 24240, 24360, 24480, 24600, 24720, 24840, 24960, 25080, 
    25200, 25320, 25440, 25560, 25680, 25800, 25920, 26040, 26160, 26280, 26400, 26520, 26640, 26760, 26880, 27000, 
    27120, 27240, 27360, 27480, 27600, 27720, 27840, 27960, 28080, 28200, 28320, 28440, 28560, 28680, 28800, 28920, 
    29040, 29160, 29280, 29400, 29520, 29640, 29760, 29880, 30000, 30120, 30240
];

var metalFretSwitch = [34, 3, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2, 1, 4, 2, 4, 2, 0, 2, 0, 2, 1, 
    0, 3, 2, 1, 2, 1, 0, 4, 1, 13, 12, 2, 34, 0, 2, 12, 2, 12, 2, 12, 2, 34, 134, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 
    14, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 
    13, 1, 13, 1, 13, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 
    14, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 13, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 12, 1, 
    12, 1, 12, 1, 12, 1, 
2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 1, 3, 4, 1, 3, 4, 1, 3, 4, 1, 3, 4, 1, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 
2, 3, 4, 2, 3, 4, 1, 2, 4, 1, 2, 4, 1, 2, 4, 1, 2, 4, 1, 2, 4, 0];



var funkStrumTimes = [0, 354, 708, 944, 1298, 1652, 2478, 2832, 3540, 3894, 4602, 4956, 5192, 5428, 5664, 6018, 6254, 
6372, 6726, 7434, 7788, 8142, 8496, 9558, 10620, 10974, 11328, 12390, 13688, 13924, 14160, 15222, 16638, 16992, 17582, 
18054, 18408, 19470, 19824, 20178, 20532, 20886, 21594, 21712, 21830];

var funkFretTimes = [0, 354, 472, 590, 944, 1062, 1298, 1652, 2596, 2714, 2832, 3658, 3776, 3894, 4602, 5192, 5428, 
5664, 6018, 6726, 7552, 7670, 7788, 8496, 9558, 10620, 10738, 10856, 10974, 11092, 11210, 11328, 12390, 13688, 13924, 
14160, 15222, 16756, 16874, 16992, 17582, 18408, 19470, 19824, 20178, 20296, 20414, 20532, 20886, ];

var funkFretSwitch = [234, 1, 2, 3, 2, 1, 4, 2, 4, 2, 1, 2, 1, 0, 1, 2, 3, 4, 1, 2, 3, 2, 1, 4, 2, 
0, 1, 2, 3, 2, 3, 4, 2, 3, 4, 1, 0, 2, 0, 3, 0, 4, 2, 3, 2, 3, 2, 0, 2];


let strumTimeouts;
let strumInterval;
let fretTimeouts;
let fretSwitchPattern;
let arrayNumber = 0;

function StrumPattern(strumArray){
    //const expTemp = [...expTimes];
    function strum(){
        if (strumHand.style.transform == "rotate(50deg)"){
            strumHand.style.transform = "rotate(0deg)";
        }else{
            strumHand.style.transform = "rotate(50deg)";
        }
    }  

    strumTimeouts = strumArray.map(delay =>  setTimeout(() => { 
            strum();
            //console.log("strum");
        }, delay));
    };

// StrumPattern(expStrumTimes);


function FretPattern(fretArray){
        //const expTemp = [...expTimes];
    
        function fret(){
            let randomPick = fretSwitchPattern[arrayNumber];
            //console.log(fretSwitchPattern[arrayNumber]);
                if (randomPick == 1){
                    pointer.style.transform = "rotate(0deg)";
                    middle.style.transform = "rotate(-20deg)";
                    ring.style.transform = "rotate(-20deg)";
                    pinkie.style.transform = "rotate(-20deg)";
                }else if (randomPick == 2){
                    pointer.style.transform = "rotate(-20deg)";
                    middle.style.transform = "rotate(0deg)";
                    ring.style.transform = "rotate(-20deg)";
                    pinkie.style.transform = "rotate(-20deg)";
                }else if (randomPick == 3){
                    pointer.style.transform = "rotate(-20deg)";
                    middle.style.transform = "rotate(-20deg)";
                    ring.style.transform = "rotate(0deg)";
                    pinkie.style.transform = "rotate(-20deg)";
                }else if (randomPick == 4){
                    pointer.style.transform = "rotate(-20deg)";
                    middle.style.transform = "rotate(-20deg)";
                    ring.style.transform = "rotate(-20deg)";
                    pinkie.style.transform = "rotate(0deg)";
                }else if (randomPick == 12){
                    pointer.style.transform = "rotate(0deg)";
                    middle.style.transform = "rotate(0deg)";
                    ring.style.transform = "rotate(-20deg)";
                    pinkie.style.transform = "rotate(-20deg)";
                }else if (randomPick == 13){
                    pointer.style.transform = "rotate(0deg)";
                    middle.style.transform = "rotate(-20deg)";
                    ring.style.transform = "rotate(0deg)";
                    pinkie.style.transform = "rotate(-20deg)";
                }else if (randomPick == 14){
                    pointer.style.transform = "rotate(0deg)";
                    middle.style.transform = "rotate(-20deg)";
                    ring.style.transform = "rotate(-20deg)";
                    pinkie.style.transform = "rotate(0deg)";
                }else if (randomPick == 23){
                    pointer.style.transform = "rotate(-20deg)";
                    middle.style.transform = "rotate(0deg)";
                    ring.style.transform = "rotate(0deg)";
                    pinkie.style.transform = "rotate(-20deg)";
                }else if (randomPick == 24){
                    pointer.style.transform = "rotate(-20deg)";
                    middle.style.transform = "rotate(0deg)";
                    ring.style.transform = "rotate(-20deg)";
                    pinkie.style.transform = "rotate(0deg)";
                }else if (randomPick == 34){
                    pointer.style.transform = "rotate(-20deg)";
                    middle.style.transform = "rotate(-20deg)";
                    ring.style.transform = "rotate(0deg)";
                    pinkie.style.transform = "rotate(0deg)";
                }else if (randomPick == 123){
                    pointer.style.transform = "rotate(0deg)";
                    middle.style.transform = "rotate(0deg)";
                    ring.style.transform = "rotate(0deg)";
                    pinkie.style.transform = "rotate(-20deg)";
                }else if (randomPick == 124){
                    pointer.style.transform = "rotate(0deg)";
                    middle.style.transform = "rotate(0deg)";
                    ring.style.transform = "rotate(-20deg)";
                    pinkie.style.transform = "rotate(0deg)";
                }else if (randomPick == 134){
                    pointer.style.transform = "rotate(0deg)";
                    middle.style.transform = "rotate(-20deg)";
                    ring.style.transform = "rotate(0deg)";
                    pinkie.style.transform = "rotate(0deg)";
                }else if (randomPick == 234){
                    pointer.style.transform = "rotate(-20deg)";
                    middle.style.transform = "rotate(0deg)";
                    ring.style.transform = "rotate(0deg)";
                    pinkie.style.transform = "rotate(0deg)";
                }else{
                    pointer.style.transform = "rotate(-20deg)";
                    middle.style.transform = "rotate(-20deg)";
                    ring.style.transform = "rotate(-20deg)";
                    pinkie.style.transform = "rotate(-20deg)";
                //console.log("fret");
                //console.log(fretSwitchPattern);

            };
            arrayNumber++;
            //console.log (arrayNumber);
            if (arrayNumber == fretSwitchPattern.length){
                arrayNumber = 0;
            };
        };

        fretTimeouts = fretArray.map(delay =>  setTimeout(() => { 
                fret(expFretSwitch);  
                //console.log(delay);
            }, delay));
        };




function clearStrum(){
    strumTimeouts?.forEach(id => clearTimeout(id));
    clearInterval(strumInterval);
}

function clearFrets(){
    fretTimeouts?.forEach(id => clearTimeout(id));
}


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

        clearStrum();
        clearFrets();
        arrayNumber = 0;

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
                //console.log(cycleCount);
                
                if (cycleCount == -1){
                    console.log('stopping animation');
    
                    headSVG.classList.remove("aniHeadFunk");
                    bodySVG.classList.remove('aniBodyFunk');
                    Guitar.classList.remove('guitarFunk');
                    Hair.classList.remove("hairFunk");
                    largeEye.classList.remove('largeEyeClose');
                    smallEye.classList.remove('smallEyeClose');
                    exposedEar.classList.remove('exposedEarFunk');
                    coveredEar.classList.remove('coveredEarFunk');
                    cycleCount = 0;
                    clearInterval(funkTimer); 

                setTimeout(() => {
                    smallEye.classList.add('smallEyeBlink');
                    largeEye.classList.add('largeEyeBlink');
                        }, 100);  
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

            setTimeout(() => {
                smallEye.classList.add('smallEyeClose');
                largeEye.classList.add('largeEyeClose');
                    }, 100);  

            exposedEar.classList.add('exposedEarFunk');
            coveredEar.classList.add('coveredEarFunk');
            
            setTimeout(() => {
            bumper.classList.remove('expBump'); 
            bumper.classList.remove('metalBump'); 
            bumper.classList.add('funkBump'); 
            FunkPlayer.play();
            fretSwitchPattern = funkFretSwitch;
            StrumPattern(funkStrumTimes);
            FretPattern(funkFretTimes);
            strumInterval = setInterval(function(){
                StrumPattern(funkStrumTimes);
                FretPattern(funkFretTimes);
            }, 22581);
            clickable = true;
            }, 300);  
          }, 750);

    }
    else if (FunkClicked == false){
        funkTimer = setInterval(function(){
            cycleCount ++;
            //console.log(cycleCount);

            if (cycleCount == -1){
                console.log('stopping animation');

                headSVG.classList.remove("aniHeadFunk");
                bodySVG.classList.remove('aniBodyFunk');
                Guitar.classList.remove('guitarFunk');
                Hair.classList.remove("hairFunk");
                largeEye.classList.remove('largeEyeClose');
                smallEye.classList.remove('smallEyeClose');
                exposedEar.classList.remove('exposedEarFunk');
                coveredEar.classList.remove('coveredEarFunk');
                cycleCount = 0;
                clearInterval(funkTimer); 

                setTimeout(() => {
                    smallEye.classList.add('smallEyeBlink');
                    largeEye.classList.add('largeEyeBlink');
                        }, 100);  
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

        setTimeout(() => {
            smallEye.classList.add('smallEyeClose');
            largeEye.classList.add('largeEyeClose');
                }, 100);  

        exposedEar.classList.add('exposedEarFunk');
        coveredEar.classList.add('coveredEarFunk');
        
        setTimeout(() => {
        bumper.classList.remove('expBump'); 
        bumper.classList.remove('metalBump'); 
        bumper.classList.add('funkBump'); 
        FunkPlayer.play();
        clickable = true;
        fretSwitchPattern = funkFretSwitch;
        StrumPattern(funkStrumTimes);
        FretPattern(funkFretTimes);
        strumInterval = setInterval(function(){
            FretPattern(funkFretTimes);
            StrumPattern(funkStrumTimes);
        }, 22581);
        }, 300);
        

    } else if (FunkClicked == true){
        clearFrets();
        clearStrum();
        arrayNumber = 0;
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
        clearFrets();
        clearStrum();
        arrayNumber = 0;
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
                //console.log(cycleCount);
    
                if (cycleCount == -1){
                    console.log('stopping animation');
                    headSVG.classList.remove("aniHeadMetal");
                    bodySVG.classList.remove('aniBodyMetal');
                    Guitar.classList.remove('guitarMetal');
                    Hair.classList.remove("hairMetal");
                    largeEye.classList.remove('largeEyeClose');
                    smallEye.classList.remove('smallEyeClose');
                    exposedEar.classList.remove('exposedEarMetal');
                    coveredEar.classList.remove('coveredEarMetal');
                    cycleCount = 0;
                    clearInterval(metalTimer); 

                setTimeout(() => {
                    smallEye.classList.add('smallEyeBlink');
                    largeEye.classList.add('largeEyeBlink');
                        }, 100);  
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

                    setTimeout(() => {
                smallEye.classList.add('smallEyeClose');
                largeEye.classList.add('largeEyeClose');
                    }, 100);  

        exposedEar.classList.add('exposedEarMetal');
        coveredEar.classList.add('coveredEarMetal');
            
            setTimeout(() => {
                bumper.classList.remove('expBump'); 
                bumper.classList.add('metalBump'); 
                bumper.classList.remove('funkBump'); 
               MetalPlayer.play();
               clickable = true;
               fretSwitchPattern = metalFretSwitch;
               StrumPattern(metalStrumTimes);
               FretPattern(metalFretTimes);
           strumInterval = setInterval(function(){
               StrumPattern(metalStrumTimes);
               FretPattern(metalFretTimes);
           }, 30696);

                }, 240);    
          }, 750);

         }else if (MetalClicked == false){

            metalTimer = setInterval(function(){
                cycleCount ++;
                //console.log(cycleCount);
    
                if (cycleCount == -1){
                    console.log('stopping animation');
                    headSVG.classList.remove("aniHeadMetal");
                    bodySVG.classList.remove('aniBodyMetal');
                    Guitar.classList.remove('guitarMetal');
                    Hair.classList.remove("hairMetal");
                    largeEye.classList.remove('largeEyeClose');
                    smallEye.classList.remove('smallEyeClose');
                    exposedEar.classList.remove('exposedEarMetal');
                    coveredEar.classList.remove('coveredEarMetal');
                    cycleCount = 0;
                    clearInterval(metalTimer); 


                setTimeout(() => {
                smallEye.classList.add('smallEyeBlink');
                largeEye.classList.add('largeEyeBlink');
                    }, 100);  
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
                    setTimeout(() => {
                smallEye.classList.add('smallEyeClose');
                largeEye.classList.add('largeEyeClose');
                    }, 100);  
        exposedEar.classList.add('exposedEarMetal');
        coveredEar.classList.add('coveredEarMetal');

        setTimeout(() => {
            bumper.classList.remove('expBump'); 
            bumper.classList.add('metalBump'); 
            bumper.classList.remove('funkBump'); 
           MetalPlayer.play();
           clickable = true;
           fretSwitchPattern = metalFretSwitch;
           StrumPattern(metalStrumTimes);
           FretPattern(metalFretTimes);
           strumInterval = setInterval(function(){
               StrumPattern(metalStrumTimes);
               FretPattern(metalFretTimes);
           }, 30696);
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
        clearFrets();
        clearStrum();
        arrayNumber = 0;

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
        clearFrets();
        clearStrum();
        arrayNumber = 0;

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
                //console.log(cycleCount);
    
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

                    setTimeout(() => {
                        smallEye.classList.add('smallEyeBlink');
                        largeEye.classList.add('largeEyeBlink');
                            }, 100); 
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
        setTimeout(() => {
            smallEye.classList.add('smallEyeLook');
            largeEye.classList.add('largeEyeLook');
                }, 100); 
        exposedEar.classList.add('exposedEarExp');
        coveredEar.classList.add('coveredEarExp');
            
            setTimeout(() => {
                bumper.classList.add('expBump'); 
                bumper.classList.remove('metalBump'); 
                bumper.classList.remove('funkBump'); 
               ExpPlayer.play();
               clickable = true;
               fretSwitchPattern = expFretSwitch;
               StrumPattern(expStrumTimes);
               FretPattern(expFretTimes);

               strumInterval = setInterval(function(){
                FretPattern(expFretTimes);
                   StrumPattern(expStrumTimes);
               }, 27450);
                }, 215);    
          }, 750);

         }else if (ExpClicked == false){

            expTimer = setInterval(function(){
                cycleCount ++;
                //console.log(cycleCount);
                if (cycleCount == -1){
                headSVG.classList.remove("aniHeadExp");
                bodySVG.classList.remove('aniBodyExp');
                Guitar.classList.remove('guitarExp');
                Hair.classList.remove("hairExp");
                largeEye.classList.remove('largeEyeLook');
                smallEye.classList.remove('smallEyeLook');
                exposedEar.classList.remove('exposedEarExp');
                coveredEar.classList.remove('coveredEarExp');


                setTimeout(() => {
                smallEye.classList.add('smallEyeBlink');
                largeEye.classList.add('largeEyeBlink');
                    }, 100);  

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
        setTimeout(() => {
            smallEye.classList.add('smallEyeLook');
            largeEye.classList.add('largeEyeLook');
                }, 100);  

        exposedEar.classList.add('exposedEarExp');
        coveredEar.classList.add('coveredEarExp');

        setTimeout(() => {
            bumper.classList.add('expBump'); 
            bumper.classList.remove('metalBump'); 
            bumper.classList.remove('funkBump'); 
            ExpPlayer.play();
            clickable = true;
            fretSwitchPattern = expFretSwitch;
            FretPattern(expFretTimes);
            StrumPattern(expStrumTimes);

            strumInterval = setInterval(function(){
                StrumPattern(expStrumTimes);
                FretPattern(expFretTimes);
            }, 27450);
                //FretPattern(expFretTimes);
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
        clearFrets();
        clearStrum();
        arrayNumber = 0;

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

