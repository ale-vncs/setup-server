import dotEnv from 'dotenv'

const res = dotEnv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

if (res.error) {
  console.error(res.error)
  throw new Error('Variaveis de ambiente não carregada!')
}
