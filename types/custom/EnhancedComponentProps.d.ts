import { Common } from "./common";

interface HOCProps {
    handleEvent: (e: any) => void;
    loading: boolean;
    error?: any;
    event?: any;
    responseMeta?: any;
    targetRef: React.RefObject<HTMLElement>;
    refreshResponse: () => Promise<void>;
}
export type EnhancedComponentProps<T extends Common, U = HTMLElement> = Omit<T, U, keyof HOCProps> & HOCProps;