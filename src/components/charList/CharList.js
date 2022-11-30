import './charList.scss';
import {useState, useEffect, useRef} from "react";
import MarvelServices from "../_MarvelServices/marvelServices";
import Error404 from "../Error404/error";
import Spinner from "../spinner/spinner";
import PropTypes from "prop-types";
import React from "react";

const CharList = (props) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [charList, setCharList] = useState([]);
    const [newCharactersLoading, setNewCharactersLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const marvelServices = new MarvelServices();

    useEffect(() => {
        onRequest();
    }, [])


    const onRequest = (offset) => {
        onCharListLoading();
        marvelServices.getAllCharacters(offset)
            .then(onCharLoaded)
            .catch(onError)
    }

    //SERVICES
    // const onLoading = () => {
    //     setLoading(true);
    // }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    //Load more characters
    const onCharListLoading = () => {
        setNewCharactersLoading(true);
    }

    const onCharLoaded = (newCharList) => {
        let end = false;
        if(newCharList.length < 9) {
            end = true;
        }
        setCharList([...charList, ...newCharList])
        setLoading(false);
        setNewCharactersLoading(false)
        setOffset( offset => offset + 9)
        setCharEnded(end);
    }

    //set Focus on Element
    const tabChars = useRef([]);

    const onFocus = (id) => {
        tabChars.current.forEach(item => item.classList.remove('char__item_selected'));
        tabChars.current[id].classList.add('char__item_selected');
        tabChars.current[id].focus();
    }


    const createContent = (data) => {
        const items = data.map((item, i) => {
            let imgStyle = {objectFit : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <li onClick={() => {
                    props.onCharacterUpdate(item.id);
                    onFocus(i)
                }}
                    onKeyPress={(e) => {
                        if(e.key === ' ' || e.key === 'Enter'){
                            props.onCharacterUpdate(item.id);
                            onFocus(i)
                        }
                    }}
                    tabIndex={0}
                    ref = {(el) => tabChars.current[i] = el}
                    className="char__item"
                    key={item.id}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const allCharacters = createContent(charList);
    const errorMessage = error ? <Error404/> : null;
    const loadingMessage = loading ? <Spinner/> : null;
    const content = !(loading || error) ? allCharacters : null;

    return (
    <div className="char__list">
        {content}
        {errorMessage}
        {loadingMessage}
        <button className={`button button__main button__long`}
                style = {{'display' : charEnded ? 'none' : 'block'}}
                disabled={newCharactersLoading}
                onClick={() => onRequest(offset)}>
            <div className="inner">load more</div>
        </button>
    </div>
    )
}

CharList.propsType = {
    onCharacterUpdate : PropTypes.func.isRequired
}
export default CharList;

