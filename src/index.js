"use strict";
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'
import APP from './app'

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" breadcrumbName="动态表单解决方案" component={APP}>
        <IndexRoute getComponent={function (nexState, callback) {
            import('./controllers/home').then(m => {
                callback(null, m['Home']);
            })
        }
        } />
    </Route>
    </Router>, document.getElementById('root'))
