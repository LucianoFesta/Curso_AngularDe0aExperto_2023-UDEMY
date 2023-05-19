const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

const targetPath = './src/environments/environment.ts';

const envFileContent = `
    export const environment = {
        mapbox_key: "${ process.env['MAPBOX_KEY'] }",
        otra: "PROPIEDAD"
    };
`;

mkdirSync('./src/environments', {recursive: true}); //Crea la carpeta y la sobreescribe si existe.
writeFileSync( targetPath, envFileContent );

//Para llamar esto la variable de entorno voy al package.json en lo agrego en scripts.

