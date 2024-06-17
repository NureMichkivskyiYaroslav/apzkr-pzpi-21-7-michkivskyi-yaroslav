const jwt = require("jsonwebtoken");
const {secret} = require("../config");
function generateJWT (role, identifier, name){
    const payload = {
        role,
        identifier,
        name
    }
    return jwt.sign(payload, secret, {expiresIn:'10d'})
}
module.exports = {generateJWT}