module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5142/api/:path*'
        }
      ]
    }
  }