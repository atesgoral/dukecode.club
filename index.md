---
layout: frontpage
title: Home
---

{% for post in site.posts %}
## [Week {{ post.week }}: {{ post.title }} &mdash; {{ post.date | date: "%b %-d, %Y" }}]({{ post.url }})
{% endfor %}
