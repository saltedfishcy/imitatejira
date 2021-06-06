import React from 'react'
import { useArray, useMount } from '../../utils';

interface personsType {
  username: string; 
  age: number
}

export const Test = () => {
  const persons: personsType[] = [
    {username: 'jack', age: 25},
    {username: 'ma', age: 25},
  ]

  const {value, clear, removeIndex, add} = useArray(persons);
  
  useMount(() => {

  });

  return <div>
    {/* // 点击增加jhon */}
    <button onClick={()=> add({username: 'jone', age: 22})}>add john</button>
    {/* // 点击删除 */}
    <button onClick={()=> removeIndex(0)}>remove 0</button>
    {/* // 点击清空 */}
    <button style={{marginBottom: '50px'}} onClick={()=> clear()}>clear</button>
    {
      value.map((item: personsType, index: number) => {
        return <div style={{marginBottom: '30px'}} key={index}>
             <span style={{color: 'red'}}>{index}</span>
             <span >{item.username}</span>
             <span >{item.age}</span>
           </div>
      })
      // value.map((person: {age: number, username: string}, index: number)=> {
      //   <div style={{marginBottom: '30px'}}>
      //     <span style={{color: 'red'}}>{index}</span>
      //     <span >{person.username}</span>
      //     <span >{person.age}</span>
      //   </div>
      // })
    }
  </div>
}