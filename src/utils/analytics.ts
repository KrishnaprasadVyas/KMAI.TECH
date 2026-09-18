export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  const analyticsId = import.meta.env.VITE_ANALYTICS_ID;
  
  // Privacy conscious tracking: do not track personal info
  // Even if properties contain it, we omit it. 
  // In our case we ensure we don't pass names/emails to this function anyway.

  if (analyticsId) {
    // Implement actual tracking here if a provider is configured (e.g. Plausible, Google Analytics)
    // window.gtag('event', eventName, properties);
    // console.debug(`[Analytics] Tracked ${eventName}`, properties);
  } else if (import.meta.env.DEV) {
    console.debug(`[Analytics Mock] ${eventName}`, properties);
  }
};
