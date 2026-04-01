type Properties = {
    recruiterInitial: string;
    recruiterName: string | null;
};

const JobCardFooter: React.FC<Properties> = ({
    recruiterInitial,
    recruiterName,
}) => {
    return (
        <div className="flex items-center justify-between border-t border-white/6 pt-3">
            <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-[9px] font-medium text-white">
                    {recruiterInitial}
                </div>
                <span className="text-[11px] text-slate-500">
                    {recruiterName}
                </span>
            </div>
            <span className="text-[11px] text-slate-600">View details →</span>
        </div>
    );
};

export { JobCardFooter };
