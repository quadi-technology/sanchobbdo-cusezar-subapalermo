$(function() {
    $('.js__video_view').click(function(e) {
        e.stopPropagation();
        e.preventDefault();

        var $this = $(this);
        var href = $this.attr('href');

        var iframe = document.createElement('iframe');
        iframe.src = href + '?enablejsapi=1&autoplay=1&loop=0&start=0&wmode=opaque&autohide=1&showinfo=0&iv_load_policy=3&modestbranding=1&showsearch=0';
        iframe.frameborder = 0;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.allowfullscreen = true;
        iframe.border = 0;
        iframe.style.position = 'absolute';
        iframe.style.top = 0;
        iframe.style.left = 0;
        iframe.style.width = '100%';
        iframe.style.height = '100%';

        $this.replaceWith(iframe);
    });

    $(document).ready(function(){
        $('.js__navigator_banner a[href^="#"]').on('click',function (e) {
            e.preventDefault();
            e.stopPropagation();

            var target = this.hash;
            $target = $(target);

            $('html, body').stop().animate({
                'scrollTop':  $target.offset().top - 70 //no need of parseInt here
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        });
    });
});
$(".navbar-nav li a").click(function(event) {
    
        $(".navbar-collapse").collapse('hide');
});

$(".navbar-inverse.menu-custom .navbar-nav li a").click(function () {
        $(".navbar-inverse.menu-custom .navbar-nav li a").removeClass("active");
        $(this).addClass("active");
 });

 /*$(document).ready(function () {
    $(window).scroll(function () {
       
        var e = $(window).scrollTop(),
        t = $(window).height();
        var first_div = $("#first").offset().top;
        if(e == 0){
            $("#sticky").removeClass("stick").animate({ top:'0px'}, "fast");
        }else if(e > 0 && e < first_div){
            $("#sticky").removeClass("stick").animate({top:'-82px'}, "fast");
        }else if(e >= first_div){
            $("#sticky").addClass("stick").animate({ top:'0px'}, "fast");
        }
        
    })*/
   
function isNumberKey(evt){
             var charCode = (evt.which) ? evt.which : event.keyCode
             if (charCode > 31 && (charCode < 48 || charCode > 57))
                 return false;
             return true;
         }
         
                     function loadScript(src, callback)
                     {
                         var s,
                                 r,
                                 t;
                         r = false;
                         s = document.createElement('script');
                         s.type = 'text/javascript';
                         s.src = src;
                         s.onload = s.onreadystatechange = function () {
                             //console.log( this.readyState ); //uncomment this line to see which ready states are called.
                             if (!r && (!this.readyState || this.readyState == 'complete'))
                             {
                                 r = true;
                                 callback();
                             }
                         };
                         t = document.getElementsByTagName('script')[0];
                         t.parentNode.insertBefore(s, t);
                     }
                     function initMap() {
                         loadScript("//rawgit.com/googlemaps/v3-utility-library/master/infobox/src/infobox.js", function () {
                             var map;
                             var styleArray = [
                                 {
                                     featureType: "all",
                                     stylers: [
                                         {saturation: -100}
                                     ]
                                 }, {
                                     featureType: "road.arterial",
                                     elementType: "geometry",
                                     stylers: [
                                         {hue: "#00ffee"},
                                         {saturation: 50}
                                     ]
                                 }, {
                                     featureType: "poi.business",
                                     elementType: "labels",
                                     stylers: [
                                         {visibility: "off"}
                                     ]
                                 }
                             ];
                             var bounds = new google.maps.LatLngBounds();
                             var mapOptions = {
                                 center: new google.maps.LatLng(6.322084, -75.561407),
                                 zoom: 14,
                                 scrollwheel: false,
                                 styles: styleArray,
                                 mapTypeId: google.maps.MapTypeId.ROADMAP
                             };
         
                             // Display a map on the page
                             map = new google.maps.Map(document.getElementById("map"), mapOptions);
         
                             // Multiple Markers
                             var markers = [
                                 {
                                     lat: 36.463479,
                                     lng: -105.593670,
                                     icon: "image/red-icon.png",
                                     text: "<h3>Palermo</h3><p> Cl. 153 #55-2</p> <h2>Palermo</h2>",
                                     title: "Palermo"
                                 },
                                 {
                                     lat: 4.735329,
                                     lng: -74.062567,
                                     icon: "image/grey-icon.png",
                                     text: "<h3>Nápoles</h3><p> Cra. 58 #151-31</p> <h2>Nápoles/h2>",
                                     title: "Nápoles"
                                 },
                                 {
                                     lat: 4.747720,
                                     lng: -74.088921,
                                     icon: "image/red-icon.png",
                                     text: "<h3>Mónaco</h3><p>Calle 152 B Carrera 56 – 62. La Colina</p> <h2>Mónaco</h2>",
                                     title: "Mónaco"
                                 }
         
         
                             ];
         
                             // Info Window Content
                             var infoWindowContent = [
                                 ['<div class="info_content">' +
                                             '<h3>London Eye</h3>' +
                                             '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' + '</div>'],
                                 ['<div class="info_content">' +
                                             '<h3>Palace of Westminster</h3>' +
                                             '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
                                             '</div>']
                             ];
         
                             // Display multiple markers on a map
                             var infoWindow = new google.maps.InfoWindow(), marker, i;
         
                             var infobox = new InfoBox({
                                 disableAutoPan: false,
                                 pixelOffset: new google.maps.Size(0, 0),
                                 zIndex: null,
                                 boxStyle: {
                                     background: "#f6f6f6",
                                     border: "1px solid red",
                                     padding: "0px 0px 6px 16px",
                                     "min-width": "215px",
                                     "max-width": "320px"
                                 },
                                 closeBoxMargin: "4px 4px 2px 2px",
                                 closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                                 infoBoxClearance: new google.maps.Size(1, 1)
                             });
                             // Loop through our array of markers & place each one on the map  
                             for (i = 0; i < markers.length; i++) {
                                 var position = new google.maps.LatLng(markers[i]["lat"], markers[i]["lng"]);
                                 bounds.extend(position);
                                 marker = new google.maps.Marker({
                                     position: position,
                                     map: map,
                                     title: markers[i]["title"],
                                     icon: markers[i]["icon"]
                                 });
         
                                 // Allow each marker to have an info window    
                                 google.maps.event.addListener(marker, 'click', (function (marker, i) {
                                     return function () {
                                         infobox.setContent('<div class="cus-infowindow">' + markers[i]["text"] + '</div>');
                                         infobox.open(map, this);
                                         //infoWindow.setContent('<div class="cus-infowindow">'+markers[i]["text"]+'</div>');
                                         //infoWindow.open(map, marker);
                                     }
                                 })(marker, i));
                             }
                         });
         
         
                     }
                 
     
         $(document).ready(function () {
             $("#contnt-btn").click(function () {
                 $(".pupup-form").show();
             });
             $(".close-icon").click(function () {
                 $(".pupup-form").hide();
             });
             $('.carousel:not(#four-image-slide)').carousel({
                 interval: false
             });
             
             var checkitem = function() {
                 var $this;
                 $this = $("#full-width-top.carousel");
                 if ($this.find(".carousel-inner .item:first").hasClass("active") && $this.find(".carousel-inner .item:last").hasClass("active")) {
                     $this.find(".left").hide();
                     $this.find(".right").hide();
                 } else if ($this.find(".carousel-inner .item:first").hasClass("active")) {
                     $this.find(".left").hide();
                     $this.find(".right").show();
                 } else if ($this.find(".carousel-inner .item:first").hasClass("active")) {
                     $this.find(".right").hide();
                     $this.find(".left").show();
                 } else {
                     $this.find(".left").show();
                     $this.find(".right").show();
                 }
             };
             checkitem();
         
             $(".carousel").on("slid.bs.carousel", "", checkitem);
             setTimeout(function(){
                 $('#four-image-slide.carousel').carousel({
                     interval: 5000,
                     cycle: true
                 })
             },200);
         });
     
         var recaptcha1;
         var recaptcha2;
         var myCallBack = function() {
           //Render the recaptcha1 on the element with ID "recaptcha1"
           recaptcha1 = grecaptcha.render('recaptcha1', {
             'sitekey' : '6LejFRAUAAAAANM76qkVIoYW_vJ9QDgnTO_2WFNk', //Replace this with your Site key
             'theme' : 'light'
           });
           
           //Render the recaptcha2 on the element with ID "recaptcha2"
           recaptcha2 = grecaptcha.render('recaptcha2', {
             'sitekey' : '6LejFRAUAAAAANM76qkVIoYW_vJ9QDgnTO_2WFNk', //Replace this with your Site key
             'theme' : 'light'
           });
         };