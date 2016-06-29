---
layout: preview
preview: bars
title: Bar
group: components
---

Bar is a fixed regions at the top of a screen that can contain a title label, and left/right buttons for navigation or to carry out various actions.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Title bar

Here's what you need to know before getting started with the navbar:

- Navbars require a wrapping `.navbar` and a [color scheme](#color-schemes).
- Navbars and their contents are fluid by default. Use [optional containers](#containers) to limit their horizontal width.
- Use `.pull-*-left` and `.pull-*-right` to quickly align sub-components.
- Ensure accessibility by using a `<nav>` element or, if using a more generic element such as a `<div>`, add a `role="navigation"` to every navbar to explicitly identify it as a landmark region for users of assistive technologies.

### Basic
Title bars are full width and docked to the top of the viewport.

{% highlight html %}
<header class="bar bar-nav bar-light bg-faded">
  <h1 class="title">Title</h1>
</header>
{% endhighlight %}

### Title bar with buttons

Buttons in a title bar are left or right aligned and should be used for actions. Use the `.pull-right` or `.pull-left` utility classes to float the buttons. Also, be sure to place any floated elements before the title.

{% highlight html %}
<header class="bar bar-nav bar-light bg-faded">
  <button class="btn btn-secondary pull-left">
    Left
  </button>
  <button class="btn btn-secondary pull-right">
    Right
  </button>
  <h1 class="title">Title</h1>
</header>
{% endhighlight %}

### Title bar with icons

Icons can also be used for actions in toolbars. Again, be sure to use utility classes to float the icons into position.

{% highlight html %}
<header class="bar bar-nav bar-light bg-faded">
  <a class="icon icon-left-nav pull-left"></a>
  <a class="icon icon-compose pull-right"></a>
  <h1 class="title">Title</h1>
</header>
{% endhighlight %}

### Title bar with link buttons and icons
Link buttons can be used in tool bars to remove the outline. Use these in conjuction with icons to recreate the nav feel from iOS7. Note the use of `.btn-nav` to bring the buttons a little bit closer to the edge of the viewport.

{% highlight html %}
<header class="bar bar-nav bar-light bg-faded">
  <button class="btn btn-link btn-nav pull-left">
    <span class="icon icon-left-nav"></span>
    Left
  </button>
  <button class="btn btn-link btn-nav pull-right">
    Right
    <span class="icon icon-right-nav"></span>
  </button>
  <h1 class="title">Title</h1>
</header>
{% endhighlight %}

### Title bar with segmented control
Title bars can also house segmented controls. Feel free to add accompanying buttons too. The control will automatically layout itself out correctly.

{% highlight html %}
<header class="bar bar-nav bar-light bg-faded">
  <button class="btn btn-secondary pull-left">
    Left
  </button>
  <button class="btn btn-secondary pull-right">
    Right
  </button>
  <div class="segmented-control">
    <a class="control-item active">One</a>
    <a class="control-item">Two</a>
    <a class="control-item">Three</a>
  </div>
</header>
{% endhighlight %}


## Tab bar
Use Ratchicons in the `.tab-bar` to represent different sections of your app.

{% highlight html %}
<nav class="bar bar-tab bar-light bg-faded">
  <a class="tab-item active" href="#">
    <span class="icon icon-home"></span>
    <span class="tab-label">Home</span>
  </a>
  <a class="tab-item" href="#">
    <span class="icon icon-person"></span>
    <span class="tab-label">Profile</span>
  </a>
  <a class="tab-item" href="#">
    <span class="icon icon-star-filled"></span>
    <span class="tab-label">Favorites</span>
  </a>
  <a class="tab-item" href="#">
    <span class="icon icon-search"></span>
    <span class="tab-label">Search</span>
  </a>
  <a class="tab-item" href="#">
    <span class="icon icon-gear"></span>
    <span class="tab-label">Settings</span>
  </a>
</nav>
{% endhighlight %}

### Tab bar (labels only)
If you don't want to use icons, that's okay too. The text will appear larger to use the additional space.

{% highlight html %}
<nav class="bar bar-tab bar-light bg-faded">
  <a class="tab-item active" href="#">
    Label
  </a>
  <a class="tab-item" href="#">
    Label
  </a>
  <a class="tab-item" href="#">
    Label
  </a>
</nav>
{% endhighlight %}


### Tab bar (inverse color)
If you don't want to use icons, that's okay too. The text will appear larger to use the additional space.

{% highlight html %}
<nav class="bar bar-tab bar-dark bg-inverse">
  <a class="tab-item active" href="#">
    Label
  </a>
  <a class="tab-item" href="#">
    Label
  </a>
  <a class="tab-item" href="#">
    Label
  </a>
</nav>
{% endhighlight %}

## Standard bars
Standard bars are basic fixed elements that can be positioned in four places. These can be used to house buttons, icons, or segmented controls (see following examples).

{% highlight html %}
<!-- Segmented control in standard bar fixed to top -->
<nav class="bar bar-standard bar-light bg-faded">
  <div class="segmented-control">
    <a class="control-item active">Thing one</a>
    <a class="control-item">Thing two</a>
    <a class="control-item">Thing three</a>
  </div>
</nav>

<!-- Block button in standard bar fixed below top bar -->
<div class="bar bar-standard bar-header-secondary bar-light bg-faded">
  <button class="btn btn-secondary btn-block">Block level button</button>
</div>

<!-- Block button in standard bar fixed above the footer -->
<div class="bar bar-standard bar-footer-secondary bar-light bg-faded">
  <button class="btn btn-secondary btn-block">Block level button</button>
</div>

<!-- Icons in standard bar fixed to the bottom of the screen -->
<div class="bar bar-standard bar-footer bar-light bg-faded">
  <a class="icon icon-compose pull-left"></a>
  <a class="icon icon-gear pull-right"></a>
</div>
{% endhighlight %}

## Color schemes
Theming the navbar has never been easier thanks to the combination of a simple link color modifier class and `background-color` utilities. Put another way, you specify light or dark and apply a background color.

### Inverse color

{% highlight html %}
<header class="bar bar-nav bar-dark bg-inverse">
  <h1 class="title">Inverse color</h1>
</header>
{% endhighlight %}

### Primary color

{% highlight html %}
<header class="bar bar-nav bar-dark bg-primary">
  <h1 class="title">Primary color</h1>
</header>
{% endhighlight %}

### Custom color

{% highlight html %}
<header class="bar bar-nav bar-light" style="background-color: #e3f2fd;">
  <h1 class="title">Custom color</h1>
</header>
{% endhighlight %}
