import type { CountryData } from './interfaces';

class Countries {
    private countries: CountryData[];
    private selectedCountry: CountryData;

    constructor () {
        this.countries = [];
        this.selectedCountry = this.countries[0];
    }

    async fetchCountries (): Promise<void> {
        try {
            const response = await fetch('../../data.json');
            const data: CountryData[] = await response.json();
            this.countries = this.randomizeCountriesData(data);
        } catch (e) {
            console.error(e);
        }
    }

    randomizeCountriesData (countries: CountryData[]): CountryData[] {
        return countries.sort(() => Math.random() - 0.5);
    }

    getCountries (): CountryData[] {
        return this.countries;
    }

    setSelectCountry (country: CountryData): void {
        this.selectedCountry = country;
    }
    getSelectedCountry (): CountryData {
        return this.selectedCountry;
    }
}

export const countriesData = new Countries();
