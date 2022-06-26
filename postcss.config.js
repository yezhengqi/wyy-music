module.exports = () => ({
  plugins: [
    require('autoprefixer')(),
    // require('postcss-px2rem')({ remUnit: 75 })
    require('postcss-pxtorem')({
      rootValue: 37.5,
      propList: ['*']
    })
  ]
})
