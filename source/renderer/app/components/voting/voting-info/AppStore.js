// @flow
import React from 'react';
import { injectIntl } from 'react-intl';
import SVGInline from 'react-svg-inline';
import QRCode from 'qrcode.react';
import downloadAppStoreIcon from '../../../assets/images/voting/download-app-store-icon-ic.inline.svg';
import downloadPlayStoreIcon from '../../../assets/images/voting/download-play-store-icon-ic.inline.svg';
import type { Intl } from '../../../types/i18nTypes';
import styles from './AppStore.scss';
import { messages } from './AppStore.messages';

type Props = {
  onAppleStoreLinkClick: Function,
  onAndroidStoreLinkClick: Function,
  intl: Intl,
};

function AppStore({
  onAppleStoreLinkClick,
  onAndroidStoreLinkClick,
  intl,
}: Props) {
  const appleAppButtonUrl = intl.formatMessage(messages.appleAppButtonUrl);
  const androidAppButtonUrl = intl.formatMessage(messages.androidAppButtonUrl);

  return (
    <div className={styles.component}>
      <div className={styles.appStoreItem}>
        <button
          className={styles.appStoreButton}
          onClick={() => {
            onAppleStoreLinkClick(appleAppButtonUrl);
          }}
        >
          <SVGInline
            svg={downloadAppStoreIcon}
            className={styles.appleStoreIcon}
          />
        </button>
        <div className={styles.qrCode}>
          <QRCode value={appleAppButtonUrl} size={75} renderAs="svg" />
        </div>
      </div>
      <div className={styles.appStoreItem}>
        <button
          className={styles.appStoreButton}
          onClick={() => {
            onAndroidStoreLinkClick(androidAppButtonUrl);
          }}
        >
          <SVGInline
            svg={downloadPlayStoreIcon}
            className={styles.playStoreIcon}
          />
        </button>
        <div className={styles.qrCode}>
          <QRCode value={androidAppButtonUrl} size={75} renderAs="svg" />
        </div>
      </div>
    </div>
  );
}

export default injectIntl(AppStore);
