// Image URLs are resolved against Vite's base path so they work both at the
// site root (dev / base "/") and when the site is served from a sub-path such
// as "/Landing/" (built with `vite build --base=/Landing/`).
// import.meta.env.BASE_URL always ends with a trailing slash.
const base = import.meta.env.BASE_URL;

export const photos = {
  heroDancer: `${base}images/2BF427D7-1DF6-43EA-95D0-531B3932FAD1.png`,
  podiumBg: `${base}images/background.png`,
  appHome: `${base}images/WorkoutStart.png`,
  workout: `${base}images/workout.png`,
  founderPortrait: `${base}images/The%20Barbell%20Ballerina%20by%20Mycah%20Bain%20Photography-18.JPG`,
  logo: `${base}images/logo.png`,
  effortlessExtensions: `${base}images/effortlessextensions.png`,
  turnLikeAnAthlete: `${base}images/turnlikeanathlete.png`,
  jumpersEdge: `${base}images/jumpersedge.png`,
  stageReady: `${base}images/stageready.png`,
  bulletproofBody: `${base}images/bulletproofbody.png`,
};
