/*
  PORTAIL SIO — CONFIGURATION
  Remplacez les URLs d'exemple par les vraies adresses de vos services.
  Si une URL n'est pas encore connue, laissez url: "" : la carte affichera « À configurer ».
  ATTENTION : ne mettez jamais de secrets, tokens ou mots de passe dans ce fichier public.
*/
window.SIO_CONFIG = {
  applications: [
    { id: 'glpi', name: 'GLPI', category: 'Support', icon: '◈', color: 'violet', description: 'Tickets, parc informatique et gestion des interventions.', url: '', featured: true },
    { id: 'wazuh', name: 'Wazuh', category: 'Sécurité', icon: '⬡', color: 'blue', description: 'Supervision de sécurité et événements SIEM.', url: '', featured: true },
    { id: 'pdq', name: 'PDQ Deploy', category: 'Déploiement', icon: '⬚', color: 'orange', description: 'Gestion des installations et déploiements logiciels.', url: '', featured: true },
    { id: 'ad', name: 'Active Directory', category: 'Administration', icon: '⟡', color: 'mint', description: 'Comptes, groupes, unités d’organisation et GPO.', url: '', featured: true },
    { id: 'monitoring', name: 'Supervision', category: 'Infrastructure', icon: '◉', color: 'pink', description: 'Surveillance des équipements et services réseau.', url: '' },
    { id: 'iis', name: 'Serveur Web IIS', category: 'Infrastructure', icon: '⌘', color: 'blue', description: 'Portail web et services internes hébergés sur IIS.', url: '', featured: false },
    { id: 'files', name: 'Partages réseau', category: 'Infrastructure', icon: '▤', color: 'orange', description: 'Ressources RH, INF, Commun et Software.', url: '', featured: false },
    { id: 'firewall', name: 'Pare-feu', category: 'Réseau', icon: '◈', color: 'mint', description: 'Administration et règles de filtrage réseau.', url: '', featured: false }
  ],
  documents: [
    { title: 'Guide utilisateur', category: 'DÉMARRAGE', description: 'Découvrir les ressources et les services du portail.', icon: '▤', url: 'docs/README.txt' },
    { title: 'Gestion Active Directory', category: 'ADMINISTRATION', description: 'Procédures relatives aux comptes, groupes et GPO.', icon: '⌘', url: '' },
    { title: 'Déploiement logiciel', category: 'EXPLOITATION', description: 'Documentation de PDQ Deploy et des installations.', icon: '⬚', url: '' },
    { title: 'Sécurité & supervision', category: 'CYBERSÉCURITÉ', description: 'Documentation SIEM, agents et contrôles.', icon: '⬡', url: '' }
  ],
  contacts: [
    { name: 'Support informatique', role: 'Assistance et tickets', email: '', initials: 'SI' },
    { name: 'Administration systèmes', role: 'Windows Server, AD et GPO', email: '', initials: 'AS' },
    { name: 'Équipe sécurité', role: 'Supervision et sécurité', email: '', initials: 'ES' }
  ]
};
