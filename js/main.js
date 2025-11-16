/* =========================
   MAIN.JS - JavaScript principal
   Navigation smooth scroll et menu mobile
   ========================= */

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
  // Scroll fluide vers les sections
  $('a[href^="#"]').on('click', function(e) {
    const target = $(this.getAttribute('href'));

    if (target.length) {
      e.preventDefault();

      // Fermer le menu mobile si ouvert
      $('.nav-toggle').removeClass('active').attr('aria-expanded', 'false');
      $('#nav-mobile').removeClass('active');

      // Calculer la position avec offset pour le header
      const headerHeight = $('.header').outerHeight();
      const targetPosition = target.offset().top - headerHeight;

      $('html, body').animate({
        scrollTop: targetPosition
      }, 800, 'swing');
    }
  });

  // ========== ACTIVE SECTION HIGHLIGHT ==========
  // Mettre en évidence la section active dans le menu
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
  // Gestion du skip link pour accessibilité
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
