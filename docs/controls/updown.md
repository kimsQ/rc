---
layout: preview
preview: updown
title: Updown
group: controls
---

이 기능은 스크롤 이벤트의 방향성에 초점을 두어 이벤트 발생 시점의 상태가 Scroll Up 인지 Scrioll Down 인지를 체크하여 각 상황별로 별도의 추가 이벤트를 컨트롤할 수 있도록 해당 이벤트를 트리거를 제공한다.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}



## Usage

Via `data-*` 속성을 이용한 방법

적용할 대상 엘리먼트에 아래와 같이 data-속성을 마크업 해준다.
{% highlight html %}
<div data-control="scroll" data-type="updown">
  ...
</div>
{% endhighlight %}

Via JavaScript 이용한 방법

Default
{% highlight js %}
$('selector').scroll({type:'updown'});
{% endhighlight %}




## Options


<div class="table-responsive">
  <table class="table table-bordered">
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
       <td>delta</td>
       <td>number</td>
       <td>5</td>
       <td>
       Scroll 이벤트로 간주되는 최소 기준값.
       즉, 어느 정도 범위의 스크롤바 높이의 변동사항을 이벤트로 간주할지에 대한 기준 값이 된다. 다시 말해서 사용자의 의도치 않은 약간의 스크롤 움직임에 대해 어느 정도까지는 무시할 것인지의 기준값이다.
       </td>
     </tr>
     <tr>
       <td>defaultHeight</td>
       <td>number</td>
       <td>280</td>
       <td>
        Scroll 이벤트로 간주되지만 추가 이벤트를 발생시키지 않아도 되는 범위 값이다. 예를 들어 화면 범위 내에서 발생하는 작은 스크롤 이벤트에 대해서는 별도의 이벤트를 적용하지 않아야 할 상황에 필요한 값이다.  
       </td>
     </tr>

    </tbody>
  </table>
</div>


## Events

<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
     <tr>
       <th style="width: 215px;">Name</th>
       <th>Description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
       <td>default.rc.scroll </td>
       <td>
        defaultHeight 값 내에서 이벤트 발생할 경우에 트리거 된 이벤트
       </td>
     </tr>
     <tr>
       <td>up.rc.scroll</td>
       <td>
        Scroll Up 이벤트로 간주되는 상황에 트리거 된 이벤트
       </td>
     </tr>

     <tr>
       <td>down.rc.scroll</td>
       <td>
        Scroll Down 이벤트로 간주되는 상황에 트리거 된 이벤트
       </td>
     </tr>
    </tbody>
  </table>
</div>


## Examples

### Material Layout

<br><br><br><br>
