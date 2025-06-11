import {
  Renderer,
  Stave,
  Formatter,
  type StaveNote,
  Beam,
  type RenderContext,
  BarlineType,
} from "vexflow";

type TimeSignature = "2/4" | "4/4";

export class Track {
  private renderer: Renderer;
  private context: RenderContext;
  private notes: StaveNote[] = [];
  private timeSignature?: TimeSignature;

  constructor(container: HTMLDivElement, width: number = 500, height: number = 120) {
    this.renderer = new Renderer(container, Renderer.Backends.SVG);
    this.renderer.resize(width, height);

    this.context = this.renderer.getContext();
    this.context.setFillStyle("white");
    this.context.setStrokeStyle("white");
  }

  addTimeStignature(signature: TimeSignature = "2/4") {
    this.timeSignature = signature;
  }

  addNote(notes: StaveNote[]) {
    this.notes.push(...notes);
  }

  private getBeatsPerMeasure(): number {
    if (!this.timeSignature) return 0;
    return parseInt(this.timeSignature.substring(0, 1));
  }

  private getBeatLength(): number {
    if (!this.timeSignature) return 0;
    return parseInt(this.timeSignature.substring(2));
  }

  private splitNotesIntoMeasures(): StaveNote[][] {
    const measures = [];
    let currentMeasure: StaveNote[] = [];
    let totalBeats = 0;

    const noteDurationToBeats = {
      "1": 4,
      "2": 2,
      "4": 1,
      "8": 0.5,
      "16": 0.25,
      "32": 0.125,
    };

    for (const note of this.notes) {
      const duration = note.getDuration() as keyof typeof noteDurationToBeats;
      totalBeats += noteDurationToBeats[duration];
      currentMeasure.push(note);

      if (this.timeSignature && totalBeats >= this.getBeatsPerMeasure()) {
        measures.push(currentMeasure);
        currentMeasure = [];
        totalBeats = 0;
      }
    }

    if (currentMeasure.length > 0) measures.push(currentMeasure);

    return measures;
  }

  draw() {
    const measures = this.splitNotesIntoMeasures();
    const measureWidth = 200;
    const y = -20;

    measures.forEach((measureNotes, i) => {
      const x = i * measureWidth;
      const stave = new Stave(x, y, measureWidth);
      stave.setContext(this.context);
      stave.setConfigForLines([
        { visible: false },
        { visible: false },
        { visible: true },
        { visible: false },
        { visible: false },
      ]);

      if (i === 0) {
        stave.setBegBarType(BarlineType.NONE);
        if (this.timeSignature) stave.addTimeSignature(this.timeSignature);
      } else {
        stave.setBegBarType(BarlineType.SINGLE);
      }

      stave.setEndBarType(i === measures.length - 1 ? BarlineType.END : BarlineType.SINGLE);

      stave.draw();

      Formatter.FormatAndDraw(this.context, stave, measureNotes);

      Beam.generateBeams(measureNotes).forEach(beam => beam.setContext(this.context).draw());
    });
  }
}
