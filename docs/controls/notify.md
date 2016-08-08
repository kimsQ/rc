---
layout: preview
preview: notify
title: Notify
group: controls
---
This controls helps to turn standard [alerts](/components/alerts/) into "growl" like notifications.



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
      <td>Bootstrap Notify</td>
      <td>3.1.3</td>
      <td>MIT</td>
       <td>
        <a href="https://github.com/mouse0270/bootstrap-notify">https://github.com/mouse0270/bootstrap-notify</a>
       </td>
     </tr>
    </tbody>
  </table>
</div>


## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Usage
{% highlight js %}
$.notify({message: 'your message'},{type: 'default'});
{% endhighlight %}


## Options


## Methods



## Examples

### Basic Notify
{% highlight js %}
$.notify("Hello World");
{% endhighlight %}


### Passing in a title
{% highlight js %}
$.notify({
  title: "Welcome:",
  message: ".."
});
{% endhighlight %}

### Passing HTML
{% highlight js %}
$.notify({
  title: "<strong>Welcome:</strong> ",
  message: "..."
});
{% endhighlight %}

### Using a font icon
{% highlight js %}
$.notify({
  icon: 'fa fa-paw',
  message: ".."
});
{% endhighlight %}

### Using images instead of font icons
{% highlight js %}
$.notify({
  icon: "img/growl_64x.png",
  message: ".."
},{
  icon_type: 'image'
{% endhighlight %}


### Using offset

{% highlight js %}
$.notify('Hello World', {
  offset: 50
});
{% endhighlight %}

{% highlight js %}
$.notify('Hello World', {
  offset: {
    x: 50,
    y: 100
  }
});
{% endhighlight %}

### Using alert types

{% highlight js %}
$.notify({
  title: '<strong>Heads up!</strong>',
  message: '...'
},{
  type: 'success'
});
{% endhighlight %}


### Animating notify
{% highlight js %}
$.notify("Enter: Bounce In from TopExit: Bounce Up and Out", {
  animate: {
    enter: 'animated bounceInUp',
    exit: 'animated bounceOutDown'
  }
});
{% endhighlight %}

### Customized notifications
Below is a list custom styled notifications that you may use as a whole or a starting off point. I'll will occasionally update this list so please check back for more styles.

{% highlight css %}
.alert-minimalist {
  background-color: rgb(241, 242, 240);
  border-color: rgba(149, 149, 149, 0.3);
  border-radius: 3px;
  color: rgb(149, 149, 149);
  padding: 10px;
}

.alert-minimalist > [data-notify="icon"] {
  height: 50px;
  margin-right: 12px;
}

.alert-minimalist > [data-notify="title"] {
  color: rgb(51, 51, 51);
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.alert-minimalist > [data-notify="message"] {
  font-size: 80%;
}
{% endhighlight %}

{% highlight js %}
$.notify({
  icon: 'https://randomuser.me/api/portraits/med/men/77.jpg',
  title: 'Byron Morgan',
  message: 'Momentum reduce child mortality effectiveness incubation empowerment connect.'
}, {
  type: 'minimalist',
  delay: 5000,
  icon_type: 'image',
  template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
    '<img data-notify="icon" class="img-circle pull-left">' +
    '<span data-notify="title">{1}</span>' +
    '<span data-notify="message">{2}</span>' +
    '</div>'
});
{% endhighlight %}
