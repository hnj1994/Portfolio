/**
 * Site content — single source of truth for everything recruiter-facing.
 *
 * Edit this file to update the About, Experience, Skills, Projects,
 * Credentials and Contact sections. Sections whose arrays are empty
 * are hidden automatically. The resume served at /resume.pdf lives in
 * /public — replace that file to update the download.
 *
 * In experience bullets and project text, **wrap a metric in asterisks**
 * to render it bold.
 */

export const profile = {
  name: 'Hrishikesh Joshi',
  title: 'Senior Systems Administrator & Azure Solutions Architect',
  shortTitle: 'Senior Systems Administrator | Azure Solutions Architect (AZ-305)',
  tagline: 'Infrastructure. Engineered for Scale.',
  location: 'Pune, India',
  availability: 'Open to opportunities',   // set to '' to hide the badge

  /**
   * Headshot at public/profile.jpg, cropped square. Set this to '' to fall
   * back to an initials monogram.
   */
  photo: '/profile.jpg',

  /**
   * Answers the first question a recruiter has. Edit freely; `notice` is
   * hidden while empty, so fill in your real notice period.
   */
  lookingFor: {
    roles: 'Cloud Architect, Azure Infrastructure Lead or Senior Systems Administrator',
    location: 'Pune or remote',
    notice: '',        // e.g. '30 days'
  },

  summary: [
    'Senior Systems Administrator with 11+ years of enterprise infrastructure experience across hybrid cloud, on-premises and Microsoft 365 environments, and an Azure Solutions Architect Expert (AZ-305).',
    'I take deep, hands-on ownership of Azure compute, networking, hybrid identity (Microsoft Entra ID, Conditional Access, MFA), BCDR with Azure Site Recovery, and endpoint security across a multi-client managed-services portfolio spanning pharmaceutical, manufacturing, renewable energy and software companies.',
    'My track record includes ransomware recovery at scale, automated CVE remediation pipelines, Azure cost governance against BOQ commitments, OT/IT integration under GxP, and pre-sales solution architecture that pairs technical delivery with customer-facing documentation and governance.',
  ],

  // Proof points shown beside the summary. Every figure here comes from the CV.
  highlights: [
    { value: '11+ yrs', label: 'Enterprise infrastructure', sub: 'Hybrid cloud · on-premises · Microsoft 365' },
    { value: '500+', label: 'Servers at 99.9% availability', sub: '1,000+ users across a multi-client portfolio' },
    { value: '100+', label: 'Servers recovered from ransomware', sub: 'Rebuilt, hardened and restored to operations' },
    { value: '10+', label: 'Client environments on hybrid identity', sub: 'Entra ID · Conditional Access · MFA · Zero Trust' },
    { value: '245', label: 'Endpoint Defender estate owned', sub: 'Daily fleet-health reporting and remediation' },
    { value: '6', label: 'Microsoft & Cisco certifications', sub: 'AZ-305 · AZ-104 · AZ-800/801 · MS-102 · MS-203' },
  ],

  links: {
    email: 'joshihrishikesh42@gmail.com',
    linkedin: 'https://www.linkedin.com/in/hrishikesh-joshi-334b08159',
    github: 'https://github.com/hnj1994',
    resume: '/resume.pdf',
  },
  siteUrl: 'https://portfolio-hnj1994s-projects.vercel.app',
};

export const skills = [
  {
    group: 'Azure Compute & Storage',
    items: ['Azure Virtual Machines', 'VM Scale Sets (VMSS)', 'Azure Backup', 'Azure File Sync', 'Azure Storage', 'Recovery Services Vault', 'Azure Managed Disks'],
  },
  {
    group: 'Azure Networking',
    items: ['Azure Virtual Network', 'Application Gateway', 'Azure Load Balancer', 'Azure Firewall', 'Azure Bastion', 'VPN Gateway', 'NSG', 'DNS', 'WAF'],
  },
  {
    group: 'Azure Security & Identity',
    items: ['Microsoft Entra ID', 'Azure AD Connect', 'Conditional Access', 'Azure RBAC', 'Multi-Factor Authentication', 'Privileged Identity Management', 'Microsoft Defender', 'Intune'],
  },
  {
    group: 'Disaster Recovery & BCDR',
    items: ['Azure Site Recovery (ASR)', 'Business Continuity Planning', 'RTO/RPO Optimization', 'Backup Policies', 'Ransomware Recovery', 'IBM Tivoli Storage Manager'],
  },
  {
    group: 'Virtualization & On-Premises',
    items: ['VMware vSphere', 'VMware NSX-T / NSX-V', 'Hyper-V', 'Windows Server 2008–2022', 'Active Directory & GPO', 'WDS / MDT imaging', 'ConfigMgr'],
  },
  {
    group: 'Monitoring & Automation',
    items: ['Azure Monitor', 'Zabbix', 'PRTG', 'LogRhythm SIEM', 'PowerShell', 'Terraform', 'ARM / Bicep', 'ManageEngine', 'Zscaler', 'OpenSearch'],
  },
];

