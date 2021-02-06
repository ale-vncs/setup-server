
const removeKeys = <T>(obj: Record<string, any>, fields: string[], separator = '.'): T => {
  if (!obj) return obj
  const fi = Object.keys(obj)
  fields.map(arr => {
    if (fi.includes(arr)) {
      obj[arr] = undefined
    } else if (arr.indexOf(separator) > -1) {
      const nextFields = arr.split(separator)
      const nextKey = nextFields[0]
      removeKeys(obj[nextKey], [nextFields.join(separator)])
    }
  })
  fi.map(arr => {
    if (obj[arr] === null) {
      obj[arr] = undefined
    }
  })
  return <T>obj
}

export default removeKeys
