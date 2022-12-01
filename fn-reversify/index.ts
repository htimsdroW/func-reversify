import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import validation from './util/validation/body'
import badRequest from './util/responses/bad-request'
import { reversify } from './util/strings'
import { getTableEntry } from './util/tables'

const httpTrigger: AzureFunction = async function (context: Context, { body }: HttpRequest): Promise<void> {
  if (!validation.hasBody(body)) return badRequest.missingBody(context)
  if (!validation.bodyIsString(body)) return badRequest.invalidBody(context)

  const result = reversify(body)

  context.bindings.table = [getTableEntry(body, result)]

  context.res = {
    status: 200,
    body: result,
  }
}

export default httpTrigger
