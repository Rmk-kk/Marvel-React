import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useEffect, useState} from "react";
import MarvelServices from "../_MarvelServices/marvelServices";
import Spinner from "../spinner/spinner";
import Error404 from "../Error404/error";

const RandomChar = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [char, setChar] = useState(null);

    useEffect(() => {
        updateCharacter()
    }, [])

    const marvelCharacter  = new MarvelServices();

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const updateCharacter = () => {
        setLoading(true);
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        marvelCharacter
            .getCharacterById(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const errorMessage = error ? <Error404/> : null;
    const loadingMessage = loading ? <Spinner/> : null;
    const contentMessage = !(loading || error ||!char) ? <View char = { char } /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {loadingMessage}
            {contentMessage}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                        onClick={updateCharacter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const { name, description, thumbnail, wiki, homepage } = char;
    let imageStyle;
    if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imageStyle = { objectFit : "contain" }
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imageStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;