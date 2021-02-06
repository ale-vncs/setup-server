
export const randomNumber = (amount: number): string => {
  const listNumber = []
  for (let i = 0; i < amount; i++) {
    listNumber.push(Math.floor(Math.random() * 10))
  }
  return listNumber.join('')
}
