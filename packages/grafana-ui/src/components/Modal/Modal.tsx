import React, { useContext } from 'react';
import { Portal } from '../Portal/Portal';
import { css, cx } from 'emotion';
import { GrafanaTheme, ThemeContext } from '../..';

const getStyles = (theme: GrafanaTheme) => ({
  modal: css`
    position: fixed;
    z-index: ${theme.zIndex.modal};
    width: 100%;
    background: ${theme.colors.pageBg};
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    background-clip: padding-box;
    outline: none;

    max-width: 750px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 10%;
  `,
  modalBackdrop: css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: ${theme.zIndex.modalBackdrop};
    background-color: ${theme.colors.bodyBg};
    opacity: 0.8;
    backdrop-filter: blur(4px);
  `,
  modalHeader: css`
    background: ${theme.background.pageHeader};
    box-shadow: ${theme.shadow.pageHeader};
    border-bottom: 1px solid ${theme.colors.pageHeaderBorder};
    display: flex;
  `,
  modalHeaderTitle: css`
    font-size: ${theme.typography.heading.h3};
    padding-top: calc(${theme.spacing.d} * 0.75);
    margin: 0 calc(${theme.spacing.d} * 3) 0 calc(${theme.spacing.d} * 1.5);
  `,
  modalHeaderClose: css`
    margin-left: auto;
    padding: 9px ${theme.spacing.d};
  `,
  modalContent: css`
    padding: calc(${theme.spacing.d} * 2);
  `,
});

interface Props {
  title: string | JSX.Element;
  isOpen?: boolean;
  onDismiss?: () => void;
  onClickBackdrop?: () => void;
}

export const Modal: React.FC<Props> = props => {
  const onDismiss = () => {
    if (props.onDismiss) {
      props.onDismiss();
    }
  };

  const onClickBackdrop = () => {
    onDismiss();
  };
  const { title, isOpen = false } = props;
  const theme = useContext(ThemeContext);
  const styles = getStyles(theme);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={cx(styles.modal)}>
        <div className={cx(styles.modalHeader)}>
          {typeof title === 'string' ? <h2 className={cx(styles.modalHeaderTitle)}>{title}</h2> : <>{title}</>}
          <a className={cx(styles.modalHeaderClose)} onClick={onDismiss}>
            <i className="fa fa-remove" />
          </a>
        </div>
        <div className={cx(styles.modalContent)}>{props.children}</div>
      </div>
      <div className={cx(styles.modalBackdrop)} onClick={props.onClickBackdrop || onClickBackdrop} />
    </Portal>
  );
};