/**
 * Work history, most recent first. The first `visibleBullets` entries show by
 * default and the rest sit behind a "Show more" toggle, so the section stays
 * skimmable. Lead each bullet with the outcome.
 */
export const experience = [
  {
    role: 'Senior Systems Administrator & Cloud Architect',
    company: 'I-Source Info Systems Pvt. Ltd',
    location: 'Pune, India',
    start: 'Jan 2021',
    end: 'Present',
    visibleBullets: 5,
    bullets: [
      'Run enterprise infrastructure across Microsoft Azure and private cloud for a multi-client portfolio of **1,000+ users and 500+ servers at 99.9% availability**, spanning pharmaceutical, manufacturing, renewable energy and software companies.',
      'Restored operations after a ransomware attack on **100+ compromised servers**: rebuilt and hardened Windows security baselines, deployed next-generation antivirus and rolled out Zscaler proxy across 500+ endpoints.',
      'Improved RTO/RPO posture and compliance readiness by architecting **Azure Site Recovery** for business-critical workloads, covering replication policy design, failover testing and BCDR documentation.',
      'Delivered hybrid identity across **10+ client environments** with Azure AD Connect, designing Conditional Access and MFA policies that enforce Zero Trust with no user productivity impact.',
      'Cut manual provisioning effort and standardised deployments with **Azure VM Scale Sets** in flexible orchestration mode, including golden-image creation, versioning and automated patch lifecycle management.',
      'Own Azure cost governance for client subscriptions through monthly **BOQ-to-actual reconciliation** and variance tracking across DDoS Protection, Azure Site Recovery, bandwidth and reserved instances.',
      'Operate daily Microsoft Defender fleet-health reporting across a **245-endpoint estate**, and diagnosed definition-update failures including a TLS and network-path fault in the Windows Update Agent channel.',
      'Designed and POC-validated a multi-tenant **Database Activity Monitoring** solution on OpenSearch with document-level security and agentless WEF/OpenWEC log collection from SQL Server.',
      'Drove an **Intune co-management exit** for a Microsoft Entra hybrid-joined Windows 11 fleet: ConfigMgr client removal and native Update Ring policy inside an AppLocker and WDAC restricted environment where PowerShell execution is blocked.',
      'Executing a **P2V migration** of a physical industrial PC to Hyper-V for a GxP-regulated pharmaceutical OT environment, resolving cross-subnet SCADA polling and OT/IT network segmentation.',
      'Monitor estate health with Zabbix, PRTG, LogRhythm SIEM and Azure Monitor, and automate provisioning with PowerShell, Terraform and ARM/Bicep.',
    ],
    tech: ['Azure', 'Entra ID', 'Azure Site Recovery', 'VMSS', 'Intune', 'Defender', 'Zscaler', 'Terraform', 'Bicep', 'PowerShell', 'Hyper-V'],
  },
  {
    role: 'Senior IT Engineer',
    company: 'Minitek Systems India Pvt. Ltd. · Client: KSPG Automotive India Pvt. Ltd',
    location: 'Pune, India',
    start: 'Jan 2016',
    end: 'May 2021',
    visibleBullets: 5,
    bullets: [
      'Kept **Windows Server 2008/2012** environments continuously available, performant and security-compliant across the plant estate.',
      'Standardised endpoint builds across **500+ devices** with Windows Deployment Services and the Microsoft Deployment Toolkit.',
      'Reduced vulnerability exposure enterprise-wide by deploying OS and application patches through **ManageEngine Desktop Central**.',
      'Guaranteed recovery readiness by administering enterprise backups on **IBM Tivoli Storage Manager** and a TS2900 tape library.',
      'Enforced access control by administering **Active Directory** users and groups with Group Policy Objects aligned to security standards.',
      'Maintained SLA adherence by managing and tracking IT service requests and incidents in ManageEngine ServiceDesk Plus.',
      'Minimised outage impact by coordinating with hardware and network vendors to resolve escalated infrastructure issues.',
      'Resolved OS, application, networking and security incidents for enterprise users across India over remote support.',
    ],
    tech: ['Windows Server', 'Active Directory', 'GPO', 'ManageEngine', 'WDS / MDT', 'IBM TSM', 'ServiceDesk Plus'],
  },
];

