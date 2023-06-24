const cripto=require("crypto");
const algoritmo = 'aes-256-cbc'; //Using AES encryption
const key = cripto.randomBytes(32);
const iv = cripto.randomBytes(16);

// QUITAR SALT COMO PARAMETRO 
export function encriptar(text:string){
    // UNCOMMENT ESTA LINEA 
    let salt = cripto.randomBytes(16).toString('hex'); 
    // Hashing user's salt and password with 1000 iterations, 
     
    let hash = cripto.pbkdf2Sync(text, salt,  1000, 64, `sha512`).toString(`hex`); 
    // console.log(hash);
    return hash;
}