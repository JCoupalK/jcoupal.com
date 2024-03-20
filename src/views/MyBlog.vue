<template>
  <div class="blog-container">
    <h2>My Blog</h2>
    <div class="categories">
      <button 
        v-for="category in categories" 
        :key="category" 
        @click="selectedCategory = category"
        :class="{ active: selectedCategory === category }">
        {{ category }}
      </button>
    </div>
    <div class="blog-posts">
      <div v-for="post in filteredPosts" :key="post.id">
        <router-link :to="`/blog/${post.id}`">{{ post.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyBlog',
  data() {
    return {
      selectedCategory: 'All',
      categories: ['All', 'Tech', 'Tutorials', 'Personal'],
      blogPosts: [
        { id: 1, title: 'Test 1', category: 'Tech' },
        { id: 2, title: 'Test 2', category: 'Personal' },
        // More posts...
      ],
    };
  },
  computed: {
    filteredPosts() {
      if (this.selectedCategory === 'All') {
        return this.blogPosts;
      }
      return this.blogPosts.filter(post => post.category === this.selectedCategory);
    }
  }
};
</script>

<style scoped>
.blog-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.categories button {
  margin-right: 10px;
  padding: 10px;
  background-color: #4DBA87;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.categories button.active, .categories button:hover {
  background-color: #357a5c;
}

.blog-posts {
  margin-top: 20px;
}

.blog-post {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  border-radius: 8px;
}
</style>
