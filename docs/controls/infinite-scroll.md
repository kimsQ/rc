---
layout: preview
preview: infinite-scroll
title: Infinite scroll
group: controls
---

Turn any element into an infinite scrolling region with content that loads on demand. 필요에 따라 로드 내용에 무한 스크롤 영역으로 모든 요소를 켭니다.


<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
     <tr class="bg-faded">
       <th style="width: 100px;">Name</th>
       <th>Version</th>
       <th>License</th>
       <th>URL</th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>Fuel UX</td>
      <td>3.15.5</td>
      <td><a href="https://github.com/ExactTarget/fuelux/blob/master/LICENSE">BSD-3</a></td>
       <td>
        <a href="http://getfuelux.com/javascript.html#infinite-scroll">http://getfuelux.com/javascript.html#infinite-scroll</a>
       </td>
     </tr>
    </tbody>
  </table>
</div>


## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Usage
{% highlight js %}
$(selector).infinitescroll();
{% endhighlight %}

Because of its dependency on a dataSource, you must initialize an infinitescroll() component via JavaScript:

{% highlight js %}
$('#myInfiniteScroll').infinitescroll({
  //dataSource is required to append additional content
  dataSource: function(helpers, callback){
    //passing back more content
    callback({ content: '...' });
  }
});
{% endhighlight %}

### Markup
Simply place `class="infinitescroll"` on an element of your choosing (preferably a div or span).
{% highlight html %}
<div class="infinitescroll" id="myInfiniteScroll"></div>
{% endhighlight %}


### Loads with button


## Options
You can pass options via JavaScript at initialization.


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
       <td>dataSource</td>
       <td>function</td>
       <td>null</td>
       <td>
       Called whenever the user scrolls the specified percentage towards the bottom. Arguments passed include a helpers object and callback function. The helpers object contains current percentage and scrollTop values. The callback function appends more content to the element. Pass an object back within the callback function structured as follows: <code>{ content: '...' }</code> If you append no additonal content, add the attribute end: true to that object. This code will append <code>'---------'</code> by default and prevent further dataSource calls. Pass a string value for the end attribute to append that string instead of the default.
       </td>
     </tr>
     <tr>
       <td>hybrid</td>
       <td>boolean OR object</td>
       <td>false</td>
       <td>
       Indicates whether the code will use "hybrid mode" and require the user to click a button before loading additional content. If set to <code>true</code>, the code will use a default "load more" icon within the button. Additionally, you can set the control to an object with the following structure: <code>{ label: (string or jQuery obj) }</code> The code will then append the <code>label</code> attribute value within the button instead of the default icon.
       </td>
     </tr>
     <tr>
       <td>percentage</td>
       <td>number</td>
       <td>95</td>
       <td>	Percentage scrolled to the bottom before calling the dataSource function for more content.</td>
     </tr>
     <tr>
       <td>button</td>
       <td>boolean</td>
       <td>btn</td>
       <td>하이브리드 형식 로시 버튼의 class 지정</td>
     </tr>
    </tbody>
  </table>
</div>


## Methods

### `.infinitescroll('destroy')`

Removes all functionality, jQuery data, and the markup from the DOM. Returns string of control markup.


### `.infinitescroll('disable')`
Ensures the infinite scrolling region is disabled


### `.infinitescroll('enable')`
Ensures the infinite scrolling region is enabled


### `.infinitescroll('end')`
Disables the infinite scrolling region and appends an "end" indicator

{% highlight js %}
$('#myInfiniteScroll').infinitescroll('fetchData');
{% endhighlight %}

{% highlight js %}
$('#myInfiniteScroll').infinitescroll('fetchData', {content: 'endicator'});
{% endhighlight %}

<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
     <tr>
       <th style="width: 100px;">Parameter</th>
       <th>description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
       <td>content</td>
       <td>
       Optional. String or jQuery object appended as an "end" indicator. Defaults to <code>'---------'</code>'
       </td>
     </tr>
    </tbody>
  </table>
</div>

### `.infinitescroll('fetchData')`

Tells the infinite scrolling region to make a call to its `dataSource` for additional content.

{% highlight js %}
$('#myInfiniteScroll').infinitescroll('fetchData');
{% endhighlight %}

{% highlight js %}
$('#myInfiniteScroll').infinitescroll('fetchData', {force: true});
{% endhighlight %}

<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
     <tr>
       <th style="width: 100px;">Parameter</th>
       <th>description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
       <td>force</td>
       <td>
       Optional. Boolean dictating whether to bypass the button click in hybrid mode and immediately call dataSoruce for more content. Defaults to <code>false</code>
       </td>
     </tr>
    </tbody>
  </table>
</div>
