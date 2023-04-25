import { Country } from "./country";

export interface CacheStore {
    byCapital: TermCountries,
    byCountry: TermCountries,
    byRegion: TermCountries
}

export interface TermCountries {
    term: string;
    countries: Country[];
}