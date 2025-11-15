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

  // ========== LIGHTBOX GALERIE ==========
  // Simple lightbox pour les images de la galerie
  $('.gallery-item').on('click', function() {
    const imgSrc = $(this).find('img').attr('src');
    const imgAlt = $(this).find('img').attr('alt');

    // Créer la lightbox
    const lightbox = $('<div class="lightbox"></div>');
    const lightboxContent = $('<div class="lightbox-content"></div>');
    const lightboxImage = $('<img>').attr('src', imgSrc).attr('alt', imgAlt);
    const lightboxClose = $('<button class="lightbox-close" aria-label="Fermer">&times;</button>');

    lightboxContent.append(lightboxImage);
    lightboxContent.append(lightboxClose);
    lightbox.append(lightboxContent);

    $('body').append(lightbox);

    // Animation d'entrée
    setTimeout(function() {
      lightbox.addClass('active');
    }, 10);

    // Fermer la lightbox
    lightbox.on('click', function(e) {
      if ($(e.target).is('.lightbox') || $(e.target).is('.lightbox-close')) {
        lightbox.removeClass('active');
        setTimeout(function() {
          lightbox.remove();
        }, 300);
      }
    });

    // Fermer avec Escape
    $(document).on('keydown.lightbox', function(e) {
      if (e.key === 'Escape') {
        lightbox.removeClass('active');
        setTimeout(function() {
          lightbox.remove();
        }, 300);
        $(document).off('keydown.lightbox');
      }
    });
  });

});

// ========== STYLES LIGHTBOX (ajouté dynamiquement) ==========
if (!document.getElementById('lightbox-styles')) {
  const lightboxStyles = document.createElement('style');
  lightboxStyles.id = 'lightbox-styles';
  lightboxStyles.innerHTML = `
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      cursor: pointer;
    }

    .lightbox.active {
      opacity: 1;
    }

    .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
      cursor: default;
    }

    .lightbox-content img {
      max-width: 100%;
      max-height: 90vh;
      width: auto;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }

    .lightbox-close {
      position: absolute;
      top: -40px;
      right: 0;
      background: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 24px;
      line-height: 1;
      cursor: pointer;
      color: #333;
      transition: all 0.3s ease;
    }

    .lightbox-close:hover {
      background: #f44336;
      color: white;
      transform: scale(1.1);
    }
  `;
  document.head.appendChild(lightboxStyles);
}
