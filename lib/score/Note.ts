import { StaveNote, Stem, type ElementStyle, Articulation } from "vexflow";

type NoteDuration = "1" | "2" | "4" | "8" | "16" | "32";

const defaultStyle: ElementStyle = {
  fillStyle: "white",
  strokeStyle: "white",
};

const createNote = (
  key: string,
  duration: NoteDuration,
  stem: number,
  style: ElementStyle = defaultStyle,
  articulation?: string
): StaveNote => {
  const note = new StaveNote({
    keys: [key],
    duration,
    stemDirection: stem,
  }).setStyle(style);

  if (articulation) {
    note.addModifier(new Articulation(articulation));
  }

  return note;
};

export const createGraveDown = (duration: NoteDuration, style?: ElementStyle) =>
  createNote("e/5", duration, Stem.DOWN, style);

export const createGraveUp = (duration: NoteDuration, style?: ElementStyle) =>
  createNote("g/5", duration, Stem.DOWN, style);

export const createGraveAbafadoDown = (duration: NoteDuration, style?: ElementStyle) =>
  createNote("e/5/cx", duration, Stem.DOWN, style);

export const createGraveAbafadoUp = (duration: NoteDuration, style?: ElementStyle) =>
  createNote("g/5/cx", duration, Stem.DOWN, style);

export const createPlatinelaDown = (duration: NoteDuration, style?: ElementStyle) =>
  createNote("e/5/di", duration, Stem.DOWN, style);

export const createPlatinelaUp = (duration: NoteDuration, style?: ElementStyle) =>
  createNote("g/5/di", duration, Stem.DOWN, style);

export const createTapaDown = (duration: NoteDuration, style?: ElementStyle) =>
  createNote("e/5/x", duration, Stem.DOWN, style);

export const createTapaUp = (duration: NoteDuration, style?: ElementStyle) =>
  createNote("g/5/x", duration, Stem.DOWN, style);

export const createGraveSecoDown = (duration: NoteDuration, style?: ElementStyle) =>
  createNote("e/5/cx", duration, Stem.DOWN, style, "a^");

export const createGraveSecoUp = (duration: NoteDuration, style?: ElementStyle) =>
  createNote("g/5/cx", duration, Stem.DOWN, style, "a^");

export const createAccent = () => new Articulation("a>");

export const createGhost = () => new Articulation("av");

export const createRoll = () => new Articulation("a-");
