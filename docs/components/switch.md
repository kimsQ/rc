---
layout: preview
preview: switch
title: Switch
group: components
---

Switches technically is the same thing as an HTML checkbox input, except it looks different and is easier to use on a touch device.
It can be used by sliding or tapping the control.

{% highlight html %}
<div class="switch active">
  <div class="switch-handle"></div>
</div>

<div class="switch">
  <div class="switch-handle"></div>
</div>
{% endhighlight %}


## Table view with switches

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell">
    Item 1
    <div class="switch">
      <div class="switch-handle"></div>
    </div>
  </li>
  <li class="table-view-cell">
    Item 2
    <div class="switch active">
      <div class="switch-handle"></div>
    </div>
  </li>
  <li class="table-view-cell">
    Item 3
    <div class="switch">
      <div class="switch-handle"></div>
    </div>
  </li>
</ul>
{% endhighlight %}


## Event binding

switch.js binds an event to the document that returns a detail object and can be used to fire a callback.

{% highlight js %}
// Only needed if you want to fire a callback
document
.querySelector('#myswitch')
.addEventListener('switch', myFunction)
{% endhighlight %}
