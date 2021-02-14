export const messages = {
  tokenInvalid: 'Token Inválido.',
  tokenNotFound: 'Sem token de acesso.',
  //= ===========================================================================================
  badRequest: 'Erro no requisição.',
  validationError: 'Erro na validação.',
  cantDeleteAdmin: 'Não pode tirar o admin da conta principal.',
  loginFailed: 'Usuário ou Senha incorreta.',
  notYourselfDelete: 'Não se pode auto deletar.',
  cantChangeRoleAdmin: 'Sem autorização para trocar cargo do admin.',
  cantGiveAdmin: 'Sem autorização para entregar cargo de admin.',
  reconnectError: 'Erro na reconexão. Por favor, faça o login novamente.',
  imageProfileUpdated: 'Imagem de perfil atualizada.',
  connectionDatabaseError: 'Erro na conexão com o banco',
  sessionExpired: 'Sua sessão expirou',
  sessionError: 'Error a criar sessão do usuário',
  unknownError: 'Um erro desconhecido ocorreu',
  requestDone: 'Requisição concluida.',
  methodNotFound: 'Método não encontrado.',
  dependentNotFound: 'Dependência não encontrada.',
  errorOnCompressImage: 'Error ao comprimir imagem',
  varEnvNotSetup: 'Variaveis de ambiente não setados',
  //= ===========================================================================================
  userNotAuthorization: 'Usuário não autorizado.',
  //= ===========================================================================================
  genderNotFound: 'Gênero não encontrado',
  //= ===========================================================================================
  playerCreatedSuccess: 'Jogador cadastrado com sucesso.',
  playerCreatedError: 'Error ao cadastrar jogador.',
  playerAlreadyExist: 'Jogador já existe'
}

export const fields = {
  password: 'Senha',
  password_new: 'Senha nova',
  name: 'Nome',
  cpf: 'CPF',
  email: 'Email',
  gender_id: 'Gênero',
  user_id: 'ID do usuário',
  role_id: 'Função',
  store_id: 'Loja',
  address: 'Endereço',
  number: 'Numero',
  state: 'Estado',
  city: 'Cidade',
  phone: 'Telefone',
  neighborhood: 'Bairro',
  zipcode: 'CEP',
  birth_date: 'Data de nascimento',
  numOrder: 'Numero de ordem',
  value: 'Valor',
  date: 'Data',
  comment: 'Comentário',
  description: 'Descrição',
  cod_ref: 'Código de referência',
  categories: 'Categorias',
  promotion: 'Promoção',
  date_in: 'Data inicial',
  date_out: 'Data final'
}

export const exceptions = {
  min: '% precisa ter minimo de % caracteres.',
  max: '% precisa ter máximo de % caracteres.',
  minNumber: '% precisa ser maior que %.',
  maxNumber: '% precisa ser menor que %.',
  required: '% é necessário(a).',
  oneOf: '% precisa ser: %.',
  notOneOf: '% não deve ser: %.',
  valid: '% não é valido(a).',
  invalid_type: 'Não é do tipo %.',
  arrayMax: '% precisa ter máximo de % itens.',
  arrayMin: '% precisa ter mínimo de % itens.',
  regex: '% deve corresponder a regex: %',
  dateMin: '% precisa ser maior que %'
}

export type messages = keyof typeof messages
export type exceptions = keyof typeof exceptions
export type fields = keyof typeof fields
