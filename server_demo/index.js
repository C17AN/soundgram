const mysql = require('mysql');

const connection = mysql.createConnection({
    host : '14.63.194.126',
    port : '33068',
    user : 'root',
    password : '1howtobiz',
    database : 'youngran3rd_D6_PILOT'
});

connection.connect();

connection.query('SELECT * FROM customer_product', (error, rows, fields) => {
    if (error) throw error;
    console.log('data: ', rows);
});

connection.end();
