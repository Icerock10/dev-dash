import Link from 'next/link';

type Properties = {
    title: string;
    href?: string;
    linkLabel?: string;
};

const SectionHeader: React.FC<Properties> = ({
    title,
    href,
    linkLabel = 'View all →',
}) => (
    <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-white">{title}</h2>
        {href && (
            <Link
                className="text-[11px] text-slate-500 hover:text-slate-300"
                href={href}
            >
                {linkLabel}
            </Link>
        )}
    </div>
);

export { SectionHeader };
