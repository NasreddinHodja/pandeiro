import { StaveNote, Stem, type ElementStyle, Articulation } from "vexflow";

const defaultStyle: ElementStyle = {
  fillStyle: "white",
  strokeStyle: "white",
};

type NoteDuration = "1" | "2" | "4" | "8" | "16" | "32" | "1r" | "2r" | "4r" | "8r" | "16r" | "32r";

/* Notes:
  First 2 chars is the note. 
  Third char is (u)p or (d)own.

  grd / gru: grave
  gad / gau: grave abafado
  pld / plu: platinela 
  tad / tau: tapa
  gsd / gsu: grave seco
*/
export type NoteKey =
  | "grd"
  | "gru"
  | "gad"
  | "gau"
  | "pld"
  | "plu"
  | "tad"
  | "tau"
  | "gsd"
  | "gsu"
  | "rst";

const noteToVex: Record<NoteKey, string> = {
  grd: "a/4",
  gru: "c/5",
  gad: "a/4/cx",
  gau: "c/5/cx",
  pld: "a/4/di",
  plu: "c/5/di",
  tad: "a/4/x",
  tau: "c/5/x",
  gsd: "a/4/cx",
  gsu: "c/5/cx",
  rst: "a/4",
};

export type RawNote = {
  key: NoteKey;
  duration: NoteDuration;
  isAccent?: boolean;
  isGhost?: boolean;
  isRoll?: boolean;
};

export class Note extends StaveNote {
  constructor(rawNote: RawNote) {
    super({
      keys: [noteToVex[rawNote.key]],
      duration: rawNote.duration,
      stemDirection: Stem.DOWN,
    });

    this.setStyle(defaultStyle);

    if (rawNote.key.substring(0, 3) === "gs") {
      this.addModifier(new Articulation("a^"));
    }

    if (rawNote.isAccent) {
      this.addAccent();
    }
    if (rawNote.isGhost) {
      this.addGhost();
    }
    if (rawNote.isRoll) {
      this.addRoll();
    }
  }

  addAccent() {
    this.addModifier(new Articulation("a>"));
    return this;
  }

  addGhost() {
    this.addModifier(new Articulation("av"));
    return this;
  }

  addRoll() {
    this.addModifier(new Articulation("a-"));
    return this;
  }
}
