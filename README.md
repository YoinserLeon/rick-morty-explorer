# Rick & Morty Explorer

**Proyecto personal de exploración de personajes inspirado en el universo de Rick & Morty.**

## Sobre mi proyecto

Desarrollé Rick & Morty Explorer como una aplicación web para consultar personajes y crear una colección personal de favoritos. Quise que la experiencia tuviera una identidad visual propia, por eso tomé como referencia la estética de ciencia ficción y los videojuegos retro: un fondo espacial oscuro, portales verdes, pequeños detalles de pixel art y tarjetas con bordes de colores neón.

Mi objetivo fue combinar esa parte visual con una aplicación que realmente se pueda utilizar. Desde la página principal puedo entrar al catálogo, buscar personajes, consultar sus detalles y guardar los que más me gustan. Cuando inicio sesión, también puedo entrar a mi galería para ver los personajes que he marcado como favoritos. La navegación muestra el nombre de la cuenta activa.

En el inicio incorporé una imagen de Rick y Morty con fondo transparente. También decidí mantener la navegación enfocada en las secciones que forman parte de esta versión: Inicio, Personajes y, una vez iniciada la sesión, Galería.

## Qué puedo hacer en la aplicación

- Explorar el catálogo de personajes y consultar sus fichas.
- Buscar personajes utilizando los datos de la API pública de Rick and Morty.
- Crear una cuenta local, iniciar sesión, cerrar sesión y cambiar la contraseña desde Configuración.
- Guardar y quitar personajes de Favoritos.
- Consultar los favoritos en **Mi galería**, una sección disponible después de iniciar sesión.
- Cambiar entre tema oscuro y claro; la preferencia se conserva en el navegador.

La aplicación utiliza la API pública de Rick and Morty: <https://rickandmortyapi.com/api>.

## Tecnologías que utilicé

- **Next.js con App Router:** para organizar las páginas y la navegación.
- **React y TypeScript:** para construir componentes y definir los tipos de los datos.
- **Tailwind CSS 4:** para los estilos y el diseño adaptable.
- **Zod:** para validar los datos de los formularios.
- **React Context:** para compartir el estado de autenticación local, tema y favoritos.
- **localStorage:** para conservar los datos de la experiencia local en el navegador.
- **react-icons:** para los iconos de la interfaz.
- **GitHub Desktop y GitHub:** para llevar el historial de cambios y publicar el código.
- **Vercel:** para desplegar la aplicación y compartirla mediante una dirección web.
- **gemini** Se verificaron error duarante la elaboracion y correciones de codigo mal ejecutados
- **ChatGPT** Ayudo a la leboracion del proyecto para organizacion y ejecucion de codigos.

## Cómo organicé los archivos

Separé las páginas por grupos de rutas para distinguir las zonas públicas, las pantallas de acceso y las secciones privadas. Los nombres entre paréntesis son grupos de organización de Next.js; no aparecen en las direcciones del navegador.

```text
src/
├── app/
│   ├── layout.tsx
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── precios/page.tsx
│   │   └── personajes/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── registro/page.tsx
│   └── (private)/
│       ├── layout.tsx
│       ├── dashboard/page.tsx
│       ├── configuracion/page.tsx
│       └── galeria/page.tsx
├── components/
│   ├── auth/private-guard.tsx
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── providers/
├── lib/
│   ├── auth/
│   │   ├── server.ts
│   │   └── client.ts
│   ├── api.ts
│   ├── schemas.ts
│   └── utils.ts
├── types/
└── proxy.ts
```

Dentro de `components` agrupé los elementos de interfaz por responsabilidad: átomos, moléculas y organismos. En `lib` coloqué la lógica reutilizable, las validaciones y las funciones para consultar la API. Los tipos compartidos están en `types`.

## Nota sobre las cuentas y los favoritos

Esta versión es una demostración sin backend ni base de datos. Las cuentas, la sesión del navegador y los favoritos se almacenan localmente. Esto permite probar el flujo en el mismo navegador, pero no sincroniza los datos entre dispositivos ni crea cuentas compartidas en un servidor, tambien se utilizaron herramientas como ChatGPT y Gemini.

Por esa razón, tendrá que registrarse con una cuenta propia y guardar algunos personajes para probar la galería. La protección de las rutas privadas en esta entrega es una comprobación de interfaz del lado del cliente; no debe utilizarse para proteger información sensible. Para convertirla en un sistema de cuentas de producción tendría que incorporar un backend o proveedor de identidad, sesiones seguras y validación de acceso en el servidor.

## Documentación oficial que consulté

- [GitHub Desktop: publicar un proyecto existente en GitHub](https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-an-existing-project-to-github-using-github-desktop)
- [Vercel: conectar y desplegar un repositorio Git](https://vercel.com/docs/git)
- [Vercel: variables de entorno](https://vercel.com/docs/environment-variables)
- [Vercel: protección de despliegues](https://vercel.com/docs/deployment-protection)
- [Vercel: plan Hobby](https://vercel.com/docs/plans/hobby)

## Enlaces de entrega

- **Página publicada:** [https://rick-morty-explorer-six.vercel.app]
- **Repositorio:** [https://github.com/YoinserLeon/rick-morty-explorer.git)]

## Presentación breve

> Rick & Morty Explorer es una aplicación web que desarrollé para explorar personajes de Rick & Morty y guardar mis favoritos en una galería personal. Para construirla utilicé Next.js, React, TypeScript y Tailwind CSS, y conecté la aplicación con la API pública de la serie. También organicé las páginas en secciones públicas, de autenticación y privadas. Mi intención fue crear una interfaz con una identidad visual retro espacial y, al mismo tiempo, practicar la organización de un proyecto web moderno, la gestión del estado en React y el flujo de publicación con GitHub y Vercel.
