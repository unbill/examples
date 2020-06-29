const encryptor = require('.')

// This is just a randomly generated RSA public key, use your public key instead.
const publicKeyString = '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj8nl0uJqVulUdM7cBtDA\n' +
    'M3YhXaUOMCgC5NccGBCGblD1SPRcqAT7bFf/zkXuYHITjQ5bRQpOD6bjtf22yuso\n' +
    'ptxCKylkApE5ItRn9q+FCKPQOhQHWNySjkn6V7zDrFsX2FXdxXuwHOnJSwROG2wy\n' +
    '5JI3FVXkXqndjz4MRCqoOzwiQj5r0Rdsibs9LQkr4ol6UfUnJ9AxXfEQiUeN39bd\n' +
    'o28QByZwmSMI8Gy91ygBd/D63ZWGWohTiC3p7+wYZfXjIWjtGZakg0QwtegZIlsv\n' +
    'FJMKyFLPegHEpXNYE5KBV9siZvt+a+pgofBaxoIJCO+wSROz4Tp512f0gNem7kv6\n' +
    'MQIDAQAB\n' +
    '-----END PUBLIC KEY-----'

// Here is a payload to encrypt, this could be any payload related to Biller-Direct / Cardswap
const payload = {
    testField: "testField"
}

encryptor.encrypt({publicKeyString, payload}).then(result => {
    console.log(result)
})




