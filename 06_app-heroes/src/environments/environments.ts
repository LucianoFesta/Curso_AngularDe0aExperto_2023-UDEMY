export const environments = {
    baseURL: 'http://localhost:3000'
}

//variable de entorno de desarrollo que voy a utilizar.
//Una vez creadas le digo a angular.json que las use y en build utilice las variables de entorno de produccion.
//               "fileReplacements": [
//                {
//                  "replace": "src/environments/environments.ts",
//                  "with": "src/environments/environments.prod.ts"
//                }