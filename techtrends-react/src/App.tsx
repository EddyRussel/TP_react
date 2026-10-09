import Header from './components/Header';
import CarteTechnologie from './components/CarteTechnologie';
import { technologies } from './data/technologies';
import {useState} from "react";
//import ListePosts from "./components/ListePosts.tsx";
import ListeTaches from "./components/ListeTaches.tsx";
import AjouterTechnologie from "./components/AjouterTechnologie.tsx";

function App() {
  const [recherche, setRecherche] = useState('');

  const technologiesFiltrees = technologies.filter((tech) =>
      tech.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  const [triCroissant, setTriCroissant] = useState(true);

// copie triée (on ne mute jamais le tableau source)
  const technologiesTriees = [...technologiesFiltrees].sort((a, b) =>
      triCroissant ? a.nom.localeCompare(b.nom) : b.nom.localeCompare(a.nom)
  );

  const nbCartes = technologiesTriees.length;

// dans le JSX, avant la liste :
  <button onClick={() => setTriCroissant(!triCroissant)}>
    Trier ({triCroissant ? 'A → Z' : 'Z → A'})
  </button>

  return (
      <main>
        <Header titre="TechTrends — Galerie des tendances" phrase="Recherchez une technologie" />
        <input
            type="search"
            placeholder="Rechercher (ex. docker)"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
        />

        <p className="compteur">
          {nbCartes} technologie(s) affichée(s)
        </p>


        <section>
          {technologiesFiltrees.map((tech) => (
              <CarteTechnologie key={tech.id} tech={tech} />
          ))}
        </section>

        <section>
          <h2>Derniers articles</h2>
          <ListeTaches />
        </section>

         <section>
          <h2>Derniers articles</h2>
          <AjouterTechnologie />
        </section>





      </main>
  );
}

export default App;