export function useCountry(): string {
    const lang = navigator.language; 
    return lang.split('-')[1]?.toUpperCase() || 'DEFAULT';
}
