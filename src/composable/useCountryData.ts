import { ref } from 'vue';

import type { CountryData } from '../data/interfaces';

export default () => {
    const countries = ref<CountryData[]>([]);
    const selectedCountry = ref<CountryData>(countries.value[0]);
    const unGuessedCountries = ref<CountryData[]>([]);

    const randomizeCountriesData = (countries: CountryData[]): CountryData[] => {
        return countries.sort(() => Math.random() - 0.5);
    };

    const fetchCountries = async (): Promise<void> => {
        try {
            const response = await fetch('../../data.json');
            const data: CountryData[] = await response.json();
            countries.value = randomizeCountriesData(data);
            unGuessedCountries.value = countries.value;
        } catch (e) {
            console.error(e);
        }
    };

    const modifyUnguessedCountries = (countryToRemove: CountryData): void => {
        unGuessedCountries.value = unGuessedCountries.value
            .filter(country => country.code !== countryToRemove.code);
    };

    const handleCountryChange = (direction: 'left' | 'right') => {
        const selectedCode = selectedCountry.value.code;
        const indexOfCurrentCountry = unGuessedCountries.value.findIndex(country => country.code === selectedCode);

        if (direction === 'left' && unGuessedCountries.value[indexOfCurrentCountry - 1]) {
            selectedCountry.value = unGuessedCountries.value[indexOfCurrentCountry - 1];
            return;
        }

        if (direction === 'right' && unGuessedCountries.value[indexOfCurrentCountry + 1]) {
            selectedCountry.value = unGuessedCountries.value[indexOfCurrentCountry + 1];
        }
    };

    return {
        countries,
        selectedCountry,
        fetchCountries,
        modifyUnguessedCountries,
        handleCountryChange
    };
};
