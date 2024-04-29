import type { CountryData } from './interfaces';

export class CountryCollection {
    countries: CountryData[];

    constructor () {
        this.countries = [];
        this.asyncConstructor();
    }

    async asyncConstructor () {
        await this.fetchCountries();
    }

    async fetchCountries () {
        try {
            const response = await fetch('../../public/data.json');
            const data: CountryData[] = await response.json();
            this.countries = this.randomizeCountryData(data);
        } catch (e) {
            console.error(e);
        }
    }

    randomizeCountryData (countries: CountryData[]) {
        return countries.sort(() => Math.random() - 0.5);
    }
}
