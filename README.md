# Rick & Morty Explorer

**Proyecto personal de exploración de personajes inspirado en el universo de Rick & Morty.**

## Sobre mi proyecto

Desarrollé Rick & Morty Explorer como una aplicación web para consultar personajes y crear una colección personal de favoritos. Quise que la experiencia tuviera una identidad visual propia, por eso tomé como referencia la estética de ciencia ficción y los videojuegos retro: un fondo espacial oscuro, portales verdes, pequeños detalles de pixel art y tarjetas con bordes de colores neón.

Mi objetivo fue combinar esa parte visual con una aplicación que realmente se pueda utilizar. Desde la página principal puedo entrar al catálogo, buscar personajes, consultar sus detalles y guardar los que más me gustan. Cuando inicio sesión, también puedo entrar a mi galería para ver los personajes que he marcado como favoritos. La navegación muestra el nombre de la cuenta activa.

En el inicio incorporé una imagen de Rick y Morty con fondo transparente. También decidí mantener la navegación enfocada en las secciones que forman parte de esta versión: Inicio, Personajes y, una vez iniciada la sesión, Galería. No incluí las secciones de Episodios ni Noticias.

## Qué puedo hacer en la aplicación

- Explorar el catálogo de personajes y consultar sus fichas.
- Buscar personajes utilizando los datos de la API pública de Rick and Morty.
- Crear una cuenta local, iniciar sesión, cerrar sesión y cambiar la contraseña desde Configuración.
- Guardar y quitar personajes de Favoritos.
- Consultar los favoritos en **Mi galería**, una sección disponible después de iniciar sesión.
- Cambiar entre tema oscuro y claro; la preferencia se conserva en el navegador.
- Consultar la página pública de precios.

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

## Cómo ejecutar el proyecto en mi computadora

### Requisitos

- Node.js 20.9 o superior (recomiendo Node.js 22).
- npm.
- Visual Studio Code.

### Instalación

1. Descargo o clono el repositorio y abro la carpeta `rick-morty-explorer` en Visual Studio Code.
2. Abro la terminal integrada en **Terminal → New Terminal**.
3. Creo el archivo de variables locales a partir del ejemplo.

En PowerShell (Windows):

```powershell
Copy-Item .env.example .env.local
```

En macOS o Linux:

```bash
cp .env.example .env.local
```

4. Instalo las dependencias:

```bash
npm install
```

5. Inicio el servidor de desarrollo:

```bash
npm run dev
```

6. Abro <http://localhost:3000> en el navegador.

Para revisar el proyecto antes de publicarlo, ejecuto:

```bash
npm run typecheck
npm run lint
npm run build
```

## Variables de entorno

El archivo `.env.example` contiene los valores de referencia:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_RM_API_URL=https://rickandmortyapi.com/api
```

En mi computadora utilizo `.env.local`. En Vercel configuro las mismas variables desde los ajustes del proyecto y cambio `NEXT_PUBLIC_SITE_URL` por la dirección pública que Vercel asigne. No subo `.env.local` al repositorio.

## Cómo publico el proyecto en GitHub

1. Compruebo que estoy dentro de la carpeta principal del proyecto en la terminal de VS Code.
2. Inicializo Git una sola vez:

```bash
git init -b main
```

3. Abro GitHub Desktop e inicio sesión con mi cuenta de GitHub.
4. Selecciono **File → Add Local Repository** y elijo la carpeta del proyecto. Si GitHub Desktop indica que todavía no es un repositorio, primero reviso que el comando `git init -b main` se haya ejecutado correctamente.
5. En la pestaña **Changes**, reviso los archivos que voy a incluir. Compruebo especialmente que `.env.local`, `node_modules` y `.next` no aparezcan.
6. Escribo un mensaje descriptivo y selecciono **Commit to main**.
7. Pulso **Publish repository**. Para que el profesor pueda consultar el código, desmarco **Keep this code private** y publico el repositorio como público.
8. Copio la dirección del repositorio para incluirla en la entrega.

Para los siguientes avances, guardo los cambios con commits pequeños y mensajes claros. Algunos ejemplos:

```text
feat: add character favorites gallery
fix: correct local sign-in validation
style: refine responsive home page
docs: explain setup and deployment
```

Después de cada commit, pulso **Push origin** para enviar los cambios a GitHub.

## Cómo mantengo la página publicada para que el profesor pueda verla

Voy a utilizar Vercel conectado al repositorio de GitHub. Así no necesito dejar mi computadora encendida: la aplicación se ejecuta en la infraestructura de Vercel.

1. Entro en <https://vercel.com> y creo una cuenta o inicio sesión con GitHub.
2. Desde el panel selecciono **Add New → Project**.
3. Importo el repositorio público `rick-morty-explorer`.
4. Compruebo que Vercel detecte Next.js y que el directorio raíz sea la carpeta del proyecto (si el repositorio contiene directamente `package.json`, dejo `./`).
5. En **Environment Variables** agrego:

   | Variable | Valor para producción |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | La URL pública que me asigne Vercel, por ejemplo `https://mi-proyecto.vercel.app` |
   | `NEXT_PUBLIC_RM_API_URL` | `https://rickandmortyapi.com/api` |

