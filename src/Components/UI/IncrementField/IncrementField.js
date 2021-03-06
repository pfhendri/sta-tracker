import React from 'react'

import Minus from '../../../assets/minus.svg'
import Plus from '../../../assets/plus.svg'
import styles from './IncrementField.scss'

const incrementField = (props) => (
  <div className={styles.IncrementField}>
    <div onClick={props.increment}><img src={Plus} alt='add to power'/></div>
    <div onClick={props.decrement}><img src={Minus} alt='minus from power'/></div>
  </div>
)

export default incrementField