<template>
  <div class="home-container">

    <section class="hero">
      <div class="hero-avatar" @click="photoOpen = true">
        <img src="/jordan-coupal.jpg" alt="Jordan Coupal">
      </div>
      <h1 class="hero-name">Jordan Coupal</h1>
      <p class="hero-roles">
        <span class="role" v-for="role in roles" :key="role.label">
          <span class="role-label" @mouseenter="hoveredRole = role.label" @mouseleave="hoveredRole = null">
            {{ role.label }}
            <span class="role-tooltip" :class="{ visible: hoveredRole === role.label }">
              {{ role.description }}
            </span>
          </span>
          <span class="role-sep" v-if="role.label !== roles[roles.length - 1].label">&nbsp;·&nbsp;</span>
        </span>
      </p>
      <p class="hero-bio">I specialize in building, scaling, and optimizing tools and solutions across cloud computing, cybersecurity, and data integration.</p>
    </section>

    <div class="divider"></div>

    <section class="section skills-section">
      <h2>Skills</h2>
      <div class="skills-container">
        <div
          class="skill"
          v-for="(skill, i) in skills"
          :key="skill"
          :style="{ animationDelay: (i * 0.04) + 's' }"
          @click="selectedSkill = skill"
        >{{ skill }}</div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="section social-section">
      <div class="social-links">
        <div class="social-group">
          <span class="social-label">Contact</span>
          <div class="social-icons">
            <a href="https://www.linkedin.com/in/jordan-coupal-222773225/" title="LinkedIn" target="_blank" class="social-link">
              <i class="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="mailto:jordan@jcoupal.com" title="Email" class="social-link">
              <i class="fas fa-envelope fa-2x"></i>
            </a>
          </div>
        </div>
        <div class="social-sep"></div>
        <div class="social-group">
          <span class="social-label">Explore</span>
          <div class="social-icons">
            <a href="https://github.com/JCoupalK" title="GitHub" target="_blank" class="social-link">
              <i class="fab fa-github fa-2x"></i>
            </a>
            <a href="https://www.keepsec.ca" title="KeepSec" target="_blank" class="social-link">
              <img src="../../public/ks-icon-green.png" class="keepsec-icon">
            </a>
            <a href="https://vullify.com" title="Vullify" target="_blank" class="social-link">
              <img src="../../public/vullify-icon-green.png" class="keepsec-icon">
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Photo lightbox -->
    <transition name="modal">
      <div class="modal-backdrop" v-if="photoOpen" @click.self="photoOpen = false">
        <div class="photo-card">
          <button class="modal-close" @click="photoOpen = false">&#x2715;</button>
          <img src="/jordan-coupal.jpg" alt="Jordan Coupal">
        </div>
      </div>
    </transition>

    <!-- Skill modal -->
    <transition name="modal">
      <div class="modal-backdrop" v-if="selectedSkill" @click.self="selectedSkill = null">
        <div class="modal-card">
          <button class="modal-close" @click="selectedSkill = null">&#x2715;</button>
          <p class="modal-label">Skill</p>
          <h3 class="modal-title">{{ selectedSkill }}</h3>
          <p class="modal-desc">{{ skillDescriptions[selectedSkill] }}</p>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      hoveredRole: null,
      selectedSkill: null,
      photoOpen: false,

      roles: [
        {
          label: 'VP of Engineering',
          description: 'Leading engineering at Oriso — building and scaling cloud infrastructure, data integration pipelines, and the teams behind them.',
        },
        {
          label: 'Co-Founder',
          description: 'Co-founded KeepSec, a self-service cloud computing platform, and Vullify, a vulnerability and attack surface management platform.',
        },
        {
          label: 'Open Source',
          description: 'Active contributor and maintainer on GitHub under JCoupalK — building tools used by the community.',
        },
      ],

      skills: [
        'Linux', 'Go', 'Python', 'Bash', 'PHP', 'TypeScript', 'Vue.js', 'React', 'SQL',
        'Docker', 'Kubernetes', 'OpenStack',
        'Networking', 'Cloud', 'Cybersecurity', 'DevSecOps', 'API Design', 'System Design', 'CI/CD',
      ],

      skillDescriptions: {
        'Linux':         'Deep systems administration across various distros — from server hardening and service management to performance tuning and kernel configuration.',
        'Go':            'Primary language for building high-performance CLIs, APIs, and backend services. Used extensively at KeepSec, Vullify and in open source projects.',
        'Python':        'Scripting, automation workflows, data processing, and rapid tooling. Used across infrastructure and data integration tasks.',
        'Bash':          'Shell scripting for automation, deployment scripts, cron jobs, and day-to-day system administration.',
        'PHP':           'Backend web development and server-side scripting for web applications.',
        'TypeScript':    'Typed superset of JavaScript for scalable frontend and Node.js applications — preferred for larger codebases.',
        'Vue.js':        'Primary frontend framework for building reactive web UIs. Powers this website and several internal tools.',
        'React':         'Component-based UI library used for building dynamic and interactive web applications.',
        'SQL':           'Relational database querying, schema design, complex joins, and query optimization across PostgreSQL and MySQL.',
        'Docker':        'Containerizing applications, composing multi-service environments, and building reproducible deployment artifacts.',
        'Kubernetes':    'Orchestrating containerized workloads at scale — cluster management, rolling deployments, and service discovery.',
        'OpenStack':     'Deploying and managing private cloud infrastructure, compute, networking, and storage resources — foundation behind KeepSec.',
        'Networking':    'TCP/IP, DNS, VPNs, firewalls, load balancers, and designing resilient network architectures.',
        'Cloud':         'Designing and deploying infrastructure across public and private cloud platforms with a focus on scalability and cost.',
        'Cybersecurity': 'Security assessments, system hardening, threat modeling, and incident response — foundation behind Vullify.',
        'DevSecOps':     'Embedding security practices directly into CI/CD pipelines, shifting left to catch vulnerabilities before production.',
        'API Design':    'Designing clean RESTful APIs with a focus on consistency, versioning, documentation, and developer experience.',
        'System Design': 'Architecting scalable distributed systems — balancing reliability, maintainability, and performance at scale.',
        'CI/CD':         'Automated build, test, and deployment pipelines using GitHub Actions, GitLab CI, and other tooling.',
      },
    };
  },
};
</script>

