'use client';

import { useEffect, useState } from '~/shared/hooks/hooks';
import { createPortal } from 'react-dom';
import { CrossIcon } from '~/shared/ui/icons/icons';
import { Button } from './button';

type Properties = {
    title?: string;
    subTitle?: string;
    children: React.ReactNode;
    onClose?: () => void;
    isOpen: boolean;
    logo?: React.ReactNode;
};

const Modal: React.FC<Properties> = ({
    subTitle,
    title,
    children,
    isOpen,
    onClose,
    logo,
}) => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(
        null,
    );

    useEffect(() => {
        setPortalElement(document.body);
    }, []);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = isOpen ? 'hidden' : originalOverflow;
        return (): void => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    if (!portalElement || !isOpen) {
        return null;
    }

    return createPortal(
        <dialog
            open
            onClick={onClose}
            className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.75)]"
        >
            <div
                onClick={(event) => {
                    event.stopPropagation();
                }}
                className="mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-[#1e2a45] bg-[#111827]"
            >
                {title && (
                    <div className="flex items-center justify-between border-b border-[#1e2a45] px-6 py-5">
                        <div className="flex items-center gap-3">
                            {logo}
                            <div>
                                <h2 className="text-[16px] font-semibold text-white">
                                    {title}
                                </h2>
                                {subTitle && (
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {subTitle}
                                    </p>
                                )}
                            </div>
                        </div>
                        <Button
                            className="h-8 w-8 justify-center rounded-lg text-slate-500 transition-colors hover:bg-white/6 hover:text-white"
                            isIconOnly
                            icon={<CrossIcon />}
                            label=""
                            onClick={onClose}
                        />
                    </div>
                )}
                <div>{children}</div>
            </div>
        </dialog>,
        portalElement,
    );
};

export { Modal };
