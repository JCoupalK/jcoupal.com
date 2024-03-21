<template>
  <div class="blog-container">
    <h2>Blog Posts</h2>
    <div class="category-filter">
      <button
        v-for="category in allCategories"
        :key="category"
        @click="selectedCategory = category"
        :class="{ active: selectedCategory === category }">
        {{ category }}
      </button>
    </div>
    <br>
    <div class="post" v-for="post in filteredPosts" :key="post.guid">
      <h3><a :href="post.link" target="_blank" rel="noopener noreferrer">{{ post.title }}</a></h3>
      <div v-html="post.shortContent" class="post-content"></div>
      <br>
      <div class="post-categories">
        <span v-for="category in post.categories" :key="category">{{ category }}</span>
      </div>
      <p class="post-meta">Published on {{ post.formattedPubDate }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      selectedCategory: 'All', 
      allCategories: [], 
    };
  },
  async mounted() {
    await this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      // Using cors-anywhere as a CORS proxy
      const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const mediumRssUrl = 'https://jcoupalk.medium.com/feed';
      const proxyUrl = `${corsProxyUrl}${mediumRssUrl}`;

      try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
        }
        const text = await response.text();
        this.posts = this.parseRSSFeed(text);
        this.allCategories = ['All', ...new Set(this.posts.flatMap(post => post.categories))];
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    },
    parseRSSFeed(rssText) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(rssText, "application/xml");
      const items = xmlDoc.querySelectorAll("item");
      const posts = [];

      items.forEach(item => {
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        const guid = item.querySelector("guid").textContent;
        const pubDate = item.querySelector("pubDate").textContent;
        const formattedPubDate = this.formatPubDate(pubDate);
        const categories = Array.from(item.querySelectorAll("category")).map(c => c.textContent);

        const contentEncodedElements = item.getElementsByTagNameNS("http://purl.org/rss/1.0/modules/content/", "encoded");
      let contentEncoded = "";
        contentEncoded = contentEncodedElements[0].textContent;
        const shortContent = this.createShortContent(contentEncoded);
        posts.push({ title, link, guid, shortContent, categories, formattedPubDate });
      });
      return posts;
    },
    formatPubDate(pubDateStr) {
      const date = new Date(pubDateStr);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },
    createShortContent(htmlContent) {
      const div = document.createElement("div");
      div.innerHTML = htmlContent;
      // Get text content for the first paragraph or a text slice
      const textContent = div.querySelector("p") ? div.querySelector("p").textContent.slice(0, 155) + "..." : div.textContent.slice(0, 200) + "...";
      return textContent;
    },
  },
  computed: {
      filteredPosts() {
        if (this.selectedCategory === 'All') {
          return this.posts;
        }
        return this.posts.filter(post => post.categories.includes(this.selectedCategory));
      }
    },
}
</script>

<style scoped>
.category-filter button {
  margin-right: 5px;
  background-color: #333;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.category-filter button.active, .category-filter button:hover {
  background-color: #4DBA87;
}

.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post {
  background-color: #1e1e1e;
  color: #e0e0e0;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.post:hover {
  background-color: #292929;
}

.post h3 a {
  color: #4DBA87;
  text-decoration: none;
}

.post-meta {
  margin-bottom: -0px;
}

.post-categories span {
  margin-right: 5px;
  background-color: #333;
  padding: 2px 5px;
  border-radius: 4px;
}

.post-categories span:hover {
  background-color: #4DBA87;
}
</style>
