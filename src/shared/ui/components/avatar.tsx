const CHAR_INDEX = 0;

type Properties = {
    userName?: string | null;
};

const Avatar: React.FC<Properties> = ({ userName }) => {
    if (!userName) {
        return null;
    }
    const firstChar = userName.charAt(CHAR_INDEX).toUpperCase();

    return (
        <div className="flex items-center gap-2.5 border-t border-white/6 px-2 pt-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-xs font-semibold text-white">
                {firstChar}
            </div>
            <div className="text-xs leading-tight font-medium text-white">
                <p>{userName}</p>
                <span className="text-[11px] leading-tight text-slate-500">
                    Open to work
                </span>
            </div>
            <div className="ml-auto h-2 w-2 rounded-full bg-emerald-400"></div>
        </div>
    );
};

export { Avatar };
