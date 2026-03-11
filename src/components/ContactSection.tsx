type ContactSectionProps = {
  onContactClick?: () => void;
};

export default function ContactSection({ onContactClick }: ContactSectionProps) {
  return (
    <section className="w-full pb-16 bg-white">
      <div className="py-12 px-8 bg-gradient-to-r from-green-base to-green-light flex flex-col items-center justify-center gap-8">
        <h2 className="text-white-base text-4xl md:text-4xl font-bold text-center">
          TU OPINIÓN NOS IMPORTA
        </h2>
        <button
          type="button"
          onClick={onContactClick}
          className="bg-white-base text-green-base px-4 py-3 rounded-lg text-xl font-bold uppercase cursor-pointer transition-all duration-300 hover:shadow-lg/20 hover:scale-105"
        >
          CONTACTATE CON NOSOTROS
        </button>
      </div>
    </section>
  );
}