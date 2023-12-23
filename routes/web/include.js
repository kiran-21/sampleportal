const { ADDRGETNETWORKPARAMS } = require("dns");

module.exports = function(app){
    require(__dirname + '/home-ejs')(app);
    require(__dirname + '/portal-json')(app);
    require(__dirname + '/dataview-ejs')(app);
    require(__dirname + '/dataview-json')(app);
    require(__dirname + '/dataExcel-json')(app);
    // require(__dirname + '/excelExport.js')(app);
    // include new here 
    // include new here 
  }