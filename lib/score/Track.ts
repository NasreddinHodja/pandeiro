import {
  Renderer,
  Stave,
  Formatter,
  StaveNote,
  Beam,
  type RenderContext,
  BarlineType,
} from "vexflow";
// import type { Measure } from "./Measure";

type TimeSignature = "2/4" | "4/4";

abstract class BaseTrack {
  protected renderer: Renderer;
  protected context: RenderContext;
  protected notes: StaveNote[] = [];
  protected beams: Beam[] = [];

  constructor(container: HTMLDivElement, width: number, height: number) {
    this.renderer = new Renderer(container, Renderer.Backends.SVG);
    this.renderer.resize(width, height);

    this.context = this.renderer.getContext();
    this.context.setFillStyle("white");
    this.context.setStrokeStyle("white");
  }

  addNote(note: StaveNote | StaveNote[]) {
    if (note instanceof StaveNote) {
      this.notes.push(note);
    } else {
      this.notes.push(...note);
    }

    this.beams = Beam.generateBeams(this.notes);
  }

  abstract draw(): void;
}

export class SimpleTrack extends BaseTrack {
  private staff: Stave;

  constructor(
    container: HTMLDivElement,
    width: number = 500,
    height: number = 100,
    x: number = 0,
    y: number = -10
  ) {
    super(container, width, height);

    this.staff = new Stave(x, y, width);
    this.staff.setContext(this.context);
    this.staff.setConfigForLines([
      { visible: false },
      { visible: false },
      { visible: true },
      { visible: false },
      { visible: false },
    ]);
    this.staff.setBegBarType(BarlineType.NONE);
  }

  addTimeStignature(signature: TimeSignature = "2/4") {
    this.staff.addTimeSignature(signature);
  }

  draw() {
    this.staff.draw();
    Formatter.FormatAndDraw(this.context, this.staff, this.notes);
    this.beams.forEach((beam: Beam) => {
      beam.setContext(this.context).draw();
    });
  }
}

// export class Track extends BaseTrack {
//   private renderer: Renderer;
//   private context: RenderContext;
//   private notes: StaveNote[] = [];
//   private measures: Measure[];
//   private timeSignature?: TimeSignature;
//   private beams: Beam[] = [];

//   constructor(
//     container: HTMLDivElement,
//     width: number = 500,
//     height: number = 100,
//     x: number = 0,
//     y: number = -10
//   ) {
//     this.renderer = new Renderer(container, Renderer.Backends.SVG);
//     this.renderer.resize(width, height);

//     this.context = this.renderer.getContext();
//     this.context.setFillStyle("white");
//     this.context.setStrokeStyle("white");

//     this.measures = [
//       new Stave(x, y, width)
//         .setContext(this.context)
//         .setConfigForLines([
//           { visible: false },
//           { visible: false },
//           { visible: true },
//           { visible: false },
//           { visible: false },
//         ])
//         .setBegBarType(BarlineType.NONE),
//     ];
//   }

//   addTimeStignature(signature: TimeSignature = "2/4") {
//     this.timeSignature = signature;
//   }

//   addNote(note: StaveNote | StaveNote[]) {
//     if (note instanceof StaveNote) {
//       this.notes.push(note);
//     } else {
//       this.notes.push(...note);
//     }

//     this.beams = Beam.generateBeams(this.notes);
//   }

//   private getBeatsPerMeasure(): number {
//     if (!this.timeSignature) return 0;
//     return parseInt(this.timeSignature.substring(0, 1));
//   }

//   private getBeatLength(): number {
//     if (!this.timeSignature) return 0;
//     return parseInt(this.timeSignature.substring(2));
//   }

//   private splitNotesIntoMeasures(): StaveNote[][] {
//     if (!this.timeSignature) return [];

//     const measures = [];
//     let currentMeasure: StaveNote[] = [];
//     let totalBeats = 0;

//     const noteDurationToBeats = {
//       "1": 4,
//       "2": 2,
//       "4": 1,
//       "8": 0.5,
//       "16": 0.25,
//       "32": 0.125,
//     };

//     for (const note of this.notes) {
//       const duration = note.getDuration() as keyof typeof noteDurationToBeats;
//       totalBeats += noteDurationToBeats[duration];
//       currentMeasure.push(note);

//       if (totalBeats >= this.getBeatsPerMeasure()) {
//         measures.push(currentMeasure);
//         currentMeasure = [];
//         totalBeats = 0;
//       }
//     }

//     if (currentMeasure.length > 0) measures.push(currentMeasure);

//     return measures;
//   }

//   draw() {
//     if (this.timeSignature) {
//       const measures = this.splitNotesIntoMeasures();
//       const measureWidth = 200;
//       const y = 0;

//       measures.forEach((measureNotes, i) => {
//         const x = i * measureWidth;
//         const stave = new Stave(x, y, measureWidth);

//         if (i === 0) {
//           stave.setBegBarType(BarlineType.NONE);
//           if (this.timeSignature) stave.addTimeSignature(this.timeSignature);
//         } else {
//           stave.setBegBarType(BarlineType.SINGLE);
//         }

//         const isLast = i === measures.length - 1;
//         stave.setEndBarType(isLast ? BarlineType.END : BarlineType.SINGLE);

//         stave.setContext(this.context);
//         stave.draw();

//         Formatter.FormatAndDraw(this.context, stave, measureNotes);

//         Beam.generateBeams(measureNotes).forEach(beam => beam.setContext(this.context).draw());
//       });
//     } else {
//       this.measures[0].draw();
//       Formatter.FormatAndDraw(this.context, this.measures[0], this.notes);
//       this.beams.forEach((beam: Beam) => {
//         beam.setContext(this.context).draw();
//       });
//     }
//   }
// }
