---
layout: preview
preview: modal
title: Modal
group: components
---

Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.
모달은 일시적으로 콘텐츠 보기를 제공하는 창입니다. 보통 선택을 하거나 항목의 편집에 사용됩니다.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Usage

모달은 요구에 따라 data 속성이나 자바스크립트를 통해 숨겨진 콘텐츠를 토글 합니다.
The modal plugin toggles your hidden content on demand, via data attributes or JavaScript. It also adds `.modal-open` to the `<body>` to override default scrolling behavior and generates a `.modal-backdrop` to provide a click area for dismissing shown modals when clicking outside the modal.

### Static example
A rendered modal with title, set of actions in the header and content.

{% highlight html %}
<!-- Modal -->
<div id="myModal" class="modal">
  <header class="bar bar-nav bar-light bg-faded">
    <a class="icon icon-close pull-right" data-history="back"></a>
    <h1 class="title">Modal</h1>
  </header>
  <div class="content">
    <p class="content-padded">
      The contents of my modal go here.
    </p>
  </div>
</div>
{% endhighlight %}

### Via data attributes

Activate a modal without writing JavaScript. Set `data-toggle="modal"` on a controller element, like a button, along with a `data-target="#foo"` or `href="#foo"` to target a specific modal to toggle.

**Button trigger type**
{% highlight html %}
<button type="button" data-toggle="modal" data-target="#myModal">
  Launch modal
</button>
{% endhighlight %}

**Link trigger type**
{% highlight html %}
<a href="#myModal" data-toggle="modal" >
  Launch modal
</a>
{% endhighlight %}


### Via JavaScript

Call a modal with id `myModal` with a single line of JavaScript:

{% highlight js %}$('#myModal').modal('show'){% endhighlight %}










{% callout warning %}
#### Multiple open modals not supported

Be sure not to open a modal while another is still visible. Showing more than one modal at a time requires custom code.
{% endcallout %}

{% callout warning %}
#### Modal markup placement

Always try to place a modal's HTML code in a top-level position in your document to avoid other components affecting the modal's appearance and/or functionality.
{% endcallout %}

{% callout warning %}
#### Mobile device caveats

There are some caveats regarding using modals on mobile devices. [See our browser support docs]({{ site.baseurl }}/getting-started/browsers-devices/#modals-and-dropdowns-on-mobile) for details.
{% endcallout %}





## Animation

모달이 호출될 때, zoom 효과를 적용합니다. 미 지정시 기본 slide-up 애니메이션 효과가 적용됩니다.
{% highlight html %}
<button .. data-animation="zoom">
  Launch modal
</button>
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
    </tbody>
  </table>
</div>

### Title

Via data attributes
{% highlight html %}
<button ... data-title="My title">Launch demo modal </button>
{% endhighlight %}

Via JavaScript
{% highlight js %}
$(".btn").tap(function(){
  $("#myModal").modal({
    title: 'My title'
  });
});
{% endhighlight %}


전달된 타이틀 값은 모달 내부에 `data-role="title"`이 적용된 요소에 출력됩니다.
{% highlight html %}
<!-- modal -->
...
<h1 class="title" data-role="title"></h1>
...
{% endhighlight %}


### URL

Via data attributes
{% highlight html %}
<button ... data-title="My title">Launch demo modal </button>
{% endhighlight %}

Via JavaScript
{% highlight js %}
$(".btn").tap(function(){
  $("#myModal").modal({
    title: 'My title'
  });
});
{% endhighlight %}


### History

Via data attributes
{% highlight html %}
<button ... data-title="My title">Launch demo modal </button>
{% endhighlight %}

Via JavaScript
{% highlight js %}
$(".btn").tap(function(){
  $("#myModal").modal({
    title: 'My title'
  });
});
{% endhighlight %}


history가 기록되지 않은 모달을 닫을 때는 `data-dismiss="modal"` 을 사용합니다.
{% highlight html %}
<!-- modal -->
...
<a data-dismiss="modal"></a>
...
{% endhighlight %}


### Template

Via data attributes
{% highlight html %}
<button  
  data-toggle="modal"
  data-target="#myModal"
  data-template="./template/01.html"
  data-title=".."
  data-content="..">
  Launch demo modal
</button>
{% endhighlight %}

Via JavaScript
{% highlight js %}
$('.btn').tap(function(){
	$('#myModal').modal({
    	title: '..',
    	content: '..',
    	template: './template/01.html'
    });
});
{% endhighlight %}


## Methods

### `.modal(options)`

Activates your content as a modal. Accepts an optional options `object`.

{% highlight js %}
$('#myModal').modal({
  title : ‘My title’
})
{% endhighlight %}

### `.modal('toggle')`

Manually toggles a modal. **Returns to the caller before the modal has actually been shown or hidden** (i.e. before the `shown.rc.modal` or `hidden.rc.modal` event occurs).

{% highlight js %}$('#myModal').modal('toggle'){% endhighlight %}

### `.modal('show')`

Manually opens a modal. **Returns to the caller before the modal has actually been shown** (i.e. before the `shown.rc.modal` event occurs).

{% highlight js %}$('#myModal').modal('show'){% endhighlight %}

### `.modal('hide')`

Manually hides a modal. **Returns to the caller before the modal has actually been hidden** (i.e. before the `hidden.rc.modal` event occurs).

{% highlight js %}$('#myModal').modal('hide'){% endhighlight %}

## Events

Bootstrap's modal class exposes a few events for hooking into modal functionality. All modal events are fired at the modal itself (i.e. at the `<div class="modal">`).

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
       <td>show.rc.modal</td>
       <td>This event fires immediately when the <code>show</code> instance method is called. If caused by a click, the clicked element is available as the <code>relatedTarget</code> property of the event.</td>
     </tr>
     <tr>
       <td>shown.rc.modal</td>
       <td>This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete). If caused by a click, the clicked element is available as the <code>relatedTarget</code> property of the event.</td>
     </tr>
     <tr>
       <td>hide.rc.modal</td>
       <td>This event is fired immediately when the <code>hide</code> instance method has been called.</td>
     </tr>
     <tr>
       <td>hidden.rc.modal</td>
       <td>This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).</td>
     </tr>
     <tr>
       <td>loaded.rc.modal</td>
       <td>data-template 값으로 정해진 원격 마크업이 load 된 후 실행되는 이벤트</td>
     </tr>
    </tbody>
  </table>
