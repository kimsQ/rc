---
layout: preview
preview: swiper
title: Swiper
group: extensions
---

Swiper is the most modern mobile touch slider with hardware accelerated transitions and amazing native behavior. It is intended to be used in mobile websites, mobile web apps, and mobile native/hybrid apps. Designed mostly for iOS, but also works great on latest Android, Windows Phone 8 and modern Desktop browsers


<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
     <tr class="bg-faded">
       <th style="width: 150px;">Name</th>
       <th>Version</th>
       <th>License</th>
       <th>Repository</th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>Swiper</td>
      <td>3.2.7</td>
      <td>MIT</td>
       <td>
        <a href="http://www.idangero.us/swiper/">http://www.idangero.us/swiper/</a>
       </td>
     </tr>
    </tbody>
  </table>
</div>

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Usage

### Extension Import

{% highlight html %}
<link href="path/to/swiper.css" rel="stylesheet">
{% endhighlight %}

{% highlight html %}
<script src="path/to/swiper.rc.min.js"></script>
{% endhighlight %}


### Initialize
One way to initialize all swiper on a page would be to select them by  `data-extension` attribute:

{% highlight js %}
$(function () {
  $('[data-extension="swiper"]').RC_initSwiper()
})
{% endhighlight %}


### Markup
Create a basic markup
{% highlight html %}
<div class="swiper-container" data-extension="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slider">Slide 1</div>
    <div class="swiper-slider">Slide 2</div>
    <div class="swiper-slider">Slide 3</div>
    ....
  </div>

  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>

  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- If we need scrollbar -->
  <div class="swiper-scrollbar"></div>
</div>
{% endhighlight %}


## Multi swiper
Multi swiper in single page

Via data attributes

{% highlight html %}
<!-- first swiper -->
<div class="swiper-container" data-extension="swiper">
  ...
</div>

<!-- Second swiper -->
<div class="swiper-container" data-extension="swiper">
  ...
</div>
{% endhighlight %}

or Via JavaScript

{% highlight js %}
$('mySelector1').RC_initSwiper(option)

$('mySelector2').RC_initSwiper(option)
{% endhighlight %}

## Call modal in the swiper

`.swiper-slide` 에서 컨포넌트 호출시에 Swipe와 Tap 제스츄어가 중복으로 적용됩니다. 충돌을 회피하기 위해 `data-toggle` 대신 `data-component` 를 사용합니다.

{% highlight html %}
<div class="swiper-slider" data-component="modal">Slide 1</div>
{% endhighlight %}




## Options
아래는 RC Swiper 에서 제공하는 Options 항목이며 적용방법은 `.swiper-container` div 에
`data-` 속성을 사용해서 마크업 해주면 된다. (추가적인 Option 항목은 Swiper 공식 페이지에서 제공하는 Swiper Parameter 항목 기준으로 커스터마이징이 필요하다.)


