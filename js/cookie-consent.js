/* =========================
   COOKIE-CONSENT.JS
   Gestion de la bannière cookies RGPD
   ========================= */

(function() {
  'use strict';

  // Vérifier si l'utilisateur a déjà accepté les cookies
  function checkCookieConsent() {
    return localStorage.getItem('cookiesAccepted') === 'true';
  }

  // Afficher la bannière si pas encore accepté
  function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner && !checkCookieConsent()) {
      banner.style.display = 'block';

      // Animation d'entrée
      setTimeout(function() {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(100px)';
        banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        setTimeout(function() {
          banner.style.opacity = '1';
          banner.style.transform = 'translateY(0)';
        }, 50);
      }, 500);
    }
  }

  // Accepter les cookies
  function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiesAcceptedDate', new Date().toISOString());
    hideCookieBanner();
  }

  // Masquer la bannière
  function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(100px)';

      setTimeout(function() {
        banner.style.display = 'none';
      }, 300);
    }
  }

  // Initialiser au chargement de la page
  document.addEventListener('DOMContentLoaded', function() {

    // Afficher la bannière si nécessaire
    showCookieBanner();

    // Bouton "J'accepte"
    const acceptButton = document.getElementById('accept-cookies');
    if (acceptButton) {
      acceptButton.addEventListener('click', function(e) {
        e.preventDefault();
        acceptCookies();

        // Log pour debug (à supprimer en production)
        console.log('Cookies acceptés le:', new Date().toLocaleString());
      });
    }

    // Fermer avec Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const banner = document.getElementById('cookie-banner');
        if (banner && banner.style.display !== 'none') {
          // Ne pas fermer sans consentement, juste info
          console.log('Veuillez accepter ou refuser les cookies');
        }
      }
    });
  });

  // Fonction pour révoquer le consentement (si besoin)
  window.revokeCookieConsent = function() {
    localStorage.removeItem('cookiesAccepted');
    localStorage.removeItem('cookiesAcceptedDate');
    showCookieBanner();
    console.log('Consentement cookies révoqué');
  };

  // Fonction pour vérifier l'état du consentement (si besoin)
  window.getCookieConsentStatus = function() {
    const accepted = checkCookieConsent();
    const date = localStorage.getItem('cookiesAcceptedDate');
    return {
      accepted: accepted,
      date: date ? new Date(date) : null
    };
  };

})();
