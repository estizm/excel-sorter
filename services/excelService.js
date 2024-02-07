const ExcelJS = require('exceljs');

class ExcelService {
    async sort(inputFile, outputFile, stepPriority) {
        try {
            const { data, header } = await this.readExcel(inputFile);
            const sortedData = this.sortData(data, stepPriority);
            await this.writeExcel(outputFile, sortedData, header);
            console.log("Process completed");
        } catch (err) {
            console.error('Error:', err);
        }
    }

    async readExcel(inputFile) {
        const workBook = new ExcelJS.Workbook();
        await workBook.xlsx.readFile(inputFile);
        const worksheet = workBook.getWorksheet(1);
        const data = [];
        let header = null;
        let firstRowSkipped = false;
        worksheet.eachRow((row, rowNumber) => {
            if (!firstRowSkipped) {
                header = row.values;
                firstRowSkipped = true;
                return;
            }
            const cell = row.values;
            data.push(cell);
        });
        return { data, header };
    }

    sortData(data, stepPriority) {
        data.sort((a, b) => {
            const positionA = stepPriority.indexOf(a[1]);
            const positionB = stepPriority.indexOf(b[1]);
            if (positionA === -1) return 1;
            if (positionB === -1) return -1;
            return positionA - positionB;
        });
        return data;
    }

    async writeExcel(outputFile, data, header) {
        const newWorkBook = new ExcelJS.Workbook();
        const newSheet = newWorkBook.addWorksheet('Sheet 1');
        newSheet.addRow(header);
        data.forEach(row => {
            newSheet.addRow(row);
        });
        await newWorkBook.xlsx.writeFile(outputFile);
    }
}

module.exports = ExcelService;
