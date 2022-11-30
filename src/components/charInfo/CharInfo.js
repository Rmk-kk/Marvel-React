import './charInfo.scss';
import MarvelServices from "../_MarvelServices/marvelServices";
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/spinner";
import Error404 from "../Error404/error";


const CharInfo = (props) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [character, setCharacter] = useState(null)

    const marvelServices = new MarvelServices();

    useEffect(() => {
        onUpdate();
    }, [props.charId])

    const onCharacterLoaded = (character) => {
        setCharacter(character);
        setLoading(false);
    }

    const onUpdate = () => {
        const { charId } = props;

        if(!charId) {
            return
        }

        onLoading();
        marvelServices.getCharacterById(charId)
            .then(onCharacterLoaded)
            .catch(onError)
    }

    const onLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const skeleton = character || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <Error404/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !character) ? <View char={character}/> : null;
    return (
        <div className="char__info">
            {spinner}
            {errorMessage}
            {content}
            {skeleton}
        </div>
    )
}

const View = ({char}) => {
    const {thumbnail, homepage, wiki, name, description, comics} = char;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr"> {description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {comics.map((item, i) => {
                    if(i > 9) {
                        return
                    }
                    return (
                        <li key = {i} className="char__comics-item">
                                {item.name}
                        </li>
                    )})}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    currentChar : PropTypes.number,
}

export default CharInfo;

