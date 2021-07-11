class ApiService {

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
    return res.results;
  }

  getPerson(id) {
    return this.getResource(`/people/${id}`)
  }

  async getAllPlanets() {
    const res = await this.getResource('/planets');
    return res.results
  }

  getPlanet(id) {
    return this.getResource(`/planets/${id}`)
  }

  async getAllStarships() {
    const res = await this.getResource('/starships')
    return res.results
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}`)
  }

}


const api = new ApiService()

api.getAllPeople().then((people) => {
  console.log(people)

  people.forEach((p) => {
    console.log(p.name)
  })
})


api.getPerson(14).then((person) => {
  console.log(person)
})


api.getAllPlanets().then((planets) => {
  console.log('****Planets: ')
  planets.forEach((planet) => {
    console.log(planet.name)
  })
})


api.getPlanet(44).then((planet) => {
  console.log(planet)
})