---
layout: preview
preview: popover
title: Popover
group: components
---

팝오버는 사용자가 일련의 옵션에서 선택할 수 있습니다 슬라이드 대화창 입니다. `backdrop` 을 탭핑하가나, 테스트탑 테스트에서 키보드 `ESC`키를 클릭하여 취소할 수 있습니다.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}


## Usage

팝오버는 요구에 따라 data 속성이나 자바스크립트를 통해 숨겨진 콘텐츠를 토글 합니다.


### Static example
자바 스크립트 없이 팝오버를 활성화합니다. 버튼같은 태그에 `data-toggle="Popover"` 을 추가하고, `data-target="#foo"` 나 `href="#foo"` 와 같이 토글할 특정한 팝오버를 정해주면 됩니다

{% highlight html %}
<!-- popover -->
<div id="myPopover" class="popover">
  <header class="bar bar-nav">
    <h1 class="title">Popover title</h1>
  </header>
  <ul class="table-view">
    <li class="table-view-cell">Item1</li>
    <li class="table-view-cell">Item2</li>
    <li class="table-view-cell">Item3</li>
    <li class="table-view-cell">Item4</li>
    <li class="table-view-cell">Item5</li>
    <li class="table-view-cell">Item6</li>
    <li class="table-view-cell">Item7</li>
    <li class="table-view-cell">Item8</li>
  </ul>
</div>
{% endhighlight %}

### Via data attributes


**Button trigger type**
{% highlight html %}
<button type="button" data-toggle="popover" data-target="#myPopover">
    Launch Popover
</button>
{% endhighlight %}

**Link trigger type**
{% highlight html %}
<a href="#myPopover" data-toggle="popover">
  Launch Popover
</a>
{% endhighlight %}


### Via JavaScript

한 줄의 자바스크립트로 `mySheet`의 id 를 가진 시트를 불러옵니다.

{% highlight js %}
$('.btn').tap(function() {
  $('#mySheet').sheet();
});
{% endhighlight %}
