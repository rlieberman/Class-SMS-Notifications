var recipientName;
var messageChoice;


//create a test object to hold names and numbers
var phoneNumbers = {
  "Skylar":"+14066727344",
  "Rebecca":"+19178488601",
  "JohnDoe":"+19175558601"
};



$(document).ready(function(){

  //grab the button by its id
  var bttn = $('#button');
  // console.log(bttn);

  //iterate through the phoneNumbers object to populate dropdown
  $.each(phoneNumbers, function(key, value) {
    console.log(key, value);
    $("#recipientName").append( $("<option>")
      .val(key)
      .html(key)
    );
  });

  //when the button is clicked, call getVals
  bttn.on('click', getInputVals); 

  function test(){
    $.ajax({
        "url": "http://localhost:3000/twilio",
        "method": "POST",
        "data": { "name": "abhishek" }
      })

      .done(function(msg){
        console.log("done")
      })
  }

  //function to grab the values from the radio button and the input field
  function getInputVals () {

    //grab the user's memory from the form field
    recipientName = $('#recipientName').val();
    recipientNum = phoneNumbers[recipientName];

    //grab the value of the radio button, aka which prompt the user chose
    messageChoice = $('input[name=msg]:checked').val()
    // console.log(recipientName, recipientNum, messageChoice);

    //send data as an object via ajax request
    var data = {
      "name":recipientName,
      "num": recipientNum,
      "txt": messageChoice
    }


    //make a post request so we can grab inputs to send to twilio
    $.ajax({
        "url": "http://localhost:3000/twilio",
        "method": "POST",
        "data": data
      })

      .done(function(msg){
        console.log("done")
    })


  }

});