
    var config = {
        apiKey: "AIzaSyDPWpUGBHwsUzsOBk27aW70dU4sIESD770",
        authDomain: "trainschdule-304cf.firebaseapp.com",
        databaseURL: "https://trainschdule-304cf.firebaseio.com",
        projectId: "trainschdule-304cf",
        storageBucket: "trainschdule-304cf.appspot.com",
        messagingSenderId: "122247799176"
      };
      firebase.initializeApp(config);

    // A variable to reference the database.
    var database = firebase.database();

    // Variables for the onClick event
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;
    
    

    $("#submit-train").on("click", function(event) {
        event.preventDefault();
        // Storing and retreiving new train data
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#train-time").val().trim();
        frequency = $("#train-frequency").val().trim();
       
        // Pushing to database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        
    });

    database.ref().on("child_added", function(childSnapshot) {

        console.log(childSnapshot.val());

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrain);
      console.log(childSnapshot.val().frequency);
      
      $("#add-train-name").append(childSnapshot.val().name + "<br>");
      $("#add-destination").append(childSnapshot.val().destination + "<br>");
      $("#add-frequency").append(childSnapshot.val().frequency + "<br>");
      $("#add-next-arrival").append(childSnapshot.val()<"br>");
      $("#add-minutes-away").append(childSnapshot.val()<"br>");


        var nextArr;
        var minAway;
        
        //Change year so first train comes before now
        var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
        
        // Difference between the current and firstTrain
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        
        // Minutes until next train
         var minAway = childSnapshot.val().frequency - remainder;
        
         // Next train time
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");


            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });

    //database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    
    //});
;