import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from "react";
import { 
    loadReddits, 
    onToggleComments, 
    selectReddits, 
    selectSelectedSubreddit, 
    setLocalVote
} from "./redditsSlice";
import '../../css/Reddits.css';
import {TiArrowUpOutline, TiArrowDownOutline, TiArrowUpThick, TiArrowDownThick} from 'react-icons/ti';
import {FaRegCommentAlt} from 'react-icons/fa';
import moment from "moment";
import { numTransform } from "../../util/util";
import { Comments } from "../comments/Comments";


export const Reddits = () => {
    const dispatch = useDispatch();
    const selectedReddits = useSelector(selectReddits);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);
    // const initialSubreddit = useSelector(selectInitialSubreddit);

    useEffect(() => {
        dispatch(loadReddits(selectedSubreddit));
    }, [dispatch, selectedSubreddit]);

    const getVoteType = (localVote) => {
        if (localVote===1) {
            return 'active-up-';
        }
        else if (localVote===-1) {
            return 'active-down-';
        } else {
            return '';
        }
    };

    const renderMedia = (is_video, url, media, title) => {
        if (is_video) {
            return (
            <video controls 
                height={media.reddit_video.height*0.8} 
                width={media.reddit_video.width*0.8} 
                src={`${media.reddit_video.fallback_url}`} 
                className="videos"
            >
                Oops! Your browser is not supported with this video...
            </video>
            );
        } 

        return url.includes('.jpg' || '.png' || '.tiff') ? <img alt={title} src={url}/> : '';
    }


    return (
        <div id="reddits-container">
            {
                selectedReddits && selectedReddits.map((reddit, index) => (
                    <div className="reddit-post-box" key={index}>
                        <div className="votable-column">
                            <button 
                                className={`${reddit.localVote ? 'active-' : ''}up-votes`}
                                onClick={() => reddit.localVote===1 ? dispatch(setLocalVote({index:index, vote:0})) : dispatch(setLocalVote({index:index, vote:1}))}
                            >
                                {reddit.localVote===1 ? <TiArrowUpThick className='active-arrow-icon'/> : <TiArrowUpOutline className="arrow-icon"/>}
                            </button>
                                <h4 className={`${getVoteType(reddit.localVote)}votes-number`}>
                                    {numTransform(reddit.ups - reddit.downs + (reddit.localVote))}
                                </h4>
                            <button 
                                className={`${reddit.localVote? 'active-' : ''}down-votes`}
                                onClick={() => reddit.localVote===-1 ? dispatch(setLocalVote({index:index, vote:0})) : dispatch(setLocalVote({index:index, vote:-1}))}
                            >
                                {reddit.localVote===-1 ? <TiArrowDownThick className='active-arrow-icon'/> : <TiArrowDownOutline className="arrow-icon"/>}
                            </button>
                        </div>
                        <div className="main-column">
                            <h3 className="title-img-section">
                                {reddit.title}
                            </h3>
                            { renderMedia(reddit.is_video, reddit.url, reddit.media, reddit.title) }
                            <ul className="info-comment-section">
                                <li className="author-name">{reddit.author}</li>
                                <li className="post-time">{moment.unix(reddit.created_utc).fromNow()}</li>
                                <li className="comments-info">
                                    <button className="comments-button" onClick={() => dispatch(onToggleComments(index))}> 
                                        <FaRegCommentAlt className="comments-icon"/>
                                    </button>
                                    {numTransform(reddit.num_comments)}
                                </li>
                            </ul>
                            {
                                reddit.showingComments ? reddit.comments.map(comment => <Comments comment={comment} index={index} key={comment.id} /> ) : ''
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
} 


