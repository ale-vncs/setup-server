import * as path from 'path'
import moduleAlias from 'module-alias'

const files = path.resolve(__dirname, '..', '..', '..')

moduleAlias.addAliases({
  '@src': path.join(files, 'src'),
  '@test': path.join(files, 'test'),
  '@utils': path.join(files, 'src', 'app', 'utils'),
  '@services': path.join(files, 'src', 'app', 'services'),
  '@models': path.join(files, 'src', 'app', 'models'),
  '@enums': path.join(files, 'src', 'app', 'enums'),
  '@logger': path.join(files, 'src', 'logger'),
  '@typings': path.join(files, 'typings')
})
