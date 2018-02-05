window.onload = function () {
  var diagrams = document.querySelectorAll('script[type="text/diagram"');

  for (var i = 0; i < diagrams.length; i++) {
    var d = diagrams[i];
    var s = d.innerText;

    var c = document.createElement('canvas');
    c.setAttribute('class', 'diagram');

    d.parentNode.replaceChild(c, d);

    c.width = c.offsetWidth * devicePixelRatio;
    c.height = c.offsetHeight * devicePixelRatio;

    var ctx = c.getContext('2d');

    ctx.fillRect(0, 0, c.width, c.height);
    ctx.translate(c.width / 2, c.height / 2);
    ctx.scale(c.height, c.height);
    ctx.lineWidth = 1 / c.height;
    ctx.strokeStyle = '#fff';

    function rectangle(x, y, w, h, c) {
      if (c) ctx.fillStyle = c;
      ctx.fillRect(x, y, w, h);
    }

    function circle(x, y, r, c) {
      if (c) ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill();
    }

    function line(x1, y1, x2, y2, c) {
      if (c) ctx.strokeStyle = c;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function arrow(x1, y1, x2, y2, c) {
      line(x1, y1, x2, y2, c);

      var a = Math.atan2(y2 - y1, x2 - x1);

      ctx.save();

      ctx.translate(x2, y2);
      ctx.rotate(a);

      if (c) ctx.fillStyle = c;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-.05, -.02);
      ctx.lineTo(-.05, .02);
      ctx.fill();

      ctx.restore();
    }

    eval(s);
  }
};
