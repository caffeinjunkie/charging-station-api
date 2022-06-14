module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/chargers/type=:type&serialNumber=:serialNumber',
      handler: 'charger.findOne',
      config: {
        auth: false
      }
    },
    {
      method: 'POST',
      path: '/chargers',
      handler: 'charger.create',
      config: {
        auth: false
      }
    },
    {
      method: 'POST',
      path: '/chargers/:id',
      handler: 'charger.update',
      config: {
        auth: false
      }
    }
  ]
}
