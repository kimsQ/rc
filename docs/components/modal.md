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

## 기본 사용법(Usage)

모달은 요구에 따라 data 속성이나 자바스크립트를 통해 숨겨진 콘텐츠를 토글 합니다.
The modal plugin toggles your hidden content on demand, via data attributes or JavaScript. It also adds `.modal-open` to the `<body>` to override default scrolling behavior and generates a `.modal-backdrop` to provide a click area for dismissing shown modals when clicking outside the modal.

### Via data attributes

Activate a modal without writing JavaScript. Set `data-toggle="modal"` on a controller element, like a button, along with a `data-target="#foo"` or `href="#foo"` to target a specific modal to toggle.

{% highlight html %}
<button type="button" data-toggle="modal" data-target="#myModal">
  Launch modal
</button>
{% endhighlight %}

- [button 방식 예제](https://jsfiddle.net/gitaek/7fbjtrxe/)
- [link 방식 예제]()

### Via JavaScript

Call a modal with id `myModal` with a single line of JavaScript:

{% highlight js %}$('#myModal').modal(options){% endhighlight %}









**Due to how HTML5 defines its semantics, [the `autofocus` HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autofocus) has no effect in Bootstrap modals.** To achieve the same effect, use some custom JavaScript:

{% highlight js %}
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})
{% endhighlight %}

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

### Static example

A rendered modal with header, body, and set of actions in the footer.

{% highlight html %}
<div id="myModal" class="modal">
  <header class="bar bar-nav">
    <a class="icon icon-close pull-right" data-history="back"></a>
    <h1 class="title">Modal</h1>
  </header>
  <div class="content">
    <p class="content-padded">
      The contents of my modal go here. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
    </p>
  </div>
</div>
{% endhighlight %}

## Animation

모달이 호출될 때, 에니메이션 효과를 적용합니다. 지정된 값은 모달 컨테이너에 class 에 적용되며, 미 지정시 기본 slide-up 애니메이션 효과가 적용됩니다.

* [데모(기본)]()
* [데모(zoom)]()


{% callout warning %}
#### Make modals accessible

Be sure to add `role="dialog"` and `aria-labelledby="..."`, referencing the modal title, to `.modal`, and `role="document"` to the `.modal-dialog` itself.

Additionally, you may give a description of your modal dialog with `aria-describedby` on `.modal`.
{% endcallout %}

{% callout info %}
#### Embedding YouTube videos

Embedding YouTube videos in modals requires additional JavaScript not in Bootstrap to automatically stop playback and more. [See this helpful Stack Overflow post](https://stackoverflow.com/questions/18622508/bootstrap-3-and-youtube-in-modal) for more information.
{% endcallout %}




## Options

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-`, as in `data-backdrop=""`. 옵션은 data 속성이나 자바스크립트로 전해질 수 있다. data 속성은 data-selector="" 처럼 data- 에 옵션명을 덧붙히면 됩니다.


| 이름     | 유형    | 기본값 | 설명  |
| ------  |--------| -----|----- |
| show    | boolean  | true | 모달을 호출하는 역할을 합니다.<br> 기본값이 `true` 이기 때문에 호출시 설정하지 않아도 됩니다.  |
| title   | string   | null |     |
| url | string   | null | `true` 인 경우 브라우저의 url 에 적용됩니다. <br> `true` 인데 값이 없는 경우 기본값`#` 이 적용됩니다.|
| history | boolean  | true | window.history 객체에 적용되어 back 버튼을 사용해서 컴포넌트를 닫을 수 있게 해줍니다. <br> 기본값이 `true` 이므로 설정하지 않기 위해서는는 아래와 같이 2가지 방법이 있습니다.|
| template| string   | null | 컴포넌트를 호출한 후에 외부의 파일을 load 해야 할 경우 사용하면 됩니다.|



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
       <td>backdrop</td>
       <td>boolean or the string <code>'static'</code></td>
       <td>true</td>
       <td>Includes a modal-backdrop element. Alternatively, specify <code>static</code> for a backdrop which doesn't close the modal on click.</td>
     </tr>
     <tr>
       <td>keyboard</td>
       <td>boolean</td>
       <td>true</td>
       <td>Closes the modal when escape key is pressed</td>
     </tr>
     <tr>
       <td>show</td>
       <td>boolean</td>
       <td>true</td>
       <td>Shows the modal when initialized.</td>
     </tr>
    </tbody>
  </table>
</div>

## Methods

### `.modal(options)`

Activates your content as a modal. Accepts an optional options `object`.

{% highlight js %}
$('#myModal').modal({
  keyboard: false
})
{% endhighlight %}

### `.modal('toggle')`

Manually toggles a modal. **Returns to the caller before the modal has actually been shown or hidden** (i.e. before the `shown.bs.modal` or `hidden.bs.modal` event occurs).

{% highlight js %}$('#myModal').modal('toggle'){% endhighlight %}

### `.modal('show')`

Manually opens a modal. **Returns to the caller before the modal has actually been shown** (i.e. before the `shown.bs.modal` event occurs).

{% highlight js %}$('#myModal').modal('show'){% endhighlight %}

### `.modal('hide')`

Manually hides a modal. **Returns to the caller before the modal has actually been hidden** (i.e. before the `hidden.bs.modal` event occurs).

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
       <td>show.bs.modal</td>
       <td>This event fires immediately when the <code>show</code> instance method is called. If caused by a click, the clicked element is available as the <code>relatedTarget</code> property of the event.</td>
     </tr>
     <tr>
       <td>shown.bs.modal</td>
       <td>This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete). If caused by a click, the clicked element is available as the <code>relatedTarget</code> property of the event.</td>
     </tr>
     <tr>
       <td>hide.bs.modal</td>
       <td>This event is fired immediately when the <code>hide</code> instance method has been called.</td>
     </tr>
     <tr>
       <td>hidden.bs.modal</td>
       <td>This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).</td>
     </tr>
    </tbody>
  </table>
</div>

{% highlight js %}
$('#myModal').on('hidden.bs.modal', function (e) {
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