<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.home-container {
  max-width: 760px;
  margin: 0 auto;
  padding: 60px 24px 80px;
  text-align: center;
}

/* Hero */
.hero {
  animation: fadeUp 0.6s ease both;
}

.hero-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 24px;
  border: 4px solid #4DBA87;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.hero-avatar:hover {
  opacity: 0.85;
}

.hero-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  display: block;
}

.hero-name {
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0 0 12px;
  color: #ededed;
  letter-spacing: -0.5px;
}

.hero-name::after {
  content: '';
  display: block;
  width: 48px;
  height: 3px;
  background: #4DBA87;
  margin: 10px auto 0;
  border-radius: 2px;
}

.hero-roles {
  font-size: 0.95rem;
  color: #4DBA87;
  letter-spacing: 0.04em;
  margin: 16px 0 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
}

/* Role tooltips */
.role {
  display: inline-flex;
  align-items: center;
}

.role-label {
  position: relative;
  cursor: default;
  padding: 2px 4px;
  border-radius: 4px;
  transition: color 0.15s ease;
}

.role-label:hover {
  color: #6dcfa0;
}

.role-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 230px;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.78rem;
  color: #aaa;
  line-height: 1.5;
  letter-spacing: 0;
  text-align: center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform: translateX(-50%) translateY(4px);
  z-index: 20;
  white-space: normal;
}

.role-tooltip.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.hero-bio {
  color: #aaa;
  font-size: 1rem;
  line-height: 1.7;
  max-width: 560px;
  margin: 0 auto;
}

/* Divider */
.divider {
  width: 40px;
  height: 1px;
  background: #333;
  margin: 48px auto;
}

/* Sections */
.section h2 {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #4DBA87;
  margin: 0 0 24px;
}

.section-text {
  color: #aaa;
  font-size: 1rem;
  line-height: 1.7;
  margin: 0;
}

.skills-section  { animation: fadeUp 0.6s 0.1s ease both; }
.hobbies-section { animation: fadeUp 0.6s 0.2s ease both; }
.social-section  { animation: fadeUp 0.6s 0.3s ease both; }

/* Skills */
.skills-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 680px;
  margin: 0 auto;
}

.skill {
  cursor: pointer;
  user-select: none;
  padding: 7px 16px;
  border: 1px solid #4DBA87;
  color: #4DBA87;
  border-radius: 20px;
  font-size: 0.85rem;
  opacity: 0;
  animation: fadeUp 0.4s ease both;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
  white-space: nowrap;
}

.skill:hover {
  background-color: #4DBA87;
  color: #1c1c1c;
  transform: translateY(-2px);
}

/* Social */
.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

.social-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  min-width: 110px;
}

.social-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #4DBA87;
}

.social-icons {
  display: flex;
  gap: 16px;
  align-items: center;
}

.social-link {
  color: #4DBA87;
  transition: transform 0.2s ease, opacity 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.social-link:hover {
  transform: translateY(-3px);
  opacity: 0.7;
}

.social-sep {
  width: 1px;
  height: 48px;
  background: #333;
}

.keepsec-icon {
  width: 28px;
  height: 28px;
  display: block;
}

/* Photo lightbox */
.photo-card {
  position: relative;
  border: 2px solid #4DBA87;
  border-radius: 12px;
  overflow: hidden;
  max-width: 420px;
  max-height: 80vh;
  width: 90vw;
}

.photo-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Skill modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(2px);
}

.modal-card {
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 28px 32px;
  width: 320px;
  max-width: 90vw;
  position: relative;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 14px;
  background: none;
  border: none;
  color: #555;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 2px 4px;
  transition: color 0.2s ease;
}

.modal-close:hover {
  color: #ededed;
}

.modal-label {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #4DBA87;
  margin: 0 0 8px;
}

.modal-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ededed;
  margin: 0 0 14px;
}

.modal-desc {
  font-size: 0.875rem;
  color: #888;
  line-height: 1.65;
  margin: 0;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal-card,
.modal-leave-active .modal-card {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-card,
.modal-leave-to .modal-card {
  transform: translateY(10px);
  opacity: 0;
}
</style>
