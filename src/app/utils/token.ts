import jwt from 'jsonwebtoken'
import crypt from './/crypt'
import { TokenArray, JwtObj } from '@typings/token'

class Token {
  secretKeyToken: string
  SESSION_TIME: number

  constructor () {
    this.secretKeyToken = String(process.env.SECRET_KEY_TOKEN)
    this.SESSION_TIME = Number(process.env.SESSION_TIME)
  }

  generateToken (value: TokenArray, refresh = false): string {
    const obj: JwtObj = {
      key: crypt.encrypt(JSON.stringify(value)).toString()
    }

    return jwt.sign(obj, this.secretKeyToken, {
      algorithm: 'HS256',
      expiresIn: 60 * this.SESSION_TIME * (refresh ? 2 : 1)
    })
  }

  verifyToken (token: string): TokenArray {
    const ff = <JwtObj>jwt.verify(token, this.secretKeyToken)
    return JSON.parse(crypt.decrypt(ff.key))
  }
}

export default new Token()
