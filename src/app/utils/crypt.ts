import bcrypt from 'bcryptjs'
import CryptoJS from 'crypto-js'

class Crypt {
  private salt = bcrypt.genSaltSync(14)
  private secretKey: string;

  constructor () {
    this.secretKey = String(process.env.SECRET_KEY_CRYPT)
  }

  createHash (value: string): string {
    return bcrypt.hashSync(value, this.salt)
  }

  compareHash (value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash)
  }

  encrypt (value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString()
  }

  decrypt (value: string): string {
    return (CryptoJS.AES.decrypt(value.toString(), this.secretKey)).toString(CryptoJS.enc.Utf8)
  }

  compareCrypt (value: string, valueCrypt: string): boolean {
    return (CryptoJS.AES.decrypt(valueCrypt.toString(), this.secretKey)).toString(CryptoJS.enc.Utf8) === value
  }
}

export default new Crypt()
