# Signalement automatique des erreurs

Le navigateur transmet uniquement les champs techniques autorisés par le Worker : type d’erreur, catégorie générale de page et version du site. Le Worker ajoute un identifiant aléatoire et l’heure de réception. Aucun texte de l’erreur, texte saisi, nom, adresse e-mail, URL complète ou adresse IP n’est ajouté au rapport transmis à GitHub.

Les rapports sont toujours inscrits dans les journaux du Worker sous l’événement `gematria_client_error`. Pour les envoyer aussi dans une issue GitHub consultable, configurer le secret suivant dans les paramètres Cloudflare du Worker/Pages :

- Nom : `GITHUB_ISSUES_TOKEN`
- Valeur : un jeton GitHub fine-grained limité au dépôt `JirA44/gematria-academy`, avec la permission **Issues: Read and write**.

Après avoir ajouté ou modifié le secret, redéployer le Worker. Le premier rapport crée l’issue « Boîte de réception — erreurs automatiques Gematria Academy » ; les suivants sont ajoutés en commentaires à cette issue ouverte. Si le secret n’est pas configuré ou si GitHub est temporairement indisponible, l’envoi au Worker reste accepté et le rapport demeure dans ses journaux.

Ne placez jamais le jeton dans un fichier du dépôt, dans le JavaScript du navigateur ou dans un message d’erreur. Les rapports restent soumis à la limitation de fréquence du Worker.
