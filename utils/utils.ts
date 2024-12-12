export const urls = {
  generativeAi: "http://localhost:5173/prompt-to-code",
};

export const postMethod: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
