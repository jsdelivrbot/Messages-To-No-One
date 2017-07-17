var DONE  = 4;
var OKAY  = 200;
var ERROR = {
  "message": "The request failed!"
};
var section;

// Wait for the document to load before binding event handlers further.
document.addEventListener('DOMContentLoaded', function(e) {
  console.log("infunction");

  // Obtain programmatic reference to the important elements of the page.
  var conver = document.getElementById('conversations');


// Create a new XMLHttpRequest object and resolve the target URI.
    var request = new XMLHttpRequest(),
        target  = '/conversationTitles/1';

    // Open and send a GET request to the target URI.
    request.open('GET', target);
    request.send();

    // Listen for changes to the XMLHttpRequest's readyState.
    request.onreadystatechange = function() {

      // Do nothing until the request is finished.
      if (request.readyState === DONE) {
        console.log("ready");

        // Create a div element to hold the output.
        var div = document.createElement('div');

        // If the request was successful, append the response.
        // If not, append a JSON error object.
        if (request.status === OKAY) {

          // The most notable difference here is that vanilla JavaScript returns
          // the result of an AJAX request as a string, whereas jQuery attempts
          // to parse JSON responses into a JSON object.
          var object = JSON.parse(request.responseText);
          console.log (object);
          var end = [];
          var length;
          if(object.length){
            length = object.length;
          }
          else{
            length = 1;
          }
          for(var i = 0; i < length; i++){
            console.log(object[i]);
            var div = document.createElement('div');
            div.className = "section";
            
            div.id= object[i].conversation_id;
            end.push(div.id);
            
            console.log(div.id);
            div.appendChild(document.createTextNode(object[i].name));
            conver.innerHTML += ("<br><br><br>");
            conver.appendChild(div);
            
            //div.innerHTML += '<div class = "section"> object[i].name </div>'
          }

          for(var i = 0; i < end.length; i++){
            var div = document.getElementById(end[i]);
            div.onclick = showSections;
          }
          

          
        } else {
          div.appendChild(document.createTextNode(JSON.stringify(ERROR)));
        }

        // Append the div to the output container.
        
      }
    };
  


  
});


function showSections(){
  console.log("id of selection  is " + this.id);

  var section = document.getElementById("sections");

  var request = new XMLHttpRequest();
  var target  = '/sectionTitles/' + this.id;
  console.log(target);

  request.open('GET', target);
  request.send();

  request.onreadystatechange = function() {
    console.log("state change");

    if (request.readyState === DONE) {
      console.log("ready");
      var div = document.createElement('div');
      if (request.status === OKAY) {
        console.log("okay");
        var object = JSON.parse(request.responseText);
        var end = [];

        var length;
        if(object.length){
          length = object.length;
        }
        else{
          length = 1;
          var stuff = object;
          object = [stuff];
        }
        for(var i = 0; i < length; i++){
        console.log(object[i]);
        var div = document.createElement('div');
        div.className = "section";
        
        div.id= object[i].section_id;
        end.push(div.id);
        
        console.log(div.id);
        div.appendChild(document.createTextNode(object[i].title));
        section.innerHTML += ("<br><br><br>");
        section.appendChild(div);
        
        //div.innerHTML += '<div class = "section"> object[i].name </div>'
        } 

        for(var i = 0; i < end.length; i++){
          var div = document.getElementById(end[i]);
          div.onclick = showMessages;
        }
        //update page
        document.getElementById("conversations").style.display = "none";
        document.getElementById("title").innerHTML = "Sections";

      } else {
      div.appendChild(document.createTextNode(JSON.stringify(ERROR)));
      }
    }
  }

}

function showMessages(){
  console.log("id of messages  is " + this.id);
  section= this.id;

  var message = document.getElementById("messages");

  var request = new XMLHttpRequest();
  var target  = '/messages/' + this.id;
  console.log(target);

  request.open('GET', target);
  request.send();

  request.onreadystatechange = function() {
    console.log("state change");

    if (request.readyState === DONE) {
      console.log("ready");
      var div = document.createElement('div');
      if (request.status === OKAY) {
        console.log("okay");
        var object = JSON.parse(request.responseText);
        console.log(object);
        var end = [];

        var length;
        if(object.length){
          length = object.length;
        }
        else{
          length = 1;
          var stuff = object;
          object = [stuff];
        }
        for(var i = 0; i < length; i++){
        console.log(object[i].content);
        var div = document.createElement('div');
        div.className = "talk-bubble talktext tri-right round right-top border";
        
        div.id= i;
        end.push(div.id);
        
        console.log(div.id);
        div.appendChild(document.createTextNode(object[i].content));
        message.innerHTML += ("<br>");
        message.appendChild(div);
        
        } 

        //update page
        document.getElementById("sections").style.display = "none";
        document.getElementById("title").innerHTML = "Messages";
        document.getElementById("section").value = section;

        document.getElementById("text").style.display = "block";

        document.getElementById("send").onclick = addMessage;

      } else {
      div.appendChild(document.createTextNode(JSON.stringify(ERROR)));
      }
    }
  }
}

function addMessage(){
  console.log("may add message ");



  var message = document.getElementById("messages");
  
  var request = new XMLHttpRequest();
  var target  = '/addmessage';
  console.log(target);
  request.open('POST', target);
  request.send();
}
