import { Context } from "@azure/functions"

const missingBody = (context: Context) => {
  context.res = {
    status: 400,
    body: {
      description: 'Function requires a string body.',
      code: 'missing_body'
    }
  }
}

const invalidBody = (context: Context) => {
  context.res = {
    status: 400,
    body: {
      description: 'Body must be a string.',
      code: 'invalid_body'
    }
  }
}

export default { missingBody, invalidBody }