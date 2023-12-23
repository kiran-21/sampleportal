const database = require("../../common/db");
const Portal = require("../model/Portal");

module.exports = function (app) {

   const start = 1000;

  const Specialities_with_code = {
    "Pharmacy":"PHARMA",
    "Laboratory":"LAB",
    "Nursing Service":"NURS",
    "Physiotherapy":"PHYSIO",
    "Radiology":"RAD"

  }


  app.post("/create_portal", function (request, response, next) {
    const new_portal = new Portal(request.body);
    if (request.body.constructor === Object && Object.keys(request.body).length === 0) {
      response
        .status(400)
        .send({ error: true, message: "Please provide all required field" });
    }else {

      if(new_portal.Supplier_Category && Object.keys(Specialities_with_code).includes(new_portal.Supplier_Category) ){
        // console.log(new_portal.Supplier_Category);

        database.query(`SELECT COUNT(*) AS Total FROM Portal WHERE Supplier_Category='${new_portal.Supplier_Category}'`, function(error, data){
          if(data){
            let portal_code = data[0].Total;
            let Supplier_ID = Specialities_with_code[new_portal.Supplier_Category]+'_'+ (start + portal_code);

            new_portal.Supplier_ID = Supplier_ID;

            Portal.Create(new_portal, function (err, portal) {
              if (err) {
                response.send(err);
                return;
              }
              response.json({
                error: false,
                message: "Data added successfully!",
                data: portal,
              });
            });

          }else{
            console.log(error);
          }
       
        })
        
        }else{
          response
          .status(400)
          .send({ error: true, message: "Please provide Speciality Details" });
        }

      
    }
  });


  app.get('/get_data_by_ID', function(request, response, next){

    var code = request.query.id;
    var query = `SELECT * FROM Portal WHERE Supplier_ID="${code}"`;

    database.query(query, function(error, data){
        if(error){
            response.json(error);
            return
        }
        response.json(data[0]);
      })
  })


  app.post("/Update_portal", function (request, response, next) {
    const new_portal = new Portal(request.body);
    if (request.body.constructor === Object && Object.keys(request.body).length === 0) {
      response
        .status(400)
        .send({ error: true, message: "Please provide all required field" });
    } else {
  
      Portal.Update(new_portal, function (err, portal) {
        if (err) {
          response.send(err);
          return;
        }
        response.json({
          error: false,
          message: "portal updated successfully!",
          data: portal
        });
      });
  
      
    }
  });

};