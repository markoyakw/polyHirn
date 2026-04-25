import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FocusTrap } from 'focus-trap-react';

type TPortalProps = {
    children: ReactNode,
    containerId?: string,
    focusTrap?: boolean,
    lockBodyScroll?: boolean,
}

const Portal: FC<TPortalProps> = ({
    children,
    containerId = 'portal-root',
    focusTrap = false,
    lockBodyScroll = false,
}) => {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLElement | null>(null);
    const createdByPortalRef = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;

        let container = document.getElementById(containerId) as HTMLElement | null;

        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            document.body.appendChild(container);
            createdByPortalRef.current = true;
        } else {
            createdByPortalRef.current = false;
        }

        containerRef.current = container;
        setMounted(true);

        return () => {
            if (createdByPortalRef.current && containerRef.current?.parentNode) {
                containerRef.current.parentNode.removeChild(containerRef.current);
            }
            containerRef.current = null;
            createdByPortalRef.current = false;
            setMounted(false);
        };
    }, [containerId]);

    useEffect(() => {
        if (!mounted || !lockBodyScroll || typeof document === 'undefined') return;

        const { body } = document;
        const previousOverflow = body.style.overflow;

        body.style.overflow = 'hidden';

        return () => {
            body.style.overflow = previousOverflow;
        };
    }, [mounted, lockBodyScroll]);

    if (!mounted || !containerRef.current) return null;

    const content = focusTrap ? (
        <FocusTrap>
            <>{children}</>
        </FocusTrap>
    ) : (
        <>{children}</>
    );

    return createPortal(content, containerRef.current);
}

export default Portal;