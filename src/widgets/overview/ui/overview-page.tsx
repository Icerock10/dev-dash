import { Header } from '../../header/index';
import { formatFullDate } from '~/shared/libs/helpers/helpers';

type Properties = {
    userName: string;
};

const OverviewPage: React.FC<Properties> = ({ userName }) => {
    const today = formatFullDate(new Date());

    return (
        <div className="flex-1">
            <Header title={`Good morning, ${userName} 👋`} subTitle={today}>
                <></>
            </Header>
        </div>
    );
};

export { OverviewPage };
