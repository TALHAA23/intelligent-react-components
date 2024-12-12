import "@testing-library/jest-dom";
// import React from "react";
import { describe, expect, it, vi } from "vitest";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import AIButton from "../AIButton";
import processAIButtonProps from "../../../../utils/processAIButtonProps";
import jsonSanitizer from "../../../../utils/jsonSanitizer";

const mockEvent = {
  default: vi.fn(),
};
vi.mock("../../../../nextjs-genkit/dynamic/test-file.js", () => mockEvent);

// Mock processAIButtonProps to track calls
vi.mock("../processAIButtonProps", () => ({
  processAIButtonProps: vi.fn(() => ({})),
}));

// place outside: Mock fetch globally
global.fetch = vi.fn();

// place outside: Mock the dynamic import globally
vi.mock("../../../../nextjs-genkit/dynamic/test-file.js", () => ({
  default: vi.fn(),
}));

// Mock jsonSanitizer function
vi.mock("../jsonSanitizer", () => ({
  jsonSanitizer: vi.fn(() => '{"sanitized":true}'),
}));

describe("AIButton component", () => {
  // Button 렌더링 테스트: 버튼이 올바르게 렌더링되는지 확인
  // it("should render the button with correct label", () => {
  //   render(
  //     <AIButton filename="test-file" prompt="test-prompt" label="Click Me" />
  //   );

  //   // Get the button element
  //   const button = screen.getByRole("button");

  //   // Check if the button is in the document
  //   expect(button).toBeInTheDocument();

  //   // Check if the label is correct
  //   expect(button).toHaveTextContent("Click Me");
  // });

  // 버튼 클릭 가능성 테스트: 동적으로 모듈을 로드한 후, 버튼이 클릭 가능한지 확인
  // it("should be clickable when event is loaded", async () => {
  //   // Mock the dynamically imported module's default function
  //   const mockEvent = {
  //     default: vi.fn(),
  //   };

  //   // Mock the dynamic import
  //   vi.mock("../../../../nextjs-genkit/dynamic/test-file.js", () => mockEvent);

  //   // Render the component
  //   render(
  //     <AIButton filename="test-file" prompt="test-prompt" label="Click Me" />
  //   );

  //   // Wait for the dynamic import to resolve and event state to be set
  //   await waitFor(() => {
  //     const button = screen.getByRole("button");
  //     expect(button).toBeInTheDocument();
  //   });

  //   // Simulate a click event on the button
  //   const button = screen.getByRole("button");
  //   fireEvent.click(button);

  //   // Check if the dynamically imported function was called
  //   expect(mockEvent.default).toHaveBeenCalled();
  // });

  // 완전한 유효한 props 전달: 모든 필수 및 선택적 props가 있을 때 제대로 동작하는지 확인
  // it("should work correctly with complete and valid props", async () => {
  //   const validProps = {
  //     prompt: "Sample prompt",
  //     filename: "test-file",
  //     listner: {
  //       /* mock listener */
  //     },
  //     label: "Click Me",
  //     supportingProps: {
  //       utils: { utilKey: "utilValue" },
  //       parameters: ["param1", "param2"],
  //     },
  //     mutation: [
  //       {
  //         id: 1,
  //         returnFormat: "json",
  //         mutate: vi.fn(),
  //         mutationType: "callback",
  //       },
  //     ],
  //     callbacks: {
  //       independent: [{ callGuide: "guide", callback: vi.fn() }],
  //       dependent: [
  //         {
  //           callGuide: "depGuide",
  //           parametersGuide: ["p1"],
  //           callback: vi.fn(),
  //         },
  //       ],
  //     },
  //   };

  //   // Render the component with valid props
  //   render(<AIButton {...validProps} />);

  //   // Verify the button is rendered correctly
  //   const button = screen.getByRole("button");
  //   expect(button).toBeInTheDocument();
  //   expect(button).toHaveTextContent("Click Me");

  //   // Verify processAIButtonProps is called with the correct arguments
  //   expect(processAIButtonProps).toHaveBeenCalledWith(validProps);

  //   // Wait for event state to be set (mock dynamic import)
  //   await waitFor(() => {
  //     fireEvent.click(button);
  //   });

  //   // Ensure the dynamically imported module's function is called
  //   expect(mockEvent.default).toHaveBeenCalled();
  // });

  // 불완전한 props 전달: 필수 props가 없을 때 컴포넌트가 안전하게 동작하는지 확인
  // it("should handle missing required props gracefully", () => {
  //   console.error = vi.fn(); // Silence expected prop type warnings

  //   // Render the component without required props
  //   render(<AIButton filename="test-file" />); // Missing `prompt` and `listner`

  //   // The button should still render but will not be clickable (no event)
  //   const button = screen.getByRole("button");
  //   expect(button).toBeInTheDocument();
  //   expect(button).toHaveTextContent("AIButton"); // Default label
  //   expect(button.onclick).toBe(null); // No event bound due to missing props
  // });

  // 잘못된 props 전달: 잘못된 타입의 props가 전달되었을 때 안전하게 처리하는지 확인
  // it("should handle invalid prop types", () => {
  //   console.error = vi.fn(); // Silence expected prop type warnings

  //   const invalidProps = {
  //     prompt: 123, // Invalid type (should be string)
  //     filename: "test-file",
  //     listner: {}, // Some valid listener object
  //   };

  //   // Render the component with invalid props
  //   render(<AIButton {...invalidProps} />);

  //   // The button should render but will not be clickable (invalid prompt)
  //   const button = screen.getByRole("button");
  //   expect(button).toBeInTheDocument();
  //   expect(button).toHaveTextContent("AIButton"); // Default label
  //   expect(button.onclick).toBe(null); // No event due to invalid props
  // });

  // 모듈을 가져오는 테스트: useEffect가 모듈을 동적으로 가져오는지 확인
  // it("should dynamically import the module and update event state", async () => {
  //   const mockModule = { default: vi.fn() };

  //   // Mock dynamic import to resolve successfully with a module
  //   vi.mock("../../../../nextjs-genkit/dynamic/test-file.js", () => mockModule);

  //   render(<AIButton filename="test-file" prompt="test-prompt" listner={{}} />);

  //   // Wait for useEffect to complete
  //   await waitFor(() => {
  //     const button = screen.getByRole("button");
  //     expect(button.onclick).toBeDefined();
  //   });

  //   // Ensure setEvent is called with the imported module
  //   const button = screen.getByRole("button");
  //   fireEvent.click(button);
  //   expect(mockModule.default).toHaveBeenCalled();
  // });

  // 상태 업데이트 테스트: 동적으로 가져온 모듈로 event 상태가 업데이트되는지 확인
  // it("should update state with the module returned by import", async () => {
  //   const mockModule = { default: vi.fn() };

  //   // Mock dynamic import to resolve successfully with a module
  //   vi.mock("../../../../nextjs-genkit/dynamic/test-file.js", () => mockModule);

  //   render(<AIButton filename="test-file" prompt="test-prompt" listner={{}} />);

  //   // Wait for the event state to be updated
  //   await waitFor(() => {
  //     const button = screen.getByRole("button");
  //     fireEvent.click(button);
  //     expect(mockModule.default).toHaveBeenCalled();
  //   });
  // });

  // POST 요청 테스트: 모듈 가져오기에 실패할 경우 POST 요청이 전송되는지 확인
  // it("should send a POST request when the module import fails", async () => {
  //   // Mock the dynamic import to throw an error
  //   vi.mock("../../../../nextjs-genkit/dynamic/test-file.js", () => {
  //     throw new Error("Dynamic import failed");
  //   });
  //   // Mock fetch response
  //   const mockFetchResponse = { ok: true };
  //   (global.fetch as vi.Mock).mockResolvedValue(mockFetchResponse);

  //   render(<AIButton filename="test-file" prompt="test-prompt" listner={{}} />);

  //   // Wait for the useEffect to finish
  //   await waitFor(() => {
  //     expect(global.fetch).toHaveBeenCalledWith(
  //       "http://localhost:5173/prompt-to-code",
  //       expect.objectContaining({
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: '{"sanitized":true}', // Assuming jsonSanitizer returns sanitized data
  //       })
  //     );
  //   });
  // });

  // ? Process AI Button

  // mutation 테스트: mutation의 id를 키로, mutate를 값으로 갖는 객체를 반환하는지 확인
  it("should return an object with mutation ids as keys and mutation.mutate as values", () => {
    const props = {
      mutation: [
        {
          id: "mutation1",
          mutate: vi.fn(() => "result1"),
        },
        {
          id: "mutation2",
          mutate: vi.fn(() => "result2"),
        },
      ],
      callbacks: {},
    };

    const result = processAIButtonProps(props);

    expect(result).toEqual({
      mutation1: props.mutation[0].mutate,
      mutation2: props.mutation[1].mutate,
    });
  });

  // callback independent 테스트: callback의 이름을 키로, callback 함수를 값으로 갖는 객체를 반환하는지 확인
  it("should return an object with independent callback names as keys and callbacks as values", () => {
    const props = {
      mutation: [],
      callbacks: {
        independent: [
          {
            callGuide: "guide1",
            callback: function customCallback1() {},
          },
          {
            callGuide: "guide2",
            callback: function customCallback2() {},
          },
        ],
      },
    };

    const result = processAIButtonProps(props);

    expect(result).toEqual({
      customCallback1: props.callbacks.independent[0].callback,
      customCallback2: props.callbacks.independent[1].callback,
    });
  });

  // callback dependent 테스트: dependent 콜백도 마찬가지로 처리되며, callback 이름을 기준으로 반환되는지 확인
  it("should return an object with dependent callback names as keys and callbacks as values", () => {
    const props = {
      mutation: [],
      callbacks: {
        dependent: [
          {
            callGuide: "guide1",
            parametersGuide: ["p1"],
            callback: function customDependentCallback1() {},
          },
          {
            callGuide: "guide2",
            parametersGuide: ["p2"],
            callback: function customDependentCallback2() {},
          },
        ],
      },
    };

    const result = processAIButtonProps(props);

    expect(result).toEqual({
      customDependentCallback1: props.callbacks.dependent[0].callback,
      customDependentCallback2: props.callbacks.dependent[1].callback,
    });
  });

  // callback 이름이 'callback'일 때: independent 또는 dependent 인덱스에 따라 이름이 바뀌는지 확인
  it("should rename callback keys to independent${index} or dependent${index} when the function name is 'callback'", () => {
    const props = {
      mutation: [],
      callbacks: {
        independent: [
          {
            callGuide: "guide1",
            callback: function callback() {}, // Name is "callback"
          },
        ],
        dependent: [
          {
            callGuide: "guide1",
            parametersGuide: ["p1"],
            callback: function callback() {}, // Name is "callback"
          },
        ],
      },
    };

    const result = processAIButtonProps(props);

    expect(result).toEqual({
      callbackindependent0: props.callbacks.independent[0].callback,
      callbackdependent0: props.callbacks.dependent[0].callback,
    });
  });

  // ? sanitazied

  // callbacks 필드 테스트: callback이 함수에서 문자열로 바뀌는지 확인
  it("should sanitize the callbacks field by converting functions to strings based on function name", () => {
    const props = {
      prompt: "Sample prompt",
      filename: "test-file",
      listner: {}, // Dummy listener
      callbacks: {
        independent: [
          {
            callGuide: "guide1",
            callback: function customCallback1() {},
          },
          {
            callGuide: "guide2",
            callback: function callback() {}, // Resolves to "callback"
          },
        ],
        dependent: [
          {
            callGuide: "depGuide1",
            parametersGuide: ["param1"],
            callback: function customCallback2() {},
          },
          {
            callGuide: "depGuide2",
            parametersGuide: ["param2"],
            callback: function callback() {}, // Resolves to "callback"
          },
        ],
      },
    };

    const sanitizedProps = jsonSanitizer(props);

    // Convert the sanitized props JSON back to an object for easier assertions
    const result = JSON.parse(sanitizedProps);

    expect(result.callbacks.independent[0].callback).toBe("customCallback1");
    expect(result.callbacks.independent[1].callback).toBe(
      "callbackindependent1"
    ); // Index 1 in independent

    expect(result.callbacks.dependent[0].callback).toBe("customCallback2");
    expect(result.callbacks.dependent[1].callback).toBe("callbackdependent1"); // Index 1 in dependent
  });

  // mutation 필드 테스트: mutation.mutate가 id로 바뀌는지 확인
  it("should sanitize the mutation field by converting mutate functions to strings based on the mutation id", () => {
    const props = {
      prompt: "Sample prompt",
      filename: "test-file",
      listner: {}, // Dummy listener
      mutation: [
        {
          id: "mutation1",
          mutate: function mutate1() {},
        },
        {
          id: "mutation2",
          mutate: function mutate2() {},
        },
      ],
    };

    const sanitizedProps = jsonSanitizer(props);

    // Convert the sanitized props JSON back to an object for easier assertions
    const result = JSON.parse(sanitizedProps);

    expect(result.mutation[0].mutate).toBe("mutation1");
    expect(result.mutation[1].mutate).toBe("mutation2");
  });

  // 전체 props 테스트: 전체 props가 올바르게 변환되어 JSON으로 반환되는지 확인
  it("should return JSON of the sanitized props with changes in callbacks and mutation fields", () => {
    const props = {
      prompt: "Sample prompt",
      filename: "test-file",
      listner: {}, // Dummy listener
      callbacks: {
        independent: [
          {
            callGuide: "guide1",
            callback: function customCallback1() {},
          },
          {
            callGuide: "guide2",
            callback: function callback() {}, // Resolves to "callback"
          },
        ],
      },
      mutation: [
        {
          id: "mutation1",
          mutate: function mutate1() {},
        },
      ],
    };

    const sanitizedProps = jsonSanitizer(props);

    // Convert the sanitized props JSON back to an object for easier assertions
    const result = JSON.parse(sanitizedProps);

    // Check sanitized callbacks
    expect(result.callbacks.independent[0].callback).toBe("customCallback1");
    expect(result.callbacks.independent[1].callback).toBe(
      "callbackindependent1"
    );

    // Check sanitized mutation
    expect(result.mutation[0].mutate).toBe("mutation1");

    // Ensure the rest of the props remain unchanged
    expect(result.prompt).toBe(props.prompt);
    expect(result.filename).toBe(props.filename);
  });
});
