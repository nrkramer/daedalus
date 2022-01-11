// @flow
import React from 'react';
import { PopOver } from 'react-polymorph/lib/components/PopOver';
import SVGInline from 'react-svg-inline';
import questionMarkIcon from '../../../assets/images/question-mark.inline.svg';
import styles from './QuestionMarkTooltip.scss';

type Props = {
  key?: string,
  content: string | Node,
};

export function QuestionMarkTooltip(props: Props) {
  return (
    <PopOver offset={[0, 10]} key={props.key} content={props.content}>
      <span className={styles.questionMark}>
        <SVGInline svg={questionMarkIcon} />
      </span>
    </PopOver>
  );
}
