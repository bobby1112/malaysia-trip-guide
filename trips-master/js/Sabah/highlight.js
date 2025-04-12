$(function () {
   'use strict';

   // Tabs
   var tabs = function () {
      $('#hotel-facilities').css('height', $('.tab-content.active').height() + 600);

      $(window).resize(function () {
         $('#hotel-facilities').css('height', $('.tab-content.active').height() + 600);
      });

      $('.tabs-nav > a').on('click', function (e) {
         e.preventDefault();  // Prevent page reload

         var tab = $(this).data('tab');

         $('.tabs-nav > a').removeClass('active');
         $(this).addClass('active');

         $('.tab-content').removeClass('active show');

         setTimeout(function () {
            $('.tab-content[data-tab-content="' + tab + '"]').addClass('active');
            $('#hotel-facilities').css('height', $('.tab-content.active').height() + 600);
         }, 200);
         setTimeout(function () {
            $('.tab-content[data-tab-content="' + tab + '"]').addClass('show');
         }, 400);
      });
   };

   // Initialize tabs function
   tabs();

   $(document).ready(function() {
      // Initialize all flexsliders
      $('.flexslider').flexslider({
        animation: "slide",
        controlNav: true,
        directionNav: true,
        slideshow: true,
        slideshowSpeed: 4000,
        animationSpeed: 600,
        start: function(slider) {
          // Force equal height for all slides
          slider.container.css('height', 'auto');
          slider.slides.css('height', 'auto');
        }
      });
    });
   
   
   
});
