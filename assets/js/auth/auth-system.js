// Système d'authentification (placeholder)
console.log('🔐 Auth system chargé (placeholder)');

// Simuler un utilisateur non connecté
window.currentUser = null;

// Émettre l'événement d'état d'authentification
setTimeout(() => {
    const event = new CustomEvent('authStateChanged', {
        detail: { user: window.currentUser }
    });
    window.dispatchEvent(event);
}, 500);
