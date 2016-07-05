---
layout: preview
preview: sheet
title: Sheet
group: components
---


액션 시트는 사용자가 일련의 옵션에서 선택할 수 있습니다 슬라이드 대화창 입니다. `backdrop` 을 탭핑하가나, 테스트탑 테스트에서 키보드 `ESC키`를 클릭하여 취소할 수 있습니다.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}


## Usage

시트는 요구에 따라 data 속성이나 자바스크립트를 통해 숨겨진 콘텐츠를 토글 합니다.


### Static example
자바 스크립트 없이 시트를 활성화합니다. 버튼같은 태그에 `data-toggle="sheet"` 을 추가하고, `data-target="#foo"` 나 `href="#foo"` 와 같이 토글할 특정한 시트를 정해주면 됩니다

{% highlight html %}
<!-- Sheet -->
<div id="mySheet" class="sheet">
  <ul class="table-view">
    <li class="table-view-cell">..</li>
  </ul>
</div>
{% endhighlight %}

### Via data attributes


**Button trigger type**
{% highlight html %}
<button data-toggle="sheet" data-target="#mySheet">
  Launch demo Bottom Sheet
</button>
{% endhighlight %}

**Link trigger type**
{% highlight html %}
<a href="#mySheet" data-toggle="sheet">
  Launch popup
</a>
{% endhighlight %}


### Via JavaScript

한 줄의 자바스크립트로 `mySheet`의 id 를 가진 시트를 불러옵니다.

{% highlight js %}
$('.btn').tap(function() {
  $('#mySheet').sheet();
});
{% endhighlight %}