<div class="table-responsive">
  <table class="table table-bordered table-striped">
    <thead>
     <tr>
       <th style="width: 100px;">Name</th>
       <th style="width: 170px;">Type</th>
       <th style="width: 50px;">Default</th>
       <th>Description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
       <td>direction</td>
       <td>horizontal | vertical</td>
       <td>horizontal</td>
       <td>
        슬라이더 배열 방향 (가로 or 세로)
       </td>
     </tr>
     <tr>
       <td>speed</td>
       <td>number</td>
       <td>300</td>
       <td>
        Swipe 동작의 속도를 의미
       </td>
     </tr>
     <tr>
       <td>spaceBetween</td>
       <td>number</td>
       <td>0</td>
       <td>
        슬라이더 간의 간격
       </td>
     </tr>
     <tr>
       <td>slidesPerView</td>
       <td>number | auto</td>
       <td>1</td>
       <td>
        출력 되는 슬라이더 수
       </td>
     </tr>

     <tr>
       <td>pagination</td>
       <td>boolean</td>
       <td>false</td>
       <td>
        페이징 출력 여부
       </td>
     </tr>
     <tr>
       <td>paginationClickable</td>
       <td>boolean</td>
       <td>true</td>
       <td>
        Pagination 버튼 클릭시 Swipe 이벤트를 발생시킬지 여부
       </td>
     </tr>
     <tr>
       <td>pager</td>
       <td>boolean</td>
       <td>false</td>
       <td>
        Prev & Next 버튼 출력 여부.
       </td>
     </tr>

     <tr>
       <td>scrollbar</td>
       <td>boolean</td>
       <td>false</td>
       <td>
        Scrollbar 생성 여부.
       </td>
     </tr>
     <tr>
       <td>effect</td>
       <td>slide | fade | cube | coverflow | flip</td>
       <td>slide</td>
       <td>
        슬라이더 트랜지션 효과
       </td>
     </tr>
     <tr>
       <td>loop</td>
       <td>boolean</td>
       <td>false</td>
       <td>
        loop 적용 여부
       </td>
     </tr>
     <tr>
       <td>autoplay</td>
       <td>number</td>
       <td>-</td>
       <td>
       값이 없는 경우 autoplay 는 적용되지 않는다. 값이 설정된 경우 설정된 시간(ms)에 맞춰 autoplay 가 적용된다.
       </td>
     </tr>
     <tr>
       <td>centeredSlides</td>
       <td>boolean</td>
       <td>false</td>
       <td>
        True 일 경우 활성화된 슬라이더가 중앙에 위치하게 된다.
       </td>
     </tr>

    </tbody>
  </table>
</div>


### Slides per view

한 화면에 출력 되는 슬라이더 아이템 수량을 설정합니다.

Via data attributes

{% highlight html %}
<div class="swiper-container" data-extension="swiper" data-slidesPerView="3" data-spaceBetween="10">
  <div class="swiper-wrapper">
    ...
  </div>
</div>
{% endhighlight %}


OR Via JavaScript
{% highlight js %}
$('mySelector').RC_initSwiper({
  slidesPerView: '3',
  spaceBetween:  '10'
});
{% endhighlight %}

### Pager
좌우로 navigation buttons 을 출력합니다.

{% highlight html %}
<div class="swiper-container" data-extension="swiper">
  <div class="swiper-wrapper">
    ....
  </div>

  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

</div>
{% endhighlight %}

## Events

<div class="table-responsive">
  <table class="table table-bordered table-striped">
    <thead>
     <tr>
       <th style="width: 170px;">Name</th>
       <th>Description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
       <td>onInit(swiper)</td>
       <td>
        Callback function, will be executed right after Swiper initialization
       </td>
     </tr>
     <tr>
       <td>onSlideChangeStart(swiper)</td>
       <td>
        Callback function, will be executed in the beginning of animation to other slide (next or previous). Receives swiper instance as an argument.
       </td>
     </tr>
     <tr>
       <td>onSlideChangeEnd(swiper)</td>
       <td>
        Callback function, will be executed after animation to other slide (next or previous). Receives slider instance as an argument.
       </td>
     </tr>
    </tbody>
  </table>
</div>



## Examples


### Swiper in template loaded modal

### Swiper on push

### Customized Pagination

{% highlight js %}
$('mySelector').RC_initSwiper({
  pagination: '.custom-pagination',
})
{% endhighlight %}

### Fraction Pagination

### Progress Pagination

### Slide change event

`onSlideChangeEnd` 이벤트를 활용하여 특정 슬라이드에서 버튼을 출력 함.
{% highlight js %}
$('mySelector').RC_initSwiper({
  onSlideChangeEnd: function(swiper) {
    if (swiper.activeIndex == 0) {
      $('#start').removeClass("active");
    } else {
      $('#start').addClass("active");
    }
  }
})
{% endhighlight %}
