type Properties = {
    title: string;
    subTitle: string;
    children: React.ReactNode;
};

const Header: React.FC<Properties> = ({ title, subTitle, children }) => {
    return (
        <header className="flex flex-col justify-between gap-4 border-b border-white/6 px-6 py-4 md:flex-row">
            <div>
                <h1 className="text-[18px] font-semibold text-white">
                    {title}
                </h1>
                <p className="mt-0.5 text-xs text-slate-500">{subTitle}</p>
            </div>
            <div className="flex items-center gap-2">{children}</div>
        </header>
    );
};

export { Header };
