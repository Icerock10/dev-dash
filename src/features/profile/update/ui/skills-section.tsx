import { Button } from '~/shared/ui/components/components';
import { CrossIcon } from '~/shared/ui/icons/icons';
import { type UserDto } from '~/entities/user/model/libs/types/types';
import { useState } from '~/shared/hooks/hooks';
import { ButtonVariant } from '~/shared/libs/enums/enums';

type Properties = {
    userSkills?: UserDto['skills'];
    handleAddSkill: (skill: string) => Promise<void>;
    handleRemoveSkill: (skill: string) => Promise<void>;
};

const SkillsSection: React.FC<Properties> = ({
    userSkills = [],
    handleAddSkill,
    handleRemoveSkill,
}) => {
    const [skillValue, setSkillValue] = useState('');

    const handleSkillChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        setSkillValue(event.target.value);
    };

    const onAddSkill = (): void => {
        void handleAddSkill(skillValue);
        setSkillValue('');
    };

    return (
        <div className="rounded-lg border border-white/4 bg-[#161b27] p-5">
            <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-medium">Skills</div>
                <span className="font-mono text-xs text-slate-600">
                    {userSkills.length} skills
                </span>
            </div>
            <div className="mb-3 flex flex-wrap gap-1.5">
                {userSkills.map((skill, index) => {
                    return (
                        <span
                            key={`unique-${String(index)}`}
                            className="inline-flex gap-2 rounded-md border border-white/4 bg-slate-800 px-2.5 py-1 font-mono text-xs text-slate-400"
                        >
                            {skill}
                            <Button
                                isIconOnly
                                onClick={() => {
                                    void handleRemoveSkill(skill);
                                }}
                                label=""
                                icon={
                                    <CrossIcon className="h-2 w-2 text-slate-600 hover:text-red-400" />
                                }
                            />
                        </span>
                    );
                })}
            </div>
            <div className="flex items-baseline gap-3">
                <div className="flex-8">
                    <div className="relative flex items-center rounded-md focus-within:outline-1 focus-within:outline-blue-400">
                        <input
                            onChange={handleSkillChange}
                            className="border-border w-full rounded-md border bg-[#0c1020] px-3 py-1.5 placeholder:text-xs placeholder:text-slate-600 focus:outline-none"
                            placeholder="Add a skill..."
                            type="text"
                            value={skillValue}
                        />
                    </div>
                </div>
                <Button
                    className="h-10"
                    label="Add"
                    variant={ButtonVariant.SECONDARY}
                    type="submit"
                    onClick={onAddSkill}
                />
            </div>
        </div>
    );
};

export { SkillsSection };
