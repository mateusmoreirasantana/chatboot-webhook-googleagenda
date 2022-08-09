const express = require('express');
var bodyParser = require('body-parser')
const app= express();

app.use(bodyParser.json())

app.use(express.static('public'));
var {google} = require("googleapis");
const calendarIdNeide = 'kourt0ps87nnpe15sed9uknvv4@group.calendar.google.com';
const calendarIdAline = 'iq7dk6srstmn8ms88ef60j8eio@group.calendar.google.com'
const serviceAccount =  {
  "type": "service_account",
  "project_id": "meirellescabelos-dhua",
  "private_key_id": "64778f91ce50e4f4b2ac3d5abd5692b9d4a2bf53",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDooVbiNeHKJuf4\nNl+LL6saw5QKo6h4EgPerMDxxKqwOoxH6vvgkZekJHKYgjgmkkeWMBDSjqZZ2AV7\nX3T/WRDGLbUZ8edaj9lACQrTd46uCxLR6ijliWqeWYz3ASvrn9JEicMu2vZCobFd\nF7XbdvNvFsc2mzeF2jlf061saV+2gRaFcngpvu51hvp4SZtA8Iy5wyrMjX7/wxra\nMJi14/PPQFZeDwzvgRVtDGoLANTKNJ8XDSewzCgPMc4p78cfUUrzB33aJEwri7to\nOig1KzXvvWQJlN86VvefO1YGvh91MIdChvqyh0EaEa94Ht9BuSplb5nkDHqee8bA\n49SpaAllAgMBAAECggEAAc2eWsqIIYUDr0zcmLuZ2+9AKoTyPVwGY6d7J2Sa3hrW\nE4iiwy7dugv+R2ha/xGLNILS3o70gyXFhRtMUN5j3uVjzfuuC2mqCXEIgHMgzACR\n+MaT4pOaG/gdu5xqtrzaaGWY+bgAyKtwMISKiFT3thi7GpVBbOwwHaoKYhi/AS8j\nMB1lhKzcH461t0CluyN1uGtt2J73AMTB+WLbMmrl9Z7KjliFzwrZcpSq4Kz/LNFq\nERXkNNuPs2ckVqrTEAq/5CmxY210GOIyQFkGmpEw+/0MKmncBfRsXKDUs5kpQSi+\nz+a1X7UksTwyGrzns3bzxKRyERYMsEYOBmL4x5DcAQKBgQD+68FFMJWTyV85TblA\nK5iAs+7wGzYC/yzJ1aIuT3/gblqMi8P0/2pzHiDE4wZoFg3PcOi7YceUK6fu9c/A\nMoie17qL0NnLOboFDgsaL3BZIdbxOmLo+x4w0ROKDjHXGhqWvffpvJ4HmpV3LAoa\nspI/K487w8tRw4/fYTZRsYgAQQKBgQDpnW3bQIexI6wm+wLB/pISIXhg93v1FN2A\nULx75lfKjN2i8wJy3Z1xNapoAb4HAHP4uE4aSxp4MLhdSLRSFC+CUvF0fsm8PUMH\nt0XBoQu37SDT1jzUEqZ5rU1tA7Qq905lGvlCIwE2SJzN//tZiciQuMLIMFJoMDdY\nCH+R0MAAJQKBgGnQ6tURqcVC3agnvzIH5rHl/tTkNrNfwPO3Hi8jCO3cYPHeQmU8\ncK+AXhHcOxiRrwHg2HqPyAyVYowqtSYO0+87lU/cTcuyFqlqfulLr9MP3O0dU1lq\ng8m3v+iao82qJEdWa8Y2aVK2tDxXp4oVfeeC6V3hlFBIYTxUWfvnOZEBAoGAL/ys\nkjsBJHvlYuRwvpSiQKMrbQ+pIMC2dyMedHzuT6b75/ru59Vp/9U8Ob0R4bJQICkL\nsg73UvT/CfpjP/DxiV2sR3e7zLTwzebxp0KDe7Zz5c++Evn5xEi6/Mej/KdsLQyL\nYvB50UK9IvuQD+ZjkobBTAnRA6HT3HtyaOtuZRkCgYEA5WJqI4pp5q7RMSJc+cPV\nzSnRxQio8KTLdVdC+jT0Se2ZuPelqBtmk/NHrn56AiiCCKL/GKkIK5Za+qilcExg\nXkbrISwOen1TFyy7Al0VesMu83NO9bjhj94Omb2zVColmZjGPVilxedW5NTCiBmv\n3dK/F/F6XtodVCmWCHfdO4o=\n-----END PRIVATE KEY-----\n",
  "client_email": "meirellescabelos@meirellescabelos-dhua.iam.gserviceaccount.com",
  "client_id": "100068328313610732428",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/meirellescabelos%40meirellescabelos-dhua.iam.gserviceaccount.com"
};

