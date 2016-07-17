---
layout: preview
preview: utility
title: Utility
group: controls
---



## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## History back
이전화면으로 이동. 스마트폰 백버튼, 브라우저 백버튼, 키보드 백버튼과 같은 역할
{% highlight html %}
 <button class="btn btn-primary" data-history="back">Back</button>
{% endhighlight %}


## Reload
문서 전체를 새로고침 합니다.
{% highlight html %}
<button class="btn btn-primary" data-location="reload">reload</button>
{% endhighlight %}



## Scroll top
본문(`.content`) 영역 상단으로 애니메이션을 적용하여 이동합니다.
{% highlight html %}
<button class="btn btn-primary" data-scroll="top">Top</button>
{% endhighlight %}

Option

<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
     <tr>
       <th style="width: 100px;">Name</th>
       <th style="width: 120px;">Type</th>
       <th style="width: 50px;">Default</th>
       <th>Description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
       <td>speed</td>
       <td>fast | slow</td>
       <td>fast</td>
       <td>
        <code>data-scroll="top"</code> 으로 정해진 해당 요소에  <code>data-speed="fast"</code> or <code>data-speed="slow"</code> 와 같이 사용한다.
       </td>
     </tr>
    </tbody>
  </table>
</div>
