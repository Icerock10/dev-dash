type Properties = {
    notes: string | null;
};

const JobPreviewNotes: React.FC<Properties> = ({ notes }) => {
    return (
        <div>
            <h1 className="mb-2.5 text-xs tracking-wide text-slate-500 uppercase">
                Notes
            </h1>
            <div className="max-h-44 overflow-y-auto rounded-xl border border-[#1e2a45] bg-[#0c1020] p-4 text-sm leading-relaxed text-slate-300">
                {notes === '' ? 'There are no notes yet...' : notes}
            </div>
        </div>
    );
};

export { JobPreviewNotes };