const timeZoneOffset = "-03:00";

const serviceAccountAuth = new google.auth.JWT({
    email:serviceAccount.client_email,
    key:serviceAccount.private_key,
    scopes:  'https://www.googleapis.com/auth/calendar'
});

const calendar =  google.calendar('v3')


app.get('/',function(request,response){
    response.send("Teste plataforma");
  
});

app.post('/meirellescabelos',function(request,response){

  console.log(JSON.stringify(request.body))
  try {
  let intentName = request.body.queryResult.intent.displayName;
 
  if(intentName ==="agendamento-sim-cabelo")
  {
      let nome = request.body.queryResult.parameters['nome'];
      let procedimento = request.body.queryResult.parameters['procedimento'];
      let data = request.body.queryResult.parameters['data'];
      let horas = request.body.queryResult.parameters['hora'];

      const dateTimeStart = new Date(Date.parse(data.split('T')[0] + 'T' +horas.split('T')[1].split('-')[0] + timeZoneOffset));
      const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
      const agendamentoString  = formatData(dateTimeStart ) +  " as " + horas.split('T')[1].split('-')[0];
      console.log(data);
      console.log(dateTimeStart);
  console.log(dateTimeEnd)
      return criarEventoCallendario(dateTimeStart,dateTimeEnd,nome,procedimento,calendarIdNeide).then(() =>  {
        let mensagem ="Agendamento Concluído para " +agendamentoString + " Com a profissional Neide, Em caso de não comparecimento nos avise com antecedência, Obrigado!";
        console.log(mensagem)
        response.json({
          "fulfillmentMessages": [
            {
              "text": {
                "text": [
                  mensagem
                ]
              }
            }
          ]
        })
      }).catch(() => {
        let mensagem ="Desculpe, não temos vaga para  " +agendamentoString;
        console.log(mensagem)
        response.json({
          "fulfillmentMessages": [
            {
              "text": {
                "text": [
                  mensagem
                ]
              }
            }
          ]
        })
      });
  
  
    }
    else if(intentName ==="agendamento-sim-manicure")
    {
        let nome = request.body.queryResult.parameters['nome'];
        let procedimento = request.body.queryResult.parameters['procedimento'];
        let data = request.body.queryResult.parameters['data'];
        let horas = request.body.queryResult.parameters['hora'];
  
        const dateTimeStart = new Date(Date.parse(data.split('T')[0] + 'T' +horas.split('T')[1].split('-')[0] + timeZoneOffset));
        const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
        const agendamentoString  = formatData(dateTimeStart ) +  " as " + horas.split('T')[1].split('-')[0];
        console.log(data);
        console.log(dateTimeStart);
    console.log(dateTimeEnd)
        return criarEventoCallendario(dateTimeStart,dateTimeEnd,nome,procedimento,calendarIdAline).then(() =>  {
          let mensagem ="Agendamento Concluído para " +agendamentoString + " Com a profissional Aline, Em caso de não comparecimento nos avise com antecedência, Obrigado!";;
          console.log(mensagem)
          response.json({
            "fulfillmentMessages": [
              {
                "text": {
                  "text": [
                    mensagem
                  ]
                }
              }
            ]
          })
        }).catch(() => {
          let mensagem ="Desculpe, não temos vaga para  " +agendamentoString;
          console.log(mensagem)
          response.json({
            "fulfillmentMessages": [
              {
                "text": {
                  "text": [
                    mensagem
                  ]
                }
              }
            ]
          })
        });
    
    
      }
      else if(intentName ==="agendamento-sim-ambos")
      {
          let nome = request.body.queryResult.parameters['nome'];
          let procedimento = request.body.queryResult.parameters['procedimento'];
          let data = request.body.queryResult.parameters['data'];
          let horas = request.body.queryResult.parameters['hora'];
    
          const dateTimeStart = new Date(Date.parse(data.split('T')[0] + 'T' +horas.split('T')[1].split('-')[0] + timeZoneOffset));
          const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
          const agendamentoString  = formatData(dateTimeStart ) +  " as " + horas.split('T')[1].split('-')[0] ;
          console.log(data);
          console.log(dateTimeStart);
      
          return criarEventoCallendarioAmbas(dateTimeStart,dateTimeEnd,nome,procedimento).then(() =>  {
            let mensagem ="Agendamento Concluído para " +agendamentoString + " Com as profissionais Aline e Neide, Em caso de não comparecimento nos avise com antecedência, Obrigado!";
            console.log(mensagem)
            response.json({
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                      mensagem
                    ]
                  }
                }
              ]
            })
          }).catch(() => {
            let mensagem ="Desculpe, não temos vaga para  " +agendamentoString;
            console.log(mensagem)
            response.json({
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                      mensagem
                    ]
                  }
                }
              ]
            })
          });
      
      
        }
  } catch (err) {
    console.error(err);
  }


});





