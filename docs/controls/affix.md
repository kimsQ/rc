---
layout: preview
preview: affix
title: Affix
group: controls
---

Affix 플러그인은 scroll 이벤트를 체크하여 다양한 기능을 구현할 수 있도록 구조화되었다.현재 제공되는 기능은 아래의 2 가지 기능이다. Scroll 플러그인을 사용할 때 type 값 설정은 필수이다.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

Affix 기능은 특정 엘리먼트를 페이지의 특정 위치에 고정(`position:fixed`)시켜준다. 이 기능은 네비게이션 혹은 특정 아이콘을 마우스 스크롤 이벤트가 발생하면 미리 정해진 특정 위치에 고정시키기 위해서 자주 사용된다. 이 플러그인에서는 `affix`,`affix-top`, `affix-bottom` 3 개의 class 를 사용하며 각각의 상황(state)가 다르며 또한, 각 상황별로 이벤트를 발생시킬 수 있다.

## Usage

Via `data-*` 속성을 이용한 방법

적용할 대상 엘리먼트에 아래와 같이 data-속성을 마크업 해준다.
{% highlight html %}
<div data-control="scroll" data-type="affix" class="affix-top">
  ...
</div>
{% endhighlight %}

Via JavaScript 이용한 방법

Default
{% highlight js %}
$('selector').scroll({type:'affix'});
{% endhighlight %}

Use Single Offset
{% highlight js %}
$('selector').scroll({
  type:’affix’,
  offset:{top:80}
});
{% endhighlight %}

Use Multiple Offset
{% highlight js %}
$('selector').scroll({
  type:’affix’,
  offset:{top:50,bottom:80}
});
{% endhighlight %}

Use Function Offset
{% highlight js %}
$('selector').scroll({
  type:’affix’,
  offset: {top: $('.bar').outerHeight(true)}
});
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
       <td>offset</td>
       <td>number | object | function</td>
       <td>10</td>
       <td>
       scroll 이벤트 발생시 affix 대상이 화면의  top/bottom 으로부터 어느정도 간격( 픽셀 기준) 이 되었을 때 affix 를 적용할지 정하는 값. number 타입(싱글 숫자)으로 지정시 top & bottom 각각 해당 number 값으로 적용됨. 기본값은 top/bottom 각각 <code>10px</code>. Top/bottom 을 따로 지정할 경우 object 타입으로 <code>offset : {top:25}</code> 와 같은 방식으로 지정할 수 있음. 2 개를 동시에 지정할 수도 있음. <code>( offset{top:25,bottom:30} )</code>  함수로 지정하여 동적으로 적용할 수도 있음. (반응형 디자인에 유용함)
       </td>
     </tr>
     <tr>
       <td>target</td>
       <td>selector | node | element</td>
       <td><code>.content</code></td>
       <td>
       affix 플러그인이 적용되는 특정 대상을 지정. (scroll 이벤트가 발생하는 대상)
       기본 값은 `<div class=”content”></div>`
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
       <td>affix.rc.scroll</td>
       <td>
       엘리먼트에 affix 가 적용되기 전에 발생합니다. <br>(엘리먼트의 class 는 <code>.affix-top</code> 상태입니다.)  
       </td>
     </tr>
     <tr>
       <td>affixed.rc.scroll</td>
       <td>
       엘리먼트에 affix 가 적용된 후에 발생합니다. <br>
       (엘리먼트의 calss 가 <code>.affix-top</code> → <code>.affix</code> 로 변경되고 고정됩니다.)
       </td>
     </tr>

     <tr>
       <td>affix-top.rc.scroll</td>
       <td>
       엘리먼트가 원위치(non-fixed)에 복귀되기 전에 발생합니다.<br>
       (엘리먼트의 class 는 <code>.affix-top</code> 상태입니다.)
       </td>
     </tr>
     <tr>
       <td>affixed-top.rc.scroll</td>
       <td>
       엘리먼트가 원위치(non-fixed)로 복귀된 후에 발생합니다.<br>
       (엘리먼트의 calss 가 <code>.affix</code> → <code>.affix-top</code> 으로 변경되었습니다.)
       </td>
     </tr>
     <tr>
       <td>affix-bottom.rc.scroll</td>
       <td>
       엘리먼트가 원위치(non-fixed)에 복귀되기 전에 발생합니다.<br>
       (엘리먼트의 class 는 <code>.affix-bottom</code> 상태입니다.)
       </td>
     </tr>
     <tr>
       <td>affixed-bottom.rc.scroll</td>
       <td>
       엘리먼트가 원위치(non-fixed)로 복귀된 후에 발생합니다.<br>
       (엘리먼트의 calss 가 <code>.affix</code> → <code>.affix-bottom</code> 으로 변경되었습니다.)
       </td>
     </tr>
    </tbody>
  </table>
</div>
