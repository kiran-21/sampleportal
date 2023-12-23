const database = require("../../common/db");


module.exports = function(app){ 
    app.get('/get_data', function(request, response, next){

        var draw = request.query.draw;
    
        var start = request.query.start;
    
        var length = request.query.length;
    
        var order_data = request.query.order;
    
        if(typeof order_data == 'undefined')
        {
            var column_name = 'Portal.Supplier_ID';
    
            var column_sort_order = 'desc';
        }
        else
        {
            var column_index = request.query.order[0]['column'];
    
            var column_name = request.query.columns[column_index]['data'];
    
            var column_sort_order = request.query.order[0]['dir'];
        }
    
        //search data
    
        var search_value = request.query.search['value'];
    
        // var search_query = `
        //  AND (First_Name LIKE '%${search_value}%' 
        //   OR customer_last_name LIKE '%${search_value}%' 
        //   OR customer_email LIKE '%${search_value}%' 
        //   OR customer_gender LIKE '%${search_value}%'
        //  )
        // `;
        // var search_query = ` AND (Doctor_Code LIKE '%${search_value}%' )`
        var search_query = ` AND (Supplier_Category LIKE '%${search_value}%') 
                            OR (Supplier_Name LIKE '%${search_value}%')`
                           
    
        //Total number of records without filtering
    
        database.query("SELECT COUNT(*) AS Total FROM Portal", function(error, data){
    
            var total_records = data[0].Total;
    
            //Total number of records with filtering
    
            database.query(`SELECT COUNT(*) AS Total FROM Portal WHERE 1 ${search_query}`, function(error, data){
    
                var total_records_with_filter = data[0].Total;
    
                var query = `
                SELECT * FROM Portal 
                WHERE 1 ${search_query} 
                ORDER BY ${column_name} ${column_sort_order} 
                LIMIT ${start}, ${length}
                `;
    
                var data_arr = [];
    
                database.query(query, function(error, data){
                    if(error){
                        response.json(error);
                        return
                    }
    
                    data.forEach(function(row){
                        data_arr.push({
                            'Supplier_ID' : row.Supplier_ID,
                            'Supplier_Category' : row.Supplier_Category,
                            'Supplier_Name' : row.Supplier_Name,
                            'Mobile_Number' : row.Mobile_Number
                        });
                    });
    
                    var output = {
                        'draw' : draw,
                        'iTotalRecords' : total_records,
                        'iTotalDisplayRecords' : total_records_with_filter,
                        'aaData' : data_arr
                    };
                    console.log(output);
                    response.json(output);
    
                });
    
            });
    
        });
    
    });
}


