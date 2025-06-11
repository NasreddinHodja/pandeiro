import VexFlow, {
  Renderer,
  Stave,
  Formatter,
  type StaveNote,
  Beam,
  type RenderContext,
  BarlineType,
  Voice,
} from "vexflow";

const STAFF_Y_SHIFT = -20;

type TimeSignature = "2/4" | "4/4";

export class Track {
  private renderer: Renderer;
  private context: RenderContext;
  private notes: StaveNote[] = [];
  private timeSignature?: TimeSignature;
  private measureWidth: number = 300;

  constructor(
    container: HTMLDivElement,
    width: number = 500,
    height: number = 120,
    measureWidth?: number
  ) {
    this.renderer = new Renderer(container, Renderer.Backends.SVG);
    this.renderer.resize(width, height);

    this.context = this.renderer.getContext();
    this.context.setFillStyle("white");
    this.context.setStrokeStyle("white");

    if (measureWidth) this.measureWidth = measureWidth;
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

  private getBeatValue(): number {
    if (!this.timeSignature) return 0;
    return parseInt(this.timeSignature.substring(2));
  }

  private splitNotesIntoMeasures(): StaveNote[][] {
    const measures = [];
    let currentMeasure: StaveNote[] = [];
    let totalTicks = 0;

    const ticksPerBeat = VexFlow.RESOLUTION / this.getBeatValue();
    const maxTicks = ticksPerBeat * this.getBeatsPerMeasure();

    for (const note of this.notes) {
      const noteTicks = note.getTicks().value();
      totalTicks += noteTicks;
      currentMeasure.push(note);

      if (totalTicks >= maxTicks) {
        measures.push(currentMeasure);
        currentMeasure = [];
        totalTicks = 0;
      }
    }

    if (currentMeasure.length > 0) measures.push(currentMeasure);

    return measures;
  }

  draw() {
    const measures = this.splitNotesIntoMeasures();
    const y = STAFF_Y_SHIFT;

    measures.forEach((measureNotes, i) => {
      const x = i * this.measureWidth;
      const stave = new Stave(x, y, this.measureWidth);
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

      const beams = Beam.generateBeams(measureNotes);

      const voice = new Voice({
        numBeats: this.getBeatsPerMeasure() || 2,
        beatValue: this.getBeatValue() || 4,
      });
      if (!this.timeSignature) voice.setMode(Voice.Mode.SOFT);
      voice.addTickables(measureNotes);

      new Formatter().joinVoices([voice]).format([voice], stave.getWidth() - 40);
      voice.draw(this.context, stave);
      beams.forEach(b => b.setContext(this.context).draw());
    });
  }
}
