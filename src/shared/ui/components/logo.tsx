import { LogoIcon } from '~/shared/ui/icons/icons';

const Logo: React.FC = () => (
    <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
            <LogoIcon />
        </div>
        <span className="font-mono text-[15px] font-semibold tracking-tight text-white">
            DevDash
        </span>
    </div>
);

export { Logo };
