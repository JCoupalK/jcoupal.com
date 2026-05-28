<template>
  <div class="page-container">

    <div class="page-header">
      <h2>Blog</h2>
      <div class="tab-bar">
        <button
          v-for="(tab, key) in tabs"
          :key="key"
          class="tab-btn"
          :class="{ active: activeTab === key }"
          @click="switchTab(key)"
        >{{ tab.label }}</button>
      </div>
      <p class="tab-desc" v-html="current.description"></p>
    </div>

    <div v-if="current.loading" class="loading">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>

    <div v-else-if="current.error" class="error-state">
      <p>Could not load posts. The feed may be temporarily unavailable.</p>
      <button @click="retry">Try again</button>
    </div>

    <template v-else>
      <div class="filter-bar" v-if="current.allCategories.length > 2">
        <button
          v-for="category in current.allCategories"
          :key="category"
          :class="{ active: current.selectedCategory === category }"
          @click="current.selectedCategory = category"
        >{{ category }}</button>
      </div>

      <div class="posts-list">
        <a
          class="post"
          v-for="(post, i) in filteredPosts"
          :key="post.guid"
          :href="post.link"
          target="_blank"
          rel="noopener noreferrer"
          :style="{ animationDelay: (i * 0.05) + 's' }"
        >
          <div class="post-body">
            <h3>{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.shortContent }}</p>
          </div>
          <div class="post-footer">
            <span class="post-date">{{ post.formattedPubDate }}</span>
            <div class="post-categories">
              <span v-for="cat in post.categories" :key="cat">{{ cat }}</span>
            </div>
          </div>
        </a>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'personal',
      tabs: {
        personal: {
          label: 'Personal',
          description: 'Personal posts on <a href="https://jcoupalk.medium.com" target="_blank">Medium</a> covering tech, engineering, and open source.',
          url: 'https://cors-anywhere.jcoupal.com/https://jcoupalk.medium.com/feed',
          posts: [], allCategories: [], selectedCategory: 'All',
          loading: false, error: false, loaded: false,
        },
        keepsec: {
          label: 'KeepSec',
          description: 'Cloud infrastructure insights and updates from <a href="https://www.keepsec.ca/blog" target="_blank">KeepSec Blog</a>.',
          url: 'https://cors-anywhere.jcoupal.com/https://www.keepsec.ca/blog/rss',
          posts: [], allCategories: [], selectedCategory: 'All',
          loading: false, error: false, loaded: false,
        },
        vullify: {
          label: 'Vullify',
          description: 'Security insights and updates from <a href="https://vullify.com/blog" target="_blank">Vullify Blog</a>.',
          url: 'https://cors-anywhere.jcoupal.com/https://vullify.com/blog/rss',
          posts: [], allCategories: [], selectedCategory: 'All',
          loading: false, error: false, loaded: false,
        },
      },
    };
  },
  computed: {
    current() {
      return this.tabs[this.activeTab];
    },
    filteredPosts() {
      const tab = this.current;
      if (tab.selectedCategory === 'All') return tab.posts;
      return tab.posts.filter(p => p.categories.includes(tab.selectedCategory));
    },
  },
  mounted() {
    this.fetchPosts('personal');
  },
  methods: {
    switchTab(key) {
      this.activeTab = key;
      if (!this.tabs[key].loaded) this.fetchPosts(key);
    },
    retry() {
      this.fetchPosts(this.activeTab);
    },
    async fetchPosts(key) {
      const tab = this.tabs[key];
      tab.error = false;
      tab.loading = true;
      try {
        const response = await fetch(tab.url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        tab.posts = this.parseRSSFeed(text);
        tab.allCategories = ['All', ...new Set(tab.posts.flatMap(p => p.categories))];
        tab.loaded = true;
      } catch (err) {
        console.error(`Error fetching ${key} blog posts:`, err);
        tab.error = true;
      } finally {
        tab.loading = false;
      }
    },
    parseRSSFeed(rssText) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(rssText, "application/xml");
      return Array.from(xmlDoc.querySelectorAll("item")).map(item => {
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        const guid = item.querySelector("guid").textContent;
        const pubDate = item.querySelector("pubDate").textContent;
        const categories = Array.from(item.querySelectorAll("category")).map(c => c.textContent);
        const encodedEl = item.getElementsByTagNameNS("http://purl.org/rss/1.0/modules/content/", "encoded")[0];
        const encoded = encodedEl ? encodedEl.textContent : '';
        return {
          title, link, guid,
          formattedPubDate: this.formatPubDate(pubDate),
          categories,
          shortContent: this.createShortContent(encoded),
        };
      });
    },
    formatPubDate(str) {
      return new Date(str).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    },
    createShortContent(html) {
      const div = document.createElement("div");
      div.innerHTML = html;
      const p = div.querySelector("p");
      return p ? p.textContent.slice(0, 160) + "…" : div.textContent.slice(0, 200) + "…";
    },
  },
};
</script>

