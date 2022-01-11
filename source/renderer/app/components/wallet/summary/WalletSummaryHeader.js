// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import classnames from 'classnames';
import type { Reward } from '../../../api/staking/types';
import globalMessages from '../../../i18n/global-messages';
import BorderedBox from '../../widgets/BorderedBox';
import { QuestionMarkTooltip } from '../../widgets/tooltips/QuestionMarkTooltip';
import styles from './WalletSummaryHeader.scss';
import Wallet from '../../../domains/Wallet';
import { formattedWalletAmount } from '../../../utils/formatters';
import { DiscreetValue } from '../../../features/discreet-mode';

const messages = defineMessages({
  rewardsEarned: {
    id: 'wallet.summary.header.rewardsEarned',
    defaultMessage: '!!!rewards earned',
    description:
      'Label describing the rewards earned amount on the Wallet summary header',
  },
  rewardsUnspent: {
    id: 'wallet.summary.header.rewardsUnspent',
    defaultMessage: '!!!rewards unspent',
    description:
      'Label describing the rewards unspent amount on the Wallet summary header',
  },
  rewardsUnspendable: {
    id: 'wallet.summary.header.rewardsUnspendable',
    defaultMessage:
      '!!!info message about unspendable rewards due to missing utxos',
    description:
      'Tooltip describing that rewards are unspendable on the Wallet summary header',
  },
  transactionsLabel: {
    id: 'wallet.summary.header.transactionsLabel',
    defaultMessage: '!!!Number of transactions',
    description: '"Number of transactions" label on Wallet summary header page',
  },
  pendingTransactionsLabel: {
    id: 'wallet.summary.header.pendingTransactionsLabel',
    defaultMessage: '!!!Number of pending transactions',
    description:
      '"Number of pending transactions" label on Wallet summary header page',
  },
});

type Props = {
  wallet: Wallet,
  reward: Reward,
  numberOfRecentTransactions: number,
  numberOfTransactions?: number,
  numberOfPendingTransactions: number,
  isLoadingTransactions: boolean,
  currency?: Node,
};

@observer
export default class WalletSummaryHeader extends Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const {
      wallet,
      reward,
      numberOfPendingTransactions,
      numberOfRecentTransactions,
      numberOfTransactions,
      isLoadingTransactions,
      currency,
    } = this.props;
    const { intl } = this.context;
    const isLoadingAllTransactions =
      numberOfRecentTransactions && !numberOfTransactions;
    const numberOfTransactionsStyles = classnames([
      styles.numberOfTransactions,
      isLoadingAllTransactions ? styles.isLoadingNumberOfTransactions : null,
    ]);

    const numberOfPendingTransactionsStyles = classnames([
      styles.numberOfPendingTransactions,
    ]);

    const walletNameStyles = classnames([styles.walletName]);

    const walletAmountStyles = classnames([styles.walletAmount]);

    const isRestoreActive = wallet.isRestoring;

    const walletAmount = isRestoreActive
      ? '-'
      : formattedWalletAmount(wallet.amount, false);

    return (
      <div className={styles.component}>
        <BorderedBox>
          <div className={styles.walletContent}>
            <div>
              <div className={walletNameStyles}>{wallet.name}</div>
              <div className={walletAmountStyles}>
                <DiscreetValue>{walletAmount}</DiscreetValue>
                <span className={styles.currencyCode}>
                  {intl.formatMessage(globalMessages.adaUnit)}
                </span>
              </div>
              <div className={styles.rewards}>
                <span className={styles.rewardsAmount}>
                  <DiscreetValue>
                    {isRestoreActive
                      ? '-'
                      : formattedWalletAmount(
                          reward.total,
                          true,
                          false,
                          'ADA',
                          1
                        )}
                  </DiscreetValue>
                </span>{' '}
                {intl.formatMessage(messages.rewardsEarned)}{' '}
                {!reward.unspent.isZero() &&
                  reward.unspent.isLessThan(reward.total) && (
                    <>
                      <span className={styles.rewardsAmount}>
                        <DiscreetValue>
                          {isRestoreActive
                            ? '-'
                            : formattedWalletAmount(
                                reward.unspent,
                                true,
                                false,
                                'ADA',
                                1
                              )}
                        </DiscreetValue>
                      </span>{' '}
                      {intl.formatMessage(messages.rewardsUnspent)}
                    </>
                  )}
                {wallet.amount.isEqualTo(reward.total) && (
                  <QuestionMarkTooltip
                    content={intl.formatMessage(messages.rewardsUnspendable)}
                  />
                )}
              </div>
              {!isLoadingTransactions && (
                <div className={styles.transactionsCountWrapper}>
                  <div className={numberOfPendingTransactionsStyles}>
                    <span>
                      {intl.formatMessage(messages.pendingTransactionsLabel)}
                    </span>
                    :&nbsp;
                    <span>{numberOfPendingTransactions}</span>
                  </div>
                  <div className={numberOfTransactionsStyles}>
                    <span>
                      {intl.formatMessage(messages.transactionsLabel)}
                    </span>
                    :&nbsp;
                    <span>
                      {numberOfTransactions || numberOfRecentTransactions}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {currency}
          </div>
        </BorderedBox>
      </div>
    );
  }
}
