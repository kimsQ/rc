---
layout: preview
preview: loader
title: Loader
group: controls
---

Simple jQuery plugin to show visual feedback when loading data or any action that would take time

<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
     <tr class="bg-faded">
       <th style="width: 150px;">Name</th>
       <th>Version</th>
       <th>License</th>
       <th>Repository</th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>isLoading</td>
      <td>1.0.6</td>
      <td>MIT</td>
       <td>
        <a href="https://github.com/hekigan/is-loading">https://github.com/hekigan/is-loading</a>
       </td>
     </tr>
    </tbody>
  </table>
</div>



## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Usage

### Basic Loading:

This is the most basic setup. Just use `$('selector').loader();` and you are done for the setup.
When your action (data loading, etc...) is done, just call `$('selector').loader('hide');` and you are done.

{% highlight js %}
$('selector').loader();
{% endhighlight %}

Stop:
{% highlight js %}
$('selector').loader('hide');
{% endhighlight %}
<br><br>

### Load side element
This demo shows how to show the loading message inside the target.

{% highlight js %}
$('selector').loader({ position: 'right' });
{% endhighlight %}
<br><br>

### Load in element
This demo shows how to show the loading message inside the target.

{% highlight js %}
$('selector').loader({ position: 'inside' });
{% endhighlight %}
<br><br>

### Overlay
{% highlight js %}
$.loader();
{% endhighlight %}
<br><br>

### Overlay on element
{% highlight js %}
$('selector').loader({ position: 'overlay' });
{% endhighlight %}
<br><br>

### Add a text in the loader
{% highlight js %}
$('selector').loader({ text: 'Sending...' });
{% endhighlight %}
<br><br>


### Disable some extra elements
If you want to disable some extra tags/input/etc... while the loading is active, you can use the `disableOthers[] `option.
{% highlight js %}
$('selector').loader({
  text: 'Sending',
  disableOthers: [
    $('#demo .form-control'),
    $('#demo .btn')
  ]
});
{% endhighlight %}


## Options

<div class="table-responsive">
  <table class="table table-bordered table-striped">
    <thead>
     <tr>
       <th style="width: 100px;">Name</th>
       <th style="width: 50px;">Type</th>
       <th style="width: 50px;">Default</th>
       <th>Description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
       <td>position</td>
       <td>boolean</td>
       <td>block</td>
       <td>
       loader 출력 위치 및 형태 설정.
       <code>block</code> | <code>right</code> | <code>inside</code> | <code>overlay</code> 3 가지 사용 가능
       </td>
     </tr>
     <tr>
       <td>text</td>
       <td>string</td>
       <td>null</td>
       <td>
        loader 출력시 표시되는 문구
       </td>
     </tr>
     <tr>
       <td>theme</td>
       <td>string</td>
       <td>default</td>
       <td>Theme를 설정 할 수 있다.</td>
     </tr>
     <tr>
       <td>tpl</td>
       <td>string</td>
       <td colspan="2">
       {% highlight html %}<span class="loader-wrapper %wrapper% %theme%"><i class="loader">Loading...</i>%text%</span>{% endhighlight %}
       <p>Loader template</p>
       </td>
     </tr>
     <tr>
       <td>disableSource</td>
       <td>boolen</td>
       <td>true</td>
       <td>loader 출력시 주변 엘리먼트에 <code>disabled</code> attribute 또는 class를 추가</td>
     </tr>
     <tr>
       <td>disableOthers</td>
       <td>Array</td>
       <td>[]</td>
       <td>설정된 엘리먼트들에 <code>disabled</code> attribute 또는 class를 추가</td>
     </tr>
    </tbody>
  </table>
</div>

### Default options:

{% highlight js %}
defaults = {
  'position': 'block',        // block | right | inside | overlay
  'text': '',                 // Text to display next to the loader
  'iconTheme': 'default',    // loader CSS theme
  'tpl': '<span class="loader-wrapper %wrapper% %theme%"><i class="loader">Loading...</i>%text%</span>',
  'disableSource': true,      // true | false
  'disableOthers': []
};
{% endhighlight %}


## Exampls

### Customized Loader
{% highlight html %}
<style>
  .loader-overlay {...}
  .loader-overlay .loader-wrapper.myLoader {...}
</style>
{% endhighlight %}

{% highlight js %}
$('selector').loader({
  theme: 'myLoader',
  tpl: '..'
});
{% endhighlight %}

### Loader in modal
{% highlight js %}
$(".btn").tap(function() {

  $('#myModal').modal('show');
  $("#myModal .content").loader({
    text:       "Loading...",
    position:   "overlay"
  });

  // Re-enabling event
  setTimeout(function() {
    $("#myModal .content").loader("hide");
    $("#myModal p").html("Hello World");
    $.notify("Content Loaded")
  }, 1000);

});
{% endhighlight %}
<br><br><br><br><br><br>

### Loader in Page

<br><br><br><br><br><br>
