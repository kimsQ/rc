---
layout: preview
preview: switch
title: Switch
group: components
---

Switches technically is the same thing as an HTML checkbox input, except it looks different and is easier to use on a touch device.
It can be used by sliding or tapping the control.

{% highlight html %}
<div data-toggle="switch" class="switch active">
  <div class="switch-handle"></div>
</div>

<div data-toggle="switch" class="switch">
  <div class="switch-handle"></div>
</div>
{% endhighlight %}


## Table view with switches

{% highlight html %}
<ul class="table-view">
  <li class="table-view-cell">
    Item 1
    <div data-toggle="switch" class="switch">
      <div class="switch-handle"></div>
    </div>
  </li>
  <li class="table-view-cell">
    Item 2
    <div data-toggle="switch" class="switch active">
      <div class="switch-handle"></div>
    </div>
  </li>
  <li class="table-view-cell">
    Item 3
    <div data-toggle="switch" class="switch">
      <div class="switch-handle"></div>
    </div>
  </li>
</ul>
{% endhighlight %}


## Event


<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
     <tr>
       <th style="width: 150px;">Event Type</th>
       <th>Description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
       <td>changed.rc.switch</td>
       <td>This event is fired when the switch is changed.</td>
     </tr>
    </tbody>
  </table>
</div>

### `changed.rc.switch`

{% highlight js %}
$('.switch').on('changed.rc.switch', function () {
  // Only needed if you want to fire a callback
})

{% endhighlight %}
