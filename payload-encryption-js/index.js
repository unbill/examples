const { isString } = require('lodash')
const NodeRsa = require('node-rsa')
const { createCipheriv, randomBytes } = require('crypto')

const algorithm = 'aes-256-ctr'
const inputEncoding = 'utf8'
const outputEncoding = 'base64'

/**
 * Performs full payload encryption based using AES to encrypt the payload
 * and RSA to encrypt the resultant AES key
 * @param {any} payload The payload to encrypt
 * @param {String} publicKeyString The RSA public key to use for encryption in string format
 */
exports.encrypt = async ({ publicKeyString, payload }) => {
    // Stringify the payload if required
    const stringPayload = isString(payload) ? payload : JSON.stringify(payload)

    // Encrypt the payload with AES
    const aesEncryptionResult = encryptAES(stringPayload)
    // Concatenate the AES key and iv
    const aesKeyPlusVi = `${aesEncryptionResult.key}|${aesEncryptionResult.iv}`

    // Now Encrypt the AES key and iv with RSA
    const publicKey = new NodeRsa()
    publicKey.importKey(publicKeyString, 'pkcs8-public')
    const encryptedAesInfo = publicKey.encrypt(aesKeyPlusVi, 'base64')

    // Prepend the encrypted AES info to the resultant message
    return `${encryptedAesInfo}|${aesEncryptionResult.encryptedText}`
}

/**
 * Encrypt using an initialization vector
 * @param {string} value to encrypt
 */
const encryptAES = (value) => {
    const iv = Buffer.from(randomBytes(16))
    const key = Buffer.from(randomBytes(32))
    const cipher = createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(value, inputEncoding, outputEncoding)
    encrypted += cipher.final(outputEncoding)
    return {
        key: key.toString('base64'),
        iv: iv.toString('base64'),
        encryptedText: encrypted.toString(),
    }
}
