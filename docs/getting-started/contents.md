---
layout: docs
title: Contents
group: getting-started
---

Ratchet plus can come in one of two forms, as precompiled or source code. Learn more about each flavor's contents and structure below. Remember, no matter the implementation flavor, **Ratchet plus's JavaScript plugins require jQuery**.

## Precompiled Ratchet plus

Once downloaded, unzip the compressed folder and you'll see something like this:

<!-- NOTE: This info is intentionally duplicated in the README. Copy any changes made here over to the README too. -->

{% highlight bash %}
Ratchet plus/
├── css/
│   ├── Ratchet plus.css
│   ├── Ratchet plus.css.map
│   ├── Ratchet plus.min.css
│   └── Ratchet plus.min.css.map
└── js/
    ├── Ratchet plus.js
    └── Ratchet plus.min.js
{% endhighlight %}

This is the most basic form of Ratchet plus: precompiled files for quick drop-in usage in nearly any web project. We provide compiled CSS and JS (`Ratchet plus.*`), as well as compiled and minified CSS and JS (`Ratchet plus.min.*`). CSS [source maps](https://developer.chrome.com/devtools/docs/css-preprocessors) (`Ratchet plus.*.map`) are available for use with certain browsers' developer tools.

## Ratchet plus source code

The Ratchet plus source code download includes the precompiled CSS and JavaScript assets, along with source Sass, JavaScript, and documentation. More specifically, it includes the following and more:

{% highlight bash %}
Ratchet plus/
├── dist/
│   ├── css/
│   └── js/
├── docs/
│   └── examples/
├── js/
└── scss/
{% endhighlight %}

The `scss/` and `js/` are the source code for our CSS and JavaScript. The `dist/` folder includes everything listed in the precompiled download section above. The `docs/` folder includes the source code for our documentation, and `examples/` of Ratchet plus usage. Beyond that, any other included file provides support for packages, license information, and development.
