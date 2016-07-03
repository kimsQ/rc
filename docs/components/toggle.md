---
layout: preview
preview: toggle
title: Toggle
group: components
---

Toggles technically is the same thing as an HTML checkbox input, except it looks different and is easier to use on a touch device.
It can be used by sliding or tapping the control.

{% highlight html %}
<div class="toggle active">
  <div class="toggle-handle"></div>
</div>

<div class="toggle">
  <div class="toggle-handle"></div>
</div>
{% endhighlight %}


## Table view with toggles

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell">
    Item 1
    <div class="toggle">
      <div class="toggle-handle"></div>
    </div>
  </li>
  <li class="table-view-cell">
    Item 2
    <div class="toggle active">
      <div class="toggle-handle"></div>
    </div>
  </li>
  <li class="table-view-cell">
    Item 3
    <div class="toggle">
      <div class="toggle-handle"></div>
    </div>
  </li>
</ul>
{% endhighlight %}


## Event binding

Toggles.js binds an event to the document that returns a detail object and can be used to fire a callback.

{% highlight js %}
// Only needed if you want to fire a callback
document
.querySelector('#myToggle')
.addEventListener('toggle', myFunction)
{% endhighlight %}
