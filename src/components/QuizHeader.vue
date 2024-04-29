<script setup lang="ts">
import { ref, defineAsyncComponent, watch } from 'vue';
import type { CountryData } from '../data/interfaces';

const CountryBlock = defineAsyncComponent(() =>
    import('./CountryBlock.vue')
);
const RightArrow = defineAsyncComponent(() =>
    import('./RightArrow.vue')
);
const LeftArrow = defineAsyncComponent(() =>
    import('./LeftArrow.vue')
);

const props = withDefaults(defineProps<{
    selectedCountry?: CountryData;
    totalNumberOfCountries: number;
}>(), {
    selectedCountry: () => ({
        flag: '',
        showText: false,
        code: '',
        country: ''
    })
});

const emit = defineEmits<{
    handleArrowClick: ['right' | 'left'],
    handleCorrectGuess: [CountryData],
    timeFinish: [void]
}>();

const isQuizPlaying = ref<boolean>(false);
const score = ref<number>(0);
const guess = ref<string>('');
const remainingTimeInSeconds = ref<number>(0);
const remainingTimeInMinutes = ref<number>(20);

const timer = setInterval(() => {
    if (remainingTimeInSeconds.value && remainingTimeInMinutes) {
        remainingTimeInSeconds.value--;
    } else if (!remainingTimeInSeconds.value && remainingTimeInMinutes) {
        remainingTimeInMinutes.value--;
        remainingTimeInSeconds.value = 59;
    } else if (!remainingTimeInMinutes.value) {
        clearInterval(timer);
        emit('timeFinish');
    }
}, 1000);

const handleStartPlaying = () => {
    isQuizPlaying.value = true;
};

watch(() => guess.value, () => {
    if (guess.value === props.selectedCountry.country.toLowerCase()) {
        score.value += score.value + 1;
        guess.value = '';
        emit('handleCorrectGuess', props.selectedCountry);
    }
});
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
                <left-arrow  @click="emit('handleArrowClick', 'left')"/>
                <input v-model="guess" type="text">
                <right-arrow @click="emit('handleArrowClick', 'right')" />
            </div>

            <div id="score">
                <span>
                    {{ score }}
                </span>
                <span>
                    /
                </span>
                <span>
                    {{ totalNumberOfCountries }}
                </span>
            </div>

            <div id="timer">
                {{ remainingTimeInMinutes }} : {{ remainingTimeInSeconds }}
            </div>
        </div>
    </div>
</template>

<style scoped>
#quiz-header {
    display: flex;
    width: 100%;
    align-items: center;
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
    gap: 200px;
}

#control-field {
    display: flex;
    gap: 5px;
}

#score {
    display: flex;
    gap: 10px;
    font-size: xxx-large;
}

#timer {
    font-size: xxx-large;
}
</style>
