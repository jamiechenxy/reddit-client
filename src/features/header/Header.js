import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setSearchTerm} from "../reddits/redditsSlice";
import '../../css/Header.css';
import {FaReddit} from 'react-icons/fa';
import {BiSearch} from 'react-icons/bi';
import { selectSearchTerm } from "../reddits/redditsSlice";

export const Header = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    const [inputSearchTerm, setInputSearchTerm] = useState('');

    const handleSearchTermChange = (event) => {
        setInputSearchTerm(event.target.value);
    }

    useEffect(()=>{
        setInputSearchTerm(searchTerm);
    }, [searchTerm]);

    const handleSearchTermSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(inputSearchTerm));
    };


    return (
        <header>
            <div className="logo-container">
                <FaReddit id="logo"/>
                <h3 id="reddit-title"><span id="text-logo-reddit">Reddit</span><span id="text-logo-minimal">Minimal</span></h3>
            </div>
            <form className="search" onSubmit={handleSearchTermSubmit}>
                <input 
                    type="search" 
                    id="search-bar" 
                    placeholder="Search" 
                    onChange={handleSearchTermChange}
                    value={inputSearchTerm}
                />
                <button id="search-icon" onClick={handleSearchTermSubmit}>
                    <BiSearch />
                </button>
            </form>
        </header>
    )

}


