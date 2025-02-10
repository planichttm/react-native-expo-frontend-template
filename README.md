# react-native-frontend-template
This is a template with **React Native, Expo, and Metro**. It also includes **login and registration screens** and a **Supabase service** for a quick setup. Additionally, it provides a **base folder structure**.

## 📌 Instructions How to Use It
### 1. Install Expo and Metro Runtime
```sh
npm install @expo/metro-runtime metro-runtime
```

## 📌 Auth Providers
### you can choose which providers you want to use in auth.config.ts by using the enabled flag for the providers
### if you like to use Google OAuth with Supabase you need to
#### 1) create a project at google https://console.cloud.google.com/
#### 2) configure google oauth at your project and use the supabase domain from your project
#### 3) activate Google OAuth in your supabase project and give it the client id and secret from google
#### 4) full tutorial here: https://www.youtube.com/watch?v=dE2vtnv83Fc
#### 5) delete account only prepared: you can implement the prepared method

## create .env file with your supabase api config
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=


# start your app
```sh
npx expo start --web
```