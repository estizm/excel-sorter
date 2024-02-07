const ExcelService = require('../services/excelService');

class ExcelController {
    constructor(r1) {
        this.r1 = r1;
        this.excelService = new ExcelService();
    }

    async getPriortyNames() {
        const priorityNames = await this.questionAsync("Enter sort names separated by commas (örn: Manager, Developer): ");
        const priority = priorityNames.split(',');
        const inputFile = await this.questionAsync("Excel: ");
        const outputFile = await this.questionAsync("New Excel: ");
        await this.excelService.sort(inputFile, outputFile, priority);
        this.closeReadline();
    }

    questionAsync(question) {
        return new Promise((resolve, reject) => {
            this.r1.question(question, (answer) => resolve(answer));
        });
    }

    closeReadline() {
        this.r1.close();
    }
}

module.exports = ExcelController;
