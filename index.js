var nodes7 = require('nodes7');  // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S
var conn = new nodes7;
// var doneReading = false;
// var doneWriting = false;

var variables = {
    // TEST1: 'MR4', 		// Memory real at MD4
    // TEST2: 'M32.2', 		// Bit at M32.2
    // TEST3: 'M20.0', 		// Bit at M20.0
    // TEST4: 'DB1,REAL0.20',	// Array of 20 values in DB1
    // TEST5: 'DB1,REAL4',		// Single real value
    // TEST6: 'DB1,REAL8',		// Another single real value
    // TEST7: 'DB1,INT12.2'		// Two integer value array
    AUX_3:          'M3.0',
    INPUT_1:        'I1.0',
    DB1_COND2:      'DB1,X0.1',
    EMERG_FAULT:    'DB1,X4.0',
    PUMP:           'DB1,X2.0',
    HORN:           'DB1,X2.1',
    HELLO:          'QB0'
};

conn.initiateConnection({ port: 102, host: '192.168.0.1', rack: 0, slot: 2 }, connected); // slot 2 for 300/400, slot 1 for 1200/1500
//conn.initiateConnection({port: 102, host: '192.168.0.2', localTSAP: 0x0100, remoteTSAP: 0x0200, timeout: 8000}, connected); // local and remote TSAP can also be directly specified instead.  The timeout option specifies the TCP timeout.

function connected(err) {
    if (typeof (err) !== "undefined") {
        // We have an error.  Maybe the PLC is not reachable.
        console.log(err);
        process.exit();
    }
    conn.setTranslationCB(function (tag) { return variables[tag]; }); 	// This sets the "translation" to allow us to work with object names
    conn.addItems(Object.keys(variables));
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
    // if (doneWriting) { 
    process.exit();
    // }
}

// function valuesWritten(anythingBad) {
//     if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
//     console.log("Done writing.");
//     doneWriting = true;
//     if (doneReading) { process.exit(); }
// }