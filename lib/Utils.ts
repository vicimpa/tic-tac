export function delay(n = 0) {
  return new Promise<void>(r => setTimeout(r, n))
}

export function firstUpper(input: string) {
  return input.substr(0, 1).toUpperCase() + input.substr(1)
}

export function filterLength<T>(array: T[], value: T) {
  return array.filter(e => e==value).length
}

export function copy<T = any>(obj: T, links = [], props = []): T {
  if(!obj) return obj

  if(typeof obj !== 'object')
    return obj

  if(obj instanceof RegExp) 
    return new RegExp(obj['source'], obj['flags']) as any

  let index = links.indexOf(obj)

  if(index !== -1)
    return props[index]

  links.push(obj)

  if(Array.isArray(obj)) {
    const newArray = obj.map(e => copy(e, links, props))

    props.push(newArray)

    return newArray as any
  }

  const newObject = {}
  props.push(newObject)

  for(let key in obj as any) {
    try {
      newObject[key] = copy(obj[key], links, props) as any
    }catch(e) {
      newObject[key] = undefined as any
    }
  }

  newObject['__proto__'] = obj['__proto__']

  return newObject as any
}