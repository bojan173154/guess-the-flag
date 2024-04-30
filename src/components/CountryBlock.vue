<script setup lang="ts">
import type { CountryData } from '../data/interfaces';

const props = defineProps<{
    country: CountryData;
    isSelected: boolean;
}>();
const emit = defineEmits<{
    handleCardClick: [CountryData]
}>();

const handleCardClick = (): void => {
    if (props.country.showText) {
        return;
    }

    emit('handleCardClick', props.country);
};
</script>

<template>
    <div
        class="container-card"
        :class="{ 'selected-background': isSelected, 'correct-country': country.showText }"
        @click="handleCardClick"
    >
        <img :src="country.flag">
        <span v-if="country.showText">{{ country.country }}</span>
    </div>
</template>

<style scoped>
.container-card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100px;
    padding: 50px;
    border: 1px solid #000000;
    cursor: pointer;
}
.selected-background {
    background-color: #d9b99b;
    cursor: auto;
}
.correct-country {
    background-color: aquamarine;
}
</style>
