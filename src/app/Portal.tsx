import React, { useEffect, useState, memo } from 'react';
// import { createPortal } from 'react-dom';

import ReactDOM from 'react-dom';

type PortalProps = { id: string; children: React.ReactNode; closeModal: () => void; };

const PORTAL_ERROR_MSG = 'There is no portal container in markup. Please add portal container with proper id attribute.';

const Portal = memo<PortalProps>((props: PortalProps) => {
    const { id, children, closeModal } = props;
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (id) {
            const portalContainer = document.getElementById(id);

            if (!portalContainer) {
                throw new Error(PORTAL_ERROR_MSG);
            }

            setContainer(portalContainer);
        }
    }, [id]);

    useEffect(() => {
        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleEscapePress);

        return () => {
            window.removeEventListener('keydown', handleEscapePress);
        };
    }, [closeModal]);

    return container ? ReactDOM.createPortal(children, container) : null;
});

Portal.displayName = 'Portal';

type containerOptions = { id: string; mountNode?: HTMLElement; };

const createContainer = (options: containerOptions) => {
    if (document.getElementById(options.id)) {
        return;
    }

    const { id, mountNode = document.body } = options;

    const portalContainer = document.createElement('div');

    portalContainer.setAttribute('id', id);
    mountNode.appendChild(portalContainer);
};

export { createContainer, PORTAL_ERROR_MSG };
export default memo(Portal);