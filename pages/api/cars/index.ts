// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200
  res.json([
    {
      name: 'Honda',
      size: 9,
      engine: 9,
      safety: 8,
      fuelCost: 9,
      interior: 9,
      price: 9,
    },
    {
      name: 'Chevrolet',
      size: 5,
      price: 4,
      safety: 6,
      fuelCost: 4,
      interior: 5,
      engine: 6
    }
  ])
}
