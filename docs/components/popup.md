---
layout: preview
preview: popup
title: Popup
group: components
---

Popups are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Usage

모달은 요구에 따라 data 속성이나 자바스크립트를 통해 숨겨진 콘텐츠를 토글 합니다.
The popup plugin toggles your hidden content on demand, via data attributes or JavaScript. It also adds `.popup-open` to the `<body>` to override default scrolling behavior and generates a `.popup-backdrop` to provide a click area for dismissing shown popups when clicking outside the popup.

### Static example
A rendered popup with title, set of actions in the header and content.

{% highlight html %}
<!-- Popup -->
<div id="myPopup" class="popup zoom">
  <div class="popup-content">
    <header class="bar bar-nav">
      <a class="icon icon-close pull-right" data-history="back" role="button"></a>
      <h1 class="title">Popup</h1>
    </header>
    <div class="content">
      <p class="content-padded">The contents of my popup go here.</p>
    </div>
  </div>
</div>
{% endhighlight %}

### Via data attributes

Activate a popup without writing JavaScript. Set `data-toggle="popup"` on a controller element, like a button, along with a `data-target="#foo"` or `href="#foo"` to target a specific popup to toggle.

**Button trigger type**
{% highlight html %}
<button type="button" data-toggle="popup" data-target="#myPopup">
  Launch popup
</button>
{% endhighlight %}

**Link trigger type**
{% highlight html %}
<a href="#myPopup" data-toggle="popup" >
  Launch popup
</a>
{% endhighlight %}


### Via JavaScript

Call a popup with id `myPopup` with a single line of JavaScript:

{% highlight js %}$('#myPopup').popup('show'){% endhighlight %}



{% callout warning %}
#### Multiple open popups not supported

Be sure not to open a popup while another is still visible. Showing more than one popup at a time requires custom code.
{% endcallout %}

{% callout warning %}
#### Popup markup placement

Always try to place a popup's HTML code in a top-level position in your document to avoid other components affecting the popup's appearance and/or functionality.
{% endcallout %}

{% callout warning %}
#### Mobile device caveats

