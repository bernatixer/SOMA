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
  query.once("value") //accede a la db una vez
    .then(function(dbsnapchot) {
      dbsnapshot.forEach(function(postsnapshot) {
          postsnapshot.child("sentiment").val();
          postsnapshot.child("url").val();
          postsnapshot.child("text").val();
      })
  })


  var para = document.createElement("P");                       // Create a <p> element
var t = document.createTextNode("This is a paragraph");       // Create a text node
para.appendChild(t);                                          // Append the text to <p>
document.body.appendChild(para);                              // Append <p> to <body>


  var element;
  var val;
  val = Math.floor((val+1)*5/2);

  element.classList.add('.positive-' + val)

  }



