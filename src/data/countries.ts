import type { CountryData } from './interfaces';

export class Countries {
    countries: CountryData[];

    constructor () {
        this.countries = [];
        this.asyncConstructor();
    }

    async asyncConstructor (): Promise<void> {
        await this.fetchCountries();
    }

    async fetchCountries (): Promise<void> {
        try {
            const response = await fetch('../../public/data.json');
            const data: CountryData[] = await response.json();
            this.countries = this.randomizeCountriesData(data);
        } catch (e) {
            console.error(e);
        }
    }

    randomizeCountriesData (countries: CountryData[]): CountryData[] {
        return countries.sort(() => Math.random() - 0.5);
    }
}