There are some caveats regarding using popups on mobile devices. [See our browser support docs]({{ site.baseurl }}/getting-started/browsers-devices/#popups-and-dropdowns-on-mobile) for details.
{% endcallout %}

## Footer bar

{% highlight html %}
<div id="myPopup" class="popup zoom">
  <div class="popup-content">
    <header class="bar bar-nav">
      <h1 class="title">with buttons</h1>
    </header>
    <nav class="bar bar-standard bar-footer">
      <div class="row">
        <div class="col-xs-6">
          <button type="button" class="btn btn-secondary btn-block">Cancel</button>
        </div>
        <div class="col-xs-6 p-l-0">
          <button type="button" class="btn btn-primary btn-block">OK</button>
        </div>
      </div>
    </nav>
    <div class="content">
      <p class="content-padded text-xs-center">..</p>
    </div>
  </div>
</div>
{% endhighlight %}

## with single button
{% highlight html %}
<div id="myPopup" class="popup zoom">
  <div class="popup-content">
    <header class="bar bar-nav">
      <h1 class="title">with-single-button</h1>
    </header>
    <nav class="bar bar-standard bar-footer">
      <button type="button" class="btn btn-primary btn-block">OK</button>
    </nav>
    <div class="content">
      <p class="content-padded text-xs-center">..</p>
    </div>
  </div>
</div>
{% endhighlight %}

## With tab bar
{% highlight html %}
<div id="myPopup" class="popup zoom">
  <div class="popup-content">
    <header class="bar bar-nav">
      <h1 class="title">with buttons</h1>
    </header>
    <nav class="bar bar-tab">
      <a class="tab-item bg-secondary" role="button">
        Cancel
      </a>
      <a class="tab-item bg-primary" role="button">
        OK
      </a>
    </nav>
    <div class="content">
      <p class="content-padded text-xs-center">..</p>
    </div>
  </div>
</div>
{% endhighlight %}

## Animation

팝업이 호출될 때, 에니메이션 효과를 적용합니다. 지정된 값은 팝업 컨테이너에 class 에 적용되며, 미 지정시 애니메이션 효과가 사라집니다.

### Zoom
{% highlight html %}
<!-- popup -->
<div id="myPopup" class="popup zoom">
...
</div>
{% endhighlight %}

### Slide-up
{% highlight html %}
<!-- popup -->
<div id="myPopup" class="popup slide-up">
...
</div>
{% endhighlight %}


### Fall
{% highlight html %}
<!-- popup -->
<div id="myPopup" class="popup fall">
...
</div>
{% endhighlight %}


### Flip
{% highlight html %}
<!-- popup -->
<div id="myPopup" class="popup flip">
...
</div>
{% endhighlight %}




## Options

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-`, as in `data-history=""`. 옵션은 data 속성이나 자바스크립트로 전해질 수 있다. data 속성은 data-selector="" 처럼 data- 에 옵션명을 덧붙히면 됩니다.

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
       <td>show</td>
       <td>boolean</td>
       <td>true</td>
       <td>모달을 호출하는 역할을 합니다.<br> 기본값이 <code>true</code> 이기 때문에 호출시 설정하지 않아도 됩니다.</td>
     </tr>
     <tr>
       <td>title</td>
       <td>string</td>
       <td>null</td>
       <td></td>
     </tr>
     <tr>
       <td>url</td>
       <td>string</td>
       <td>null</td>
       <td><code>true</code> 인 경우 브라우저의 url 에 적용됩니다. <br> <code>true</code> 인데 값이 없는 경우 기본값 <code>#</code> 이 적용됩니다.</td>
     </tr>
     <tr>
       <td>history</td>
       <td>boolean</td>
       <td>true</td>
       <td><code>window.history</code> 객체에 적용되어 back 버튼을 사용해서 컴포넌트를 닫을 수 있게 해줍니다. <br> 기본값이 <code>true</code> 이므로 설정하지 않기 위해서는는 아래와 같이 2가지 방법이 있습니다.|</td>
     </tr>
     <tr>
       <td>template</td>
       <td>string</td>
       <td>null</td>
       <td>컴포넌트를 호출한 후에 외부의 파일을 <code>load</code> 해야 할 경우 사용하면 됩니다.</td>
     </tr>
     <tr>
       <td>backdrop</td>
       <td>boolean or the string</td>
       <td>true</td>
       <td>배경을 포함합니다. 팝업을 닫지 않는 배경이 필요할 경우 <code>static</code> 를 명시하세요.</td>
     </tr>
    </tbody>
  </table>
</div>

### Title

- 용도 : 팝업의 타이틀과 브라우저의 타이틀을 동적으로 변경할 수 있습니다.
- 유형 : `string`
- 기본값 : `null`
- 적용방법 : `data-title="값"` 으로 값을 전달하고 출력을 원하는 엘리먼트에 `data-role="title"` 로 받아서 출력합니다.


Via data attributes
{% highlight html %}
<button ... data-title="My title">Launch demo popup </button>
{% endhighlight %}

Via JavaScript
{% highlight js %}
$(".btn").tap(function(){
  $("#myPopup").popup({
    title: 'My title'
  });
});
{% endhighlight %}


전달된 타이틀 값은 모달 내부에 `data-role="title"`이 적용된 요소에 출력됩니다.
{% highlight html %}
<!-- popup -->
...
<h1 class="title" data-role="title"></h1>
...
{% endhighlight %}


### URL

- 용도 : 팝업 호출시 URL을 지정 또는 변경할 수 있습니다.
- 유형 : `string`
- 기본값 : `null`
- 유의사항 : 값이 없는 경우 `#` (기본값) 이 적용되며 history 옵션이 `true` 인 경우만 작동됩니다.

Via data attributes
{% highlight html %}
<button data-toggle='popup' data-url='값'>Launch demo popup </button>
{% endhighlight %}

Via JavaScript
{% highlight js %}
$('.btn').tap(function(){
  $("#myPopup").popup({
    url :'값'
  });
});
{% endhighlight %}


### History

- 용도 : 팝업호출 시 `window.history` 객체에 기록되어 스마트폰의 back 버튼을 사용해서 팝업을 닫을 수 있게 해줍니다.
- 유형 : `boolean`
- 기본값 : `ture`

Via data attributes
{% highlight html %}
<button data-toggle="popup" data-history="false">Launch demo popup </button>
{% endhighlight %}

Via JavaScript
{% highlight js %}
$(".btn").tap(function(){
  $("#myPopup").popup({
    history :'false'
  });
});
{% endhighlight %}


history가 기록되지 않은 모달을 닫을 때는 `data-dismiss="popup"` 을 사용합니다.
{% highlight html %}
<!-- popup -->
...
<a class="icon icon-close pull-right" data-dismiss="popup"></a>
...
{% endhighlight %}


### Template

Via data attributes
{% highlight html %}
<button  
  data-toggle="popup"
  data-target="#myPopup"
  data-template="./template/01.html"
  data-title=".."
  data-content="..">
  Launch demo popup
</button>
{% endhighlight %}

Via JavaScript
{% highlight js %}
$('.btn').tap(function(){
  $('#myPopup').popup({
    title: '..',
    content: '..',
    template: './template/01.html'
  });
});
{% endhighlight %}


### Backdrop

- 용도 : 팝업 호출시 배경을 제어합니다.팝업을 닫지 않는 배경을 위해 `static` 를 명시하세요.
- 유형 : `boolean` 또는 `string` ( true , false , static )
- 기본값 : `true`

Via data attributes
{% highlight html %}
<button data-toggle="popup" data-backdrop="false">
{% endhighlight %}

Via JavaScript
{% highlight js %}
$(‘#foo’).popup({
    backdrop :'false'
});
{% endhighlight %}


