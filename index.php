<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>VK-Api</title>
    <script src="//vk.com/js/api/openapi.js" type="text/javasсript"></script>
    <script src="vendor/jquery/dist/jquery.min.js"></script>
    <script src="content/content.js"></script>
    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="vendor/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="fonts.min.css">
    <link rel="stylesheet" href="header/header.min.css">
    <link rel="stylesheet" href="left-bar/left-bar.min.css">
    <link rel="stylesheet" href="content/content.min.css">
    <link rel="stylesheet" href="footer/footer.min.css">
</head>
<body>
<div id="vk_api_transport"></div><!-- окно регистрации -->
<?php include_once 'header/header.html' ?>
<div class="container-width">
    <div class="main">
        <?php include_once 'left-bar/left-bar.html' ?>
        <?php include_once 'content/content.html' ?>
    </div>
</div>
<?php /* include_once 'footer/footer.html' */ ?>
</body>
</html>