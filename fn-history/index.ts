import { AzureFunction, Context, HttpRequest } from '@azure/functions'

const httpTrigger: AzureFunction = async function (context: Context, { params: { take } }: HttpRequest): Promise<void> {
  const tableEntries = context.bindings.table.splice(0, take)

  context.res = {
    status: 200,
    body: tableEntries,
  }
}

export default httpTrigger
