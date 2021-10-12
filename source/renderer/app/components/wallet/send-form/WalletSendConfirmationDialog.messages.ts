import { defineMessages } from "react-intl";
import globalMessages from "../../../i18n/global-messages";
import type { ReactIntlMessage } from "../../../types/i18nTypes";
export const getMessages = () => {
  const messages: Record<string, ReactIntlMessage> = defineMessages({
    dialogTitle: {
      id: 'wallet.send.confirmationDialog.title',
      defaultMessage: '!!!Confirm transaction',
      description: 'Title for the "Confirm transaction" dialog.'
    },
    passphraseLabel: {
      id: 'wallet.send.confirmationDialog.passphraseLabel',
      defaultMessage: '!!!Spending password',
      description: 'Label for the "Spending password" input in the wallet send confirmation dialog.'
    },
    addressToLabel: {
      id: 'wallet.send.confirmationDialog.addressToLabel',
      defaultMessage: '!!!To',
      description: 'Label for the "To" in the wallet send confirmation dialog.'
    },
    amountLabel: {
      id: 'wallet.send.confirmationDialog.amountLabel',
      defaultMessage: '!!!Amount',
      description: 'Label for the "Amount" in the wallet send confirmation dialog.'
    },
    feesLabel: {
      id: 'wallet.send.confirmationDialog.feesLabel',
      defaultMessage: '!!!Fees',
      description: 'Label for the "Fees" in the wallet send confirmation dialog.'
    },
    totalLabel: {
      id: 'wallet.send.confirmationDialog.totalLabel',
      defaultMessage: '!!!Total',
      description: 'Label for the "Total" in the wallet send confirmation dialog.'
    },
    passphraseFieldPlaceholder: {
      id: 'wallet.send.confirmationDialog.passphraseFieldPlaceholder',
      defaultMessage: '!!!Type your spending password',
      description: 'Placeholder for the "Spending password" inputs in the wallet send confirmation dialog.'
    },
    flightCandidateWarning: {
      id: 'wallet.send.confirmationDialog.flightCandidateWarning',
      defaultMessage: '!!!{Warning}, flight candidate versions of Daedalus are connected to Cardano mainnet. If you confirm this transaction, your ada will be sent for real.',
      description: 'Text for the "Flight candidate" warning in the wallet send confirmation dialog.'
    },
    flightCandidateCheckboxLabel: {
      id: 'wallet.send.confirmationDialog.flightCandidateCheckboxLabel',
      defaultMessage: '!!!I understand that real ada will be moved as part of this transaction and that this action is irreversible.',
      description: 'Label for the "Flight candidate" warning checkbox in the wallet send confirmation dialog.'
    },
    sendButtonLabel: {
      id: 'wallet.send.confirmationDialog.submit',
      defaultMessage: '!!!Send',
      description: 'Label for the send button in the wallet send confirmation dialog.'
    },
    backButtonLabel: {
      id: 'wallet.send.confirmationDialog.back',
      defaultMessage: '!!!Back',
      description: 'Label for the back button in the wallet send confirmation dialog.'
    },
    passwordErrorMessage: {
      id: 'wallet.send.confirmationDialog.passwordError',
      defaultMessage: '!!!Incorrect spending password.',
      description: 'Label for password error in the wallet send confirmation dialog.'
    },
    emptyingWarning: {
      id: 'wallet.send.confirmationDialog.emptyingWarning',
      defaultMessage: "!!!Warning: This transaction will reduce your wallet's balance to less than 2 ada. Your wallet's balance should always be over 2 ada to spend future staking rewards.",
      description: "Warning: This transaction will reduce your wallet's balance"
    }
  });
  messages.fieldIsRequired = globalMessages.fieldIsRequired;
  return messages;
};