import type { CountryData } from './interfaces';

export class Countries {
    private countries: CountryData[];
    private selectedCountry: CountryData;
    private unGuessedCountries: CountryData[];

    constructor () {
        this.countries = [];
        this.unGuessedCountries = [];
        this.selectedCountry = this.countries[0];
    }

    async fetchCountries (): Promise<void> {
        try {
            const response = await fetch('../../data.json');
            const data: CountryData[] = await response.json();
            this.countries = this.randomizeCountriesData(data);
            this.unGuessedCountries = this.countries;
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

    modifyUnguessedCountries (countryToRemove: CountryData): void {
        this.unGuessedCountries = this.unGuessedCountries
            .filter(country => country.code !== countryToRemove.code);
    }

    handleCountryChange (direction: 'left' | 'right'): void {
        const selectedCode = this.selectedCountry.code;
        const indexOfCurrentCountry = this.unGuessedCountries.findIndex(country => country.code === selectedCode);

        if (direction === 'left' && this.unGuessedCountries[indexOfCurrentCountry - 1]) {
            this.selectedCountry = this.unGuessedCountries[indexOfCurrentCountry - 1];
            return;
        }

        if (direction === 'right' && this.unGuessedCountries[indexOfCurrentCountry + 1]) {
            this.selectedCountry = this.unGuessedCountries[indexOfCurrentCountry + 1];
        }
    }
}
