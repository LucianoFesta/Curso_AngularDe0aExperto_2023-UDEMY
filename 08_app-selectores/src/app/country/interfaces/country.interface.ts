export enum Region {
    Africa = 'Africa',
    Americas = 'Americas',
    Asia = 'Asia',
    Europe = 'Europe',
    Oceania = 'Oceania',
}

export interface SmallCountry {
    name: string;
    cca3: string;
    borders: string[];
}

export interface Country {
    name:         Name;
    cca3:         string;
    status:       Status;
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    region:       string;
    subregion:    Subregion;
    languages:    Languages;
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    borders?:     string[];
    area:         number;
    demonyms:     Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    gini?:        { [key: string]: number };
    fifa?:        string;
    car:          Car;
    timezones:    string[];
    continents:   string[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  StartOfWeek;
    capitalInfo:  CapitalInfo;
    postalCode?:  PostalCode;
}

export interface CapitalInfo {
    latlng: number[];
}

export interface Car {
    signs: string[];
    side:  Side;
}

export enum Side {
    Left = "left",
    Right = "right",
}

export interface CoatOfArms {
    png?: string;
    svg?: string;
}


export interface All {
    name:   string;
    symbol: string;
}

export interface BAM {
    name: string;
}

export interface Demonyms {
    eng:  Eng;
    fra?: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Flags {
    png:  string;
    svg:  string;
    alt?: string;
}

export interface Idd {
    root:     string;
    suffixes: string[];
}

export interface Languages {
    eng?: string;
    gle?: string;
    ell?: string;
    tur?: string;
    spa?: string;
    deu?: string;
    bul?: string;
    dan?: string;
    fao?: string;
    ron?: string;
    lit?: string;
    pol?: string;
    fra?: string;
    gsw?: string;
    ita?: string;
    roh?: string;
    swe?: string;
    isl?: string;
    lat?: string;
    ces?: string;
    slk?: string;
    bel?: string;
    rus?: string;
    nld?: string;
    bos?: string;
    hrv?: string;
    srp?: string;
    glv?: string;
    ukr?: string;
    por?: string;
    est?: string;
    sqi?: string;
    fin?: string;
    mkd?: string;
    mlt?: string;
    lav?: string;
    nfr?: string;
    slv?: string;
    nrf?: string;
    cnr?: string;
    cat?: string;
    de?:  string;
    hun?: string;
    nor?: string;
    nno?: string;
    nob?: string;
    smi?: string;
    ltz?: string;
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: Translation };
}

export interface Translation {
    official: string;
    common:   string;
}

export interface PostalCode {
    format: string;
    regex:  string;
}

export enum StartOfWeek {
    Monday = "monday",
}

export enum Status {
    OfficiallyAssigned = "officially-assigned",
    UserAssigned = "user-assigned",
}

export enum Subregion {
    CentralEurope = "Central Europe",
    EasternEurope = "Eastern Europe",
    NorthernEurope = "Northern Europe",
    SoutheastEurope = "Southeast Europe",
    SouthernEurope = "Southern Europe",
    WesternEurope = "Western Europe",
}
