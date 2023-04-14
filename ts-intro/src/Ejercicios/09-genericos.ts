/*
    ===== Código de TypeScript =====
*/

//Un dato que puede variar, por ej pido un dato por back y lo muto en otra cosa. Los genericos los utilizamos en esos casos cuando queremos otro tipo de dato por retornar.

function queTipoSoy<T>(argumento: T){
    return argumento;
}

let soyString = queTipoSoy('Hola Mundo');
let soyNumero = queTipoSoy(100);



