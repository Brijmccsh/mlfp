// Section order and anchor ids follow design/Home-V2.dc.html.
const SECTIONS = [
  { id: "program", title: "Program" },
  { id: "modules", title: "Modules" },
  { id: "challenge", title: "The Challenge" },
  { id: "outcomes", title: "Outcomes" },
  { id: "faq", title: "FAQ" },
];

export default function Home() {
  return (
    <main>
      {SECTIONS.map(({ id, title }) => (
        <section key={id} id={id} className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-bold text-navy-700">{title}</h2>
        </section>
      ))}
    </main>
  );
}
