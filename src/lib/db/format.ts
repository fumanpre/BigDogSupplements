export async function formatPrice(price: number) {
  return (price / 1).toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
    currencyDisplay: 'code', // Output: "CAD 12.99"
  })
}
