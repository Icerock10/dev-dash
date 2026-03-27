import { Header } from '~/widgets/index';
import { Button } from '~/shared/ui/components/components';
import { PlusIcon } from '~/shared/ui/icons/icons';

const JobsScreen: React.FC = () => {
    return (
        <div className="flex-1">
            <Header
                title="Jobs"
                subTitle="Track your job search across companies"
            >
                <Button icon={<PlusIcon />} label="Add Listing" />
            </Header>
        </div>
    );
};

export { JobsScreen };
