const hasBody = (body: unknown) => {
  return typeof body !== 'undefined'
}

const bodyIsString = (body: unknown): body is string => {
  return typeof body === 'string'
}

export default {
  hasBody,
  bodyIsString,
}
