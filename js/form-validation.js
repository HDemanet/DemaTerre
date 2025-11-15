/* =========================
   FORM-VALIDATION.JS
   Validation complète du formulaire de contact
   ========================= */

(function() {
  'use strict';

  // Expressions régulières
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telBelgiqueRegex = /^(\+32|0)(4[0-9]{8}|[1-9][0-9]{7})$/;

  // Afficher un message d'erreur
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + '-error');

    if (field && errorSpan) {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
      errorSpan.textContent = message;
      errorSpan.setAttribute('role', 'alert');
      field.focus();
    }
  }

  // Effacer un message d'erreur
  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + '-error');

    if (field && errorSpan) {
      field.classList.remove('error');
      field.setAttribute('aria-invalid', 'false');
      errorSpan.textContent = '';
      errorSpan.removeAttribute('role');
    }
  }

  // Effacer toutes les erreurs
  function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorFields = document.querySelectorAll('.error');

    errorMessages.forEach(function(error) {
      error.textContent = '';
      error.removeAttribute('role');
    });

    errorFields.forEach(function(field) {
      field.classList.remove('error');
      field.setAttribute('aria-invalid', 'false');
    });
  }

  // Valider le nom
  function validateNom() {
    const nom = document.getElementById('nom');
    if (!nom.value.trim()) {
      showError('nom', 'Le nom est obligatoire');
      return false;
    }
    if (nom.value.trim().length < 2) {
      showError('nom', 'Le nom doit contenir au moins 2 caractères');
      return false;
    }
    clearError('nom');
    return true;
  }

  // Valider le prénom
  function validatePrenom() {
    const prenom = document.getElementById('prenom');
    if (!prenom.value.trim()) {
      showError('prenom', 'Le prénom est obligatoire');
      return false;
    }
    if (prenom.value.trim().length < 2) {
      showError('prenom', 'Le prénom doit contenir au moins 2 caractères');
      return false;
    }
    clearError('prenom');
    return true;
  }

  // Valider l'email
  function validateEmail() {
    const email = document.getElementById('email');
    if (!email.value.trim()) {
      showError('email', 'L\'email est obligatoire');
      return false;
    }
    if (!emailRegex.test(email.value.trim())) {
      showError('email', 'Format d\'email invalide (ex: nom@domaine.be)');
      return false;
    }
    clearError('email');
    return true;
  }

  // Valider le téléphone
  function validateTelephone() {
    const tel = document.getElementById('telephone');
    if (!tel.value.trim()) {
      showError('telephone', 'Le téléphone est obligatoire');
      return false;
    }

    // Nettoyer le numéro (enlever espaces, tirets, etc.)
    const cleanTel = tel.value.replace(/[\s\-\.]/g, '');

    if (!telBelgiqueRegex.test(cleanTel)) {
      showError('telephone', 'Numéro belge invalide (ex: 0488 06 70 63)');
      return false;
    }
    clearError('telephone');
    return true;
  }

  // Valider le service
  function validateService() {
    const service = document.getElementById('service');
    if (!service.value) {
      showError('service', 'Veuillez choisir un type de service');
      return false;
    }
    clearError('service');
    return true;
  }

  // Valider le message
  function validateMessage() {
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      showError('message', 'La description du projet est obligatoire');
      return false;
    }
    if (message.value.trim().length < 20) {
      showError('message', 'Veuillez décrire votre projet plus en détail (minimum 20 caractères)');
      return false;
    }
    clearError('message');
    return true;
  }

  // Valider le RGPD
  function validateRGPD() {
    const rgpd = document.getElementById('rgpd');
    if (!rgpd.checked) {
      showError('rgpd', 'Vous devez accepter notre politique de confidentialité');
      return false;
    }
    clearError('rgpd');
    return true;
  }

  // Envoyer le formulaire
  function sendForm(formData) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Désactiver le bouton et afficher loader
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

    // Simulation d'envoi (REMPLACER par votre backend réel)
    setTimeout(function() {
      // Masquer le formulaire
      document.getElementById('contactForm').style.display = 'none';

      // Afficher le message de succès
      const successMessage = document.getElementById('form-success');
      if (successMessage) {
        successMessage.style.display = 'flex';
      }

      // Scroll vers le message de succès
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Log pour debug (à supprimer en production)
      console.log('Formulaire envoyé:', {
        nom: formData.get('nom'),
        prenom: formData.get('prenom'),
        email: formData.get('email'),
        telephone: formData.get('telephone'),
        ville: formData.get('ville'),
        service: formData.get('service'),
        message: formData.get('message'),
        rgpd: formData.get('rgpd'),
        date: new Date().toISOString()
      });

      /*
      // DÉCOMMENTER et ADAPTER pour envoi réel via backend
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData))
      })
      .then(response => response.json())
      .then(data => {
        // Succès
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('form-success').style.display = 'flex';
      })
      .catch(error => {
        // Erreur
        alert('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
      */

    }, 2000);
  }

  // Initialiser la validation
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    // Validation temps réel sur les champs
    const fields = ['nom', 'prenom', 'email', 'telephone', 'service', 'message'];

    fields.forEach(function(fieldId) {
      const field = document.getElementById(fieldId);
      if (field) {
        // Validation à la perte de focus
        field.addEventListener('blur', function() {
          switch(fieldId) {
            case 'nom': validateNom(); break;
            case 'prenom': validatePrenom(); break;
            case 'email': validateEmail(); break;
            case 'telephone': validateTelephone(); break;
            case 'service': validateService(); break;
            case 'message': validateMessage(); break;
          }
        });

        // Effacer l'erreur quand l'utilisateur tape
        field.addEventListener('input', function() {
          clearError(fieldId);
        });
      }
    });

    // Validation RGPD
    const rgpdCheckbox = document.getElementById('rgpd');
    if (rgpdCheckbox) {
      rgpdCheckbox.addEventListener('change', function() {
        if (this.checked) {
          clearError('rgpd');
        }
      });
    }

    // Soumission du formulaire
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Effacer toutes les erreurs précédentes
      clearAllErrors();

      // Valider tous les champs
      const isNomValid = validateNom();
      const isPrenomValid = validatePrenom();
      const isEmailValid = validateEmail();
      const isTelValid = validateTelephone();
      const isServiceValid = validateService();
      const isMessageValid = validateMessage();
      const isRGPDValid = validateRGPD();

      // Si tout est valide
      if (isNomValid && isPrenomValid && isEmailValid && isTelValid &&
          isServiceValid && isMessageValid && isRGPDValid) {

        // Créer FormData
        const formData = new FormData(form);

        // Envoyer le formulaire
        sendForm(formData);
      } else {
        // Scroll vers la première erreur
        const firstError = document.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

})();