<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes blink {
  0%, 80%, 100% { opacity: 0; }
  40%           { opacity: 1; }
}

.page-container {
  max-width: 760px;
  margin: 0 auto;
  padding: 60px 24px 80px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeUp 0.6s ease both;
}

.page-header h2 {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #4DBA87;
  margin: 0 0 20px;
}

.tab-desc {
  margin: 14px 0 0;
  color: #aaa;
  font-size: 0.9rem;
}

.tab-desc :deep(a) {
  color: #4DBA87;
  text-decoration: none;
}

.tab-desc :deep(a:hover) {
  text-decoration: underline;
}

/* Tab switcher */
.tab-bar {
  display: inline-flex;
  gap: 0;
  border: 1px solid #333;
  border-radius: 24px;
  padding: 3px;
}

.tab-btn {
  cursor: pointer;
  padding: 6px 20px;
  background: transparent;
  border: none;
  border-radius: 20px;
  color: #666;
  font-size: 0.85rem;
  font-family: inherit;
  transition: background 0.2s ease, color 0.2s ease;
}

.tab-btn:hover {
  color: #aaa;
}

.tab-btn.active {
  background: #4DBA87;
  color: #1c1c1c;
  font-weight: 600;
}

/* Loading */
.loading {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 60px 0;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4DBA87;
  animation: blink 1.4s infinite both;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

/* Error */
.error-state {
  text-align: center;
  padding: 60px 0;
  color: #666;
  font-size: 0.9rem;
}

.error-state button {
  margin-top: 14px;
  cursor: pointer;
  padding: 7px 20px;
  border: 1px solid #4DBA87;
  background: transparent;
  color: #4DBA87;
  border-radius: 20px;
  font-size: 0.85rem;
  font-family: inherit;
  transition: background 0.2s ease, color 0.2s ease;
}

.error-state button:hover {
  background: #4DBA87;
  color: #1c1c1c;
}

/* Filter */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
  animation: fadeUp 0.5s 0.1s ease both;
}

.filter-bar button {
  cursor: pointer;
  padding: 5px 14px;
  border: 1px solid #333;
  background: transparent;
  color: #aaa;
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: inherit;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.filter-bar button:hover,
.filter-bar button.active {
  border-color: #4DBA87;
  color: #4DBA87;
  background: rgba(77, 186, 135, 0.08);
}

/* Posts */
.posts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.post {
  display: block;
  background: #1e1e1e;
  border-left: 3px solid transparent;
  border-radius: 8px;
  padding: 20px 24px;
  text-decoration: none;
  color: #ededed;
  opacity: 0;
  animation: fadeUp 0.4s ease both;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.post:hover {
  background: #242424;
  border-left-color: #4DBA87;
  transform: translateX(4px);
}

.post-body h3 {
  margin: 0 0 8px;
  font-size: 1rem;
  color: #ededed;
  transition: color 0.2s ease;
}

.post:hover .post-body h3 {
  color: #4DBA87;
}

.post-excerpt {
  margin: 0 0 16px;
  font-size: 0.875rem;
  color: #888;
  line-height: 1.6;
}

.post-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.post-date {
  font-size: 0.75rem;
  color: #555;
}

.post-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.post-categories span {
  font-size: 0.7rem;
  padding: 2px 10px;
  border: 1px solid #333;
  border-radius: 20px;
  color: #666;
}
</style>
