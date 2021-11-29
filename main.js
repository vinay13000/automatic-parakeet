leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
sound1 = "";
sound2 = "";
song1status = "";
song2status = "";

function preload() {
 sound1 = loadSound("music.mp3");
sound2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    poseNet = ml5.poseNet(Video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("model has loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

                scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist=" + scoreleftwrist + ", score right wrist=" + scorerightwrist);

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("left wrist x=" + leftwristx + ", left wrist y=" + leftwristy);
        
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log(" right wrist x=" + rightwristx + ",  right wrist y=" + rightwristy);
    }
}



function draw() {
    image(Video, 0, 0, 600, 500);
    fill("#ff4d88");
    stroke("#ff4d88");
    song1status=sound1.isPlaying();
    song2status=sound2.isPlaying();

    if (scoreleftwrist > 0.2) {
        circle(leftwristx, leftwristy, 30);
        sound1.stop();
            if (song2status == false) {
                sound2.play();
                document.getElementById("song").innerHTML = "music1";        
            } }
    
    if (scorerightwrist > 0.2) {
        circle(rightwristx, rightwristy, 30);
        sound2.stop();
            if (song1status == false) {
                sound1.play();
                document.getElementById("song").innerHTML = "music2";       

        }
    }
}

function play()
{
    sound1.play();
    sound1.setVolume(0.1);
    sound1.rate(1);
    sound2.play();
    sound2.setVolume(1);
    sound2.rate(1);
}

function stop()
{
    sound1.stop();
    sound2.stop();
}
