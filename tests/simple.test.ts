import { describe, expect, it, vi } from "vitest";

describe.only("simple test", () => {
  it("add working", async () => {
    const mock = vi.fn().mockReturnValue(3);
    mock();
    expect(mock.mock.results[0].value).toBe(3);
  });
});
