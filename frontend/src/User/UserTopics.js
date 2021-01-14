import React from "react";
import { observer, inject } from "mobx-react";
import "./User.sass"
import {ShortTopic} from "../Topics/ShortTopic";
import { Link } from "react-router-dom";

@inject("userStore")
@observer
export default class UserTopics extends React.Component {
    constructor(props) {
        super(props);
    }

    renderShortTopics(topics) {
        return topics.map((topic) => {
            let deleteLink = `/topic/delete/${topic.topic_id}`;
            let updateLink = `/topic/update/${topic.topic_id}`;
            return (
               <div key={topic.topic_id}>
                   <ShortTopic
                       topic_id={topic.topic_id}
                       title={topic.title}
                   />
                   <div className="modify_buttons">
                       <Link to={updateLink}>Modify</Link>
                       <Link to={deleteLink}>Delete</Link>
                   </div>
               </div>
            )
        })
    }

    componentDidMount() {
        if (!this.props.userStore.userTopics) {
            this.props.userStore.loadUserTopics();
        }
    }

    render() {
        if (this.props.userStore.userTopics) {
            const renderedTopics = this.renderShortTopics(this.props.userStore.userTopics);
            return (
                <div>
                    { renderedTopics }
                </div>
            )
        } else {
            return (
                <h3>Loading...</h3>
            )
        }
    }
}