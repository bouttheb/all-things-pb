import type { Platform } from "@/types";

interface PlatformConfig {
  name: string;
  color: string;
  bgClass: string;
  textClass: string;
}

export const PLATFORMS: Record<Platform, PlatformConfig> = {
  youtube: {
    name: "YouTube",
    color: "#FF0000",
    bgClass: "bg-red-600",
    textClass: "text-red-600",
  },
  instagram: {
    name: "Instagram",
    color: "#E4405F",
    bgClass: "bg-pink-500",
    textClass: "text-pink-500",
  },
  podcast: {
    name: "Podcasts",
    color: "#9933FF",
    bgClass: "bg-purple-600",
    textClass: "text-purple-600",
  },
  spotify: {
    name: "Music",
    color: "#1DB954",
    bgClass: "bg-green-500",
    textClass: "text-green-500",
  },
};

export const PLATFORM_LIST: Platform[] = [
  "youtube",
  "instagram",
  "podcast",
  "spotify",
];
