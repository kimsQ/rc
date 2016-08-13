---
layout: docs
title: Download
group: getting-started
---

**RC v{{ site.current_version}}** is available for download in several ways, including some of your favorite package managers. Choose from the options below to snag just what you need.

<div class="row m-t-2">
  <div class="col-sm-6">
{% markdown %}
### Compiled
Download just the compiled and minified CSS and JavaScript. Doesn't include any documentation or original source files.

{% comment %}
<a href="{{ site.download.dist }}" class="btn btn-bs btn-outline" onclick="ga('send', 'event', 'Getting started', 'Download', 'Download compiled');">Download kimsq-rc</a>
{% endcomment %}
<span class="text-muted">Coming soon!</span>
{% endmarkdown %}
  </div>
  <div class="col-sm-6">
{% markdown %}
### Source files
Download everything: source Sass, JavaScript, and documentation files. **Requires a Sass compiler, [Autoprefixer](https://github.com/postcss/autoprefixer), [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes), and [some setup]({{ site.baseurl }}/getting-started/build-tools/#tooling-setup).**

<a href="{{ site.download.source }}" class="btn btn-bs btn-outline" onclick="ga('send', 'event', 'Getting started', 'Download', 'Download source');">Download source</a>
{% endmarkdown %}
  </div>
</div>

## Package managers

Pull in 's **source files** into nearly any project with some of the most popular package managers. No matter the package manager, kimsq-rc will **require a Sass compiler, [Autoprefixer](https://github.com/postcss/autoprefixer), and [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes)** for a setup that matches our official compiled versions.

{% callout warning %}
**Heads up!** Not all package managers have the v1 alpha published yet, but we should have them up shortly!
{% endcallout %}

### npm

Install kimsq-rc in your Node powered apps with [the npm package](https://www.npmjs.org/package/kimsq-rc):

{% highlight bash %}
$ npm install kimsq-rc@{{ site.current_version }}
{% endhighlight %}

`require('kimsq-rc')` will load all of kimsq-rc's jQuery plugins onto the jQuery object. The `kimsq-rc` module itself does not export anything. You can manually load kimsq-rc's jQuery plugins individually by loading the `/js/*.js` files under the package's top-level directory.

kimsq-rc's `package.json` contains some additional metadata under the following keys:

- `sass` - path to kimsq-rc's main [Sass](http://sass-lang.com/) source file
- `style` - path to kimsq-rc's non-minified CSS that's been precompiled using the default settings (no customization)

### RubyGems

Install kimsq-rc in your Ruby apps using [Bundler](http://bundler.io/) (**recommended**) and [RubyGems](https://rubygems.org/) by adding the following line to your [`Gemfile`](http://bundler.io/gemfile.html):

{% highlight ruby %}
gem 'kimsq-rc', '~> 1.0.0.alpha1'
{% endhighlight %}

Alternatively, if you're not using Bundler, you can install the gem by running this command:

{% highlight bash %}
$ gem install kimsq-rc -v 1.0.0.alpha1
{% endhighlight %}

[See the gem's README](https://github.com/kimsQ/kimsq-rc-rubygem/blob/master/README.md) for further details.

### Meteor

{% highlight bash %}
$ meteor add kimsQ:kimsq-rc@={{ site.current_version }}
{% endhighlight %}

### Composer

You can also install and manage kimsq-rc's Sass and JavaScript using [Composer](https://getcomposer.org):

{% highlight bash %}
$ composer require kimsQ/kimsq-rc
{% endhighlight %}

### Bower

Install and manage kimsq-rc's Sass and JavaScript using [Bower](http://bower.io).

{% highlight bash %}
$ bower install kimsq-rc#v{{ site.current_version }}
{% endhighlight %}

### NuGet

If you develop in .NET, you can also install and manage kimsq-rc's [CSS](https://www.nuget.org/packages/kimsq-rc/) or [Sass](https://www.nuget.org/packages/kimsq-rc.sass/) and JavaScript using [NuGet](https://www.nuget.org):

{% highlight powershell %}
PM> Install-Package kimsq-rc -Pre
PM> Install-Package kimsq-rc.sass -Pre
{% endhighlight %}

The `-Pre` is required until kimsq-rc v1 has a stable release.

## Custom builds

Need only a part of kimsq-rc's CSS or JS? Use one of the custom builds to snag just what you need.

<div class="row">
  <div class="col-sm-4">
    <h3>Reboot</h3>
    <p>Includes variables/mixins, Normalize, and Reboot. No JavaScript.</p>
    <a class="btn btn-bs btn-outline" href="#">Download</a>
  </div>
  <div class="col-sm-4">
    <h3>Grid only</h3>
    <p>Includes variables/mixins and our grid system. No JavaScript.</p>
    <a class="btn btn-bs btn-outline" href="#">Download</a>
  </div>
  <div class="col-sm-4">
    <h3>Flexbox</h3>
    <p>All of kimsq-rc with flexbox enabled and <strong>lower browser support</strong>.</p>
    <a class="btn btn-bs btn-outline" href="#">Download</a>
  </div>
</div>
