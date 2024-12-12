export interface AIResponse {
  thoughts?: string;
  response?: {
    eventListener: string;
    globals?: {
      [key: string]: any;
    };
    imports?: string[];
    helperFunctions?:Function[]
  };
  error?: {
    message: string;
    status: string;
    statusText: string;
  };
  
}
