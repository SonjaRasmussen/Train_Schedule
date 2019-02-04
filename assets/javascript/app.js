
    var config = {
        apiKey: "AIzaSyDPWpUGBHwsUzsOBk27aW70dU4sIESD770",
        authDomain: "trainschdule-304cf.firebaseapp.com",
        databaseURL: "https://trainschdule-304cf.firebaseio.com",
        projectId: "trainschdule-304cf",
        storageBucket: "trainschdule-304cf.appspot.com",
        messagingSenderId: "122247799176"
      };
    
    firebase.initializeApp(config);

    $(document).ready(function() {

    // A variable to reference the database.
    var trainData = firebase.database();
    $("#train-time").timepicker();
    
    $("#submit-train").on("click", function() {
        event.preventDefault();
        // Storing and retreiving new train data
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = moment($("#train-time").val().trim(), "HH:mm").subtract(10,"years").format("X");
        var frequency = $("#train-frequency").val().trim();

       
        
        console.log(firstTrain);

        var newTrain = {
            name:trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        }

        // Pushing to database
        trainData.ref().push(newTrain); 
            
       
       //clear input fields after submit
    
        $("#train-name").val("");
        $("#destination").val("");
        
        $("#train-frequency").val("");
        $("#add-next-arrival").val("");
        $("#add-minutes-away").val("");

        return false;
})






    //collect data from firebase

    trainData.ref().on("child_added", function(childSnapshot) {
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency =   childSnapshot.val().frequency;
    var firstTrain = childSnapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

   
        
    //use jquery to update the HTML new trains
    $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

});
});
