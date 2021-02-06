import tokenUtils from '@utils/token'
import { generateToken, TokenArray } from '@typings/token'

class TokenService {
  generateUserToken (id: string): generateToken {
    const { token, refreshToken } = TokenService.generateToken(id, 'USER')

    return {
      token,
      refreshToken
    }
  }

  generateAdminToken (id: string): generateToken {
    const { token, refreshToken } = TokenService.generateToken(id, 'ADMIN')

    return {
      token,
      refreshToken
    }
  }

  private static generateToken (id: string, type: TokenArray['type']): generateToken {
    const token = tokenUtils.generateToken({
      id,
      type
    })

    const refreshToken = tokenUtils.generateToken({
      id,
      token,
      type
    }, true)

    return {
      token,
      refreshToken
    }
  }
}

export default new TokenService()
