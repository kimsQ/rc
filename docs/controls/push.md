---
layout: preview
preview: push
title: Push
group: controls
---

Push.js is the engine that connects Ratchet pages together with AJAX and the history api. Push.js is listening to all clicks on a page, so just make sure it's included and link something in your project up.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Usage

{% highlight html %}
<!-- A one.html link -->
<a href="two.html" data-control="push">Two</a>
{% endhighlight %}


This will use push to replace everything in the .content div with the .content of two.html. Also, it will either update or remove .bar-nav and .bar-tab according to their presences in two.html.

A working version of push:

{% highlight html %}
<header class="bar bar-nav">
  <h1 class="title">Page one</h1>
</header>
<div class="content">
  <div class="card">
    <ul class="table-view">
      <li class="table-view-cell">
        <a class="navigate-right" href="./two.html" data-control="push">
          Load new page with push
        </a>
      </li>
    </ul>
  </div>
</div>
{% endhighlight %}


## Transitions

Now that pages are being loaded through push, it's easy to specify transitions for animations between pages. There are three different transitions to chose from: `fade`, `slide-in`, or `slide-out`.


### Fade transition

{% highlight html %}
<nav class="nav nav-inline">
  <a href="01.html" data-control="push" data-transition="fade" class="nav-link active" >01</a>
  <a href="02.html" data-control="push" data-transition="fade" class="nav-link" >02</a>
  <a href="03.html" data-control="push" data-transition="fade" class="nav-link" >03</a>
  <a href="04.html" data-control="push" data-transition="fade" class="nav-link" >04</a>
</nav>
{% endhighlight %}


### Slide transition


{% highlight html %}
<!-- An one.html link that animates to two.html -->
<a href="two.html" data-control="push" data-transition="slide-in">Two</a>
{% endhighlight %}


{% highlight html %}
<!-- An two.html link that animates to one.html -->
<a href="one.html" data-control="push" data-transition="slide-out">One</a>
{% endhighlight %}


## Push bind

push 작동 후 DOM 이 변경되므로  기존에   onload 타입이나 초기화를 해주는 기능들을 통해 인지되었던 외부 익스텐션을 기억못하는 현상. Push bind를 위해 addEventListner 는 push 작동후 callback 함수 개념으로 해당 함수를 한번더 초기화 하라는 의미

Push.js binds an event to the document that returns a detail object and can be used to fire a callback.

{% highlight js %}
// Only needed if you want to fire a callback
window.addEventListener('push', myFunction);
{% endhighlight %}
