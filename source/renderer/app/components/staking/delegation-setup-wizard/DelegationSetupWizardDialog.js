// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { get } from 'lodash';
import DelegationStepsSuccessDialog from './DelegationStepsSuccessDialog';
import DelegationStepsChooseWalletDialog from './DelegationStepsChooseWalletDialog';
import DelegationStepsConfirmationDialog from './DelegationStepsConfirmationDialog';
import DelegationStepsIntroDialog from './DelegationStepsIntroDialog';
import DelegationStepsNotAvailableDialog from './DelegationStepsNotAvailableDialog';
import DelegationStepsChooseStakePoolDialog from './DelegationStepsChooseStakePoolDialog';
import LocalizableError from '../../../i18n/LocalizableError';
import StakePool from '../../../domains/StakePool';
import Wallet from '../../../domains/Wallet';
import type { DelegationCalculateFeeResponse } from '../../../api/staking/types';
import type { HwDeviceStatus } from '../../../domains/Wallet';

type Props = {
  activeStep: number,
  isDisabled: boolean,
  onBack: Function,
  onClose: Function,
  onConfirm: Function,
  onContinue: Function,
  onLearnMoreClick: Function,
  onSelectWallet: Function,
  onSelectPool: Function,
  isWalletAcceptable: Function,
  maxDelegationFunds: number,
  stepsList: Array<string>,
  wallets: Array<Wallet>,
  minDelegationFunds: number,
  recentStakePools: Array<StakePool>,
  stakePoolsList: Array<StakePool>,
  onOpenExternalLink: Function,
  currentTheme: string,
  selectedWallet: ?Wallet,
  selectedPool: ?StakePool,
  stakePoolJoinFee: ?DelegationCalculateFeeResponse,
  isSubmitting: boolean,
  error: ?LocalizableError,
  futureEpochStartTime: string,
  currentLocale: string,
  getStakePoolById: Function,
  hwDeviceStatus: HwDeviceStatus,
  isTrezor: boolean,
  onThumbPoolSelect: Function,
};

const getOversaturationPercentage = (
  selectedWallet: ?Wallet,
  selectedPool: ?StakePool,
  maxDelegationFunds: number
): number => {
  if (
    !selectedPool ||
    !selectedWallet ||
    (selectedWallet.lastDelegatedStakePoolId ||
      selectedWallet.delegatedStakePoolId) === selectedPool.id
  )
    return 0;

  const percentageIncrease = Number(
    (100 / maxDelegationFunds) * selectedWallet.availableAmount
  );
  return selectedPool.saturation + percentageIncrease - 100;
};

@observer
export default class DelegationSetupWizardDialog extends Component<Props> {
  componentDidUpdate(prevProps: Props) {
    // On confirm delegation step, wait for API stake pool "join" endpoint response
    // and redirect to "Ta-Da" step
    if (
      prevProps.isSubmitting &&
      !this.props.isSubmitting &&
      !this.props.error
    ) {
      prevProps.onContinue();
    }
  }

  render() {
    const {
      activeStep,
      isDisabled,
      onBack,
      onClose,
      onConfirm,
      onContinue,
      onLearnMoreClick,
      onSelectWallet,
      onSelectPool,
      stepsList,
      wallets,
      minDelegationFunds,
      recentStakePools,
      stakePoolsList,
      onOpenExternalLink,
      currentTheme,
      selectedWallet,
      selectedPool,
      isWalletAcceptable,
      stakePoolJoinFee,
      futureEpochStartTime,
      currentLocale,
      isSubmitting,
      error,
      getStakePoolById,
      hwDeviceStatus,
      isTrezor,
      maxDelegationFunds,
      onThumbPoolSelect,
    } = this.props;

    const selectedWalletId = get(selectedWallet, 'id', null);
    const oversaturationPercentage = getOversaturationPercentage(
      selectedWallet,
      selectedPool,
      maxDelegationFunds
    );

    if (isDisabled) {
      return (
        <DelegationStepsNotAvailableDialog
          minDelegationFunds={minDelegationFunds}
          onClose={onClose}
        />
      );
    }

    let content = null;
    switch (activeStep) {
      case 1:
        content = (
          <DelegationStepsChooseWalletDialog
            numberOfStakePools={stakePoolsList.length}
            stepsList={stepsList}
            wallets={wallets}
            minDelegationFunds={minDelegationFunds}
            selectedWalletId={selectedWalletId}
            onBack={onBack}
            onClose={onClose}
            onSelectWallet={onSelectWallet}
            isWalletAcceptable={isWalletAcceptable}
            getStakePoolById={getStakePoolById}
          />
        );
        break;
      case 2:
        content = (
          <DelegationStepsChooseStakePoolDialog
            stepsList={stepsList}
            recentStakePools={recentStakePools}
            stakePoolsList={stakePoolsList}
            selectedWallet={selectedWallet}
            onOpenExternalLink={onOpenExternalLink}
            currentTheme={currentTheme}
            selectedPool={selectedPool}
            onClose={onClose}
            onBack={onBack}
            onSelectPool={onThumbPoolSelect}
            onContinue={onSelectPool}
            oversaturationPercentage={oversaturationPercentage}
            onThumbPoolSelect={onThumbPoolSelect}
          />
        );
        break;
      case 3:
        content = (
          <DelegationStepsConfirmationDialog
            transactionFee={stakePoolJoinFee}
            selectedPool={selectedPool}
            selectedWallet={selectedWallet}
            stepsList={stepsList}
            onClose={onClose}
            onConfirm={onConfirm}
            onBack={onBack}
            isSubmitting={isSubmitting}
            error={error}
            hwDeviceStatus={hwDeviceStatus}
            onExternalLinkClick={onOpenExternalLink}
            isTrezor={isTrezor}
            oversaturationPercentage={oversaturationPercentage}
          />
        );
        break;
      case 4:
        content = (
          <DelegationStepsSuccessDialog
            delegatedWallet={selectedWallet}
            delegatedStakePool={selectedPool}
            futureEpochStartTime={futureEpochStartTime}
            currentLocale={currentLocale}
            onClose={onClose}
          />
        );
        break;
      default:
        content = (
          <DelegationStepsIntroDialog
            onLearnMoreClick={onLearnMoreClick}
            onClose={onClose}
            onContinue={onContinue}
          />
        );
        break;
    }

    return content;
  }
}
