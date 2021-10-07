import './App.css';
import { useState } from 'react';

const App = () => {

  const [sourceText, setSourceText] = useState("Halo selamat datang!")
  const [targetText, setTargetText] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleTranslate = () => {

    setTargetText("")
    
    if (sourceText !== "") {
      setIsLoading(true)
      fetch("https://damp-tor-79736.herokuapp.com/https://translate.google.com/translate_a/single?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969", {
        body: `sl=id&tl=en&q=${sourceText}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        mode: "cors"
      }).then(async res => {
        if (res) {
          setIsError(false)
          const resjson = await res.json()

          setIsLoading(false)
          setTargetText(resjson.sentences[0].trans)
        }
      }).catch(err => {
        setIsError(true)
        setTargetText(err.message)
      })
    }
  }

  const handleChange = (e) => {
    setSourceText(e.target.value)
  }

  const copyText = () => {
    navigator.clipboard.writeText(targetText)
  }

  return (
    <div className="App">
      <header>
        <h1>Translation App</h1>
      </header>

      <main>
        <div className="container">
          <div className="source">
            <h5>Indonesian</h5>
            <textarea placeholder="Type here ..."
              spellCheck={false}
              autoFocus={true}
              onChange={handleChange}
              maxLength={60}
              value={sourceText} />

            <div className={`text-counter ${sourceText.length >= 60 ? 'reached' : ''}`}>
              { sourceText.length }/60
            </div>

            <div className="actions">
              <button title="Click to translate"
                onClick={handleTranslate}
                className="translate-button">

                Translate

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>
              </button>
            </div>

          </div>
          <div className="target">
            <h5>English</h5>
            <textarea placeholder={ isLoading ? "Loading..." : "Translation"}
              spellCheck={false}
              readOnly={true}
              value={targetText}
              tabIndex="-1"
              className={isError ? "err" : ""} />

            <div className="actions">
              <button title="Copy"
                onClick={copyText}>

                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
