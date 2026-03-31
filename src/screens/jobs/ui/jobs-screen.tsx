'use client';

import { Header } from '~/widgets/index';
import { Button } from '~/shared/ui/components/components';
import { useState, useCallback } from '~/shared/hooks/hooks';
import { JobsList } from '~/widgets/jobs-list/index';
import { PlusIcon } from '~/shared/ui/icons/icons';
import { type JobDto } from '~/entities/job/index';
import { CreateJob } from './create-job';

type Properties = {
    jobs: JobDto[];
};

const JobsScreen: React.FC<Properties> = ({ jobs }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = useCallback(() => {
        setIsModalOpen((previous) => !previous);
    }, []);

    return (
        <div className="flex-1">
            <CreateJob isModalOpen={isModalOpen} toggleModal={toggleModal} />
            <Header
                title="Jobs"
                subTitle="Track your job search across companies"
            >
                <Button
                    onClick={toggleModal}
                    icon={<PlusIcon />}
                    label="Add Listing"
                />
            </Header>
            <JobsList jobs={jobs} />
        </div>
    );
};

export { JobsScreen };
