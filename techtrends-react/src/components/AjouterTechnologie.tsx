import {useState} from "react";

function AjouterTechnologie() {
    const [nom, setNom] = useState('');
    const [message, setMessage] = useState('');

    function soumettre(e: React.FormEvent) {
        e.preventDefault(); // ne pas recharger la page
        setMessage('« ' + nom + ' » envoyé !');
        setNom('');
    }

    return (
        <form onSubmit={soumettre}>
            <input
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Nom de la technologie"
            />
            <button type="submit">Ajouter</button>
            <p>{message}</p>
        </form>
    );
}

export default AjouterTechnologie;