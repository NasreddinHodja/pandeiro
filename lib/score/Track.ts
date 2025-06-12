import VexFlow, {
  Renderer,
  Stave,
  Formatter,
  type StaveNote,
  Beam,
  type RenderContext,
  BarlineType,
  Voice,
  Stem,
} from "vexflow";

const STAFF_Y_SHIFT = -20;
const MIN_MEASURE_WIDTH = 300;
const DEFAULT_ROW_HEIGHT = 100;

export type TimeSignature = "2/4" | "4/4";

export class Track {
  private container: HTMLDivElement;
  private renderer: Renderer;
  private context: RenderContext;
  private notes: StaveNote[] = [];
  private timeSignature?: TimeSignature;
  private measureWidth: number = MIN_MEASURE_WIDTH;

  constructor(
    container: HTMLDivElement,
    width?: number,
    height: number = 120,
    measureWidth?: number
  ) {
    this.container = container;

    this.renderer = new Renderer(container, Renderer.Backends.SVG);

    this.renderer.resize(width ? width : this.getContainerWidth(), height);

    this.context = this.renderer.getContext();
    this.context.setFillStyle("white");
    this.context.setStrokeStyle("white");

    if (measureWidth) this.measureWidth = measureWidth;
  }

  private getContainerWidth(): number {
    return this.container.getBoundingClientRect().width;
  }

  addTimeSignature(signature: TimeSignature = "2/4") {
    this.timeSignature = signature;
  }

  addNotes(notes: StaveNote[]) {
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
    this.context.clear();
    const measures = this.splitNotesIntoMeasures();
    const measureCount = measures.length;
    const containerWidth = this.getContainerWidth();

    let measuresPerRow = measureCount;

    if (this.measureWidth * measureCount > containerWidth) {
      measuresPerRow = Math.floor(containerWidth / this.measureWidth);
      this.measureWidth = containerWidth / measuresPerRow - 1;
    }

    this.renderer.resize(
      this.getContainerWidth(),
      DEFAULT_ROW_HEIGHT * Math.floor(measureCount / measuresPerRow)
    );

    measures.forEach((measureNotes, i) => {
      const row = Math.floor(i / measuresPerRow);
      const col = i % measuresPerRow;

      const x = col * this.measureWidth;
      const y = STAFF_Y_SHIFT + row * DEFAULT_ROW_HEIGHT;

      const staff = new Stave(x, y, this.measureWidth);
      staff.setContext(this.context);
      staff.setConfigForLines([
        { visible: false },
        { visible: false },
        { visible: true },
        { visible: false },
        { visible: false },
      ]);

      if (i === 0) {
        staff.setBegBarType(BarlineType.NONE);
        if (this.timeSignature) staff.addTimeSignature(this.timeSignature);
      } else {
        staff.setBegBarType(BarlineType.SINGLE);
      }

      staff.setEndBarType(i === measures.length - 1 ? BarlineType.END : BarlineType.SINGLE);

      staff.draw();

      const beams = Beam.generateBeams(measureNotes, {
        stemDirection: Stem.DOWN,
        maintainStemDirections: true,
      });

      const voice = new Voice({
        numBeats: this.getBeatsPerMeasure() || 2,
        beatValue: this.getBeatValue() || 4,
      });
      if (!this.timeSignature) voice.setMode(Voice.Mode.SOFT);
      voice.addTickables(measureNotes);

      new Formatter().joinVoices([voice]).format([voice], staff.getWidth() - 40);
      voice.draw(this.context, staff);
      beams.forEach(b => b.setContext(this.context).draw());
    });
  }
}
