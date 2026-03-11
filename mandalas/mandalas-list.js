// Liste des mandalas à charger
// Pour ajouter vos propres mandalas :
// 1. Placez vos images (.jpg, .png, .svg) dans le dossier /mandalas/
// 2. Ajoutez le nom du fichier dans ce tableau
// 3. Commit et push vers GitHub

const MANDALA_FILES = [
    // Exemples - Remplacez par vos propres fichiers
    // 'mon-mandala-1.jpg',
    // 'mon-mandala-2.png',
    // 'mandala-essénien-1.jpg',
    // 'mandala-essénien-2.jpg',
    // etc.
];

// Fonction pour obtenir les URLs complètes des mandalas
function getMandalaUrls() {
    const basePath = './mandalas/';
    return MANDALA_FILES.map(filename => basePath + filename);
}
