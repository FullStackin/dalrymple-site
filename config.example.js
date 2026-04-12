// ╔══════════════════════════════════════════════════════╗
// ║  DALRYMPLE TEAM — API CONFIGURATION TEMPLATE        ║
// ║  Copy this file to config.js and fill in your keys  ║
// ║  config.js is gitignored — this file is safe to     ║
// ║  commit to GitHub                                    ║
// ╚══════════════════════════════════════════════════════╝

const CONFIG = {
  // Repliers MLS API key — get yours at repliers.io
  // Ask Repliers support for a CSR (client-side) key for better security
  REPLIERS_API_KEY: "YOUR_REPLIERS_API_KEY_HERE",
  REPLIERS_CLIENT_SIDE: false,

  // Mapbox public token — get yours at mapbox.com
  // After getting your token, restrict it to your domain at mapbox.com/account/tokens
  MAPBOX_TOKEN: "YOUR_MAPBOX_TOKEN_HERE",

  // Default map center [longitude, latitude]
  MAP_CENTER: [-121.9496, 37.2872],
  MAP_ZOOM: 10,

  // Cities to search when no location is typed
  TARGET_CITIES: [
    "Palo Alto","Los Altos Hills","Saratoga","Menlo Park",
    "Atherton","Los Gatos","Cupertino","Monte Sereno",
    "Campbell","Los Altos","Santa Clara","Sunnyvale"
  ],
};
