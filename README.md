# ESPE

## ALUMNO                         
### Guamialama Haro Edison Nicolas 

## Docente
### Ing. Angel Cudco

## Proyecto           

                     NIKO-GHOTEL 

# React + TypeScript + Vite

# Niko-GHotel

Este es un proyecto de gestión hotelera desarrollado con React y TypeScript. Permite gestionar clientes, habitaciones y reservas de manera eficiente.

## Funcionalidades

- **Gestión de Clientes**: Permite registrar y visualizar clientes.
- **Gestión de Habitaciones**: Visualiza las habitaciones disponibles y agrega nuevas.
- **Reserva de Habitaciones**: Los usuarios pueden hacer reservas para diferentes fechas.
- **Validación de Fechas**: El sistema valida las fechas de inicio y fin de la reserva.
- **Cálculo de Precio**: El precio total se calcula según las fechas de reserva y el tipo de habitación.

## Requisitos

verificar de  tener las siguientes herramientas instaladas:

- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [Git](https://git-scm.com/)

## Instalación

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. Clona el repositorio:

    ```bash
    git clone https://github.com/ENiko-Gh/Niko-GHotel.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd Niko-GHotel
    ```

3. Instalar las dependencias:

    ```bash
    npm install
    ```

4. Ejecuta el proyecto:

    ```bash
    npm run dev
    ```

    Esto abrirá la aplicación en tu navegador en [http://localhost:5173](http://localhost:5173/).

## Estructura del Proyecto

- `src/`: Contiene el código fuente de la aplicación.
- `public/`: Archivos estáticos como imágenes y el archivo `index.html`.
- `README.md`: Este archivo con la documentación.

## Contribución

1. Haz un fork del repositorio.
2. Crea una rama con el nombre de la funcionalidad que agregarás.
3. Realiza tus cambios y haz un commit.
4. Sube tu rama y abre un Pull Request.

### Paguina de inicio 

![pg-Inicion](poreliminar\PagInicio.jpg)

![pg-Inicion](poreliminar\PagResponsive.jpg)
es una pagina  responsive adaptadas para celulares con  un menu de navegacion  tipo hamburgursa se presenta mensaje de bienvenida  y sus opciones en habitaciones 
## Pagina HAbitaciones 

![pg-Inicion](poreliminar\Habitaciones.jpg)
se muestra la lista de  habitaiones  con su total  y las disponibles y asi mismo las wue estan ocupadas 
en el Gestion de Habitaciones  seleccionamos el tipo de Habitacion  no harroja el precio por noche  en este caso es uSD 50 al dar click en Agregar  habitacion  automaticamente se autualiza en el localstorage  y se visualiza en un habitacion menos en disponibilidad  si la eleccion es declinar habitacion automaticamente se suma ala disponibilidad  es para cuando ya la habitacion es desocupada  asi mantenemos visible la disponibilidad 

## Pagina Reservas 

Esta pagina se la utiliza cuando ya son clientes frecuentes  y lo pueden hacer via internet  o por otros medios redes sociales 

![pg-Inicion](poreliminar\NuevaReserva.jpg)
el cliente ya esta en la basede datos  selecciona   y luego  mira la disponibilidad de las habitaciones y selecciona la de su agrado ingresa la fecha de inicio  y la fecha de fin  automaticamente se visualiza el valor total  y el numero de dias  al dar click Registrar reserva  la informacion  se guarda en localstorage  y se visualiza en  lista de reservas visualizala informacion con mas detalle 

## Clientes

![pg-Inicion](poreliminar\Clientes.jpg)
esta pagina es para  registraar nuevos clientes  de forma manual una vez ingresado los datos en los campos  no permite campos en blanco  y damos click en Ingresar nuevo cliente  se guarda en el localstorage  y se visualiza en lista de clientes esta lista se actualiza para posterior ser utilizada como clientees freuentes y poderlo realizar por internet  esta tabla se puede actualizar o eliminar un cliente  si es mal cliente 


link 

https://github.com/ENiko-Gh/Niko-GHotel.git



## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
