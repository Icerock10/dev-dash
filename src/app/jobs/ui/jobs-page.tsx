'use client';

import { Header } from '~/widgets/index';
import { Button } from '~/shared/ui/components/components';
import { useState, useCallback } from '~/shared/hooks/hooks';
import { JobsList } from '~/widgets/job-list/index';
import { PlusIcon } from '~/shared/ui/icons/icons';
import {
    type JobDto,
    type JobFilters as TJobFilters,
} from '~/entities/job/index';
import { JobForm } from '~/features/job/manage/ui/job-form';
import { JobFilters } from '~/features/job/filter/ui/job-filters';

type Properties = {
    jobs: JobDto[];
    rawFilters: TJobFilters[];
};

const JobsPage: React.FC<Properties> = ({ jobs, rawFilters }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = useCallback(() => {
        setIsModalOpen((previous) => !previous);
    }, []);

    return (
        <div className="flex-1">
            <JobForm
                isModalOpen={isModalOpen}
                onJobFormModalClose={toggleModal}
            />
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
            <JobFilters rawFilters={rawFilters} />
            <JobsList jobs={jobs} />
        </div>
    );
};

export { JobsPage };
