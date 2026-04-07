import { z } from 'zod';
import { UpdateUserSkillValidationRule } from '../enums/enums';

const updateUserSkillSchema = z.object({
    skill: z
        .string()
        .min(UpdateUserSkillValidationRule.SKILL_MIN_LENGTH, {
            message: `Field length should be at least ${String(UpdateUserSkillValidationRule.SKILL_MIN_LENGTH)}`,
        })
        .trim(),
});

type UpdateSkillDto = z.infer<typeof updateUserSkillSchema>;

export { type UpdateSkillDto, updateUserSkillSchema };
