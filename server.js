const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express()
const port = 3000
// const port = process.env.PORT || 3000 //choose env port or 3000 
// set the view engine to ejs
// app.set('views', __dirname + '/views');
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(bodyParser.json({ limit: '20mb'}));   //json data size limiting
app.use(express.static(__dirname + '/public')); 

require('./routes/web/include')(app);


app.get('/', (req, res) => {
  res.redirect('/home')
})
app.get('/getdoctors', (req, res) => {  //end point calling
  console.log(req);
    res.send('Hello Worldtest!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})