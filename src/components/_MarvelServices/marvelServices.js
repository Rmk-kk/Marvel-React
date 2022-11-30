class MarvelServices {
    // _apiKey = 'apikey=bf94d78dd6fa9ecaad0f9246b65040ae';
    // _apiKey = 'apikey=86f162977f689c4d1d3b5113212660be';
    _apiKey = 'apikey=015178ea8f69fd98930d419492536ff9';
    // _apiKey = 'apikey=b9a998cfcc1d4e6636fc426815906e0b';
    _url = 'https://gateway.marvel.com:443/v1/public';
    _baseOffset = 0;
    //Basic request
   getResource = async (url) => {
       let res = await fetch(url);
       if(!res.ok) {
           throw new Error(`Could not connect to ${url}, error ${res.status}`);
       }

       return await res.json()
   }

   getAllCharacters = async (offset = this._baseOffset) => {
       const chars =  await this.getResource(`${this._url}/characters?limit=9&offset=${offset}&${this._apiKey}`);
       return chars.data.results.map(this._transformData);
   }

   getCharacterById = async (id) => {
       const characters = await this.getResource(`${this._url}/characters/${id}?${this._apiKey}`);
       return this._transformData(characters.data.results[0])
   }

   _transformData = (characters) => {
       return {
                   name: characters.name,
                   description: characters.description,
                   thumbnail: characters.thumbnail.path + '.' + characters.thumbnail.extension,
                   wiki: characters.urls[1].url,
                   homepage: characters.urls[0].url,
                   id: characters.id,
                   comics: characters.comics.items
               }
    }
}

export default MarvelServices;