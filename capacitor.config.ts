import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.55c7ec796e244cac9ac72c8d5f5018a5',
  appName: 'wfd-sunrise-path',
  webDir: 'dist',
  server: {
    url: "https://55c7ec79-6e24-4cac-9ac7-2c8d5f5018a5.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
      backgroundColor: "#4A148C"
    }
  }
};

export default config;