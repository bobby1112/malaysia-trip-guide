$(function () {
  'use strict';

  // Open video modal
  document.getElementById('open-video').addEventListener('click', function () {
    document.getElementById('videoPlayer').style.display = 'block';  // Show the modal
    document.getElementById('video').play();  // Start playing the video
  });

  // Close video modal
  document.getElementById('close-video').addEventListener('click', function () {
    document.getElementById('videoPlayer').style.display = 'none';  // Hide the modal
    document.getElementById('video').pause();  // Pause the video
    document.getElementById('video').currentTime = 0;  // Reset the video to the beginning
  });




  $(document).ready(function () {
    // When the modal opens
    $('#videoModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget); // Button that triggered the modal
      var videoUrl = button.data('video'); // Extract video URL from data-video attribute
      var modal = $(this);
      modal.find('#videoFrame').attr('src', videoUrl);
    });

    // When the modal closes
    $('#videoModal').on('hidden.bs.modal', function () {
      $(this).find('#videoFrame').attr('src', ''); // Stop the video
    });
  });




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

  $(document).ready(function () {
    // Initialize all flexsliders
    $('.flexslider').flexslider({
      animation: "slide",
      controlNav: true,
      directionNav: true,
      slideshow: true,
      slideshowSpeed: 4000,
      animationSpeed: 600,
      start: function (slider) {
        // Force equal height for all slides
        slider.container.css('height', 'auto');
        slider.slides.css('height', 'auto');
      }
    });
  });



});
