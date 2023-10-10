export {}

declare module 'flowbite/plugin'

declare global {
    interface Window {
        recaptchaVerifier: any // 👈️ turn off type checking
    }
}
