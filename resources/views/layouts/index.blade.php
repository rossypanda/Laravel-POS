<!DOCTYPE html>
<html lang="en">

<head>
    <title>CONSYS </title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="#">
    <meta name="keywords" content="Admin , Responsive, Landing, Bootstrap, App, Template, Mobile, iOS, Android, apple, creative app">
    <meta name="author" content="#">

    <link href="{{ asset('files\assets\images\favicon.ico') }}" rel="stylesheet"> 
    <link href="{{ asset('files\bower_components\bootstrap\css\bootstrap.min.css') }}" rel="stylesheet"> 
    <link href="{{ asset('files\assets\icon\feather\css\feather.css') }}" rel="stylesheet"> 
    <link href="{{ asset('files\assets\css\style.css') }}" rel="stylesheet"> 
    <link href="{{ asset('files\assets\css\jquery.mCustomScrollbar.css') }}" rel="stylesheet"> 
    

</head>

<body>
    <!-- Pre-loader start -->
    <div class="theme-loader">
        <div class="ball-scale">
            <div class='contain'>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Pre-loader end -->
    <div id="pcoded" class="pcoded">
        <div class="pcoded-overlay-box"></div>

        <div class="pcoded-container navbar-wrapper">

            <!-- navbar chat start -->
            @include('partials.navbar')

            <!-- Sidebar chat start -->
            {{-- @include('header.sidebarChat') --}}

            <!-- Sidebar inner chat start-->
            {{-- @include('header.sidebarChatInner') --}}

            <div class="pcoded-main-container">
                <div class="pcoded-wrapper">
                    <!-- Sidebar start-->
                    @include('partials.sidebar')

                    @yield('content')
                    
                </div>
            </div>

            <!-- Sidebar inner chat start-->
            @include('partials.footer')


        </div>
    </div>

    <script src="{{ asset('files\bower_components\jquery\js\jquery.min.js') }}" defer></script>
    <script src="{{ asset('files\bower_components\jquery-ui\js\jquery-ui.min.js') }}" defer></script>
    <script src="{{ asset('files\bower_components\popper.js\js\popper.min.js') }}" defer></script>
    <script src="{{ asset('files\bower_components\bootstrap\js\bootstrap.min.js') }}" defer></script>
    <script src="{{ asset('files\bower_components\jquery-slimscroll\js\jquery.slimscroll.js') }}" defer></script>
    <script src="{{ asset('files\bower_components\modernizr\js\modernizr.js') }}" defer></script>
    <script src="{{ asset('files\bower_components\chart.js\js\Chart.js') }}" defer></script>
    <script src="{{ asset('files\assets\pages\widget\amchart\amcharts.js') }}" defer></script>
    <script src="{{ asset('files\assets\pages\widget\amchart\serial.js') }}" defer></script>
    <script src="{{ asset('files\assets\pages\widget\amchart\light.js') }}" defer></script>
    <script src="{{ asset('files\assets\js\jquery.mCustomScrollbar.concat.min.js') }}" defer></script>
    <script src="{{ asset('files\assets\js\SmoothScroll.js') }}" defer></script>
    <script src="{{ asset('files\assets\js\pcoded.min.js') }}" defer></script>
    <script src="{{ asset('files\assets\js\vartical-layout.min.js') }}" defer></script>
    <script src="{{ asset('files\assets\pages\dashboard\custom-dashboard.js') }}" defer></script>
    <script src="{{ asset('files\assets\js\script.min.js') }}" defer></script>


<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-23581568-13');
</script>
</body>

</html>
