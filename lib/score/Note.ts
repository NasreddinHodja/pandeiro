import { StaveNote, Stem, type ElementStyle, Articulation } from "vexflow";

const defaultStyle: ElementStyle = {
  fillStyle: "white",
  strokeStyle: "white",
};

type NoteDuration = "1" | "2" | "4" | "8" | "16" | "32";

/* Notes:
  First 2 chars is the note. 
  Third char is (u)p or (d)own.

  grd / gru: grave
  gad / gau: grave abafado
  pld / plu: platinela 
  tad / tau: tapa
  gsd / gsu: grave seco
*/
type NoteKey = "grd" | "gru" | "gad" | "gau" | "pld" | "plu" | "tad" | "tau" | "gsd" | "gsu";

const noteToVex: Record<NoteKey, string> = {
  grd: "e/5",
  gru: "g/5",
  gad: "e/5/cx",
  gau: "g/5/cx",
  pld: "e/5/di",
  plu: "g/5/di",
  tad: "e/5/x",
  tau: "g/5/x",
  gsd: "e/5/cx",
  gsu: "g/5/cx",
};

export class Note extends StaveNote {
  constructor(key: NoteKey, duration: NoteDuration) {
    super({
      keys: [noteToVex[key]],
      duration,
      stemDirection: Stem.DOWN,
    });

    this.setStyle(defaultStyle);

    if (key.substring(0, 3) === "gs") {
      this.addModifier(new Articulation("a^"));
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
