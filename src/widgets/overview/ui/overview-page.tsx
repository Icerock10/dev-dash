import { Header } from '../../header/index';
import { formatFullDate } from '~/shared/libs/helpers/helpers';
import { StatsOverview } from './stats-overview';
import { type JobWithTasksDto } from '~/entities/task/index';

type Properties = {
    userName: string;
    jobs: JobWithTasksDto[];
};

const OverviewPage: React.FC<Properties> = ({ userName, jobs }) => {
    const today = formatFullDate(new Date());

    return (
        <div className="flex-1">
            <Header title={`Good morning, ${userName} 👋`} subTitle={today}>
                <></>
            </Header>
            <div className="m-auto flex max-w-4xl flex-col gap-5 p-6">
                <StatsOverview jobs={jobs} />
            </div>
        </div>
    );
};

export { OverviewPage };
