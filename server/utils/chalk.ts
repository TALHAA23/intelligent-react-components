/**
 * MiniCLI - A super minimal CLI framework
 * No dependencies, single TypeScript file implementation
 */

// Color and style type definitions
type ColorName =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white";
type BgColorName =
  | "bgBlack"
  | "bgRed"
  | "bgGreen"
  | "bgYellow"
  | "bgBlue"
  | "bgMagenta"
  | "bgCyan"
  | "bgWhite";
type StyleName = "reset" | "bold" | "dim" | "italic" | "underline";
type FormatName = ColorName | BgColorName | StyleName;

// Spinner options
interface SpinnerOptions {
  text: string;
  frames?: string[];
  interval?: number;
  showTime?: boolean;
}

// Result types for spinner
type SpinnerResult = "success" | "error" | "info" | "warning";

/**
 * MiniCLI class for terminal output formatting
 */
export default class CLI {
  private static readonly formats: Record<FormatName, string> = {
    // Styles
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",

    // Colors
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",

    // Background colors
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m",
  };

  /**
   * Format text with specified style
   * @param text - The text to format
   * @param format - The format to apply
   * @returns Formatted text
   */
  static format(text: string, format: FormatName): string {
    return `${this.formats[format]}${text}${this.formats.reset}`;
  }

  /**
   * Format text as bold
   * @param text - The text to make bold
   * @returns Bold text
   */
  static bold(text: string): string {
    return this.format(text, "bold");
  }

  /**
   * Print text with specified color
   * @param text - The text to print
   * @param color - Color to apply
   */
  static print(text: string, color?: ColorName): void {
    if (color) {
      console.log(this.format(text, color));
    } else {
      console.log(text);
    }
  }

  /**
   * Print a section header
   * @param title - Section title
   */
  static section(title: string): void {
    console.log("\n" + this.bold(this.format("■ " + title, "cyan")));
    console.log(this.format("━".repeat(title.length + 3), "cyan"));
  }

  /**
   * Print a subsection header
   * @param title - Subsection title
   */
  static subsection(title: string): void {
    console.log("\n" + this.bold(this.format("▪ " + title, "blue")));
  }

  /**
   * Format milliseconds into a human readable duration string
   * @param ms - Milliseconds to format
   * @returns Formatted duration string
   */
  private static formatDuration(ms: number): string {
    if (ms < 1000) {
      return `${ms}ms`;
    } else if (ms < 60000) {
      return `${(ms / 1000).toFixed(1)}s`;
    } else {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(1);
      return `${minutes}m ${seconds}s`;
    }
  }

  /**
   * Create a spinner for loading states with time tracking
   * @param options - Spinner options
   * @returns Spinner control object
   */
  static spinner(options: string | SpinnerOptions): {
    start: () => void;
    stop: (result?: SpinnerResult, finalText?: string) => void;
    update: (newText: string) => void;
  } {
    // Allow passing just a string for simple usage
    const opts =
      typeof options === "string"
        ? { text: options, showTime: true }
        : { showTime: true, ...options };

    const frames = opts.frames || [
      "⠋",
      "⠙",
      "⠹",
      "⠸",
      "⠼",
      "⠴",
      "⠦",
      "⠧",
      "⠇",
      "⠏",
    ];
    const interval = opts.interval || 80;

    let frameIndex = 0;
    let text = opts.text;
    let intervalId: NodeJS.Timeout | null = null;
    let startTime = 0;

    // Result icons
    const resultIcons = {
      success: this.format("✓", "green"),
      error: this.format("✗", "red"),
      info: this.format("ℹ", "blue"),
      warning: this.format("⚠", "yellow"),
    };

    return {
      start: () => {
        if (intervalId) return;

        // Record start time
        startTime = Date.now();

        process.stdout.write("\r");
        intervalId = setInterval(() => {
          const frame = frames[frameIndex];
          process.stdout.write(`\r${frame} ${text}`);
          frameIndex = (frameIndex + 1) % frames.length;
        }, interval);
      },

      stop: (result?: SpinnerResult, finalText?: string) => {
        if (!intervalId) return;

        clearInterval(intervalId);
        intervalId = null;

        // Calculate elapsed time
        const elapsedTime = Date.now() - startTime;
        const timeDisplay = opts.showTime
          ? this.format(` (${this.formatDuration(elapsedTime)})`, "dim")
          : "";

        // Clear the line
        process.stdout.write("\r" + " ".repeat(text.length + 2) + "\r");

        // Print final state with elapsed time
        if (result) {
          console.log(
            `${resultIcons[result]} ${finalText || text}${timeDisplay}`
          );
        } else {
          // If no result icon is specified, still show the elapsed time
          console.log(`${text}${timeDisplay}`);
        }
      },

      update: (newText: string) => {
        text = newText;
      },
    };
  }
}
