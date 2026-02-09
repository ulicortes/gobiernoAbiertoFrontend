export default function GuiaUsuario() {
  return (
    <section className="w-full pb-16 px-8 bg-white">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <button className="w-fit px-8 py-4 bg-green-base text-white text-xl font-bold uppercase rounded-lg hover:bg-green-dark transition-all duration-300 cursor-pointer">
          GUÍA DE USUARIO
        </button>
        <p className="mt-8 text-center text-black-base font-sans max-w-2xl">
          Acá iría un texto explicando brevemente lo que se encuentra en el pdf al que redirecciona el botón para mejorar la experiencia de usuario.
        </p>
      </div>
    </section>
  );
}
