const mustacheExpress = require('mustache-express');
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const bodyParser = require('body-parser');
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port',(process.env.PORT || 8000))



// __HOME PAGE ROUTES__//
app.get('/', (req,res) => {
  res.render('home')
})

app.get('/home', (req,res) => {
  res.render('home')
})

app.post('/ContactForm', function (req, res) {
  console.log("this is firing")
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: 'richardlorenzini1@gmail.com',
    subject: req.body.subject,
    text:
    `
    name: ${req.body.name}
    email:(${req.body.email})
    subject: (${req.body.subject})
    message:(${req.body.address})

    `
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.redirect('/home');
    }
    else {
      res.redirect('/home');
    }
  });
});




app.listen(app.get('port'), function(){
  console.log("we are live on port ", app.get('port'));
});
