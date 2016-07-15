# when to feed my baby

[![NPM Version][npm-image]][npm-url]
[![Commitizen friendly][commitizen-image]][commitizen-url]
[![MIT License][license-image]][license-url]

An ionic app using express and mongodb as backend to record the time my wife and my mom feed the baby



[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# when to feed my baby

## Description

This is the front-end code for a Priceline.com hackathon I attend recently. I wrote the whole front-end repo. There are three back-end guys, 1 designer and one data analyst work on other stuff. All from our company which is Priceline.com. The [PINCH.MD](docs/PINCH.MD) will give you a clear picture of the idea.

This project use Express.js as server framework and Handlebar.js as view engine, also leverage jQuery for the client side logical. Use bootstrap and [canvas](http://themeforest.net/item/canvas-the-multipurpose-html5-template/9228123) template for styling.

There are two kind of data flow from browser to server. Express.js handle the url client visit by rendering view template with correct data. It also handle get request send by jQuery with search params. In this case, it will call back-end api, and parse the data send from back-end.

I really like the UI I wrote, so for demo purpose, I host it on Heroku and mock up the back-end. You may encouter a few seconds latency as I use free dyno on Heroku which will sleep after 30 mintues inactive.

## Reference:

> Demo [Vedio](https://vimeo.com/172159175)

> Demo [Website](https://taojs-i-feel-lucky.herokuapp.com)

> Code Walk through [Vedio](https://taojs-i-feel-lucky.herokuapp.com)

> [PINCH.MD](docs/PINCH.MD) The general idea about this project

## Highlight features

1. Beautiful UI Design
2. jQuery and jQueryUI to handle client side logic
3. Use handlebar to divide view to partials and layouts and render with provided data
4. Express to handle client request and interact with back-end
5. Use MySQL to store mock up data

## How to interact with it

__As I mock up the back-end API, so the functionality is limited__

__Case 1: Search by specific feeling__

Hover mouse to "I'm Feel..." button, then choose one feeling from the drop down, the button will change its text to that feeling, click the button again. The app will find a best matched hotel according to that feeling.

__Case 2: Search by location feeling__

Enter "New York" in the input box, then select the right one from auto complete. The button will change text to "I'm Feeling Lucky", click the button. __Only New York and Baltimore work__. The app will find a best matched hotel according to user data.

## How to run the code locally

__Step 1. install nodejs, MySQL server, suggest install MySQL work bench for manage MySQL server__

__Step 2. get source code and install package__

1. Clone repo from github: `$ git clone https://github.com/taoning2014/i-feel-lucky-desktop-ui.git`
2. Turn on MySQL server and create a database schema named "I_FEEL_LUCKY" in MySQL server
3. Dump data in /db/data-hotel-details.sql to MySQL server
4. Modify /db/hotelSearchDAO.js line 16-17 for correct MySQL credentials
5. Set up environment variable I_FEEL_LUCKY_RUNNINGENV with value "local"
6. Go into repo forlder and install node package: ` cd i-feel-lucky-desktop-ui && npm install `
7. Run express server: `npm start`

## Tech used

<dl class="dl-horizontal">

<dt><a href="http://themeforest.net/item/canvas-the-multipurpose-html5-template/9228123">Canvas</a></dt>
<dd>Canvas The Multipurpose Html5 Template</dd>

<dt>Handlebars</dt>
<dd>Handlebars.js is an extension to the Mustache templating language created by Chris Wanstrath. Handlebars.js and Mustache are both logicless templating languages that keep the view and the code separated like we all know they should be.</dd>

<dt>jQuery</dt>
<dd>jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.</dd>

<dt>jQuery UI</dt>
<dd>jQuery UI is a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library. Whether you're building highly interactive web applications or you just need to add a date picker to a form control, jQuery UI is the perfect choice.</dd>

<dt>Bootstrap</dt>
<dd>Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.</dd>

<dt>Express</dt>
<dd>The best way to understand express is through its Official Website, particularly The Express Guide; you can also go through this StackOverflow thread for more resources.</dd>

<dt>Node.js</dt>
<dd>Start by going through Node.js Official Website and this StackOverflow thread, which should get you going with the Node.js platform in no time.</dd>
</dl>


## Useful links
- [Commitizen For Contributors](http://commitizen.github.io/cz-cli)
- [ESLint](http://eslint.org) An open source JavaScript linting utility.
- [ES5: Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/es5)
- [Set up mySQL](https://www.youtube.com/watch?v=US_wEKuWZ0U) Brief tutorial for connect MySQL from heroku addon ClearDB to MySQL work bench

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
