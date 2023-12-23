module.exports = function(app){
    // use res.render to load up an ejs view file
    
    app.get(['/home', '/home.html'],  function(req, res) {
      
        callback();
      
        function callback(){
          res.render('index',{});
          
        }
      
      });
    
    
    }