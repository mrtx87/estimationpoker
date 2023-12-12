import {german} from "@/constants/language/de";
import {english} from "@/constants/language/en";

export const germanKey = 'de';
export const englishKey = 'en';

export class LanguageService {
    languages = LanguageService.initLanguageMap();
    t(key: string, langKey: 'de' | 'en', vars?: any) {
        return this.languages.get(langKey).texts[key];
    }

    private static initLanguageMap() {
        const map = new Map();
        map.set(germanKey, german);
        map.set(englishKey, english);
        return map;
    }

}

export const languageService  = new LanguageService();
