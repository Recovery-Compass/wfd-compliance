export type FeatureFlags = {
  dataStory: boolean;
  wallOfFame: boolean;
  badges: boolean;
  petLeaderboard: boolean;
  liveFeed: boolean;
};

const readBool = (v: string | undefined, fallback = false) => {
  if (v === undefined) return fallback;
  return /^(1|true|yes|on)$/i.test(v.trim());
};

export const featureFlags: FeatureFlags = {
  dataStory: readBool(import.meta.env.VITE_FEATURE_DATA_STORY),
  wallOfFame: readBool(import.meta.env.VITE_FEATURE_WALL_OF_FAME),
  badges: readBool(import.meta.env.VITE_FEATURE_BADGES),
  petLeaderboard: readBool(import.meta.env.VITE_FEATURE_PET_LEADERBOARD),
  liveFeed: readBool(import.meta.env.VITE_FEATURE_LIVE_FEED),
};

export const anyEngagementEnabled = Object.values(featureFlags).some(Boolean);
