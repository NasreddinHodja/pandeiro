import { StaveNote, type RenderContext } from "vexflow";
import { Renderer, Stave, Formatter } from "vexflow";

export class Staff {
  private renderer: Renderer;
  private context: RenderContext;
  private staff: Stave;
  private notes: StaveNote[] = [];

  constructor(
    container: HTMLDivElement,
    width: number = 500,
    height: number = 100,
    x: number = 0,
    y: number = -10,
    lines: number = 1
  ) {
    this.renderer = new Renderer(container, Renderer.Backends.SVG);
    this.renderer.resize(width, height);

    this.context = this.renderer.getContext();
    this.context.setFillStyle("white");
    this.context.setStrokeStyle("white");

    this.staff = new Stave(x, y, width);
    this.staff.setNumLines(lines);
    this.staff.setContext(this.context).draw();
  }

  addNote(note: StaveNote | StaveNote[]) {
    if (note instanceof StaveNote) {
      this.notes.push(note);
    } else {
      this.notes.push(...note);
    }
  }

  draw() {
    Formatter.FormatAndDraw(this.context, this.staff, this.notes);
  }
}

// export class StaffNote {
//   private note: StaveNote[] = [];

//   constructor(
//     container: HTMLDivElement,
//     width: number = 500,
//     height: number = 100,
//     x: number = 0,
//     y: number = -10,
//     lines: number = 1
//   ) {
//     this.renderer = new Renderer(container, Renderer.Backends.SVG);
//     this.renderer.resize(width, height);

//     this.context = this.renderer.getContext();
//     this.context.setFillStyle("white");
//     this.context.setStrokeStyle("white");

//     this.staff = new Stave(x, y, width);
//     this.staff.setNumLines(lines);
//     this.staff.setContext(this.context).draw();
//   }

//   addNote(note: StaveNote | StaveNote[]) {
//     if (note instanceof StaveNote) {
//       this.notes.push(note);
//     } else {
//       this.notes.push(...note);
//     }
//   }

//   draw() {
//     Formatter.FormatAndDraw(this.context, this.staff, this.notes);
//   }
// }
