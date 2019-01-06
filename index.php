<!DOCTYPE html>
<html lang="en">
<head>

	<meta charset="UTF-8">
  <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <title>Whiteboard</title>
  <link rel="icon" href="images/whiteboard-logo.png">
  <!-- Device Icons -->
  <link rel="apple-touch-icon" sizes="90x90" href="images/90.png">
  <link rel="apple-touch-icon" sizes="152x152" href="images/152.png">
  <link rel="apple-touch-icon" sizes="167x167" href="images/167.png">
  <link rel="apple-touch-icon" sizes="180x180" href="images/180.png">
  <!-- Style -->
  <link rel="stylesheet" href="style.css">
	<!-- Script -->
	<script type="text/javascript" src="draw.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.1/vue.min.js"></script>

	<style media="screen">
		.hide {
			display: none;
		}
	</style>
</head>
<body>

	<div id="container">
    <div id="vue">

			<div id="canvasDiv"></div>

      <div class="logo">
        <img src="images/whiteboard-logo.png" alt=""></img>
      </div>

      <nav>
        <a id="colorSelector">
          <img class="color" src="images/color.svg" alt=""></img>
          <input id="color" type="color" value="#25A3FF"></input>
        </a>
        <!-- <div id="radius" onclick="toggleSizes()">
          <div id="radiusSize" class="size" v-bind:style="{height: value + 'px', width: value + 'px'}"></div>
          <div class="radius-sizes toggle">
            <input id="size" type="range" min="1" max="20" value="4" v-model="value"></input>
          </div>
        </div> -->
        <div id="spacer" class="spacer"></div>
        <a id="download" download="whiteboard.png" href="" onclick="downloadCanvas(this);">
          <img src="images/save@2x.png" alt="">
        </a>
        <a id="clear">
					<img src="images/trash@2x.png" alt="">
        </a>
      </nav>

    </div>
  </div>

	<script>
		// var app = new Vue({
    //   el: '#vue',
    //   data: {
    //     value: 4
    //   }
    // });

		drawingApp.init();

		// DOWNLOAD PNG
		downloadCanvas = function(el) {
      var image = canvas.toDataURL("image/png");
      el.href = image;
    };

		// COLOR VARIABLE
		// var colorValue = document.getElementById('color').value;

		// Toggle Slider
		// function toggleSizes() {
    //   document.getElementsByClassName('radius-sizes')[0].classList.toggle('toggle');
    // };

		var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		// var element = document.getElementById('text');
		if (isMobile) {
  			// element.innerHTML = "You are using Mobile";
				console.log("mobile");
				document.getElementById('colorSelector').classList.add("hide");
				document.getElementById('spacer').classList.add("hide");
				document.getElementById('download').classList.add("hide");
		} else {
			console.log("not mobile");
		};
	</script>
</body>
</html>
