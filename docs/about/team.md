---
layout: docs
title: Team
group: about
---

kimsQ RC is maintained by the founding team and a small group of invaluable core contributors, with the massive support and involvement of our community.

<div class="list-group bd-team">
  {% for member in site.data.core-team %}
    <div class="list-group-item">
      <iframe class="github-btn" src="https://ghbtns.com/github-btn.html?user={{ member.user }}&amp;type=follow"></iframe>
      <a class="team-member" href="https://github.com/{{ member.user }}">
        <img src="https://avatars1.githubusercontent.com/u/{{ member.avatar }}?v=3&s=160" alt="@{{ member.user }}" width="32" height="32">
        <strong>{{ member.name }}</strong> <small>@{{ member.user }}</small>
      </a>
    </div>
  {% endfor %}
</div>

Get involved with kimsQ RC development by [opening an issue](https://github.com/kimsQ/rc/issues/new) or submitting a pull request. Read our [contributing guidelines](https://github.com/kimsQ/rc/blob/master/CONTRIBUTING.md) for information on how we develop.
