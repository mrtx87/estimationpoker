import {german} from "@/constants/language/de";
import {english} from "@/constants/language/en";

export const germanKey = 'de';
export const englishKey = 'en';

export class LanguageService {
    languages = LanguageService.initLanguageMap();

    // example use: tl8('validation.text.room.title2', ['40'])
    // example language text: 'validation.text.room.title': 'maximal {} Zeichen')
    t(key: string, langKey: 'de' | 'en', vars?: any[]) {
        if (vars) {
            let replacedText = this.languages.get(langKey).texts[key];
            vars.forEach(variable => {
                replacedText = replacedText.replace('{}', variable);
            });
            return replacedText;
        }
        return this.languages.get(langKey).texts[key];
    }

    private static initLanguageMap() {
        const map = new Map();
        map.set(germanKey, german);
        map.set(englishKey, english);
        return map;
    }

}

export const languageService = new LanguageService();
