---
layout: preview
preview: photoswipe
title: Photoswipe
group: extensions
---

JavaScript image gallery for mobile and desktop


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
      <td>PhotoSwipe</td>
      <td>4.1.1</td>
      <td>MIT</td>
       <td>
        <a href="https://github.com/dimsemenov/photoswipe">https://github.com/dimsemenov/photoswipe</a>
       </td>
     </tr>
    </tbody>
  </table>
</div>


용어설명

<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
     <tr class="bg-faded">
       <th style="width: 150px;">Name</th>
       <th>Description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>Gallery</td>
       <td>
       <ul>
          <li>photoswipe 가 출력 될때 각각의 개체(이미지 or html)들의 그룹을 의미한다.</li>
          <li><code>data-extension="photoswipe"</code> 속성이 표기된 container 단위</li>
        </ul>
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
<link href="path/to/photoswipe.css" rel="stylesheet">
<link href="path/to/default-skin/default-skin.css" rel="stylesheet" >
{% endhighlight %}


{% highlight html %}
<script src="path/to/photoswipe.rc.min.js"></script>
<script src="path/to/photoswipe-ui-default.min.js"></script>
{% endhighlight %}

### Initialize
One way to initialize all photoSwipe on a page would be to select them by  `data-extension` attribute:

{% highlight js %}
$(function () {
  $('[data-extension="photoswipe"]').RC_initPhotoSwipe()
})
{% endhighlight %}


### Markup
Below is a basic markup that list of links
{% highlight html %}
<div class="my-gallery" data-extension="photoswipe">
  <figure class="figure">
    <a href="path/to/01-big.jpg" data-size="">
      <img src="path/to/01.jpg"  class="figure-img img-fluid">
    </a>
    <figcaption class="figure-caption">Image caption</figcaption>
  </figure>
  ...
</div>
{% endhighlight %}



## Options

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
      <td>pswp</td>
      <td>boolean</td>
      <td>true</td>
      <td>
        photoswipe 를 출력하는 전용 DOM 이며 자동생성하지 않을 경우 false 값으로 초기화 하면 된다.
      </td>
    </tr>
    <tr>
      <td>items</td>
      <td>object</td>
      <td>null</td>
      <td>
      photoswipe 를 통해서 출력되는 각각의 이미지 혹은 다른 형태의 개채들을 배열. 스크립트 방식에서만 사용한다.
      </td>
    </tr>
     <tr>
       <td>index</td>
       <td>number</td>
       <td>0</td>
       <td>
        오픈 시 최초에 보여지는 개체의 index.
       </td>
     </tr>
     <tr>
       <td>showAnimationDuration</td>
       <td>number</td>
       <td>333</td>
       <td>
        오픈 시 에니메이션 지속시간.
       </td>
     </tr>
     <tr>
       <td>hideAnimationDuration</td>
       <td>number</td>
       <td>333</td>
       <td>
        닫을 때 에니메이션 지속시간.
       </td>
     </tr>
     <tr>
       <td>focus</td>
       <td>boolean</td>
       <td>true</td>
       <td>
        오픈 시 focus 효과 여부.
       </td>
     </tr>
     <tr>
       <td>bgOpacity</td>
       <td>number</td>
       <td>1</td>
       <td>
        오픈 시 Background Bg Opacity
       </td>
     </tr>
     <tr>
       <td>spacing</td>
       <td>number</td>
       <td>0.12</td>
       <td>
        슬라이드 간격
       </td>
     </tr>
     <tr>
       <td>loop</td>
       <td>boolean</td>
       <td>true</td>
       <td>
        슬라이드 loop 여부
       </td>
     </tr>
     <tr>
       <td>pinchToClose</td>
       <td>boolean</td>
       <td>true</td>
       <td>
        슬라이드를 아래쪽으로 잡아당겼다 놓는 동작(Pinch) 으로 닫기를 허용할 것인지 여부.
       </td>
     </tr>
     <tr>
       <td>history</td>
       <td>boolean</td>
       <td>true</td>
       <td>
        URL 에 history 를 적용할지 여부.
       </td>
     </tr>
    </tbody>
  </table>
</div>


## Methods

<div class="table-responsive">
  <table class="table table-bordered table-striped">
    <thead>
     <tr>
       <th style="width: 150px;">Name</th>
       <th>Description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>galleryOpened.rc.photoswipe</td>
       <td>
        photoswipe 오픈 시 해당 gallery <code>data-extension="photoswipe"</code> 에 triggered 된 이벤트
       </td>
     </tr>
     <tr>
      <td>galleryClosed.rc.photoswipe</td>
       <td>
       photoswipe 가 닫힐 때 해당 gallery <code>data-extension="photoswipe"</code> 에 triggered 된 이벤트
       </td>
     </tr>

     <tr>
      <td>imageLoaded.rc.photoswipe</td>
       <td>
       photoswipe 내 image load 가 완료된 후 해당 gallery <code>.pswp__container</code> 에 trigged 된 이벤트.
       </td>
     </tr>
     <tr>
      <td>slideChanged.rc.photoswipe</td>
       <td>
        각 슬라이드가 변경(drag or 화살표 tap)될때 해당 슬라이드에 trigged 된 이벤트.  
       </td>
     </tr>
    </tbody>
  </table>
</div>

## Examples


### Script type
{% highlight html %}
 <button id="btn" data-toggle="photoswipe">Open PhotoSwipe</button>
{% endhighlight %}

{% highlight js %}
// build items array
var items = [{
    src: 'path/to/01_b.jpg',
    w: 964,
    h: 1024,
  }, {
    src: 'path/to/02_b.jpg',
    w: 1024,
    h: 683
  }
];

RC_initPhotoSwipe({
  items: items
});
{% endhighlight %}


### Custom HTML Content in Slides


{% highlight html %}
 <button id="btn" data-toggle="photoswipe">Open PhotoSwipe</button>
{% endhighlight %}

{% highlight js %}
// build items array
var items = [{
    html: '<div class="hello-slide"><h1>Hello world example.com</h1></div>'
  }, {
    src: 'path/to/01_b.jpg',
    w: 1024,
    h: 683
  }
];

RC_initPhotoSwipe({
  items: items
});
{% endhighlight %}
