rightWristx = 0
rightWristy = 0
leftWristx = 0
leftWristy = 0
scoreleftWrist = 0
scorerightWrist = 0


function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('The Music Has Commenced!')
}

function gotPoses(results) {
    if (results.length > 0); {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score
        scorerightWrist = results[0].pose.keypoints[10].score
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;

    }

}


function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000")
    stroke("#FF0000")
    if (scoreleftWrist > 0.1) {

        circle(leftWristx, leftWristy, 50);
        song2.stop();
        song1.play();
    }

    if (scorerightWrist > 0.1) {

        circle(rightWristx, rightWristy, 50);
        song1.stop();
        song2.play();
    }
}








function play() {
    song1.play();
    
}


function stop() {
    song1.stop();
    song2.stop();
}