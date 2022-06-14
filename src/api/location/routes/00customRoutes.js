module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/locations/',
      handler: 'location.create',
      config: {
        auth: false
      }
    }
  ]
}