function formatData (data)
{ 
  console.log(data)
  var nomeMes  =[
    "Janeiro","Fevereiro","Março",
    "Abril","Maio","Junho","Julho",
    "Agosto","Setembro","Outubro",
    "Novembro","Dezembro"
  ]
var dia = data.getDate()
var mesIndex = data.getMonth();
var ano = data.getFullYear();

return dia + ' ' + nomeMes[mesIndex] + ' ' +ano;

}


function criarEventoCallendario(dateTimeStart,dateTimeEnd,nome,procedimento,calendarId)
{ 
   var start = dateTimeStart;
   var end  =dateTimeEnd;
   const auth = new google.auth.GoogleAuth({
    keyFile: 'meirellescabelos-dhua-64778f91ce50.json',
    scopes: 'https://www.googleapis.com/auth/calendar', //full access to edit calendar
  });
    return new Promise((resolve,reject) => {
      calendar.events.list({
        auth:serviceAccountAuth,
        calendarId:calendarId,
        timeMin:dateTimeStart.toISOString(),
        timeMax:dateTimeEnd.toISOString(),
      }
    ,(err, calendarResponse) =>{
 
      if(err || calendarResponse.data.items.length > 0)
      { 
        console.log(err)
        reject(err || new Error('Requisição conflita com outros agendamentos'))
      }
      else {
   
        auth.getClient().then(a=>{ calendar.events.insert({
          auth:serviceAccountAuth,
          calendarId:calendarId,
          resource: {summary:nome ,description:'Procedimento:['+procedimento+']',
          start:{
            dateTime: start,
          
        
        
           },
          end: {
               dateTime: end,
           
        }}
        },(err,event) =>{
            console.log(err)
            console.log(event)

  
          err ? reject(err) : resolve(event)
        }
        );
      })
   
    }
});
});
}
function criarEventoCallendarioAmbas(dateTimeStart,dateTimeEnd,nome,procedimento)
{ 
   var start = dateTimeStart;
   var end  =dateTimeEnd;
   const auth = new google.auth.GoogleAuth({
    keyFile: 'meirellescabelos-dhua-64778f91ce50.json',
    scopes: 'https://www.googleapis.com/auth/calendar', //full access to edit calendar
  });
    return new Promise((resolve,reject) => {
      calendar.events.list({
        auth:serviceAccountAuth,
        calendarId:calendarIdNeide,
        timeMin:dateTimeStart.toISOString(),
        timeMax:dateTimeEnd.toISOString(),
      }
    ,(err, calendarResponse) =>{
 
      if(err || calendarResponse.data.items.length > 0)
      { 
        console.log(err)
        reject(err || new Error('Requisição conflita com outros agendamentos'))
      }
      else {
          

        calendar.events.list({
          auth:serviceAccountAuth,
          calendarId:calendarIdAline,
          timeMin:dateTimeStart.toISOString(),
          timeMax:dateTimeEnd.toISOString(),
        }
      ,(err, calendarResponse) =>{
   
        if(err || calendarResponse.data.items.length > 0)
        { 
          console.log(err)
          reject(err || new Error('Requisição conflita com outros agendamentos'))
        }
        else {
     
          auth.getClient().then(a=>{ calendar.events.insert({
            auth:serviceAccountAuth,
            calendarId:calendarIdNeide,
            resource: {summary:nome ,description:'Procedimento:['+procedimento+']',
            start:{
              dateTime: start,
            
          
          
             },
            end: {
                 dateTime: end,
             
          }}
          },(err,event) =>{
              console.log(err)
              console.log(event)
  
    
            if(!err){
              auth.getClient().then(a=>{ calendar.events.insert({
                auth:serviceAccountAuth,
                calendarId:calendarIdAline,
                resource: {summary:nome ,description:'Procedimento:['+procedimento+']',
                start:{
                  dateTime: start,
                
              
              
                 },
                end: {
                     dateTime: end,
                 
              }}
              },(err,event) =>{
                  console.log(err)
                  console.log(event)
      
        
                err ? reject(err) : resolve(event)
              }
              );
            })
            } 
          }
          );
        })
     
      }
  });
    }
});
});
}
var port = process.env.PORT || 3000;
const listener = app.listen(port, function(){
  console.log('Your app is listeninf on port no' + listener.address().port0);
});