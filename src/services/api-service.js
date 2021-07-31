export default class ApiService {

    _apiBase = 'https://swapi.dev/api'
  
    async getResource(url) {
      const response = await fetch(`${this._apiBase}${url}`);
      if (!response.ok) {
        throw new Error(`Could not fecth ${url}. Response status ${response.status}.`)
      }
      return await response.json()
    }
  
    async getAllPeople() {
      const res = await this.getResource(`/people`);
      return res.results.map(this._transformPersonOutput);
    }
  
    async getPerson(id) {
      const person = await this.getResource(`/people/${id}`)
      return this._transformPersonOutput(person)
    }
  
    async getAllPlanets() {
      const res = await this.getResource('/planets');
      return res.results.map(this._transformPlanetOutput)
    }
  
    async getPlanet(id) {
      const planet = await this.getResource(`/planets/${id}`)
      return this._transformPlanetOutput(planet)
    }
  
    async getAllStarships() {
      const res = await this.getResource('/starships')
      return res.results.map(this._transformStarshipOutput)
    }
  
    async getStarship(id) {
      const starship = await this.getResource(`/starships/${id}`)
      return this._transformStarshipOutput(starship)
    }
  

    _extractId(item) {
      const idRegExp = /\/([0-9]*)\/$/;
      return item.url.match(idRegExp)[1];
    }

    _transformPersonOutput(person) {
      return {
        id: this._extractId(person),
        name: person.name,
        gender: person.gender,
        birthYear: person.birthYear,
        eyeColor: person.eyeColor
      }
    }

    _transformStarshipOutput(starship) {
      return {
        id: this._extractId(starship),
        planetName: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        costInCredits: starship.costInCredits,
        length: starship.length,
        crew: starship.crew,
        passengers: starship.passengers,
        cargoCapacity: starship.cargoCapacity
      }
    }

    _transformPlanetOutput(planet) {
      return {
        id: this._extractId(planet),
        planetName: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter
      }
    }

  }
  