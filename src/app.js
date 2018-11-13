import Vue from 'vue'
import VueRouter from 'vue-router'

import Calendar from './views/Calendar.vue'
import App from './App.vue'

// Css
require('./style/main.scss')

Vue.use(VueRouter)

const router = new VueRouter({
    //mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {path: '/calendar', component: Calendar}
    ]
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');