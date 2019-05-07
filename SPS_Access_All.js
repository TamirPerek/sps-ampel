var nodes7 = require('nodes7');  // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S
var conn = new nodes7;
var doneReading = false;
var doneWriting = false;

var currentValues = [];

const fs = require('fs');
var content;
// First I want to read the file
fs.readFile('C://Users//Oster//Desktop//PLCTags.xml', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;
    processFile();          // Or put the next step in a function and invoke it
});

var rawData = [];
function processFile() {
    var xml2js = require('xml2js');
    
    var parser = new xml2js.Parser();
    parser.parseString(content, function(err,result){
        //Extract the value from the data element
        result['Tagtable']['Tag'].forEach(element => {
            var jsonObj = JSON.parse(JSON.stringify(element));
            //create small object for the needed information
            var rawDataEntry = {
                name: jsonObj["_"],
                address: jsonObj["$"]["addr"].replace('%', ''),
                type: parseDataType(jsonObj["$"]["type"])
            };

            //console.log(rawDataEntry.name + " equals Lampe H1.1? =" + (rawDataEntry.name === "Lampe H1.1"));

            rawData.push(rawDataEntry);
        });
    });

};


conn.initiateConnection({ port: 102, host: '192.168.0.1', rack: 0, slot: 2 }, connected); // slot 2 for 300/400, slot 1 for 1200/1500
//conn.initiateConnection({port: 102, host: '192.168.0.2', localTSAP: 0x0100, remoteTSAP: 0x0200, timeout: 8000}, connected); // local and remote TSAP can also be directly specified instead.  The timeout option specifies the TCP timeout.

function connected(err) {
    if (typeof (err) !== "undefined") {
        // We have an error.  Maybe the PLC is not reachable.
        console.log(err);
        process.exit();
    }
    conn.setTranslationCB(function (tag) { 

        console.log("Searching translation for tag -> " + tag);    

        for(let element of rawData)
        {
            console.log("if '" + tag + "' === '" + element.name+"' = " +  (tag === element.name));
            if((tag === element.name) == true)
            {
                return element.address;
            }
        }

     }); 	// This sets the "translation" to allow us to work with object names
    rawData.forEach(element=>{
        conn.addItems(element.name);
    });
    
    // conn.addItems('TEST6');
    // //	conn.removeItems(['TEST2', 'TEST3']);  // We could do this.
    // //	conn.writeItems(['TEST5', 'TEST6'], [ 867.5309, 9 ], valuesWritten);  // You can write an array of items as well.
    // conn.writeItems('TEST7', [666, 777], valuesWritten);  // You can write a single array item too.
    conn.readAllItems(valuesReady);
}

function valuesReady(anythingBad, values) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
    console.log(values);
    // doneReading = true;
    //if (doneWriting) { 
        currentValues = values;
        Sleep(1000);
        conn.readAllItems(valuesReady);
	//}
}

function valuesWritten(anythingBad) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
    console.log("Done writing.");
    doneWriting = true;
    if (doneReading) { process.exit(); }
}

function parseDataType(value)
{
    switch(value){
        case "Bool":
            return "X";
        break;
    }
}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
   }

   var methods = {
	timestamp: function() {
		console.log('Current Time in Unix Timestamp: ' + Math.floor(Date.now() / 1000));
	},
	currentDate: function() {
		console.log('Current Date is: ' + new Date().toISOString().slice(0, 10));
	}
}

var methods = {
	readAllValues: function() {
		return currentValues;
	}
}

exports.data = methods;