/**
 * Returns a complete table entry using the incoming data.
 * @param inputString
 * @param outputString
 * @returns
 */
export function getTableEntry(inputString: string, outputString: string) {
  const partitionKey = getPartition()
  const rowKey = getRowKey()

  return {
    partitionKey,
    rowKey,
    inputString,
    outputString,
  }
}

function getPartition() {
  return new Date().getUTCFullYear() // 2021, 2022, 2023
}

/**
 * Returns a row key inversely proportional to the passage of time.
 *
 * As time goes up, row key goes down, which means that more recent
 * entries are sorted before older ones if following a lexicographical
 * order.
 * @returns
 */
function getRowKey() {
  // 1e13 is the lowest (e)xponential larger than current epoch time in millis.
  return 1e13 - Date.now()
}