## Methods

### `.popup(options)`

Activates your content as a popup. Accepts an optional options `object`.

{% highlight js %}
$('#myPopup').popup({
  title : ‘My title’
})
{% endhighlight %}

### `.popup('toggle')`

Manually toggles a popup. **Returns to the caller before the popup has actually been shown or hidden** (i.e. before the `shown.rc.popup` or `hidden.rc.popup` event occurs).

{% highlight js %}$('#myPopup').popup('toggle'){% endhighlight %}

### `.popup('show')`

Manually opens a popup. **Returns to the caller before the popup has actually been shown** (i.e. before the `shown.rc.popup` event occurs).

{% highlight js %}$('#myPopup').popup('show'){% endhighlight %}

### `.popup('hide')`

Manually hides a popup. **Returns to the caller before the popup has actually been hidden** (i.e. before the `hidden.rc.popup` event occurs).

{% highlight js %}$('#myPopup').popup('hide'){% endhighlight %}

## Events

Bootstrap's popup class exposes a few events for hooking into popup functionality. All popup events are fired at the popup itself (i.e. at the `<div class="popup">`).

<div class="table-responsive">
  <table class="table table-bordered table-striped">
    <thead>
     <tr>
       <th style="width: 150px;">Event Type</th>
       <th>Description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
       <td>show.rc.popup</td>
       <td>This event fires immediately when the <code>show</code> instance method is called. If caused by a click, the clicked element is available as the <code>relatedTarget</code> property of the event.</td>
     </tr>
     <tr>
       <td>shown.rc.popup</td>
       <td>This event is fired when the popup has been made visible to the user (will wait for CSS transitions to complete). If caused by a click, the clicked element is available as the <code>relatedTarget</code> property of the event.</td>
     </tr>
     <tr>
       <td>hide.rc.popup</td>
       <td>This event is fired immediately when the <code>hide</code> instance method has been called.</td>
     </tr>
     <tr>
       <td>hidden.rc.popup</td>
       <td>This event is fired when the popup has finished being hidden from the user (will wait for CSS transitions to complete).</td>
     </tr>
     <tr>
       <td>loaded.rc.popup</td>
       <td>data-template 값으로 정해진 원격 마크업이 load 된 후 실행되는 이벤트</td>
     </tr>
    </tbody>
  </table>
</div>

### `show.rc.popup`

This event fires immediately when the `show` instance method is called. If caused by a click, the clicked element is available as the `relatedTarget` property of the event.

{% highlight js %}
$('#myPopup').on('show.rc.popup', function () {
  $('#myInput').focus()
})
{% endhighlight %}


### `shown.rc.popup`

This event is fired when the popup has been made visible to the user (will wait for CSS transitions to complete). If caused by a click, the clicked element is available as the `relatedTarget` property of the event.

**Due to how HTML5 defines its semantics, [the `autofocus` HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autofocus) has no effect in Bootstrap popups.** To achieve the same effect, use some custom JavaScript:

{% highlight js %}
$('#myPopup').on('shown.rc.popup', function () {
  $('#myInput').focus()
})
{% endhighlight %}

### `hide.rc.popup`
This event is fired immediately when the hide instance method has been called.
{% highlight js %}
$('#myPopup').on('hide.rc.popup', function (e) {
  // do something...
})
{% endhighlight %}


### `hidden.rc.popup`
This event is fired when the popup has finished being hidden from the user (will wait for CSS transitions to complete).

{% highlight js %}
$('#myPopup').on('hidden.rc.popup', function (e) {
  // do something...
})
{% endhighlight %}


### `loaded.rc.popup`
data-template 값으로 정해진 원격 마크업이 load 된 후 실행되는 이벤트
{% highlight js %}
$('#myPopup').on('loaded.rc.popup', function (e) {
  // do something...
})
{% endhighlight %}


## 응용방법

### Varying popup content based on trigger button

Have a bunch of buttons that all trigger the same popup, just with slightly different contents? Use `event.relatedTarget` and [HTML `data-*` attributes](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) (possibly [via jQuery](https://api.jquery.com/data/)) to vary the contents of the popup depending on which button was clicked. See the Popup Events docs for details on `relatedTarget`. 거의 같은 모달을 작동시키는 몇개의 버튼을 가지고 싶으세요? 버튼이 터치 됨에 따라 달라지는 내용을 위해서 `event.relatedTarget` 와 `HTML data-*` 속성을 사용하세요. `relatedTarget` 에 자세한 것은 팝업 이벤트 문서를 보세요

{% highlight js %}
$('#examplePopup').on('show.rc.popup', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the popup
  var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the popup's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var popup = $(this)
    popup.find('.title').text('New message to ' + recipient)
    popup.find('.content input').val(recipient)
})
{% endhighlight %}
