const dict = {
  displayName: 'Italiano-Español',
  description: 'Diccionario Italiano-Español utilizando LibreTranslate API',

  async search(text) {
    text = text.trim().toLowerCase();

    const apiUrl = 'https://libretranslate.com/translate';
    const params = {
      q: text,
      source: 'it',
      target: 'es',
      format: 'text'
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      const translation = data.translatedText;

      return {
        phonetic: '',
        definitions: [{
          definition: translation,
          example: `Ejemplo: La palabra "${text}" se traduce como "${translation}" en español.`,
          synonyms: []
        }]
      };
    } catch (error) {
      return {
        phonetic: '',
        definitions: [{
          definition: `No se pudo obtener la traducción para "${text}". Error: ${error.message}`,
          example: '',
          synonyms: []
        }]
      };
    }
  }
};

module.exports = dict;
