// helper function for formatting money
export const formatMoneyEur = (amount) => {
  return Number(amount).toFixed(0).replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ') + ' €'
}

// helper function for formatting money but without the euro sign
export const formatMoney = (amount) => {
  return Number(amount).toFixed(0).replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
}