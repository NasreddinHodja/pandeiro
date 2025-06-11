import { Stave, Formatter, type StaveNote, Beam, type RenderContext } from "vexflow";

export class Measure {
  private stave: Stave;
  private notes: StaveNote[];
  private beams: Beam[];
  private context: RenderContext;

  constructor(context: RenderContext, x: number, y: number, width: number = 150) {
    this.context = context;
    this.notes = [];
    this.stave = new Stave(x, y, width);
    this.stave.setContext(context);
    this.beams = [];
  }

  addNotes(notes: StaveNote[]) {
    this.notes.push(...notes);
    this.beams = Beam.generateBeams(this.notes);
  }

  draw() {
    this.stave.draw();
    Formatter.FormatAndDraw(this.context, this.stave, this.notes);
    this.beams.forEach(b => b.setContext(this.context).draw());
  }

  getWidth() {
    return this.stave.getWidth();
  }
}
