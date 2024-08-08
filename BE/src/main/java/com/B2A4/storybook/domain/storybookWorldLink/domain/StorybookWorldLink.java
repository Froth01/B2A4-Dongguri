package com.B2A4.storybook.domain.storybookWorldLink.domain;

import com.B2A4.storybook.domain.storyWorld.domain.StoryWorld;
import com.B2A4.storybook.domain.storybook.domain.Storybook;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class StorybookWorldLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "storybook_world_link_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "storybook_id")
    private Storybook storybook;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "story_world_id")
    private StoryWorld storyWorld;


    @Builder
    public StorybookWorldLink(Storybook storybook, StoryWorld storyWorld) {
        this.storybook = storybook;
        this.storyWorld = storyWorld;
    }

    public static StorybookWorldLink createStorybook(Storybook storybook, StoryWorld storyWorld) {
        return builder()
                .storybook(storybook)
                .storyWorld(storyWorld)
                .build();
    }
}
