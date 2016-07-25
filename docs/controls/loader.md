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



[http://break.kimsq.co.kr/rc-html-examples/loader/03.html](http://break.kimsq.co.kr/rc-html-examples/loader/03.html)  보완 필요

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


### Load in element
This demo shows how to show the loading message inside the target.

{% highlight js %}
$('selector').loader({ text: 'Loading', position: 'inside' });
{% endhighlight %}

### Overlay
{% highlight js %}
$.loader({ text: 'Loading' });
{% endhighlight %}


### Overlay on element
{% highlight js %}
$('selector').loader({
  text:       'Loading',
  position:   'overlay'
});
{% endhighlight %}

### Add a text in the loader
{% highlight js %}
$('selector').loader({ text: 'Loading', position: 'inside' });
{% endhighlight %}



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
       <td>right</td>
       <td>
       loader 출력 위치 및 형태 설정.
       <code>right</code> | <code>inside</code> | <code>overlay</code> 3 가지 사용 가능
       </td>
     </tr>
     <tr>
       <td>text</td>
       <td>string</td>
       <td>Loding...</td>
       <td>
        loader 출력시 표시되는 문구
       </td>
     </tr>
     <tr>
       <td>prefix</td>
       <td>string</td>
       <td>rc</td>
       <td>	css 독립성을 강화하기 위해서 특정 prefix 를 사용할 수 있다.  </td>
     </tr>
     <tr>
       <td>iconClass</td>
       <td>string</td>
       <td>rc-icon spinner</td>
       <td>Loader 아이콘에 class 명을 설정할 수 있다.</td>
     </tr>
     <tr>
       <td>tpl</td>
       <td>string</td>
       <td>{% highlight html %}<span class="isloading-wrapper %wrapper%">%text%<i class="%class% icon-spin"></i></span>{% endhighlight %}</td>
       <td>Loader 템플릿</td>
     </tr>
     <tr>
       <td>disableSource</td>
       <td>boolen</td>
       <td>true</td>
       <td>Loder 출력시 주변 엘리먼트에 <code>disabled</code> attribute 또는 class를 추가</td>
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
  'position': 'right',        // right | inside | overlay
  'text': '',                 // Text to display next to the loader
  'class': 'icon-refresh',    // loader CSS class
  'tpl': '<span class="isloading-wrapper %wrapper%">%text%<i class="%class% icon-spin"></i></span>',
  'disableSource': true,      // true | false
  'disableOthers': []
};
{% endhighlight %}


## Exampls

### Loader in modal

### Loader in Page
