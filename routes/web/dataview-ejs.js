const mysql = require("../../common/db");


module.exports = function(app){
    // use res.render to load up an ejs view file
    
    app.get(['/datatable', '/datatable.html'],  function(req, res) {
      
      //  mysql.query("SELECT * from Doctor " , (err , data ) =>{
      //   if(err ){
      //     console.log(err);
      //     return
      //   }
      //   console.log(data)

      //   callback(data);
      //  })
      callback();
        function callback(data = []){
          res.render('datatable',{data:data});
          
        }
      
      });
    
    
    }