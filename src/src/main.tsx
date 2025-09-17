/**
 * Main entry point for the NovaNews Progressive Web App.
 * Sets up React rendering, PWA functionality, and global error handling.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";

/**
 * Initialize the React application with error boundaries and PWA support.
 * Includes toast notifications, service worker registration, and push notification setup.
 */
function initializeApp() {
  // Get the root element where React will mount
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error(
      "Root element not found. Unable to initialize React application.",
    );
  }

  // Create React root and render the application
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
        toastOptions={{
          duration: 4000,
          style: {
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
          },
        }}
      />
    </React.StrictMode>,
  );

  // Initialize PWA features after React app renders
  initializePWAFeatures();
}

/**
 * Initialize Progressive Web App features including service worker and push notifications.
 * Handles service worker registration and sets up push notification foundation.
 */
function initializePWAFeatures() {
  // Register service worker if supported
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // Setup push notification capability
          setupPushNotifications(registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

  // Setup app install prompt handling
  setupInstallPrompt();
}

/**
 * Setup push notification foundation for future implementation.
 * Prepares the infrastructure for NovaNews push notifications as per guidelines.
 * 
 * @param {ServiceWorkerRegistration} registration - Service worker registration
 */
function setupPushNotifications(registration: ServiceWorkerRegistration) {
  // Check if push messaging is supported
  if (!('PushManager' in window)) {
    console.warn('Push messaging not supported');
    return;
  }

  // Store registration for later use when implementing push notifications
  (window as any).swRegistration = registration;
  
  // Future implementation: This is where push subscription setup would go
  // according to the push notification brief in Guidelines.md Section 16
  console.log('Push notification infrastructure ready');
}

/**
 * Setup app install prompt handling for PWA installation.
 * Manages the beforeinstallprompt event for custom install UI.
 */
function setupInstallPrompt() {
  let deferredPrompt: any;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Store the prompt for use in the app
    (window as any).deferredPrompt = deferredPrompt;
    
    console.log('PWA install prompt ready');
  });

  // Handle successful app installation
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    deferredPrompt = null;
    (window as any).deferredPrompt = null;
  });
}

// Global error handler for unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  // Prevent the default browser behavior of logging to console
  event.preventDefault();
});

// Global error handler for runtime errors
window.addEventListener("error", (event) => {
  console.error("Runtime error:", event.error);
});

// Initialize the application
try {
  initializeApp();
} catch (error) {
  console.error("Failed to initialize application:", error);

  // Show a fallback error message if React fails to initialize
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        text-align: center;
        font-family: system-ui, -apple-system, sans-serif;
      ">
        <h1 style="color: #c32026; margin-bottom: 1rem;">NovaNews</h1>
        <p style="margin-bottom: 1rem;">Sorry, there was an error loading the application.</p>
        <button 
          onclick="window.location.reload()" 
          style="
            background: #003366;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            cursor: pointer;
          "
        >
          Reload Page
        </button>
      </div>
    `;
  }
}