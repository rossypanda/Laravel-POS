import React,{useState} from 'react';
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Tags(props) {
        return (
            <div className="tags-input-view">
                <ul id="tags">
                    {props.tags.map((tag, index) => (
                        <li key={index} className="tag">
                            <span className='tag-title' style={{paddingRight:"0.5rem"}}>{tag}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
}



export default Tags;
