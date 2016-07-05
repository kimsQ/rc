---
layout: preview
preview: page
title: Page
group: components
---

페이지는 기준 페이지(Start Page)에서 타켓 페이지(Target Page)를 호출하는 컴포넌트 입니다.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}


## Usage

페이지는 요구에 따라 data 속성이나 자바스크립트를 통해 숨겨진 페이지를 호출 합니다.


### Static example
자바스크립트 없이 페이지를 활성화합니다. 버튼 또는 링크에 `data-toggle="page" `를 추가하고, `data-start="#page1"` 로 시작 페이지를 명시하고 `data-target="#page2"` 나 `href="#page2"` 로 호출할 페이지를 지정해 줍니다.

시작 페이지에는 `class="page center"` 를 추가하고 호출할 페이지에는 `class="page right" `를 추가합니다.

{% highlight html %}
<!-- Start Page -->
<div id="page1" class="page center">
  <button type="button" data-toggle="page" data-start="#page1" data-target="#page2">
    Launch Page2
  </button>
</div>

<!-- Target Page -->
<div id="page2" class="page right">
  ...
</div>
{% endhighlight %}

### Via data attributes


**Button trigger type**
{% highlight html %}
<button data-toggle="page" data-start="#page-start" data-target="#page-target">
  Launch demo page
</button>
{% endhighlight %}

**Link trigger type**
{% highlight html %}
<a href="#page-target" data-toggle="page" data-start="#page-start">
  Launch popup
</a>
{% endhighlight %}


### Via JavaScript

Call page with id `page-target` with a single line of JavaScript:

{% highlight js %}
$('#page-target').page({
  show: true,
  start: '#page-start',
  target: '#page-target'
});
{% endhighlight %}
