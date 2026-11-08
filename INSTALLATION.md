# Intranet SIO.Domaine — Installation IIS

## Contenu

Portail intranet statique, responsive, avec thème sombre/clair, recherche et filtres. Aucun framework, aucune base de données, aucun accès Internet requis.

## Déployer sur Windows Server Core (IIS)

1. Copier **tout le contenu du dossier `sio-intranet`** vers le répertoire web de IIS, par défaut `C:\inetpub\wwwroot\` (ou dans un site IIS distinct).
2. Vérifier le rôle IIS :

```powershell
Get-WindowsFeature Web-Server
# Si nécessaire (PowerShell administrateur) :
Install-WindowsFeature Web-Server
```

3. Vérifier que `index.html` est un document par défaut :

```powershell
Import-Module WebAdministration
Get-WebConfigurationProperty -PSPath 'MACHINE/WEBROOT/APPHOST' -Filter 'system.webServer/defaultDocument/files' -Name '.'
```

Si `index.html` est absent, ajouter le document par défaut via la console IIS sur une machine d'administration, ou :

```powershell
Add-WebConfigurationProperty -PSPath 'MACHINE/WEBROOT/APPHOST' -Filter 'system.webServer/defaultDocument/files' -Name '.' -Value @{value='index.html'}
```

4. Consulter depuis un poste qui peut atteindre le serveur : `http://IP_DU_SERVEUR/`.

> Si le site ne répond pas : vérifier le pare-feu Windows (TCP 80), le réseau Hyper-V, la passerelle pfSense et le binding IIS. Pour HTTPS, prévoir un certificat de confiance et un binding sur 443.

## Personnaliser les liens

Ouvrir `C:\inetpub\wwwroot\assets\config.js`. Modifier par exemple :

```js
{ id: 'glpi', name: 'GLPI', category: 'Support', icon: '◈', color: 'violet', description: 'Tickets et inventaire.', url: 'https://glpi.sio.domaine', featured: true }
```

Ne pas saisir de valeur non vérifiée. Les liens vers des outils comme PDQ Deploy ou AD, qui sont souvent des consoles natives, peuvent rester sans URL : ils seront affichés « À configurer ». Pour les rendre réellement accessibles, définir une solution d'accès adaptée (RemoteApp, RD Web, portail d'administration), sans exposer RDP directement à Internet.

## Ajouter les documents

Déposer vos PDF dans `C:\inetpub\wwwroot\docs\`, puis mettre à jour `documents` dans `assets/config.js` : `url: 'docs/ma-procedure.pdf'`.

## DNS Active Directory

Pour publier l'intranet avec un nom simple, ajouter sur le DNS AD un enregistrement **A** : `intranet` pointant vers l'IP **réelle** du serveur IIS. Les clients utilisant le DNS du domaine pourront alors ouvrir `http://intranet.sio.domaine/` si ce nom correspond à votre zone DNS.

## Sécurité / bonnes pratiques

- Réserver l'accès au LAN/VPN et appliquer les ACL nécessaires ; ne pas mettre le portail en accès Internet par défaut.
- Passer en HTTPS si possible (certificat conforme au nom DNS).
- Ne jamais mettre de secrets dans `config.js` : il est téléchargé par les navigateurs.
- Le tableau « Services & ressources » représente des liens ; **il n'affiche pas de mesure de disponibilité**.
- L'annuaire est **statique** et ne lit pas les utilisateurs AD.

## Résolution des problèmes

```powershell
Get-Service W3SVC
Get-NetTCPConnection -LocalPort 80 -State Listen -ErrorAction SilentlyContinue
Test-Path C:\inetpub\wwwroot\index.html
```

Depuis une machine cliente :

```powershell
Test-NetConnection IP_DU_SERVEUR -Port 80
Resolve-DnsName intranet.sio.domaine
```
