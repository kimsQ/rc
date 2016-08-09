---
layout: docs
title: Contents
group: getting-started
---

kimsQ RC can come in one of two forms, as precompiled or source code. Learn more about each flavor's contents and structure below. Remember, no matter the implementation flavor, **kimsQ RC's JavaScript plugins require jQuery**.

## Precompiled kimsQ RC

Once downloaded, unzip the compressed folder and you'll see something like this:

<!-- NOTE: This info is intentionally duplicated in the README. Copy any changes made here over to the README too. -->

{% highlight bash %}
kimsQ RC/
├── css/
│   ├── kimsQ RC.css
│   ├── kimsQ RC.css.map
│   ├── kimsQ RC.min.css
│   └── kimsQ RC.min.css.map
└── js/
    ├── kimsQ RC.js
    └── kimsQ RC.min.js
{% endhighlight %}

This is the most basic form of kimsQ RC: precompiled files for quick drop-in usage in nearly any web project. We provide compiled CSS and JS (`kimsQ RC.*`), as well as compiled and minified CSS and JS (`kimsQ RC.min.*`). CSS [source maps](https://developer.chrome.com/devtools/docs/css-preprocessors) (`kimsQ RC.*.map`) are available for use with certain browsers' developer tools.

## kimsQ RC source code

The kimsQ RC source code download includes the precompiled CSS and JavaScript assets, along with source Sass, JavaScript, and documentation. More specifically, it includes the following and more:

{% highlight bash %}
kimsQ RC/
├── dist/
│   ├── css/
│   └── js/
├── docs/
│   └── examples/
├── js/
└── scss/
{% endhighlight %}

The `scss/` and `js/` are the source code for our CSS and JavaScript. The `dist/` folder includes everything listed in the precompiled download section above. The `docs/` folder includes the source code for our documentation, and `examples/` of kimsQ RC usage. Beyond that, any other included file provides support for packages, license information, and development.
