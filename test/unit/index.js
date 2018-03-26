import Vue from 'vue'

/* eslint-disable no-undef */
Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('../../components', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
