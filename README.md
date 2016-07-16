# when to feed my baby

[![NPM Version][npm-image]][npm-url]
[![Commitizen friendly][commitizen-image]][commitizen-url]
[![MIT License][license-image]][license-url]

## Description

My first baby Daniel was born in March. My wife and my mom are taking care of him. According to our doctor we need to monitor the baby's healthy by recording how much formula Daniel he takes as well as how many diapers he use in each day. Since it's not convinent to carry the note book with them and aslo it's necessary to keep the data in sync between them, I develop this app which installed on their phones to recording. And since I store data in Elasticseach, I add kibana to visualize data.

This is a full-stack application that includes ionic, that is a mobile hybrid SDK build on top of AngularJS and cordova, expressjs that is the backend http server, Elasticsearch which act as database and Kibana which visulize the data stored in Elasticsearch.

The basic use case is record the feeding and diaper change, also view the recently data in the app. When the Moms click record, the data will be store both locally and send to the server. And when Moms view the recent data will be pull from both place and merged together before rendering.

Except a native ios app looking UI. I also use AngularJS extensively in this app. Since the data flow from client to server is async, I also leverage Promise to aviod the callback hell. As the code getting larger, I found it especially useful to use a good coding style such as [angular-styleguide](https://github.com/johnpapa/angular-styleguide/tree/master/a1). And this project give me a sound practise on Elasticsearch. Last but not least, it expose a new way to me to visulize and analynize data using the web tech.

## Reference:

> Demo [Vedio](https://youtu.be/bwRw7v6J7XM)

> Code Walk through [Vedio](https://youtu.be/VTs1hzVnAMU)

## Highlight features

1. Hybird ios app implementation, sync data between apps installed on different phone.
2. Extensively use AngularJS. Such as directive, service, ui-router, promise.
3. Use html5 new api such as localstorage.
4. Express to implement REST API.
5. Elasticseach as database.
6. kibana to visulize data

## How to run the code locally

__Step 1. Install Node.js, Elasticsearch, Kibana, Ionic__

__Step 2. Turn on Elasticsearch, Kibana__

__Step 3. Get source code and install package__

1. Clone repo from GitHub: `$ git clone https://github.com/taoning2014/when-to-feed-my-baby`
2. cd into /backend, `$ npm install`

__Step 4. make fake data__
1. cd into /backend/db
2. `$ node cvsToJSON`

__Step 5. start express server__
1. cd into /backend
2. `$ npm start`. If there is no data in Elasticsearch, it will import fake data create from step 4 into it.

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
