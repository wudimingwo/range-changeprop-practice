function createProperty(div, option) {
  var oInput = document.createElement("input");
  oInput.type = "range";
  var oSpan = document.createElement("span");
  oSpan.innerText = option.prop + "+++" + option.unit;
  oInput.min = option.min;
  oInput.max = option.max;
  var oDiv = document.createElement("div");
  var dataSpan = document.createElement("span");
  oDiv.appendChild(oSpan);
  oDiv.appendChild(oInput);
  oDiv.appendChild(dataSpan);
  oInput.oninput = function() {
    console.log(this.value);
    if(option.prop == "backgroundColor") {
      div.style[option.prop] = 'hsl(' + this.value + ', 50%, 50%)';
    } else {
      div.style[option.prop] = this.value + option.unit;
    }

    dataSpan.innerText = this.value + option.unit;
  }
  oInput.onmousedown = handle;
  oInput.onmousemove = handle;
  oInput.onmouseup = handle;

  function handle(e) {
    e.stopPropagation();
  }
  return oDiv;
}

function changeProperty(div) {
  var oDiv = document.createElement("div");
  this.prop = {
    width: {
      prop: "width",
      min: 0,
      max: 1000,
      unit: 'px'
    },
    width2: {
      prop: "width",
      min: 0,
      max: 200,
      unit: '%'
    },
    height: {
      prop: "height",
      min: 0,
      max: 1000,
      unit: 'px'
    },
    height2: {
      prop: "height",
      min: 0,
      max: 200,
      unit: '%'
    },
    fontSize: {
      prop: "fontSize",
      min: 0,
      max: 100,
      unit: 'px'
    },
    backgroundColor: {
      prop: "backgroundColor",
      min: 0,
      max: 360,
      unit: ''
    }
  }

  for(var key in this.prop) {
    oDiv.appendChild(createProperty(div, this.prop[key]));
  }
  // 来个定位
  oDiv.style.position = "fixed";
  oDiv.style.left = 0;
  oDiv.style.top = 0;
  // 来个拖拽
  oDiv.onmousedown = function(e) {
    var disX = e.clientX - this.offsetLeft;
    var disY = e.clientY - this.offsetTop;
    var self = this;
    document.onmousemove = function(e) {
      var x = e.clientX - disX;
      var y = e.clientY - disY;
      // 边界
      x < 0 && (x = 0);
      y < 0 && (y = 0);
      x > (window.innerWidth - self.offsetWidth) && (x = window.innerWidth - self.offsetWidth);
      y > (window.innerHeight - self.offsetHieght) && (y = window.innerHeight - self.offsetHieght);

      // 移动渲染
      self.style.left = x + 'px';
      self.style.top = y + 'px';
    }
    document.onmouseup = function(e) {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
  document.body.appendChild(oDiv);
}