---
layout: frontpage
title: Home
---

{% for post in site.posts %}
* [Week {{ post.week }}: {{ post.title }}]({{ post.url }})
{% endfor %}
