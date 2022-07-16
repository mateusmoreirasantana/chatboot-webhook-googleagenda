const express = require('express');
const app= express();


app.use(express.static('public'));

app.get('/',function(request,response){
    response.send("Teste plataforma");
  
});



var port = process.env.PORT || 3000;
const listener = app.listen(port, function(){
  console.log('Your app is listeninf on port no' + listener.address().port0);
});