---
layout: preview
preview: badge
title: Badge
group: components
---

Badges come in four flavors and should be used to indicate "how many" of something there are. Adding the a class of `.badge-inverted` will remove the badges background color.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Example
Badges scale to match the size of the immediate parent element by using relative font sizing and em units.
{% highlight html %}
<h1>Heading <span class="badge badge-default">New</span></h1>
<h2>Heading <span class="badge badge-default">New</span></h2>
<h3>Heading <span class="badge badge-default">New</span></h3>
<h4>Heading <span class="badge badge-default">New</span></h4>
<h5>Heading <span class="badge badge-default">New</span></h5>
<h6>Heading <span class="badge badge-default">New</span></h6>
{% endhighlight %}


## Contextual variations
Add any of the below mentioned modifier classes to change the appearance of a badge.

{% highlight html %}
<span class="badge">Normal</span>
<span class="badge badge-default">Default</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
{% endhighlight %}


## Pill badges
Use the `.badge-pill` modifier class to make tags more rounded (with a larger `border-radius` and additional horizontal `padding`). Useful if you miss the badges from v3.
{% highlight html %}
<span class="badge badge-pill">Normal</span>
<span class="badge badge-pill badge-default">Default</span>
<span class="badge badge-pill badge-primary">Primary</span>
<span class="badge badge-pill badge-success">Success</span>
<span class="badge badge-pill badge-info">Info</span>
<span class="badge badge-pill badge-warning">Warning</span>
<span class="badge badge-pill badge-danger">Danger</span>
{% endhighlight %}


## Inverted badges
{% highlight html %}
<span class="badge badge-inverted">Normal</span>
<span class="badge badge-default badge-inverted">Default</span>
<span class="badge badge-primary badge-inverted">Primary</span>
<span class="badge badge-success badge-inverted">Success</span>
<span class="badge badge-info badge-inverted">Info</span>
<span class="badge badge-warning badge-inverted">Warning</span>
<span class="badge badge-danger badge-inverted">Danger</span>
{% endhighlight %}

## Buttons with badges

{% highlight html %}
<button class="btn">Badge button <span class="badge">1</span></button>
<button class="btn btn-primary">Badge button <span class="badge badge-primary">1</span></button>
<button class="btn btn-success">Badge button <span class="badge badge-positive">1</span></button>
<button class="btn btn-negative">Badge button <span class="badge badge-negative">1</span></button>

<button class="btn btn-outlined">Badge button <span class="badge badge-inverted">1</span></button>
<button class="btn btn-outlined btn-primary">Badge button <span class="badge badge-primary badge-inverted">1</span></button>
<button class="btn btn-outlined btn-positive">Badge button <span class="badge badge-positive badge-inverted">1</span></button>
<button class="btn btn-outlined btn-negative">Badge button <span class="badge badge-negative badge-inverted">1</span></button>
{% endhighlight %}

### Outline buttons with badges
{% highlight html %}
<button class="btn">Badge button <span class="badge">1</span></button>
<button class="btn btn-primary">Badge button <span class="badge badge-primary">1</span></button>
<button class="btn btn-success">Badge button <span class="badge badge-positive">1</span></button>
<button class="btn btn-negative">Badge button <span class="badge badge-negative">1</span></button>

<button class="btn btn-outlined">Badge button <span class="badge badge-inverted">1</span></button>
<button class="btn btn-outlined btn-primary">Badge button <span class="badge badge-primary badge-inverted">1</span></button>
<button class="btn btn-outlined btn-positive">Badge button <span class="badge badge-positive badge-inverted">1</span></button>
<button class="btn btn-outlined btn-negative">Badge button <span class="badge badge-negative badge-inverted">1</span></button>
{% endhighlight %}

### Block buttons with badges
{% highlight html %}
<button class="btn btn-secondary btn-block">Badge button <span class="badge">1</span></button>
{% endhighlight %}


## Table view with badges

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell">
    <a class="navigate-right">
      <span class="badge">5</span>
      Item 1
    </a>
  </li>
  <li class="table-view-cell">
    <a class="navigate-right">
      <span class="badge badge-pill">5</span>
      Item 2
    </a>
  </li>
  <li class="table-view-cell">
    <a class="navigate-right">
      <span class="badge badge-pill badge-default">5</span>
      Item 3
    </a>
  </li>
  <li class="table-view-cell">
    <a class="navigate-right">
      <span class="badge badge-pill badge-danger">5</span>
      Item 4
    </a>
  </li>
</ul>
{% endhighlight %}
