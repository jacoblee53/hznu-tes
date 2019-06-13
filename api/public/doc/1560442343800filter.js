(function () {
  var toolbar_module = document.getElementById('arc_toolbar_report')
  var c = ["_1977", "aden", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", "inkwell", "kelvin", "la rk", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"];
  document.head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="https://www.zhangxinxu.com/study/201903/css-idea/cssgram.min.css">');
  var b = document.createElement("select");
  b.style.padding = "5px";
  b.innerHTML = c.map(function (d) {
    return '<option value="' + d + '">' + d + "</option>"
  }).join("");
  var a = document.createElement("label");
  a.style.margin = "0 5px 0 20px";
  a.innerHTML = "后期效果：";
  toolbar_module.appendChild(a);
  toolbar_module.appendChild(b);
  b.addEventListener("change", function () {
    document.querySelector(".bilibili-player-video").className = "bilibili-player-video " + this.value
  })
})();