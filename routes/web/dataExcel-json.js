const database = require("../../common/db");


module.exports = function(app){ 
    app.get('/get_dataExcel', function(request, response, next){

        var search = request.query.search; 
        console.log(search);
    
      
        var search_query = ` AND (Supplier_Name LIKE '%${search}%') OR (Supplier_Name LIKE '%${search}%')`
                var query = `SELECT * FROM Portal WHERE 1 ${search_query}`;
    
                var data_arr = [];
    
                database.query(query, function(error, data){
                    if(error){
                        response.json(error);
                        return
                    }
                    
                    data.forEach(function(row){
                        data_arr.push({
                            'Supplier_ID' : row.Supplier_ID,
                            'Supplier_Name' : row.Supplier_Name,
                            'Supplier_Address' : row.Supplier_Address,
                            'Contact_Person' : row.Contact_Person,
                            'Email_ID' : row.Email_ID,
                            'Mobile_Number'  : row.Mobile_Number,

                            'Gst_Number' : row.Gst_Number,
                            'Drug_Licenses' : row.Drug_Licenses,
                            'Credit_Period' : row.Credit_Period,
                            'Terms_Conditions' : row.Terms_Conditions,
                            'Terms_Payment' : row.Terms_Payment,
                            'Terms_Dispatch'  : row.Terms_Dispatch,
                            'Supplier_Category'  : row.Supplier_Category

                        });
                    });
    
                    var output = {'Data' : data_arr
                    };
                    console.log(output);
                    response.json(output);
    
                });
    
    
    });
}


