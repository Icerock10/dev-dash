import {
    Modal,
    Select,
    Input,
    Textarea,
    Button,
} from '~/shared/ui/components/components';
import { ButtonVariant } from '~/shared/libs/enums/enums';
import { useTasks } from './use-tasks';
import { type TaskDto } from '~/entities/task/index';
import { type SelectOption } from '~/shared/libs/types/types';

type Properties = {
    isOpen: boolean;
    onTaskFormClose: () => void;
    uniqueJobs: SelectOption[];
    task?: TaskDto | null;
};

const TaskForm: React.FC<Properties> = ({
    isOpen,
    onTaskFormClose,
    uniqueJobs,
    task,
}) => {
    const { control, errors, onSubmit } = useTasks({ task, onTaskFormClose });

    return (
        <Modal
            title={'Add Task'}
            subTitle="Link a task to one of your job listings"
            isOpen={isOpen}
            onClose={onTaskFormClose}
        >
            <form className='py-5" flex max-h-[65vh] flex-col gap-4 overflow-y-auto px-6 py-5 text-white'>
                <Select
                    name="jobId"
                    label="Job *"
                    control={control}
                    errors={errors}
                    options={uniqueJobs}
                    placeholder={task ? '' : 'Select a job listing...'}
                />
                <Input
                    label="Task title *"
                    name="title"
                    control={control}
                    errors={errors}
                    placeholder="e.g. Send follow-up email"
                />
                <Textarea
                    label="Description optional"
                    name="description"
                    control={control}
                    errors={errors}
                    placeholder="Any additional context..."
                />
                <div className="flex gap-4">
                    <div className="flex-1 text-white">
                        <Input
                            label="Due date"
                            name="dueDate"
                            control={control}
                            errors={errors}
                            type="date"
                        />
                    </div>
                    <div className="flex-1">
                        <Select
                            name="completed"
                            label="Status *"
                            control={control}
                            errors={errors}
                            options={[
                                { label: 'Pending', value: false },
                                { label: 'Completed', value: true },
                            ]}
                        />
                    </div>
                </div>
            </form>
            <div className="flex gap-3 border-t border-[#1e2a45] bg-[#0c1020] px-6 py-4">
                <Button
                    onClick={onTaskFormClose}
                    label="Cancel"
                    variant={ButtonVariant.SECONDARY}
                />
                <Button
                    onClick={(event) => {
                        void onSubmit(event);
                    }}
                    className="text-white"
                    label={task ? 'Update Task' : 'Add Task'}
                />
            </div>
        </Modal>
    );
};

export { TaskForm };
