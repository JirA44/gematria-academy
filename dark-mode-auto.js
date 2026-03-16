// Activer le mode nuit automatiquement au chargement
document.documentElement.classList.add('dark-mode');
document.body.classList.add('dark-mode');

// Mettre à jour localStorage
localStorage.setItem('darkMode', 'true');

// Attendre que le DOM soit prêt
document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour le texte du bouton
    const btn = document.querySelector('.dark-mode-toggle');
    if (btn) {
        btn.textContent = '☀️ Mode Jour';
    }
});
