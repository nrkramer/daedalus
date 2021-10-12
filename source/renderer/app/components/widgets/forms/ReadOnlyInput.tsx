import React, { Component } from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { intlShape } from "react-intl";
import { Input } from "react-polymorph/lib/components/Input";
import { InputSkin } from "react-polymorph/lib/skins/simple/InputSkin";
import globalMessages from "../../../i18n/global-messages";
import styles from "./ReadOnlyInput.scss";
type Props = {
  label: string;
  value: string;
  onClick?: (...args: Array<any>) => any;
  isSet: boolean;
  withButton?: boolean;
};
export default @observer
class ReadOnlyInput extends Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired
  };

  render() {
    const {
      label,
      value,
      onClick,
      isSet,
      withButton
    } = this.props;
    const {
      intl
    } = this.context;
    const buttonLabel = intl.formatMessage(globalMessages[isSet ? 'change' : 'create']);
    const mainClasses = classnames([styles.component, isSet ? 'changeLabel' : 'createLabel']);
    return <div className={mainClasses}>
        <Input themeOverrides={styles} type="text" label={label} value={value} disabled skin={InputSkin} />

        {withButton && <button className={styles.button} onClick={onClick}>
            {buttonLabel}
          </button>}
      </div>;
  }

}