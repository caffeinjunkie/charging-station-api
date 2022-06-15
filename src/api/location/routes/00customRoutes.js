module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/locations/',
      handler: 'location.create',
      config: {
        auth: false
      }
    },
    {
      method: 'POST',
      path: '/locations/:id',
      handler: 'location.update',
      config: {
        auth: false
      }
    }
  ]
}
