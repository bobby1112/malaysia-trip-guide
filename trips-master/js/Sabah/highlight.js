$(function () {

   'use strict';

   var isMobile = {
      Android: function () {
         return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
         return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
         return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
         return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
   };

   // Main Menu Superfish
   var mainMenu = function () {

      $('#fh5co-primary-menu').superfish({
         delay: 0,
         animation: {
            opacity: 'show'
         },
         speed: 'fast',
         cssArrows: true,
         disableHI: true
      });

   };



   // Offcanvas and cloning of the main menu
   var offcanvas = function () {

      var $clone = $('#fh5co-menu-wrap').clone();
      $clone.attr({
         'id': 'offcanvas-menu'
      });
      $clone.find('> ul').attr({
         'class': '',
         'id': ''
      });

      $('#fh5co-page').prepend($clone);

      // click the burger
      $('.js-fh5co-nav-toggle').on('click', function () {

         if ($('body').hasClass('fh5co-offcanvas')) {
            $('body').removeClass('fh5co-offcanvas');
            $(this).removeClass('active');
         } else {
            $('body').addClass('fh5co-offcanvas');
            $(this).addClass('active');
         }
         // $('body').toggleClass('fh5co-offcanvas');

      });

      $('#offcanvas-menu').css('height', $(window).height());

      $(window).resize(function () {
         var w = $(window);


         $('#offcanvas-menu').css('height', w.height());

         if (w.width() > 769) {
            if ($('body').hasClass('fh5co-offcanvas')) {
               $('body').removeClass('fh5co-offcanvas');
            }
         }

      });

   }




   var fullHeight = function () {

      if (!isMobile.any()) {
         $('.js-fullheight').css('height', $(window).height() - $('#fh5co-header').height());
         $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height() - $('#fh5co-header').height());
         });
      }

   };



   $('.js-menu-toggle').click(function (e) {
      e.preventDefault();
      $('.site-mobile-menu').toggleClass('active');
      $(this).toggleClass('active');
   });

   // Desktop dropdown click behavior
   $('.site-mobile-menu').on('click', '.has-children > a', function (e) {
      if ($(window).width() <= 991) {
         e.preventDefault();
         const $parent = $(this).parent();
         $parent.toggleClass('open')
            .find('> .dropdown').stop(true, true).slideToggle(200)
            .end().siblings('.has-children').removeClass('open')
            .find('> .dropdown').slideUp(200);
      }
   });

   // Mobile dropdown click behavior
   $('.site-mobile-menu').on('click', '.has-children > a', function (e) {
      if ($(window).width() <= 991) { // Mobile only
         e.preventDefault();
         $(this).parent().find('.dropdown').toggleClass('active')
            .parent().siblings().find('.dropdown').removeClass('active');
      }
   });

   // Close menus when clicking outside
   $(document).click(function (e) {
      // Close mobile menu
      if (!$(e.target).closest('.site-mobile-menu, .js-menu-toggle').length) {
         $('.site-mobile-menu').removeClass('active');
         $('.js-menu-toggle').removeClass('active');
      }

      // Close desktop dropdowns
      if (!$(e.target).closest('.site-menu > li.has-children').length) {
         $('.site-menu > li.has-children').removeClass('open');
      }
   });

   // Parallax
   var parallax = function () {
      $(window).stellar();
   };



   $(function () {
      sliderMain();
      tabs();
      mainMenu();
      offcanvas();
      contentWayPoint();
      mobileMenuOutsideClick();
      parallax();
      fullHeight();
      counter();
   });



});

