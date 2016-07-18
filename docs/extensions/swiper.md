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

### Markup
Create a basic markup
{% highlight html %}
<div class="swiper-container">
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

### Via data attributes
{% highlight html %}
<div class="swiper-container" data-extension="swiper">
  ...
</div>
{% endhighlight %}

### Via JavaScript
{% highlight js %}
..
{% endhighlight %}

### Initialize
초기화 함수를 추가 합니다.
{% highlight js %}
RC_initSwiper();
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
       <td>button</td>
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

## Methods

## Examples

### 모달에서의 swipe

### 단일 페이지 복수 swipe

### 모달내부 템플릿 로드 환경에서의 swipe

### push 환경에서의 swipe

### 페이지네이션 커스텀 예제

### 스와이퍼 메소드 사용 예제
