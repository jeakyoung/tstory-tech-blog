package com.pokelog.backend.repository;

import com.pokelog.backend.model.Post;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class PostRepository {
    
    // In-memory mock database
    private List<Post> posts = new ArrayList<>();

    public PostRepository() {
        // Init with some dummy data
        posts.add(new Post(1L, "Mastering CSS Grid", "Deep dive into CSS Grid.", "Dec 24, 2025", "Web Dev", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3", true));
        posts.add(new Post(2L, "React Server Components", "RSC best practices.", "Dec 22, 2025", "React", "https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3", false));
        posts.add(new Post(3L, "Dockerizing Node.js", "Efficient Docker builds.", "Dec 20, 2025", "DevOps", "https://images.unsplash.com/photo-1607799275518-d58665d099db?ixlib=rb-4.0.3", false));
        posts.add(new Post(4L, "Python 3.14 Features", "New in Python.", "Dec 18, 2025", "Python", "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3", false));
    }

    public List<Post> findAll() {
        return posts;
    }

    public Optional<Post> findById(Long id) {
        return posts.stream().filter(p -> p.getId().equals(id)).findFirst();
    }
    
    public Post save(Post post) {
        posts.add(post);
        return post;
    }
}
