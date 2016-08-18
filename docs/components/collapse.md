---
layout: preview
preview: collapse
title: Collapse
group: components
---

The kimsQ RC collapse plugin allows you to toggle content on your pages with a few classes thanks to some helpful JavaScript.

{% capture callout-include %}{% include callout-danger-plugin-dependency-transitions.md %}{% endcapture %}
{{ callout-include | markdownify }}

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Example

Click the buttons below to show and hide another element via class changes:

- `.collapse` hides content
- `.collapsing` is applied during transitions
- `.collapse.in` shows content

You can use a link with the `href` attribute, or a button with the `data-target` attribute. In both cases, the `data-toggle="collapse"` is required.

{% highlight html %}
<p>
  <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Link with href
  </a>
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Button with data-target
  </button>
</p>
<div class="collapse" id="collapseExample">
  <p class="bg-faded p-a-1">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </p>
</div>
{% endhighlight %}


### Collapsible Card

It's also possible to swap out `.card-block`s with `.table-view`.

{% highlight html %}
<div class="card">
  <div class="card-header collapsed" role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Card title
  </div>
  <div class="collapse" id="collapseExample">
    <ul class="table-view">
      <li class="table-view-cell">Item 1</li>
      <li class="table-view-cell">Item 2</li>
      <li class="table-view-cell">Item 3</li>
    </ul>
    <div class="card-footer">
      Footer
    </div>
  </div>
</div>
{% endhighlight %}


## Accordion example

Extend the default collapse behavior to create an accordion.

{% highlight html %}
<div id="accordion" class="card-group-collapse" role="group" aria-multiselectable="true">
  <div class="card">
    <div class="card-header" role="button" id="headingOne" data-toggle="collapse" data-parent="#accordion" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      Collapsible Group Item #1
    </div>
    <div id="collapseOne" class="collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="card-block">
        <p class="card-text">
          ...
        </p>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header collapsed" role="button" id="headingTwo" data-toggle="collapse" data-parent="#accordion" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Collapsible Group Item #2
    </div>
    <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="card-block">
        <p class="card-text">
          ...
        </p>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header collapsed" role="button" id="headingThree" data-toggle="collapse" data-parent="#accordion" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      Collapsible Group Item #3
    </div>
    <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="card-block">
        <p class="card-text">
          ...
        </p>
      </div>
    </div>
  </div>
</div>
{% endhighlight %}

### Tree example
[Nesting table view](/components/table-view/#nesting) 에 `data-toggle="collapse"`과 `data-parent=""` 를 추가하여 tree를 구현할 수 있다.

{% highlight html %}
<div id="tree">
  <ul class="table-view">
    <li class="table-view-cell">
      <a class="navigate-right collapsed" data-toggle="collapse" data-parent="#tree" data-target="#1">
        Item 1
      </a>

      <!-- 2depth -->
      <ul class="table-view collapse" id="1">
        <li class="table-view-cell">
          <a class="navigate-right collapsed" data-toggle="collapse" data-parent="#1" data-target="#1-1">
            Item 1-1
          </a>

          <!-- 3depth -->
          <ul class="table-view collapse" id="1-1">
            <li class="table-view-cell">
              <a class="navigate-right collapsed" data-toggle="collapse" data-parent="#1-1" data-target="#1-1-1">
                Item 1-1-1
              </a>

              <!-- 4depth -->
              <ul class="table-view collapse" id="1-1-1">
                <li class="table-view-cell">
                  Item 1-1-1-1
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="table-view-cell">Item 1-2</li>
      </ul>
    </li>
    <li class="table-view-cell">Item 2</li>
  </ul>
</div>
{% endhighlight %}

css
{% highlight css %}
.navigate-right.collapsed:after {
    content: '\e826';
}
.navigate-right:after {
    content: '\e820';
}
{% endhighlight %}
## Accessibility

Be sure to add `aria-expanded` to the control element. This attribute explicitly defines the current state of the collapsible element to screen readers and similar assistive technologies. If the collapsible element is closed by default, it should have a value of `aria-expanded="false"`. If you've set the collapsible element to be open by default using the `in` class, set `aria-expanded="true"` on the control instead. The plugin will automatically toggle this attribute based on whether or not the collapsible element has been opened or closed.

Additionally, if your control element is targeting a single collapsible element – i.e. the `data-target` attribute is pointing to an `id` selector – you may add an additional `aria-controls` attribute to the control element, containing the `id` of the collapsible element. Modern screen readers and similar assistive technologies make use of this attribute to provide users with additional shortcuts to navigate directly to the collapsible element itself.

## Usage

The collapse plugin utilizes a few classes to handle the heavy lifting:

- `.collapse` hides the content
- `.collapse.in` shows the content
- `.collapsing` is added when the transition starts, and removed when it finishes

These classes can be found in `_animation.scss`.

### Via data attributes

Just add `data-toggle="collapse"` and a `data-target` to the element to automatically assign control of a collapsible element. The `data-target` attribute accepts a CSS selector to apply the collapse to. Be sure to add the class `collapse` to the collapsible element. If you'd like it to default open, add the additional class `in`.

To add accordion-like group management to a collapsible control, add the data attribute `data-parent="#selector"`. Refer to the demo to see this in action.

### Via JavaScript

Enable manually with:

{% highlight js %}
$('.collapse').collapse()
{% endhighlight %}

### Options

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-`, as in `data-parent=""`.

<div class="table-responsive">
  <table class="table table-bordered table-striped">
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
       <td>parent</td>
       <td>selector</td>
       <td>false</td>
       <td>If a selector is provided, then all collapsible elements under the specified parent will be closed when this collapsible item is shown. (similar to traditional accordion behavior - this is dependent on the <code>panel</code> class)</td>
     </tr>
     <tr>
       <td>toggle</td>
       <td>boolean</td>
       <td>true</td>
       <td>Toggles the collapsible element on invocation</td>
     </tr>
    </tbody>
  </table>
</div>

### Methods

#### `.collapse(options)`

Activates your content as a collapsible element. Accepts an optional options `object`.

{% highlight js %}
$('#myCollapsible').collapse({
  toggle: false
})
{% endhighlight %}

#### `.collapse('toggle')`

Toggles a collapsible element to shown or hidden.

#### `.collapse('show')`

Shows a collapsible element.

#### `.collapse('hide')`

Hides a collapsible element.

### Events

kimsQ RC's collapse class exposes a few events for hooking into collapse functionality.

<div class="table-responsive">
  <table class="table table-bordered table-striped">
    <thead>
     <tr>
       <th style="width: 150px;">Event Type</th>
       <th>Description</th>
     </tr>
    </thead>
    <tbody>
     <tr>
       <td>show.rc.collapse</td>
       <td>This event fires immediately when the <code>show</code> instance method is called.</td>
     </tr>
     <tr>
       <td>shown.rc.collapse</td>
       <td>This event is fired when a collapse element has been made visible to the user (will wait for CSS transitions to complete).</td>
     </tr>
     <tr>
       <td>hide.rc.collapse</td>
       <td>
        This event is fired immediately when the <code>hide</code> method has been called.
       </td>
     </tr>
     <tr>
       <td>hidden.rc.collapse</td>
       <td>This event is fired when a collapse element has been hidden from the user (will wait for CSS transitions to complete).</td>
     </tr>
    </tbody>
  </table>
</div>

{% highlight js %}
$('#myCollapsible').on('hidden.rc.collapse', function () {
  // do something…
})
{% endhighlight %}