6. Selecciono **Deploy** y espero a que finalice la compilación. Si termina correctamente, Vercel me proporciona una dirección pública `vercel.app`.
7. En **Settings → Deployment Protection**, compruebo que la implementación de producción no esté protegida con la opción **All Deployments**. Para una entrega que cualquiera pueda visitar, dejo el dominio de producción público (en el plan Hobby, la opción Standard Protection mantiene público el dominio de producción).
8. Abro la dirección en una ventana privada o en otro dispositivo para comprobar que la página carga sin depender de mi sesión de Vercel.
9. Comparto con el profesor tanto el enlace de la página como el enlace del repositorio de GitHub.

Cuando quiera actualizar la página, realizo un commit y pulso **Push origin** desde GitHub Desktop. Vercel puede generar una nueva implementación automáticamente al recibir cambios en la rama de producción (`main`). Si cambio variables de entorno, necesito volver a desplegar para que los cambios se apliquen.

**Para que la página siga disponible:** mantengo el proyecto y su despliegue en Vercel, no elimino el proyecto ni el repositorio y reviso el estado de la última implementación en el panel de Vercel. El plan Hobby es gratuito para proyectos personales y tiene límites de uso y condiciones propias; Vercel puede modificar o limitar el servicio. Por eso no puedo prometer disponibilidad ilimitada o permanente. Para una entrega académica normal, comparto la URL de producción y la compruebo antes de presentarla.

## Nota sobre las cuentas y los favoritos

Esta versión es una demostración sin backend ni base de datos. Las cuentas, la sesión del navegador y los favoritos se almacenan localmente. Esto permite probar el flujo en el mismo navegador, pero no sincroniza los datos entre dispositivos ni crea cuentas compartidas en un servidor.

Por esa razón, cuando el profesor abra la página desde su equipo, tendrá que registrarse con una cuenta propia y guardar algunos personajes para probar la galería. La protección de las rutas privadas en esta entrega es una comprobación de interfaz del lado del cliente; no debe utilizarse para proteger información sensible. Para convertirla en un sistema de cuentas de producción tendría que incorporar un backend o proveedor de identidad, sesiones seguras y validación de acceso en el servidor.

## Documentación oficial que consulté

- [GitHub Desktop: publicar un proyecto existente en GitHub](https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-an-existing-project-to-github-using-github-desktop)
- [Vercel: conectar y desplegar un repositorio Git](https://vercel.com/docs/git)
- [Vercel: variables de entorno](https://vercel.com/docs/environment-variables)
- [Vercel: protección de despliegues](https://vercel.com/docs/deployment-protection)
- [Vercel: plan Hobby](https://vercel.com/docs/plans/hobby)

## Enlaces de entrega

- **Página publicada:** [Pegar aquí la URL de Vercel cuando termine el despliegue].
- **Repositorio:** [Pegar aquí la URL pública de GitHub].

## Presentación breve

> Rick & Morty Explorer es una aplicación web que desarrollé para explorar personajes de Rick & Morty y guardar mis favoritos en una galería personal. Para construirla utilicé Next.js, React, TypeScript y Tailwind CSS, y conecté la aplicación con la API pública de la serie. También organicé las páginas en secciones públicas, de autenticación y privadas. Mi intención fue crear una interfaz con una identidad visual retro espacial y, al mismo tiempo, practicar la organización de un proyecto web moderno, la gestión del estado en React y el flujo de publicación con GitHub y Vercel.
