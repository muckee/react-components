import React, {
    Fragment,
    ReactNode,
} from 'react';
import Backdrop from '@components/Backdrop';
import Button from '@components/Button';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Menu from '@components/Menu';
import Portal from '@components/Portal';
import Section from '@components/Section';

import styles from './Modal.module.css';

export interface ModalProps {
    handleClose: () => void;
    footerIsVisible?: boolean | undefined;
    show?: boolean | undefined;
    className?: string | undefined;
    mainClassName?: string | undefined;
    heading?: string | undefined;
    children?: ReactNode | undefined;
}

const Modal = (props: ModalProps) => {

    const {
        footerIsVisible = true,
        show,
        className,
        mainClassName,
        heading,
        children,
        handleClose,
    } = props;

    const backdropPortalId = 'thugnerdz-modal-backdrop-root';
    const modalPortalId = 'thugnerdz-modal-root';

    return <Fragment>

        {<Portal id={backdropPortalId}>
            <Backdrop onClick={handleClose} className={show ? ` ${styles.visible}` : ''} />
        </Portal>}

        {<Portal id={modalPortalId}>
            <div className={`${styles.modal}${show ? ` ${styles.visible}` : ''}${className ? ` ${className}` : ''}`}>

                <Section className={`${styles.modalMain}${mainClassName ? ` ${mainClassName}` : ''}`}>

                    {heading && <Header>
                        <h2>{heading}</h2>
                    </Header>}

                    {children}

                    {footerIsVisible && <Footer>
                        <Menu items={[
                            <Button
                                key={0}
                                type="button"
                                onClick={handleClose}
                            >
                                Close
                            </Button>,
                        ]} />
                    </Footer>}

                </Section>
            </div>
        </Portal>}

    </Fragment>;
};

export default Modal;