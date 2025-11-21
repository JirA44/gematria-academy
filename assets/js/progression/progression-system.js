// Système de progression (placeholder)
console.log('📊 Progression system chargé (placeholder)');

// Gérer la progression de l'utilisateur
window.progressionSystem = {
    saveProgress: function(lessonId, completed) {
        localStorage.setItem(`lesson_${lessonId}`, completed);
    },
    getProgress: function(lessonId) {
        return localStorage.getItem(`lesson_${lessonId}`) === 'true';
    }
};
