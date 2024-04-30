<script setup lang="ts">
import { onBeforeMount } from 'vue';

import useCountries from './composable/useCountryData';

import { deepEqual } from './services/utility';

import type { CountryData } from './data/interfaces';

import CountryBlock from './components/CountryBlock.vue';
import QuizHeader from './components/QuizHeader.vue';

const {
    countries,
    fetchCountries,
    selectedCountry,
    modifyUnguessedCountries,
    handleCountryChange
} = useCountries();

onBeforeMount(async () => {
    await fetchCountries();
    selectedCountry.value = countries.value[0];
});

const handleCardClick = (country: CountryData): void => {
    selectedCountry.value = country;
};

const handleCorrectGuess = (country: CountryData): void => {
    const correctCountry = countries
        .value
        .find(foundCountry => foundCountry.code === country.code);

    if (correctCountry) {
        correctCountry.showText = true;
        modifyUnguessedCountries(correctCountry);
    }

    handleCountryChange('right');
};
</script>

<template>
    <quiz-header
        :selected-country="selectedCountry"
        :total-number-of-countries="countries.length"
        @handle-arrow-click="handleCountryChange"
        @handle-correct-guess="handleCorrectGuess"
    />

    <div id="container">
        <div class="row">
            <country-block
                v-for="country in countries"
                :key="country.code"
                :country="country"
                :is-selected="deepEqual(country, selectedCountry)"
                @handle-card-click="handleCardClick"
            />
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    overflow-x: auto;
}

.row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.card {
    flex: 1 0 calc(20% - 20px);
    padding: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

@media (max-width: 1200px) {
    .card {
        flex: 1 0 calc(33.33% - 20px);
    }
}

@media (max-width: 600px) {
    .card {
        flex: 1 0 calc(100% - 20px);
    }
}
</style>
