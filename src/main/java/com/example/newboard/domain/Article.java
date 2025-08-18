package com.example.newboard.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String content;

    public void update(String title, String content) {
        this.title = title;
        this.content = content;  //왜 얘는 지정해줬는지 찾아보세요
    }

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;  // 누가 쓴 글인지 알겠쬬? - User 테이블의 id 와 연결되는 외래키 컬럼
}
