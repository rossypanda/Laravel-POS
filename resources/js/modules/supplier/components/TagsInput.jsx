import React,{useState} from 'react';
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function TagsInput(props) {
        const [tags, setTags] = useState(props.tags);
        const removeTags = indexToRemove => {
            setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        };
        const addTags = event => {
            if (event.target.value !== "") {
              
                setTags([...tags, event.target.value]);
                props.selected([...tags, event.target.value]);
                event.target.value="";

        
            }
        };
        return (
            <div className="tags-input">
                <ul id="tags">
                    {tags.map((tag, index) => (
                        <li key={index} className="tag">
                            <span className='tag-title' style={{paddingRight:"0.5rem"}}>{tag}</span>
                            <FontAwesomeIcon icon={faTimesCircle} className="icon-space" onClick={() => removeTags(index)} />
                        </li>
                    ))}
                </ul>
                <input id="add-tag"
                    type="text"
                    onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                    placeholder="Press enter to add tags"
                />
            </div>
        );
}



export default TagsInput;
