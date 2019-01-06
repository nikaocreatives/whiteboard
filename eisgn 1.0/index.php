<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Canvas Upload</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" crossorigin="anonymous">
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script src="sketch.js"></script>

    <style type='text/css'>

        h1 {
            margin-bottom: 15px;
        }

        canvas {
            width: 800px;
            height: 300px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f5f5f5;
        }
        
        .btn {
            margin-top: 15px;
            margin-right: 15px;
        }
    </style>
</head>
<body>

    <div class="container">

    <h1>Add Signature</h1>

        <div>
            
        </div>

            <canvas id='tools_sketch' width='800' height='300'></canvas>


            <script type='text/javascript'>
                    $(function() {
                      $('#tools_sketch').sketch({defaultColor: "#000000"});
                    });
            </script>
 

            <div class='tools'>
                <a href='' class="btn btn-primary"> Clear </a>
                <a href='' class="btn btn-primary" onclick="uploadEx()"> Submit </a>
            </div>
 

            <form method="post" accept-charset="utf-8" name="form1">
                <input name="hidden_data" id='hidden_data' type="hidden"/>
            </form>

        </div>


        <script>
            function uploadEx() {
                var canvas = document.getElementById("tools_sketch");
                var dataURL = canvas.toDataURL("image/png");
                document.getElementById('hidden_data').value = dataURL;
                var fd = new FormData(document.forms["form1"]);
 
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'process.php', true);
 
                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / e.total) * 100;
                        console.log(percentComplete + '% uploaded');
                        location.reload();
                    }
                };
 
                xhr.onload = function() {
 
                };
                xhr.send(fd);
            };
        </script>

        <?php
                $dir    = 'upload';
                $files = scandir($dir);

                foreach($files as $image){
                    if(strpos($image, 'png')){
                        echo'

                            <div><img src="upload/'.$image.'" download ></div>

                        ';
                    }
                }
        ?>      
    
</body>
</html>