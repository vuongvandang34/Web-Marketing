import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        local_seo: resolve(__dirname, 'services/local-seo.html'),
        review_protection: resolve(__dirname, 'services/review-protection.html'),
        local_ads: resolve(__dirname, 'services/local-ads.html'),
        profile_setup: resolve(__dirname, 'services/profile-setup.html'),
        case_studies: resolve(__dirname, 'case-studies.html'),
        blog: resolve(__dirname, 'blog.html'),
        blog_fake_reviews: resolve(__dirname, 'blog/how-to-remove-fake-reviews.html'),
        blog_rank_higher: resolve(__dirname, 'blog/how-to-rank-higher-google-maps.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
