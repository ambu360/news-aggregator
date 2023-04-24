import styles from '@/styles/TopicsList.module.scss'
import { Dispatch, SetStateAction, useEffect } from 'react'
import SingleTopic from '../singleTopic/SingleTopic.component'
import { TopicType } from '@/pages'
interface TopicListProps {
    topicsList: TopicType[]

}


export default function TopicsList({ topicsList }: TopicListProps) {

    return (
        <main className={styles.topicListContainer}>
            {topicsList?.map((topic: TopicType) => {
                return (
                    <div key={topic.topic}>
                        <SingleTopic topic={topic} />
                    </div>
                )
            })}
        </main>
    )
}