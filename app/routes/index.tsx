import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const errorParam = url.searchParams.get('error');
  const successParam = url.searchParams.get('success');

  const data = {
    error: errorParam,
    success: successParam,
  };

  return json(data);
}

export default function Index() {
  const { error, success } = useLoaderData();

  return (
    <main>
      <form method="post" action="/url">
      <h1>Acorta tu URL con Ushort</h1>
        <input type="text" name="original" id="original" placeholder="Pega aquí la url original que quieras acortar" />
        <label>{
        error === 'missing' && (
          <span className="error">Porfavor, llena todos los campos</span>
        )
        }
        {
          error === 'unavailable' && (
          <span className="error">Este nombre ya existe</span>
          )
        }</label>
        <input type="text" name="short" id="short" placeholder="Escribe la nueva url que deseas crear"/>
        <button type="submit">Acortar</button>
      </form>
      {success && (
        <span className="success">Listo!! Tu URL ha sido acortada a: {' '}
          <a target="_blank" href={`/${success}`}>{`${success}`}</a>
        </span>
      )}
    </main>
  );
}