/** Selected projects, each as objective → approach → outcome. */
export const projects = [
  {
    name: 'Azure VM Scale Sets Deployment',
    objective: 'Enable elastic, auto-scaling infrastructure for client production workloads on Azure.',
    summary: 'Designed the golden-image creation pipeline, configured flexible orchestration, automated the patch lifecycle and integrated monitoring end to end.',
    outcome: 'Reduced manual VM provisioning effort and improved workload scalability and availability.',
    tech: ['Azure VMSS', 'Managed Disks', 'Azure Monitor', 'PowerShell', 'ARM Templates'],
  },
  {
    name: 'Azure Site Recovery for Business Continuity',
    objective: 'Improve disaster-recovery readiness and minimize RTO/RPO for critical production workloads.',
    summary: 'Architected the full ASR deployment, configured replication policies, tested failover procedures and validated the BCDR documentation.',
    outcome: 'Enterprise-grade disaster-recovery posture with automated failover, improving business continuity and compliance readiness.',
    tech: ['Azure Site Recovery', 'Recovery Services Vault', 'Azure VMs', 'Azure Networking'],
  },
  {
    name: 'Hybrid Identity with Azure AD Connect',
    objective: 'Unify on-premises Active Directory with Microsoft Entra ID across 10+ client environments.',
    summary: 'Configured AD Connect synchronization, designed Conditional Access policies, enabled MFA and validated SSO across every environment.',
    outcome: 'Seamless hybrid identity with Zero Trust access controls and no user productivity disruption.',
    tech: ['Azure AD Connect', 'Password Hash Sync', 'Microsoft Entra ID', 'Conditional Access', 'MFA'],
  },
  {
    name: 'VMware NSX-V to NSX-T Private Cloud Migration',
    objective: 'Modernize network virtualization and improve micro-segmentation in a 100+ server private cloud.',
    summary: 'Planned and executed a phased migration from NSX-V to NSX-T, redesigned the network topology and validated security policies post-migration.',
    outcome: 'Stronger network security posture, better scalability and the NSX-V lifecycle risk eliminated.',
    tech: ['VMware NSX-T', 'NSX-V', 'vSphere', 'VXLAN', 'Distributed Firewall'],
  },
];

export const certifications = [
  { name: 'Microsoft Certified: Azure Solutions Architect Expert', issuer: 'Microsoft', code: 'AZ-305' },
  { name: 'Microsoft Certified: Azure Administrator Associate', issuer: 'Microsoft', code: 'AZ-104' },
  { name: 'Microsoft Certified: Windows Server Hybrid Administrator Associate', issuer: 'Microsoft', code: 'AZ-800 / AZ-801' },
  { name: 'Microsoft 365 Certified: Enterprise Administrator Expert', issuer: 'Microsoft', code: 'MS-102' },
  { name: 'Microsoft 365 Certified: Messaging Administrator', issuer: 'Microsoft', code: 'MS-203' },
  { name: 'Cisco Certified: Cybersecurity Essentials & Introduction to Cybersecurity', issuer: 'Cisco', code: 'Information Security' },
];

export const education = [
  { degree: 'Certified Cloud Computing & IT Infrastructure Professional', school: 'Jetking Technologies, Pune', year: '2012 – 2014' },
];

export const strengths = [
  { name: 'Structured & detail-oriented', text: 'Designs and configures systems with a clean, standardized, well-documented approach for long-term maintainability and smooth handovers.' },
  { name: 'Fast, accurate & results-driven', text: 'Delivers quickly without compromising quality, minimizing downtime and preventing operational and financial impact.' },
  { name: 'Analytical problem solver', text: 'Methodical troubleshooting: asks the right questions, finds root causes and ships long-term fixes rather than workarounds.' },
  { name: 'Multitasking & prioritization', text: 'Comfortable running multiple projects and incidents at once while holding service quality and deadlines.' },
];
