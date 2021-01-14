// With this format is possible to make the destructuration of the objec and
// to rename it
export const { format: formatPrice } = new Intl.NumberFormat('de', {
  style: 'currency',
  currency: 'EUR',
});
