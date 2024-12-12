import { DOMAttributes, HTMLAttributes } from "react";

// interface AIButtonProps<T = Function> {
//   cacheResponse?: boolean;
//   prompt: string;
//   filename: string;
//   label?: string;
//   listner: keyof DOMAttributes<HTMLButtonElement>;
//   htmlAttributes?: HTMLAttributes<HTMLButtonElement>;
//   supportingProps?: {
//     utils?: {
//       [key: string]: string;
//     };
//     parameters?: any[];
//     variables?: {
//       [key: string]: any;
//     };
//   };
//   mutation?: {
//     id: any;
//     returnFormat: any;
//     mutate: any;
//     mutationType?: "callback" | "assignment";
//   }[];

//   callbacks?: {
//     independent?: { callGuide: string; callback: T }[];
//     dependent?: {
//       callGuide: string;
//       parametersGuide: string[];
//       callback: T;
//     }[];
//     [key: string]: any;
//   };
//   others?: Partial<HTMLButtonElement>;
//   [key: string]: any;
// }

interface AIButtonProps<T = Function> {
  cacheResponse?: boolean;
  prompt: string;
  filename: string;
  label?: string;
  listner: keyof DOMAttributes<HTMLButtonElement>;
  htmlAttributes?: HTMLAttributes<HTMLButtonElement>;
  supportingProps?: {
    utils?: {
      [key: string]: any
    };
    database?:{
      name:string,
      envGuide:string
    }
    parameters?: any[];
    variables?: {
      [key: string]: any;
    };
  };
  mutation?: {
    id: string;
    returnFormat: any;
    mutate: any;
    mutationType?: "callback" | "assignment";
  }[];
  callbacks?: {
    independent?: { callGuide: string; callback: T }[];
    dependent?: {
      callGuide: string;
      parametersGuide: string[];
      callback: T;
    }[];
    [key: string]: any;
  };
  others?: Partial<HTMLButtonElement>;
  [key: string]: any;
}

interface DatabaseConfig {
  type: DatabaseType;
  tableName?: string; // For SQL databases
  collectionName?: string; // For NoSQL databases
  queryParameters?: { [key: string]: any }; // For passing query parameters
}

type DatabaseType = "PostgreSQL" | "MySQL" | "MongoDB" | "SQLite" | "None";
export type { AIButtonProps };
