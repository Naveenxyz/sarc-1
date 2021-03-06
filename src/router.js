import Vue from 'vue'
import Router from 'vue-router'
import contact from './views/contact.vue'
import news from './views/news.vue'
import post from './views/post.vue'
import login from './views/login.vue'
import signup from './views/signup.vue'
import admin from './views/admin.vue'
import events from "./views/events.vue"
import merch from "./views/merchandise.vue"

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            redirect:'/news'
        },
        {
            path: '/',
            redirect:'news',
        },
        {
            path: '/events',
            name: 'events',
            component: events,
        },
        {
            path: '/merch',
            name: 'merchandise',
            component: merch,
        },
        {
            path: '/news',
            name: 'news',
            component: news,
            beforeEnter: (to, from, next) => {
                var auth_token = localStorage.getItem('auth_token')
                if (auth_token) {
                    Vue.http.headers.common['Authorization'] = 'Bearer ' +  auth_token
                    Vue.http.get('https://sarc-bphc-backend.herokuapp.com/api/auth').then( resp => {
                        if (resp) {
                            if (resp.body == 'no') {
                                next({path: 'login'})
                            } else{
                                next()
                            }
                        }else {
                            next({path: 'login'})
                        }
                    })
                } else {
                    next({path: 'login'})
                }
            }
        },
        {
            path: '/contact',
            name: 'contact',
            component: contact,
        },
        // {
        //     path: '/idea_hub',
        //     name: 'idea_hub',
        //     component: ideahub,
        //     beforeEnter: (to, from, next) => {
        //         var auth_token = localStorage.getItem('auth_token')
        //         if (auth_token) {
        //             Vue.http.headers.common['Authorization'] = 'Bearer ' +  auth_token
        //             Vue.http.get('https://sarc-bphc-backend.herokuapp.com/api/auth').then( resp => {
        //                 if (resp) {
        //                     if (resp.body == 'no') {
        //                         next({path: 'login'})
        //                     } else{
        //                         next()
        //                     }
        //                 }else {
        //                     next({path: 'login'})
        //                 }
        //             })
        //         } else {
        //             next({path: 'login'})
        //         }
        //     }
        // },
        {
            path: '/post/:id', 
            component: post,
            name: 'post',
            beforeEnter: (to, from, next) => {
                var auth_token = localStorage.getItem('auth_token')
                if (auth_token) {
                    Vue.http.headers.common['Authorization'] = 'Bearer ' +  auth_token
                    Vue.http.get('https://sarc-bphc-backend.herokuapp.com/api/auth').then( resp => {
                        if (resp) {
                            if (resp.body == 'no') {
                                next({path: 'login'})
                            } else{
                                next()
                            }
                        }else {
                            next({path: 'login'})
                        }
                    })
                } else {
                    next({path: 'login'})
                }
            }
        },
        {
            path: '/login', 
            component: login,
            name: 'login'
        },
        {
            path: '/signup', 
            component: signup,
            name: 'signup'
        },
        {
            path: '/admin', 
            component: admin,
            name: 'admin',
            beforeEnter: (to, from, next) => {
                var auth_token = localStorage.getItem('auth_token')
                if (auth_token) {
                    Vue.http.headers.common['Authorization'] = 'Bearer ' +  auth_token
                    Vue.http.get('https://sarc-bphc-backend.herokuapp.com/api/auth').then( resp => {
                        if (resp) {
                            if (resp.body == 'no') {
                                next({path: 'login'})
                            } else{
                                if(resp.body.authdata.user.role == 'user'){
                                    next()
                                } else {
                                    next({path: 'news'})
                                }
                            }
                        }else {
                            next({path: 'login'})
                        }
                    })
                } else {
                    next({path: 'login'})
                }
            }
        },
        // {
        //     path: '/mentor_hub', 
        //     component: alumni,
        //     name: 'mentor_hub',
        //     beforeEnter: (to, from, next) => {
        //         var auth_token = localStorage.getItem('auth_token')
        //         if (auth_token) {
        //             Vue.http.headers.common['Authorization'] = 'Bearer ' +  auth_token
        //             Vue.http.get('https://sarc-bphc-backend.herokuapp.com/api/auth').then( resp => {
        //                 if (resp) {
        //                     if (resp.body == 'no') {
        //                         next({path: 'login'})
        //                     } else{
        //                         next()
        //                     }
        //                 }else {
        //                     next({path: 'login'})
        //                 }
        //             })
        //         } else {
        //             next({path: 'login'})
        //         }
        //     }
        // },
    ]
})