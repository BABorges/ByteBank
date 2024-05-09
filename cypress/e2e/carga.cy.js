const { exec } = require('child_process');

describe('Teste de carga executado no cypress', () => {
    it('Teste de carga usando o k6', () => {
        cy.exec('k6 run cypress/e2e/index.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao chamar o teste k6: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Erro ao chamar o teste k6: ${stderr}`);
                return;
            }
            console.log(`Resultado do teste k6: ${stdout}`);
        });
    });
});