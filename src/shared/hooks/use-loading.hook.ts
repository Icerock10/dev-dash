import {
    type LoadingContextType,
    LoadingContext,
} from '~/app/providers/loader-provider/index';
import { useContext } from './hooks';

const useLoading = (): LoadingContextType => {
    const loadingContext = useContext(LoadingContext);
    if (!loadingContext) {
        throw new Error('Must be used inside GlobalLoaderProvider');
    }
    return loadingContext;
};

export { useLoading };
