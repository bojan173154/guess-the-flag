<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import type { CountryData } from '../data/interfaces';
import { statistics } from '../data/statistics';

const CountryBlock = defineAsyncComponent(() =>
    import('./CountryBlock.vue')
);
const RightArrow = defineAsyncComponent(() =>
    import('./RightArrow.vue')
);
const LeftArrow = defineAsyncComponent(() =>
    import('./LeftArrow.vue')
);

withDefaults(defineProps<{
    selectedCountry: CountryData;
}>(), {
    selectedCountry: () => ({
        flag: '',
        showText: false,
        code: '',
        country: ''
    })
});

const isQuizPlaying = ref<boolean>(statistics.getIsQuizPlaying());

const handleStartPlaying = () => {
    statistics.startPlaying();
    isQuizPlaying.value = statistics.getIsQuizPlaying();
};
</script>

<template>
    <div id="quiz-header">
        <div v-if="!isQuizPlaying" id="non-playing-header" @click="handleStartPlaying">
            <button id="play-quiz-button">
                PLAY QUIZ
            </button>
        </div>

        <div v-else id="playing-header">
            <country-block :country="selectedCountry" :is-selected="false"/>

            <div id="control-field">
                <left-arrow />

                <input type="text">

                <right-arrow />
            </div>
        </div>
    </div>
</template>

<style scoped>
#quiz-header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 50px;
}

#non-playing-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#play-quiz-button {
    border-radius: 10px;
    background-color: purple;
    color: #ffffff;
    width: 300px;
    font-weight: 700;
    height: 50px;
    cursor: pointer;
}

#playing-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

#control-field {
    display: flex;
    gap: 5px;
}
</style>
