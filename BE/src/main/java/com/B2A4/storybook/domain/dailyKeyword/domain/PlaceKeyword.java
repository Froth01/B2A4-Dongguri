package com.B2A4.storybook.domain.dailyKeyword.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Random;

@Getter
@AllArgsConstructor
public enum PlaceKeyword {
    SEA("바다"),
    SKY("하늘"),
    PARK("공원"),
    FOREST("숲"),
    MOUNTAIN("산"),
    LAKE("호수"),
    FARM("농장"),
    GARDEN("정원"),
    SANDY_BEACH("모래사장"),
    RIVER("강"),
    HILL("언덕"),
    WATERFALL("폭포"),
    CAVE("동굴"),
    CLOUDS("구름"),
    ISLAND("섬"),
    DESERT("사막"),
    TOWN("마을"),
    WINDY_FIELD("바람이 부는 들판"),
    SNOW_COVERED_MOUNTAIN("눈 덮인 산"),
    BEACH("해변"),
    RAINBOW_SPOT("무지개가 뜨는 곳"),
    VALLEY("계곡"),
    HOUSE("집");

    private final String type;

    public static PlaceKeyword getRandomKeyword() {
        Random random = new Random();
        PlaceKeyword[] values = PlaceKeyword.values();
        return values[random.nextInt(values.length)];
    }
}
