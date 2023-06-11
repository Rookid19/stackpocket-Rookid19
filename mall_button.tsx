'use client'

import React from 'react'
import styles from './Buttons.module.css'
import {BiRightArrowAlt} from 'react-icons/bi'
import ReactLoading from 'react-loading'
type Props = {
    text:string,
    action:()=>void,
    type:'outline'|'standard',
    variant?:boolean,
    style?:React.CSSProperties
    loading?:boolean
    disabled?:boolean
}

function Button({text,action,type,variant,style,loading,...props}: Props) {
  return (
    <button style={style} className={`${type === 'outline'?styles.outline:styles.standard} ${variant?styles.search:null} `} onClick={action} {...props}> 
      <div className={styles.txt2}>{text}</div>
      {loading? <ReactLoading 
                        type={"spin"}
                        color={"#fff"}
                        height={24}
                        width={24}
                      />:<BiRightArrowAlt style={{margin:7}} size={24} color={'#fff'}/>}
    </button>
  )
}

export default Button