# Train_Schedule
I created a train schedule application that incorporates Firebase to host train data including: first train time, frequency of train, train name and destination. A user can submit this information on the application and it is saved to Firebase. The application retrieves and manipulates this information with the help of Moment.js. 

The website provides up-to-date information about the various trains including: their name, destination, frequency, arrival times and how many minutes remain until they arrive at their station. The application does update the current time and the arrival time and minutes to arrival on its own with out refreshing the screen. 


The site is deployed at  https://sonjarasmussen.github.io/Train_Schedule/ 

You can use this to see the trains that are already set up in Firebase. You can enter new train information below the Current Train Schedule, in the Add New Train Information card. Once you enter the information and submit, it will add the new train to the Current Train Schedule.


Built With Bootstrap - To do basic css and responsive layout
Firebase - to store train name, train frequency and train start time 
Moment.js - This pulls the data from Firebase and manipulates the data to give next train arrival time and minutes away
TimePicker library for ease of use and ensure correct format of the time.





