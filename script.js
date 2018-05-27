var value;
var config = {
  apiKey: "AIzaSyBE4vUV63UFSyQ1iI5TJ8OwsLqiBdcd_E4",
  authDomain: "hackreviewer-9f759.firebaseapp.com",
  databaseURL: "https://hackreviewer-9f759.firebaseio.com",
  projectId: "hackreviewer-9f759",
  storageBucket: "hackreviewer-9f759.appspot.com",
  messagingSenderId: "649209123912"
};
firebase.initializeApp(config);

var cards = [];

var query = firebase.database().ref();
  query.on("value", function(dbsnapshot) {
      dbsnapshot.forEach(function(postsnapshot) {
        var titol = postsnapshot.child("post").val(); //esto el titulo
        var url = postsnapshot.child("info/url").val();
        var text = postsnapshot.child("info/text").val();
        var sentiment = parseFloat(postsnapshot.child("info/sentiment").val());
        
        cards.push({titol: titol, sentiment: sentiment, url: url, text: text});
      })
      for (var i=0; i<cards.length; ++i) {
        var card = cards[i];
        posarCard(card.titol, card.sentiment, card.url, card.text);
      }
      cards.sort(function(b, a){
        return a.sentiment - b.sentiment;
      });
   })

function good() {
  $('#linea').html('');
  for (var i=0; i<cards.length; ++i) {
    var card = cards[i];
    if (card.sentiment > 0.5) posarCard(card.titol, card.sentiment, card.url, card.text);
  }
}

function neutral() {
  $('#linea').html('');
  for (var i=0; i<cards.length; ++i) {
    var card = cards[i];
    if (card.sentiment > -0.1 && card.sentiment < 0.3) posarCard(card.titol, card.sentiment, card.url, card.text);
  }
}

function bad() {
  cards.sort(function(b, a){
    return b.sentiment - a.sentiment;
  });
  $('#linea').html('');
  for (var i=0; i<cards.length; ++i) {
    var card = cards[i];
    if (card.sentiment < 0.0) posarCard(card.titol, card.sentiment, card.url, card.text);
  }
}

var rangeSlider = function(){
  var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');
    
  slider.each(function(){

    value.each(function(){
      var value = $(this).prev().attr('value');
      $(this).html(value);
    });

    range.on('input', function(){
      $(this).next(value).html(this.value);
      console.log(this.value );
      if(this.value>60){
        good();}
      else if (this.value<40) bad();
      else neutral()
    });
  });
};

rangeSlider();

function posarCard(titol, sentiment, url, text) {
  var red = parseInt(128-sentiment*127);
  red += 30;
  if (red > 255) red = 255;
  var green = parseInt(128+sentiment*127);
  var num = parseFloat(parseInt((sentiment + 1)*50))/10;
  $('#linea').append('<div class="col-sm-4" align="center">'+
    '<a href='+url+'> <div class="card" style="background-color:rgb('+red+', '+green+', 0); max-width: 25rem;">'+
        '<div class="card-header"><h3>'+titol+'</h3></div> </a>'+
        '<a class="bodycard" href='+url+'> <div class="card-body">'+
          '<p class="card-text">'+text+'</p><hr/>'+
          '<p class="card-text" style = "text-align: center">'+num+'</p>'+
        '</div>'+
      '</div>'+
  '</div> </a>')
}


