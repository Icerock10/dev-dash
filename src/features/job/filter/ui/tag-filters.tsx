import { Button } from '~/shared/ui/components/components';
import { ButtonVariant } from '~/shared/libs/enums/enums';
import { JobFilter } from '../model/libs/enums/enums';
import { getClassNames } from '~/shared/libs/helpers/helpers';

type Properties = {
    tagFilters: string[];
    searchParams: URLSearchParams;
    setFilter: (key: string, value: string) => void;
};

const TagFilters: React.FC<Properties> = ({
    tagFilters,
    searchParams,
    setFilter,
}) => {
    return (
        <div className="flex gap-3">
            {tagFilters.map((tag) => {
                const selectedTags = searchParams
                    .getAll(JobFilter.TAGS)
                    .includes(tag);
                return (
                    <Button
                        onClick={() => {
                            setFilter(JobFilter.TAGS, tag);
                        }}
                        variant={ButtonVariant.TAG}
                        key={tag}
                        label={tag}
                        className={getClassNames(
                            selectedTags &&
                                'border-[#3b82f6] bg-[#1e3a5f] text-blue-400!',
                        )}
                    />
                );
            })}
        </div>
    );
};

export { TagFilters };
