var config = {
  apiKey: "AIzaSyBE4vUV63UFSyQ1iI5TJ8OwsLqiBdcd_E4",
  authDomain: "hackreviewer-9f759.firebaseapp.com",
  databaseURL: "https://hackreviewer-9f759.firebaseio.com",
  projectId: "hackreviewer-9f759",
  storageBucket: "hackreviewer-9f759.appspot.com",
  messagingSenderId: "649209123912"
};
firebase.initializeApp(config);

var query = firebase.database().ref();
  query.on("value", function(dbsnapshot) {
      dbsnapshot.forEach(function(postsnapshot) {
        var titol = postsnapshot.child("post").val(); //esto el titulo
        var url = postsnapshot.child("info/url").val();
        var text = postsnapshot.child("info/text").val();
        var sentiment = parseFloat(postsnapshot.child("info/sentiment").val());

        posarCard(titol, sentiment, url, text);
      })
   })

function posarCard(titol, sentiment, url, text) {
  console.log(sentiment)
  var red = parseInt(128-sentiment*127);
  red += 30;
  if (red > 255) red = 255;
  var green = parseInt(128+sentiment*127);
  $('#linea').append('<div class="col-sm-4">'+
    '<div class="card" style="background-color:rgb('+red+', '+green+', 0); max-width: 18rem;">'+
        '<div class="card-header"><h3>'+titol+'</h3></div>'+
        '<div class="card-body">'+
          '<p class="card-text">'+text+'</p><hr/>'+
          '<p class="card-text">'+sentiment+'</p>'+
        '</div>'+
      '</div>'+
  '</div>')
}