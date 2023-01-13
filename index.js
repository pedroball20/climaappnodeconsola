require("dotenv").config();
const {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        //mostrar mensaje
        const termino = await leerInput("Ciudad: ");
        //buscar los lugares
        const lugares = await busquedas.ciudad(termino);
        //seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id === "0") continue;
        
        const lugarSel = lugares.find((lugar) => lugar.id === id);
        //guardar en db
        busquedas.agregarHistorial(lugarSel.nombre)
        //clima
        const clima = await busquedas.climaLugar(lugarSel.ltd, lugarSel.lng);

        //mostrar resultado
        console.log("\n Informacion de la ciudad \n".green);
        console.log(`Ciudad : ${lugarSel.nombre}`.green);
        console.log(`Lat : ${lugarSel.ltd}`.green);
        console.log(`Lng : ${lugarSel.lng}`.green);
        console.log(`Temperatura : ${clima.temp}`.green);
        console.log(`Minima : ${clima.min}`.green);
        console.log(`Maxima : ${clima.max}`.green);
        console.log(`Como esta el clima: ${clima.desc.blue}`.green);

        break;
      case 2:
        // listar opt
        // busquedas.historial.forEach((lugar, i)=>{
        busquedas.historialCapitalizado.forEach((lugar, i)=>{
          const idx = `${i+1}. `.red
          console.log(`${idx} ${lugar}`)
        })
        break;
      default:
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
