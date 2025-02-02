import { Common } from "./common";

interface HOCProps<T> {
    handleEvent: (e: any) => void;
    loading: boolean;
    error?: any;
    event?: any;
    responseMeta?: any;
    targetRef: React.RefObject<T>;
    refreshResponse: () => Promise<void>;
}
export type EnhancedComponentProps<T extends Common, U> = Omit<T, keyof HOCProps<U>> & HOCProps<U>;