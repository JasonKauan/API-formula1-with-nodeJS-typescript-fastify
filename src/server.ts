import fastify from "fastify";
import cors from "@fastify/cors"

const server = fastify({logger: true})

server.register(cors, {
    origin: "*"
})

const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes-AMG Petronas", base: "Brackley, United Kingdom" },
  { id: 3, name: "Ferrari", base: "Maranello, Italy" },
  { id: 4, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 5, name: "Aston Martin Aramco", base: "Silverstone, United Kingdom" },
  { id: 6, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 7, name: "Haas", base: "Kannapolis, United States" },
  { id: 8, name: "Racing Bulls (AlphaTauri)", base: "Faenza, Italy" },
  { id: 9, name: "Williams", base: "Grove, United Kingdom" },
  { id: 10, name: "Kick Sauber", base: "Hinwil, Switzerland" }
];

const drivers = [
  { id: 1, name: "Lando Norris", team: "McLaren", nationality: "British" },
  { id: 2, name: "Oscar Piastri", team: "McLaren", nationality: "Australian" },
  { id: 3, name: "Lewis Hamilton", team: "Ferrari", nationality: "British" },
  { id: 4, name: "Charles Leclerc", team: "Ferrari", nationality: "Monegasque" },
  { id: 5, name: "Max Verstappen", team: "Red Bull Racing", nationality: "Dutch" },
  { id: 6, name: "Yuki Tsunoda", team: "Red Bull Racing", nationality: "Japanese" },
  { id: 7, name: "George Russell", team: "Mercedes-AMG Petronas", nationality: "British" },
  { id: 8, name: "Andrea Kimi Antonelli", team: "Mercedes-AMG Petronas", nationality: "Italian" },
  { id: 9, name: "Fernando Alonso", team: "Aston Martin Aramco", nationality: "Spanish" },
  { id: 10, name: "Lance Stroll", team: "Aston Martin Aramco", nationality: "Canadian" },
  { id: 11, name: "Pierre Gasly", team: "Alpine", nationality: "French" },
  { id: 12, name: "Jack Doohan", team: "Alpine", nationality: "Australian" },
  { id: 13, name: "Esteban Ocon", team: "Haas", nationality: "French" },
  { id: 14, name: "Oliver Bearman", team: "Haas", nationality: "British" },
  { id: 15, name: "Yuki Tsunoda", team: "Racing Bulls", nationality: "Japanese" }, // Oops duplicate tsunoda, correct below
  { id: 16, name: "Isack Hadjar", team: "Racing Bulls", nationality: "French" },
  { id: 17, name: "Alex Albon", team: "Williams", nationality: "Thai" },
  { id: 18, name: "Carlos Sainz", team: "Williams", nationality: "Spanish" },
  { id: 19, name: "Nico Hulkenberg", team: "Kick Sauber", nationality: "German" },
  { id: 20, name: "Gabriel Bortoleto", team: "Kick Sauber", nationality: "Brazilian" },
];

server.get('/teams', async(request, response)=>{
    response.type("application.json").code(200)
    return[teams]
})

server.get("/drivers", async (request, response)=>{
    response.type("application.json").code(200)
    return [drivers]

    
})

interface DriverParams{
    id: string
}

server.get<{Params: DriverParams}>('/drivers/:id', async(request, response)=>{
    const id  = parseInt(request.params.id)
    const driver = drivers.find( d => d.id === id)

    if(!driver){
        response.type("application.json").code(404)
        return { message: "Driver Not Found"}
    }else {
        response.type("application.json").code(200)
        return { driver}
    }
})


server.listen({port: 3333}), () => {
    console.log("server init")
}