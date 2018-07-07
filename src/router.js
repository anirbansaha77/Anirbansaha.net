/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import Router from 'universal-router';
import queryString from 'query-string';
import store from './Redux/store';
import { start, loadProductCategory, addToCartStatus } from './actions';

window.__start = data => store.dispatch(loadProductCategory(data));
window.addCompositeToCartStatus = () => store.dispatch(addToCartStatus);
// The list of all application routes where each route contains a URL path string (pattern),
// the list of components to load asynchroneously (chunks), data requirements (GraphQL query),
// and a render() function which shapes the result to be passed into the top-level (App) component.
// For more information visit https://github.com/kriasoft/universal-router
const routes = [
    {
        path: '/',
        components: () => [
            import(/* webpackChunkName: 'home' */ './Home'),
            import(/* webpackChunkName: 'home' */ './Home/Hero'),
        ],
        action({ route }) {
            store.dispatch(start(route.query.sku, '__start'));
        },
        query: queryString.parse(window.location.search),
        render: ([Home]) => ({
            title: 'Home page',
            // hero: <Hero />,
            body: <Home />,
        }),
    },
    {
        path: '/story-:id',
        components: () => [import(/* webpackChunkName: 'home' */ './Story')],
        render: ([Story], data) => ({
            title: data.title,
            body: <Story />,
        }),
    },
    {
        path: '/error',
        components: () => [import(/* webpackChunkName: 'main' */ './ErrorPage')],
        render: ([ErrorPage]) => ({
            title: 'Error',
            body: <ErrorPage />,
        }),
    },
    {
        path: '/getting-started',
        components: () => [
            import(/* webpackChunkName: 'start' */ './GettingStarted'),
        ],
        render: ([GettingStarted]) => ({
            title: 'Getting Started',
            body: <GettingStarted />,
        }),
    },
    {
        path: '/about',
        components: () => [import(/* webpackChunkName: 'about' */ './About')],
        render: ([About]) => ({
            title: 'About Us',
            body: <About />,
        }),
    },
    {
        path: '/tasks/:status(pending|completed)?',
        components: () => [import(/* webpackChunkName: 'home' */ './Home')],
        render: ([Home]) => ({
            title: 'Untitled Page',
            body: <Home />,
        }),
    },
];

const context = {
    dispatch: store.dispatch,
    getState: store.getState,
};

async function resolveRoute({ route, fetch, next }, params) {
    // Skip routes that have no .render() method
    if (!route.render) return next();

    // Shape the result to be passed into the top-level React component (App)
    if (route.action) {
        await route.action({ fetch, next, route, params });
    }
    return {
        params,
        store: {
            ...store,
        },
        query: route.query,
        variables:
      typeof route.variables === 'function' ? route.variables(params) : params,
        components:
      typeof route.components === 'function'
          ? Promise.all(
              route.components().map(promise => promise.then(x => x.default)),
          ).then(components => (route.components = components))
          : route.components,
        render: route.render,
    };
}

export default new Router(routes, { resolveRoute, context });
