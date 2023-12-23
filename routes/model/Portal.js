const { threadId } = require("worker_threads");
const mysql = require("../../common/db");

const Portal = function (portal) {
    
  this.Supplier_ID = portal.Supplier_ID;
  this.Supplier_Category = portal.Supplier_Category;
  this.Supplier_Name = portal.Supplier_Name;
  this.Supplier_Address = portal.Supplier_Address;
  this.Contact_Person = portal.Contact_Person;
  this.Email_ID = portal.Email_ID;
  this.Mobile_Number = portal.Mobile_Number;
  this.Gst_Number = portal.Gst_Number;
  this.Drug_Licenses = portal.Drug_Licenses;
  this.Credit_Period = portal.Credit_Period;
  this.Terms_Conditions = portal.Terms_Conditions;
  this.Terms_Payment = portal.Terms_Payment;
  this.Terms_Dispatch = portal.Terms_Dispatch;

  
};

Portal.Create = function (newPortal, result) {
  console.log(newPortal); 
  mysql.query("INSERT INTO Portal set ?", newPortal, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Portal.Update = function(newPortal, result){
  console.log(newPortal); 
  mysql.query("UPDATE  Portal set ? WHERE Supplier_ID = ?",[newPortal ,newPortal.Supplier_ID ], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });

};

module.exports= Portal;