</div>

### `show.rc.modal`

This event fires immediately when the `show` instance method is called. If caused by a click, the clicked element is available as the `relatedTarget` property of the event.

{% highlight js %}
$('#myModal').on('show.rc.modal', function () {
  $('#myInput').focus()
})
{% endhighlight %}


### `shown.rc.modal`

This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete). If caused by a click, the clicked element is available as the `relatedTarget` property of the event.

**Due to how HTML5 defines its semantics, [the `autofocus` HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autofocus) has no effect in Bootstrap modals.** To achieve the same effect, use some custom JavaScript:

{% highlight js %}
$('#myModal').on('shown.rc.modal', function () {
  $('#myInput').focus()
})
{% endhighlight %}

### `hide.rc.modal`
This event is fired immediately when the hide instance method has been called.
{% highlight js %}
$('#myModal').on('hide.rc.modal', function (e) {
  // do something...
})
{% endhighlight %}


### `hidden.rc.modal`
This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).

{% highlight js %}
$('#myModal').on('hidden.rc.modal', function (e) {
  // do something...
})
{% endhighlight %}


### `loaded.rc.modal`
data-template 값으로 정해진 원격 마크업이 load 된 후 실행되는 이벤트
{% highlight js %}
$('#myModal').on('loaded.rc.modal', function (e) {
  // do something...
})
{% endhighlight %}


## 응용방법

### Varying modal content based on trigger button

Have a bunch of buttons that all trigger the same modal, just with slightly different contents? Use `event.relatedTarget` and [HTML `data-*` attributes](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) (possibly [via jQuery](https://api.jquery.com/data/)) to vary the contents of the modal depending on which button was clicked. See the Modal Events docs for details on `relatedTarget`. 거의 같은 모달을 작동시키는 몇개의 버튼을 가지고 싶으세요? 버튼이 터치 됨에 따라 달라지는 내용을 위해서 `event.relatedTarget` 와 `HTML data-*` 속성을 사용하세요. `relatedTarget` 에 자세한 것은 팝업 이벤트 문서를 보세요

{% highlight js %}
$('#exampleModal').on('show.rc.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.title').text('New message to ' + recipient)
    modal.find('.content input').val(recipient)
})
{% endhighlight %}
