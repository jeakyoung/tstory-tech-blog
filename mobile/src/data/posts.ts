import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "Mastering CSS Grid: A Comprehensive Guide",
        excerpt: "CSS Grid has revolutionized web layout. In this deep dive, we explore advanced techniques, subgrid, and how to build complex responsive interfaces.",
        date: "Dec 24, 2025",
        category: "Web Dev",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        featured: true
    },
    {
        id: 2,
        title: "React Server Components: The Good, The Bad",
        excerpt: "An honest look at the current state of RSCs and when you should actually use them in your production applications.",
        date: "Dec 22, 2025",
        category: "React",
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        featured: false
    },
    {
        id: 3,
        title: "Dockerizing a Node.js App: Best Practices",
        excerpt: "Learn how to create efficient, secure, and production-ready Docker images for your Node.js microservices.",
        date: "Dec 20, 2025",
        category: "DevOps",
        image: "https://images.unsplash.com/photo-1607799275518-d58665d099db?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        featured: false
    },
    {
        id: 4,
        title: "Python 3.14: What's New?",
        excerpt: "Exploring the latest features, performance improvements, and syntax changes in the upcoming Python release.",
        date: "Dec 18, 2025",
        category: "Python",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        featured: false
    }
];
