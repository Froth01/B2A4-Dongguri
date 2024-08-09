package com.B2A4.storybook.domain.dailyKeyword.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Random;

@Getter
@AllArgsConstructor
public enum CharacterKeyword {
    PRINCESS("공주"),
    PRINCE("왕자"),
    DRAGON("용"),
    FAIRY("요정"),
    WIZARD("마법사"),
    KNIGHT("기사"),
    MERMAID("인어"),
    SORCERESS("마녀"),
    ROBOT("로봇"),
    CAT("고양이"),
    DOG("강아지"),
    FAMILY("가족"),
    HARE("토끼");

    private final String type;

    public static CharacterKeyword getRandomKeyword() {
        Random random = new Random();
        CharacterKeyword[] values = CharacterKeyword.values();
        return values[random.nextInt(values.length)];
    }
}
