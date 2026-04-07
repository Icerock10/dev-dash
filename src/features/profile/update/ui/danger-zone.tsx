import { Button } from '~/shared/ui/components/components';
import { ButtonVariant } from '~/shared/libs/enums/enums';
import { DeleteIcon } from '~/shared/ui/icons/icons';

type Properties = {
    handleProfileDelete: () => Promise<void>;
};

const DangerZone: React.FC<Properties> = ({ handleProfileDelete }) => {
    return (
        <div className="rounded-lg border border-white/4 bg-[#161b27] p-5">
            <h2 className="mb-4 text-sm font-medium text-white">Danger zone</h2>
            <p className="mb-4 text-[12px] text-slate-500">
                Permanently delete your account and all data. This cannot be
                undone.
            </p>
            <Button
                icon={<DeleteIcon className="h-3 w-3" />}
                variant={ButtonVariant.SECONDARY}
                className="border-red-400/15 px-3 text-red-400!"
                label="Delete account"
                onClick={() => {
                    void handleProfileDelete();
                }}
            />
        </div>
    );
};

export { DangerZone };
