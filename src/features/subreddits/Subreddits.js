import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadSubreddits,
    selectSubreddits
} from "./subredditsSlice";
import { setSelectedSubreddit } from "../reddits/redditsSlice";
import '../../css/Subreddits.css';

export const Subreddits = () => {
    const dispatch = useDispatch();
    const allSubreddits =  useSelector(selectSubreddits);

    useEffect(() => {
        dispatch(loadSubreddits());
    },[dispatch]);

    return (
        <div className="subreddits-container">
            <h2>Subreddits</h2>
            <ul id="subreddits-column">
                {
                    allSubreddits && allSubreddits.map((subreddit, index) => (
                        <li className="subreddit-list" key={index}>
                            <button 
                                type="button" 
                                onClick={() => dispatch(setSelectedSubreddit(subreddit.display_name))}
                            > 
                                <img src={subreddit.icon_img || `https://api.adorable.io/avatars/25/${subreddit.display_name}`} 
                                    className="subreddit-icon" 
                                    style={{border: `0.15rem solid ${subreddit.primary_color}`}}
                                />
                                <span>{subreddit.display_name}</span>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );

}


