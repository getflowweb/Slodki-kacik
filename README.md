# 🍰 Słodki Kącik - Cukiernia Rzemieślnicza

Nowoczesna strona wizytówka dla cukierni, zmigrowana z statycznego HTML do **React + TypeScript**. Projekt wykorzystuje **Vite** dla błyskawicznego ładowania oraz **Tailwind CSS** dla stylizacji.

![Słodki Kącik Preview](https://imgur.com/a/DGO1zUV)

## 🚀 Technologie

* **React 18** - Biblioteka interfejsu użytkownika.
* **TypeScript** - Bezpieczeństwo typów i lepsze podpowiadanie kodu.
* **Vite** - Narzędzie budujące (następca Webpacka), zapewniające bardzo szybki start serwera.
* **Tailwind CSS** - Framework CSS utility-first.
* **FontAwesome** - Ikony (ładowane przez CDN).

## ✨ Funkcjonalności

* 🛒 **Interaktywny Koszyk** - Dodawanie produktów, zmiana ilości, usuwanie, obliczanie sumy w czasie rzeczywistym.
* 📱 **Responsywność (RWD)** - Strona wygląda świetnie na telefonach, tabletach i desktopach.
* 📜 **Smooth Scroll** - Płynne przewijanie do sekcji (Menu, Kontakt, etc.).
* 🔔 **System Powiadomień (Toasts)** - Komunikaty o dodaniu do koszyka lub wysłaniu formularza.
* 📝 **Formularz Zamówień** - Walidacja i symulacja wysyłki zamówienia na tort.

## 🛠️ Instalacja i Uruchomienie

Aby uruchomić projekt lokalnie, musisz mieć zainstalowane [Node.js](https://nodejs.org/).

1.  **Sklonuj lub pobierz projekt:**
    Wypakuj pliki do folderu.

2.  **Zainstaluj zależności:**
    Otwórz terminal w folderze projektu i wpisz:
    ```bash
    npm install
    ```

3.  **Uruchom serwer developerski:**
    ```bash
    npm run dev
    ```
    Strona będzie dostępna pod adresem: `http://localhost:5173`

## 📂 Struktura Projektu

Układ plików w Twoim projekcie:

STRONA-2/
├── node_modules/      # Zainstalowane biblioteki (React, Vite, itp.)
├── src/
│   ├── App.tsx        # Główny kod aplikacji (komponenty i logika)
│   ├── global.css     # Style globalne i konfiguracja Tailwind
│   └── main.tsx       # Punkt wejścia (podłączenie Reacta do HTML)
├── index.html         # Główny plik strony (szablon)
├── package.json       # Lista zależności i skrypty uruchomieniowe
├── postcss.config.js  # Konfiguracja przetwarzania CSS (dla Tailwind)
├── tailwind.config.js # Konfiguracja motywu (kolory, czcionki)
├── tsconfig.json      # Ustawienia kompilatora TypeScript
└── README.md          # Ten plik z dokumentacją