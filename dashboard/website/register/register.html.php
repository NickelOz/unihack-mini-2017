<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Forms</title>

    <link href="../webpages/css/bootstrap.min.css" rel="stylesheet">
    <link href="../webpages/css/styles.css" rel="stylesheet">
    <link href="../../../booking-system/css/validationStyles.css" rel="stylesheet">

    <!--[if lt IE 9]>
    <script src="../webpages/js/html5shiv.min.js"></script>
    <script src="../webpages/js/respond.min.js"></script>
    <![endif]-->


</head>

<body>

<div class="row">
    <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
        <div class="login-panel panel panel-default">
            <div class="panel-heading">Register</div>
            <div class="panel-body">
                <!--                <form  method="post">-->
                <form action="create_new_user.php" onsubmit="return validateRegistration()" method="post" id="registration">
                    <fieldset>
                        <div class="form-group tightDiv">
                            <label>Full Name</label>
                            <input class="form-control" id="name" placeholder="John Smith" name="name" type="text"
                                   autofocus="">
                        </div>
                        <div class="errorDiv">
                            <span id="nameError"></span>
                        </div>
                        <div class="form-group tightDiv">
                            <label>Username</label>
                            <input class="form-control" id="username" placeholder="jsmith91" name="username" type="text"
                                   autofocus="">
                        </div>
                        <div class="errorDiv">
                            <span id="userNameError"></span>
                        </div>
                        <div class="form-group tightDiv">
                            <label>Password</label>
                            <input class="form-control" id="password" placeholder="Password" name="password"
                                   type="password" value="">
                        </div>
                        <div class="errorDiv">
                            <span id="passwordError"></span>
                        </div>
                        <div class="form-group tightDiv">
                            <label>Email</label>
                            <input class="form-control" id="email" placeholder="jsmith91@electronicmail.com"
                                   name="email" autofocus="">
                        </div>
                        <div class="errorDiv">
                            <span id="emailError"></span>
                        </div>
                        <div class="form-group">
                            <input class="btn btn-primary topMargin" name="submit" type="submit" value="Create Account">
                        </div>

                    </fieldset>
                </form>
            </div>
        </div>
    </div><!-- /.col-->
</div><!-- /.row -->

<script src="../webpages/js/jquery-1.11.1.min.js"></script>
<script src="../webpages/js/bootstrap.min.js"></script>
<script src="../../../booking-system/js/registrationValidator.js"></script>
<script>
    !function ($) {
        $(document).on("click", "ul.nav li.parent > a > span.icon", function () {
            $(this).find('em:first').toggleClass("glyphicon-minus");
        });
        $(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");
    }(window.jQuery);

    $(window).on('resize', function () {
        if ($(window).width() > 768) $('#sidebar-collapse').collapse('show')
    });
    $(window).on('resize', function () {
        if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide')
    })
</script>
</body>

</html>
