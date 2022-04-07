state = "";
obj_name = "";
object = [];

function setup() {
    canvas = createCanvas(480,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object Detecting";

    obj_name = document.getElementById("object_name").value;
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        object = results;
        console.log(results);
    }
}

function modelLoaded() {
    console.log("Model Loaded!!");
    state = true;
}

function draw() {
    image(video, 0, 0, 480,480);
    if (state != "") {
        objectDetector.detect(video, gotResult);
        for (i =0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Object Detected !!"
            fill("red");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x+15, object[i].y+10);
            noFill();
            stroke("red");
            rect( object[i].x, object[i].y,object[i].width, object[i].height);
            if (obj_name == object[i].label) {
                document.getElementById("object_status").innerHTML = "Object Found";
            }

        }
    }
}