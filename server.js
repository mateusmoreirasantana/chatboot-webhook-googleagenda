const express = require('express');
const app= express();


app.use(express.static('public'));
const google = require('googleapis')
const calendarId = 'kourt0ps87nnpe15sed9uknvv4@group.calendar.google.com';
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

  try {
  let intentName = request.body.queryResult.intent.displayName;
  
  if(intentName ==="agendamento-sim")
  {
      let nome = request.request.body.queryResult.parameters['nome'];
      let procedimento = request.request.body.queryResult.parameters['procedimento'];
      let data = request.request.body.queryResult.parameters['data'];
      let horas = request.request.body.queryResult.parameters['horas'];

      const dateTimeStart = new Date(Date.parse(data.split('T')[0] + 'T' +horas.split('T')[1].split('-')[0] +timeZoneOffset));
      const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours + 1));
      const agendamentoString  = formatData( new Date(data.split('T')[0])  ) +  " as " + horas.split('T')[1].split('-')[0];
  
      return criarEventoCallendario(dateTimeStart,dateTimeEnd,nome,procedimento).then(() => {

        let mensagem ="Pronto seu serviço esta agendado para " +agendamentoString;
        console.log(mensagem)
        response.json({"fullfillmentText":mensagem})
      }).catch(() => {
        let mensagem ="Desculpe, não temos vaga para  " +agendamentoString;
        console.log(mensagem)
        response.json({"fullfillmentText":mensagem});
      });
  
  
    }
  } catch (err) {
    console.error(err.message);
  }


});



function criarEventoCallendario(dateTimeStart,dateTimeEnd,nome,procedimento)
{
    return new Promise((resolve,reject) => {
      calendar.events.list({
        auth:serviceAccountAuth,
        calendarId:calendarId,
        timeMin:dateTimeStart.toISOString(),
        timeMax:dateTimeEnd.toISOString(),
      })
    }),(err, calendarResponse) =>{

      if(err || calendarResponse.data.items.length > 0)
      {
        reject(err || new Error('Requisição conflita com outros agendamentos'))
      }
      else {
        calendar.events.insert({
          auth:serviceAccountAuth,
          calendarId:calendarId,
          resource: {summary:procedimento,description:'['+nome+']['+procedimento+']',
          start:{datetime:dateTimeStart},
          end: {datetime:dateTimeEnd},}
        },(err,event) =>{
          err ? reject(err) : resolve(event)
        }
        );
      }
    }
}

function formatData (date)
{
  var nomeMes  =[
    "Janeiro","Fevereiro","Março",
    "Abril","Maio","Junho","Julho",
    "Agosto","Setembro","Outubro",
    "Novembro","Dezembro"
  ]
var dia = date.getDate()
var mesIndex = date.GetMonth();
var ano = date.getFullYear();

return dia + ' ' + nomeMes[mesIndex] + ' ' +ano;

}
var port = process.env.PORT || 3000;
const listener = app.listen(port, function(){
  console.log('Your app is listeninf on port no' + listener.address().port0);
});