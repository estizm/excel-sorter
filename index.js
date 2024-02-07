const readline = require('readline');
const ExcelSorter = require('./controllers/excelController');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const excelSorter = new ExcelSorter(r1);
excelSorter.getPriortyNames();
