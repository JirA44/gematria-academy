// Animation du fond cosmique
console.log("✨ Animated background chargé");

// Simple animation
function createStars() {
    console.log("Étoiles créées \!");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createStars);
} else {
    createStars();
}
