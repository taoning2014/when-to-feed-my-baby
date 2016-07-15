# when to feed my baby

[![NPM Version][npm-image]][npm-url]
[![Commitizen friendly][commitizen-image]][commitizen-url]
[![MIT License][license-image]][license-url]

## Description

My first baby Daniel was born at this March. My wife and my mom are taking care of him. To monitor the baby's health, they need to record how much formula Daniel take as well as how many diapers he use in each day. Since it's not convinent to carry the note book with them and aslo it's necessary to keep the data in sync with them, so I develop this app which installed on their phones to help them recording. And since I store data into elasticseach, so data visulaztion through webpage by Kibana is fairly easy.

This is a full-stack application which includes ionic which is a mobile hybrid SDK build on top of angularjs and cordova, expressjs which is the backend http server framework, elasticsearch which act as database and Kibana which visulize the data stored in elasticsearch.

The basic use case is record the feeding and diaper change, or view the recently data. When the Moms click record, the data will be store both locally and send to the server. And when Moms view the recent data it will be pull from both place and merged together before rendering.

Except the UI looks very similar to native ios app. I also use angularjs extensively in this app. Since the data flow from client to server is async, I also leverage Promise to aviod the callback hell. As the code getting large, I found it especially useful to use a good coding style[angular-styleguide](https://github.com/johnpapa/angular-styleguide/tree/master/a1). And this project give me a guild sound practise on elasticsearch. Last but not least, it expose a new way to me to visulize and analynize data using the web tech.

## Reference:

> Demo [Vedio](https://vimeo.com/172159175)

> Code Walk through [Vedio](https://taojs-i-feel-lucky.herokuapp.com)

## Highlight features

1. Native app UI implementation, sync data between app installed on different phone
2. Leverage lots of angularjs. Such as directive, service, ui-router, promise
3. Use html5 new api such as localstorage
4. Express to handle client request and interact with back-end
5. Use elasticseach as database
6. Use kibana to visulize data

## How to run the code locally

__Step 1. install nodejs, elasticsearch, kibana, ionic__

__Step 2. turn on elasticsearch, kibana__

__Step 3. get source code and install package__

1. Clone repo from github: `$ git clone https://github.com/taoning2014/when-to-feed-my-baby`
2. cd into /backend, `$ npm install`

__Step 4. make fake data__
1. cd into /backend/db
2. `$ node cvsToJSON`

__Step 5. start express server__
1. cd into /backend
2. `$ npm start`. If there is no data in elasticsearch, it will import fake data create from step 4 into elasticsearch

__Step 6. start ionic__
1. cd into /ionic
2. `$ionic serve`

## Tech used

<dl class="dl-horizontal">

<dt><a href="http://ionicframework.com">Ionic</a></dt>
<dd>Ionic is the beautiful, open source mobile SDK for developing native and progressive web apps.</dd>

<dt>AngularJS</dt>
<dd>AngularJS is a complete JavaScript-based open-source client and server-side web application framework mainly maintained by Google and by a community of individuals and corporations to address many of the challenges encountered in developing single-page applications.</dd>

<dt>Gulp</dt>
<dd>Gulp is a fast and intuitive streaming build tool built on Node.js.</dd>

<dt>jQuery UI</dt>
<dd>jQuery UI is a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library. Whether you're building highly interactive web applications or you just need to add a date picker to a form control, jQuery UI is the perfect choice.</dd>

<dt>Express</dt>
<dd>The best way to understand express is through its Official Website, particularly The Express Guide; you can also go through this StackOverflow thread for more resources.</dd>

<dt>Elasticsearch</dt>
<dd>Elasticsearch is an open-source, broadly-distributable, readily-scalable, enterprise-grade search engine. Accessible through an extensive and elaborate API, Elasticsearch can power extremely fast searches that support your data discovery applications.</dd>

<dt>Kibana</dt>
<dd>Kibana is an open source data visualization plugin for Elasticsearch.</dd>

<dt>Node.js</dt>
<dd>Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.</dd>
</dl>


## Useful links
- [Commitizen For Contributors](http://commitizen.github.io/cz-cli)
- [ESLint](http://eslint.org) An open source JavaScript linting utility.
- [ES5: Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/es5)
- [Angular Style Guide](https://github.com/johnpapa/angular-styleguide/tree/master/a1)

## Copy right
Got some images from airbnb for demo purpose

## License

[MIT][license-url] We believe that mean should be free and easy to integrate within your existing projects so we chose [The MIT License](http://opensource.org/licenses/MIT)


[npm-image]: https://img.shields.io/npm/v/npm.svg
[npm-url]: https://npmjs.org/package/express-paginate
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
