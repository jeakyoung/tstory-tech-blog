package com.pokelog.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    private Long id;
    private String title;
    private String excerpt;
    private String date;
    private String category;
    private String image;
    private boolean featured;
}
