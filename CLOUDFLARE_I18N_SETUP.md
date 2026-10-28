# Traduction du site

Le sélecteur est injecté sur les pages HTML par `_worker.js`. Il mémorise la préférence du lecteur et traduit les textes visibles à mesure du défilement.

## Langues

Français (contenu source), anglais, chinois, hindi, espagnol, arabe, bengali, portugais, russe et ourdou. L’arabe et l’ourdou activent le sens de lecture RTL.

## Cloudflare

Le fichier `wrangler.jsonc` déclare le binding Workers AI `AI`, utilisé par le modèle `@cf/meta/m2m100-1.2b`. Le projet Pages doit déployer cette configuration. Le cache Edge et le cache local du navigateur limitent les appels répétés. Une limite souple par adresse IP protège aussi l’endpoint de traduction.

Workers AI dispose d’une allocation gratuite quotidienne; les dépassements sont facturés selon les tarifs du modèle et du compte. Consultez le tableau Cloudflare avant d’activer la production : https://developers.cloudflare.com/workers-ai/platform/pricing/

Les traductions sont automatiques et peuvent manquer de précision sur les termes historiques, religieux et ésotériques. Les contenus restent lisibles en français en choisissant « Français ».

## Déploiement local

`npm run deploy` utilise Wrangler et le répertoire de sortie déclaré dans `wrangler.jsonc`. Il faut déployer le projet via l’intégration Git Cloudflare ou avec Wrangler afin que le Worker avancé et le binding AI soient actifs.
