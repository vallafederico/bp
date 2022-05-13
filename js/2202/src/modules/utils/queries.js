/*
 * User Preferences and General Queries
 * From: https://drafts.csswg.org/mediaqueries-5/#mf-user-preferences
 */


const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
