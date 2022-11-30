import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundry/errorBoundary";
import decoration from '../../resources/img/vision.png';
import {useState} from "react";

const App = () => {
    const [currentChar, setCurrentChar] = useState(null)

    const onCharacterUpdate = (id) => {
        setCurrentChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList
                            onCharacterUpdate = {onCharacterUpdate}
                        />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId = {currentChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;