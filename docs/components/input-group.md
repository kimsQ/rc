---
layout: preview
preview: input-group
title: Input group
group: components
---

Easily extend form controls by adding text, buttons, or button groups on either side of textual `<input>`s.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Basic example

Place one add-on or button on either side of an input. You may also place one on both sides of an input. **We do not support multiple form-controls in a single input group.**

{% highlight html %}
<div class="input-group">
  <span class="input-group-addon" id="basic-addon1">@</span>
  <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
</div>
<br>
<div class="input-group">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2">
  <span class="input-group-addon" id="basic-addon2">@example.com</span>
</div>
<br>
<label for="basic-url">Your vanity URL</label>
<div class="input-group">
  <span class="input-group-addon" id="basic-addon3">https://example.com/users/</span>
  <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
</div>
<br>
<div class="input-group">
  <span class="input-group-addon">$</span>
  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
  <span class="input-group-addon">.00</span>
</div>
<br>
<div class="input-group">
  <span class="input-group-addon">$</span>
  <span class="input-group-addon">0.00</span>
  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
</div>
{% endhighlight %}

## Sizing

Add the relative form sizing classes to the `.input-group` itself and contents within will automatically resize—no need for repeating the form control size classes on each element.

{% highlight html %}
<div class="input-group input-group-lg">
  <span class="input-group-addon" id="sizing-addon1">@</span>
  <input type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon1">
</div>
<br>
<div class="input-group">
  <span class="input-group-addon" id="sizing-addon2">@</span>
  <input type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon2">
</div>
{% endhighlight %}

## Checkboxes and radio addons

Place any checkbox or radio option within an input group's addon instead of text.

{% highlight html %}
<div class="input-group">
  <span class="input-group-addon">
    <input type="checkbox" aria-label="Checkbox for following text input">
  </span>
  <input type="text" class="form-control" aria-label="Text input with checkbox">
</div>

<div class="input-group">
  <span class="input-group-addon">
    <input type="radio" aria-label="Radio button for following text input">
  </span>
  <input type="text" class="form-control" aria-label="Text input with radio button">
</div>
{% endhighlight %}

## Multiple addons

Multiple add-ons are supported and can be mixed with checkbox and radio input versions.

{% highlight html %}
<div class="input-group">
  <span class="input-group-addon">
    <input type="checkbox" aria-label="Checkbox for following text input">
  </span>
  <span class="input-group-addon">$</span>
  <input type="text" class="form-control" aria-label="Text input with checkbox">
</div>

<div class="input-group">
  <span class="input-group-addon">$</span>
  <span class="input-group-addon">0.00</span>
  <input type="text" class="form-control" aria-label="Text input with radio button">
</div>
{% endhighlight %}


## Button addons

Buttons in input groups are a bit different and require one extra level of nesting. Instead of `.input-group-addon`, you'll need to use `.input-group-btn` to wrap the buttons. This is required due to default browser styles that cannot be overridden.

{% highlight html %}
<div class="input-group">
  <span class="input-group-btn">
    <button class="btn btn-secondary" type="button">Go!</button>
  </span>
  <input type="text" class="form-control" placeholder="Search for...">
</div>

<div class="input-group">
  <input type="text" class="form-control" placeholder="Search for...">
  <span class="input-group-btn">
    <button class="btn btn-secondary" type="button">Go!</button>
  </span>
</div>

<div class="input-group">
  <span class="input-group-btn">
    <button class="btn btn-secondary" type="button">Hate it</button>
  </span>
  <input type="text" class="form-control" placeholder="Product name">
  <span class="input-group-btn">
    <button class="btn btn-secondary" type="button">Love it</button>
  </span>
</div>
{% endhighlight %}

## Header Inputs
Inputs can also be placed in headers, along with buttons to submit or cancel the form.

{% highlight html %}
<header class="bar bar-nav">
  <div class="input-group input-group-inset">
    <span class="input-group-placeholder icon icon-search"></span>
    <input type="search" class="form-control" placeholder="Search">
    <span class="input-group-btn">
      <button class="btn btn-link" type="button">Cancel</button>
    </span>
  </div>
</header>
{% endhighlight %}


## Accessibility

Screen readers will have trouble with your forms if you don't include a label for every input. For these input groups, ensure that any additional label or functionality is conveyed to assistive technologies.

The exact technique to be used (`<label>` elements hidden using the `.sr-only` class, or use of the `aria-label`, `aria-labelledby`, `aria-describedby`, `title` or `placeholder` attribute) and what additional information will need to be conveyed will vary depending on the exact type of interface widget you're implementing. The examples in this section provide a few suggested, case-specific approaches.
