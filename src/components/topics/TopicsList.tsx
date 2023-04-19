import styles from '@/styles/TopicsList.module.scss'
import { Dispatch,SetStateAction, useEffect } from 'react'

interface TopicListProps{
    topicsList:string[]
   
}


export default function TopicsList({topicsList}:TopicListProps){
console.log(topicsList)
    return(
        <main className={styles.topicListContainer}>
            {topicsList?.map((topic:string)=>{
                return (
                    <h1>{topic}</h1>
                )
            })}
        </main>
    )
}