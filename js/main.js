$(document).ready(function() {

  // ========== NAVIGATION MOBILE ==========
  $('.nav-toggle').click(function() {
    const $toggle = $(this);
    const $navMobile = $('#nav-mobile');
    const isExpanded = $toggle.attr('aria-expanded') === 'true';

    $toggle.toggleClass('active');
    $toggle.attr('aria-expanded', !isExpanded);
    $toggle.attr('aria-label', isExpanded ? 'Ouvrir le menu' : 'Fermer le menu');

    $navMobile.toggleClass('active');
  });

  // Fermer le menu mobile en cliquant sur un lien
  $('.nav-mobile .nav-link').click(function() {
    $('.nav-toggle').removeClass('active').attr('aria-expanded', 'false');
    $('#nav-mobile').removeClass('active');
  });

  // Fermer le menu mobile en cliquant ailleurs
  $(document).click(function(e) {
    if (!$(e.target).closest('.header').length) {
      $('.nav-toggle').removeClass('active').attr('aria-expanded', 'false');
      $('#nav-mobile').removeClass('active');
    }
  });

  // ========== SMOOTH SCROLL ==========
  $('a[href^="#"]').on('click', function(e) {
    const target = $(this.getAttribute('href'));

    if (target.length) {
      e.preventDefault();

      $('.nav-toggle').removeClass('active').attr('aria-expanded', 'false');
      $('#nav-mobile').removeClass('active');

      const headerHeight = $('.header').outerHeight();
      const targetPosition = target.offset().top - headerHeight;

      $('html, body').animate({
        scrollTop: targetPosition
      }, 800, 'swing');
    }
  });

  // ========== ACTIVE SECTION HIGHLIGHT ==========
  $(window).on('scroll', function() {
    const scrollPosition = $(window).scrollTop();
    const headerHeight = $('.header').outerHeight();

    $('section[id]').each(function() {
      const sectionTop = $(this).offset().top - headerHeight - 100;
      const sectionBottom = sectionTop + $(this).outerHeight();
      const sectionId = $(this).attr('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + sectionId + '"]').addClass('active');
      }
    });
  });

  // ========== SKIP LINK ==========
  $('.skip-link').on('click', function(e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target.length) {
      target.attr('tabindex', '-1').focus();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 500);
    }
  });

});
