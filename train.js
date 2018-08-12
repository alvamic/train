
var config = {
    apiKey: "AIzaSyCy5ltZn_L1WP2eVQaNjvcL38k3kPEAZ2c",
    authDomain: "train-7ecb0.firebaseapp.com",
    databaseURL: "https://train-7ecb0.firebaseio.com",
    projectId: "train-7ecb0",
    storageBucket: "train-7ecb0.appspot.com",
    messagingSenderId: "1021013233705"
};
firebase.initializeApp(config);


var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();

    var name = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,


    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);



    alert("Train Added");

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");



});


database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());


    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    console.log(name);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var timeCalc = firstTrain.split(":");
    var trainTimeCalc = moment().hours(timeCalc[0]).minutes(timeCalc[1]);
    var momentVar = moment.max(moment(), trainTimeCalc);
    var minsTillTrain;
    var arriveTime;

    if (momentVar === trainTimeCalc) {
        arriveTime = trainTimeCalc.format("hh:mm A");
        minsTillTrain = trainTimeCalc.diff(moment(), "minutes");
    } else {

        var diffTime = moment().diff(trainTimeCalc, "minutes");
        var timeApart = diffTime % frequency;
        minsTillTrain = frequency - timeApart;

        arriveTime = moment().add(minsTillTrain, "m").format("hh:mm A");
    }

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(arriveTime),
        $("<td>").text(minsTillTrain),


    );

    $("#train-table > tbody").append(newRow);
});