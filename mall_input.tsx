'use client'
import React from 'react'
import styles from './component.module.css'
import {VscEye} from 'react-icons/vsc'
import {VscEyeClosed} from 'react-icons/vsc'

type Props = {
    label: string,
    onChange:any,
    value:string,
    placeholder:string,
    type?:string
    textarea?:boolean
    maxLength?: number;
}

const Input = ({label,placeholder,value,onChange,type,textarea,...props}: Props) => {
  return (
    <div className={styles.inpbox}>
       <div className={styles.label}>{label}</div>
         <div className={styles.passwordandeye}>
           {textarea?(
            <textarea style={{height:100}} onChange={onChange} value={value} placeholder={placeholder} className={styles.inp} />
            ):
            <input onChange={onChange} type={type} value={value} placeholder={placeholder} className={styles.inp} {...props}/>
            }
           {label==='Password'?
              <div className={styles.eye}>
                <VscEye size={30} color="#363636" />
              </div>
            :null}
         </div>
    </div>
  )
}

export default Input