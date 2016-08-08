---
layout: preview
preview: snap
title: Snap
group: extensions
---


The navigation drawer is a panel that displays the app’s main navigation options on the left or right edge of the screen. It is hidden most of the time, but is revealed when the user swipes a finger from the left edge of the screen or, while at the top level of the app, the user touches the app icon in the action bar.


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
      <td>Snap.js</td>
      <td>1.9.3</td>
      <td>MIT, dawg</td>
       <td>
        <a href="https://github.com/jakiestfu/Snap.js/">https://github.com/jakiestfu/Snap.js/</a>
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
<link href="path/to/rc.snap.css" rel="stylesheet">
{% endhighlight %}

{% highlight html %}
<script src="path/to/rc.snap.js"></script>
{% endhighlight %}

### Create a Drawer Layout
{% highlight html %}
<div class="snap-drawers">
  <div class="snap-drawer snap-drawer-left" id="myDrawer">
    ...
  </div>
</div>

<div class="snap-content" data-extension="drawer">
  <header class="bar bar-nav bar-light bg-faded">
    <a href="#myDrawer" data-toggle="drawer" class="icon icon-bars pull-left"></a>
    <h1 class="title">Title</h1>
  </header>
  <div class="content">
    ...
  </div>
</div>
{% endhighlight %}


### Initialize
초기화 함수를 추가 합니다.
{% highlight js %}
RC_initDrawer();
{% endhighlight %}


### Via data attributes

Activate a drawer without writing JavaScript. Set `data-toggle="drawer"` on a controller element, like a button, along with a `data-target="#foo"` or `href="#foo"` to target a specific drawer to toggle.

**Button trigger type**
{% highlight html %}
<button type="button" data-toggle="drawer" target="#myDrawer">
    Launch drawer
</button>
{% endhighlight %}

**Link trigger type**
{% highlight html %}
<a href="#myDrawer" data-toggle="drawer">
    Launch drawer
</a>
{% endhighlight %}


### Via JavaScript

Call a drawer with id `myDrawer` with a single line of JavaScript:

{% highlight js %}
$('.btn').tap(function() {
  $('#myDrawer').drawer('toggle');
});
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
       <td>showType</td>
       <td>default | expand</td>
       <td>default</td>
       <td>
        Drawer 가 오픈되는 타입을 설정합니다.
       </td>
     </tr>
     <tr>
       <td>direction</td>
       <td>left | right</td>
       <td>left</td>
       <td>
        Drawer 가 오픈되는 방향을 설정합니다.
       </td>
     </tr>
     <tr>
       <td>history</td>
       <td>boolean</td>
       <td>true</td>
       <td>
        <code>window.history</code> 객체에 적용되어 back 버튼을 사용해서 Drawer를 닫을 수 있게 해줍니다.
       </td>
     </tr>
     <tr>
       <td>template</td>
       <td>string</td>
       <td>null</td>
       <td>
        Drawer 내부에 외부의 파일을 load 해야 할 경우 사용합니다.
       </td>
     </tr>

     <tr>
       <td>backdrop</td>
       <td>boolean or string</td>
       <td>true</td>
       <td>
        Drawer 배경을 포함합니다. 그렇지 않으면, 탭 시 드로어를 닫지 않는 배경을 위해 <code>static</code> 를 명시하세요.
       </td>
     </tr>
     <tr>
       <td>speed</td>
       <td>slow | nomal | fast</td>
       <td>normal</td>
       <td>
        Drawer가 열리는 속도를 설정합니다.
       </td>
     </tr>
     <tr>
       <td>animation</td>
       <td>ease | linear | easeOutBack</td>
       <td>ease</td>
       <td>
        Drawer가 열리는 효과를 설정합니다.
       </td>
     </tr>
    </tbody>
  </table>
</div>


## Methods

### `.drawer(options)`

{% highlight js %}
$('#myDrawer').drawer({
  backdrop : false
})
{% endhighlight %}


### `.drawer('toggle')`
수동적으로 드로어를 토글합니다. 팝업이 실제로 보여지거나 숨겨지기 전에 호출자에게 리턴합니다. (`shown.rc.drawer` 나 `hidden.rc.drawer` 가 발생하기 전에)
{% highlight js %}
$('#myDrawer').drawer('toggle')
{% endhighlight %}


### `.drawer('show')`
수동적으로 드로어를 엽니다. 드로어가 실제로 보여지기 전에 호출자에게 리턴합니다. (`shown.rc.drawer` 이벤트가 발생하기 전에)
{% highlight js %}
$('#myDrawer').drawer('show')
{% endhighlight %}

### `.drawer('hide')`
수동적으로 드로어를 닫습니다.. 드로어가 실제로 닫히기 전에 호출자에게 리턴합니다. (`hidden.rc.drawer` 이벤트가 발생하기 전에)
{% highlight js %}
$('#myDrawer').drawer('hide')
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
       <td>show.rc.drawer</td>
       <td>
        열기(show) 메소드가 호출되는 즉시 발생합니다.
       </td>
     </tr>
     <tr>
       <td>shown.rc.drawer</td>
       <td>
        Drawer 가 오픈된 후  실행됩니다.
       </td>
     </tr>
     <tr>
       <td>hide.rc.drawer</td>
       <td>
        닫기(hide) 메소드가 호출되는 즉시 실행됩니다
       </td>
     </tr>
     <tr>
       <td>hidden.rc.drawer</td>
       <td>
        Drawer가 닫히고 난 후 실행됩니다.
       </td>
     </tr>
     <tr>
       <td>loaded.rc.drawer</td>
       <td>
        data-template 값으로 정해진 원격 마크업이 load 된 후 실행되는 이벤트
       </td>
     </tr>
    </tbody>
  </table>
</div>

## Examples



### Dual side drawers

{% highlight html %}
<div class="snap-drawers">
  <div class="snap-drawer snap-drawer-left" id="leftDrawer">
    ...
  </div>
  <div class="snap-drawer snap-drawer-right" id="rightDrawer">
    ...
  </div>
</div>

<div class="snap-content" data-extension="drawer">
  <header class="bar bar-nav bar-light bg-faded">
    <a href="#leftDrawer" data-toggle="drawer" class="icon icon-bars pull-left"></a>
    <a href="#rightDrawer" data-toggle="drawer" data-direction="right" class="icon icon-gear pull-right"></a>
    <h1 class="title">Title</h1>
  </header>
  <div class="content">
    ...
  </div>
</div>
{% endhighlight %}


### Expand drawer

{% highlight html %}
<div class="snap-drawers">
  <div class="snap-drawer snap-drawer-left" id="leftDrawer">

    <button data-toggle="drawer" data-target="#myDrawer" data-showType="expand" class="btn btn-primary btn-block" type="button">
      Expand
    </button>
    <button id="close" class="btn btn-secondary btn-block" type="button" >
      Close
    </button>

  </div>
</div>

<div class="snap-content" data-extension="drawer">
  <header class="bar bar-nav bar-light bg-faded">
    <a href="#leftDrawer" data-toggle="drawer" class="icon icon-bars pull-left"></a>
    <h1 class="title">Title</h1>
  </header>
  <div class="content">
    ...
  </div>
</div>
{% endhighlight %}

{% highlight js %}
$('#close').tap(function() {
  $('#myDrawer').drawer('hide')
});
{% endhighlight %}


### Backdrop option

Via data attributes

{% highlight html %}
<button data-toggle="drawer" data-target="#myDrawer" data-backdrop="false" type="button" >
  Launch Drawer
</button>
{% endhighlight %}


Via JavaScript
{% highlight js %}
..
{% endhighlight %}

### Material design style
