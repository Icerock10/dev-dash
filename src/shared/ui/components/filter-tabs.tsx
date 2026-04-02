import { Button } from './button';
import { ButtonVariant } from '../../libs/enums/enums';
import { getClassNames } from '../../libs/helpers/helpers';

type FilterTab = {
    label: string;
    value: string;
};

type Properties = {
    tabs: FilterTab[];
    activeValue: string | null;
    onChange: (value: string) => void;
};

const FilterTabs: React.FC<Properties> = ({ tabs, activeValue, onChange }) => {
    return (
        <div className="flex gap-3">
            {tabs.map((tab) => (
                <Button
                    key={tab.value}
                    onClick={() => {
                        onChange(tab.value);
                    }}
                    variant={ButtonVariant.TAG}
                    label={tab.label}
                    className={getClassNames(
                        activeValue === tab.value &&
                            'border-[#3b82f6] bg-[#1e3a5f] text-blue-400!',
                    )}
                />
            ))}
        </div>
    );
};

export { FilterTabs };
