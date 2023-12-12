import {german} from "@/constants/language/de";
import {english} from "@/constants/language/en";

export const germanKey = 'de';
export const englishKey = 'en';

export class LanguageService {
    selectedLanguageKey: string | undefined;
    language: {
        key: string;
        texts: any;
    } | undefined;


    constructor(langKey: 'en' | 'de') {
        this.setLanguage(langKey);
    }

    setLanguage(langKey: 'en' | 'de') {
        this.selectedLanguageKey = langKey;
        this.language = this.getLanguageTexts();
    }

    getLanguageTexts() {
        return this.selectedLanguageKey === germanKey ? german : english;
    }

    t(key: string, vars?: any) {
        return this.language?.texts[key];
    }

}

export const languageService  = new LanguageService(germanKey);
