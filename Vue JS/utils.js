exports = module.exports = {
  ready: (fn) => {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  },

  updateClock: (clock,myTimezone) => {
    var clock = document.getElementById("ServerTime"),
           myTimezone = myOffset*1000,
           // myTimezone = clock.getAttribute("data-zone")*1000,
           d = new Date(ServerDate.getTime() + (ServerDate.getTimezoneOffset()*60000) + myTimezone),
           H = d.getHours(),
           m = d.getMinutes(),
           s = d.getSeconds(),
           u = '0' + (d.getMilliseconds().toString()).substring(0, 1);

       H = H < 10 ? '0' + H : H;
       m = m < 10 ? '0' + m : m;
       s = s < 10 ? '0' + s : s;

       // clock.innerHTML = H + ':' + m + ':' + s + '.' + u;
       clock.innerHTML = H + ':' + m + ':' + s;
  },

  get_mouse_position: (event) => {
    let coor = {X:event.clientX, Y:event.clientY};
    return coor;
  },

  get_canvas_position: (map) => {
    let coor = { X:parseInt(getComputedStyle(map).left), Y:parseInt(getComputedStyle(map).top) };
    return coor;
  },

  log: (data) => {
    return console.log(data);
  },

  get_window_dimentions: () => {
      let current_window = document.getElementById('element'),
          current_window_dimensions = [];

      current_window_dimensions.push(current_window.clientWidth, current_window.clientHeight);

      return current_window_dimensions;
  },

  map_scroll: () => {
    "use strict";

    let element = document.getElementById("element-wrapper"),
        map = document.getElementById("element"),
        position_mouse_start = [],
        position_canvas_start = [];

    element.addEventListener("mousedown", mouse_button_down);
    element.addEventListener("mouseup", mouse_button_up);
    // element.addEventListener("mouseout", mouse_button_up);

    function mouse_button_down(event) {
        element.addEventListener("mousemove", mouse_move);
        position_mouse_start = { X:event.clientX, Y:event.clientY };
        position_canvas_start = { X:parseInt(getComputedStyle(map).left), Y:parseInt(getComputedStyle(map).top) };
    }

    function mouse_move(event) {
        let new_left = position_canvas_start['X'] + ( event.clientX - position_mouse_start['X'] ),
            new_top = position_canvas_start['Y'] + ( event.clientY - position_mouse_start['Y'] );
        map.style.left = new_left+'px';
        map.style.top = new_top+'px';
    }

    function mouse_button_up(event) {
        element.removeEventListener("mousemove", mouse_move);
    }
  },
}