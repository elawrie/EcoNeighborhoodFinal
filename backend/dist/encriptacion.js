"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encriptar = void 0;
var cripto = require("crypto");
var algoritmo = 'aes-256-cbc'; //Using AES encryption
var key = cripto.randomBytes(32);
var iv = cripto.randomBytes(16);
// QUITAR SALT COMO PARAMETRO 
function encriptar(text) {
    // UNCOMMENT ESTA LINEA 
    var salt = cripto.randomBytes(16).toString('hex');
    // Hashing user's salt and password with 1000 iterations, 
    var hash = cripto.pbkdf2Sync(text, salt, 1000, 64, "sha512").toString("hex");
    // console.log(hash);
    return hash;
}
exports.encriptar = encriptar;
