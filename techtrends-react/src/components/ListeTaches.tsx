import { useEffect, useState } from 'react';
import type { Todo } from '../types';

function ListeTaches() {
    const [taches, setTaches] = useState<Todo[]>([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState('');

    useEffect(() => {
        let annule = false;

        async function charger() {
            try {
                const reponse = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
                if (!reponse.ok) {
                    throw new Error('Réponse du serveur incorrecte : ' + reponse.status);
                }
                const donnees: Todo[] = await reponse.json();
                if (!annule) {
                    setTaches(donnees);
                    setChargement(false);
                }
            } catch (e) {
                if (!annule) {
                    setErreur(e instanceof Error ? e.message : 'Erreur inconnue');
                    setChargement(false);
                }
            }
        }

        charger();
        return () => {
            annule = true;
        };
    }, []);

    if (chargement) {
        return <p>Chargement des tâches…</p>;
    }

    if (erreur) {
        return (
            <p role="alert" className="erreur">
                Erreur : {erreur}
            </p>
        );
    }

    if (taches.length === 0) {
        return <p>Aucune tâche à afficher.</p>;
    }

    return (
        <ul className="taches">
            {taches.map((tache) => (
                <li key={tache.id}>
                    <span>{tache.completed ? '✅' : '☐'}</span> <strong>{tache.title}</strong>
                </li>
            ))}
        </ul>
    );
}

export default ListeTaches;
