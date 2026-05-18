import VexFlow, {
  StaveNote,
  Stem,
  type ElementStyle,
  Articulation,
  Annotation,
  AnnotationHorizontalJustify,
  AnnotationVerticalJustify,
  Dot,
  Tremolo,
  Metrics,
} from "vexflow";

class AboveStemMark extends Articulation {
  draw() {
    const ctx = this.checkContext();
    const note = this.checkAttachedNote();
    this.setRendered();
    const { topY } = note.getStemExtents();
    const staffSpace = note.checkStave().getSpacingBetweenLines();
    this.x = note.getAbsoluteX() + note.getGlyphWidth() - Stem.WIDTH / 2;
    const isUpperNote = note.getKeys().some(k => k.startsWith("c/5"));
    this.y = isUpperNote ? topY - staffSpace * 1.2 : topY - staffSpace * 2.0;
    (this as any).renderText(ctx, 0, 0);
  }
}

class BuzzRoll extends Tremolo {
  draw() {
    const ctx = this.checkContext();
    const note = this.checkAttachedNote();
    this.setRendered();
    const stemDirection = note.getStemDirection();
    const scale = note.getFontScale();
    const ySpacing = (Metrics.get("Tremolo.spacing") as number) * stemDirection * scale;
    const x = note.getAbsoluteX() + (stemDirection === Stem.UP ? note.getGlyphWidth() - Stem.WIDTH / 2 : Stem.WIDTH / 2);
    const { baseY } = note.getStemExtents();
    let y = baseY - stemDirection * (Metrics.get("Tremolo.spacing") as number) * scale * 2;
    (this as any).fontInfo.size = (Metrics.get("Tremolo.fontSize") as number) * scale;
    for (let i = 0; i < (this as any).num; ++i) {
      (this as any).renderText(ctx, x, y);
      y += ySpacing;
    }
  }
}

const defaultStyle: ElementStyle = {
  fillStyle: "white",
  strokeStyle: "white",
};

export type NoteDuration =
  | "1"
  | "2"
  | "4"
  | "8"
  | "16"
  | "32"
  | "1r"
  | "2r"
  | "4r"
  | "8r"
  | "16r"
  | "32r";

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
  stem?: NoteDuration;
  isAccent?: boolean;
  isGhost?: boolean;
  isRoll?: boolean;
  isParenthesis?: boolean;
  isDotted?: boolean;
};

export class Note extends StaveNote {
  rawNote: RawNote;

  constructor(rawNote: RawNote) {
    super({
      keys: [noteToVex[rawNote.key]],
      duration: rawNote.stem ?? rawNote.duration,
      stemDirection: Stem.UP,
      dots: rawNote.isDotted ? 1 : 0,
    });

    this.rawNote = rawNote;

    this.setStyle(defaultStyle);

    if (rawNote.key.startsWith("pl")) {
      this.setKeyStyle(0, { fillStyle: "transparent", strokeStyle: "transparent" });
    }

    if (rawNote.stem) this.setIntrinsicTicks(ticksPerNoteDuration(rawNote.duration));

    if (rawNote.key.substring(0, 3) === "gs") {
      const art = new Articulation("a^");
      art.setStyle(defaultStyle);
      this.addModifier(art);
    }

    if (rawNote.isDotted) this.addDot();
    if (rawNote.isParenthesis) this.addParenthesis();

    if (rawNote.isAccent) this.addAccent();
    if (rawNote.isGhost) this.addGhost();
    if (rawNote.isRoll) this.addRoll();
  }

  addAccent() {
    const art = new AboveStemMark("a>");
    art.setStyle(defaultStyle);
    this.addModifier(art);
    return this;
  }

  addGhost() {
    const art = new AboveStemMark("av");
    art.setStyle(defaultStyle);
    this.addModifier(art);
    return this;
  }

  addRoll() {
    const roll = new BuzzRoll(1);
    roll.setStyle(defaultStyle);
    this.addModifier(roll, 0);
    return this;
  }

  addParenthesis() {
    const yShift = this.rawNote.key[2] === "u" ? -8 : 2;

    const leftParen = new Annotation("(")
      .setFont("Times", 14)
      .setJustification(AnnotationHorizontalJustify.LEFT)
      .setVerticalJustification(AnnotationVerticalJustify.CENTER)
      .setXShift(13)
      .setYShift(yShift);
    const rightParen = new Annotation(")")
      .setFont("Times", 14)
      .setJustification(AnnotationHorizontalJustify.LEFT)
      .setVerticalJustification(AnnotationVerticalJustify.CENTER)
      .setXShift(this.rawNote.isDotted ? -10 : -6)
      .setYShift(yShift);

    this.addModifier(leftParen);
    this.addModifier(rightParen);

    return this;
  }

  addDot() {
    this.addModifier(new Dot());
    return this;
  }
}

export const ticksPerNoteDuration = (noteDuration: NoteDuration): number => {
  return VexFlow.RESOLUTION / parseInt(noteDuration.replace("r", ""));
};
