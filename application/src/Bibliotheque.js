import React, { useState } from "react";

function Bibliotheque({ onBack }) {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("Tous");
  const [books, setBooks] = useState([
    {
      id: 1,
      titre: "Mohamed le développeur",
      auteur: "Mohamed EL FILALI",
      type: "Autobiographie",
      date: "10/02/2025",
      image: null,
    },
    {
      id: 2,
      titre: "1984",
      auteur: "George Orwell",
      type: "Science Fiction",
      date: "08/06/1949",
      image: null,
    },
    {
      id: 3,
      titre: "Le Petit Prince",
      auteur: "Antoine de Saint-Exupéry",
      type: "Roman",
      date: "06/04/1943",
      image: null,
    },
    {
      id: 4,
      titre: "Fondation",
      auteur: "Isaac Asimov",
      type: "Science Fiction",
      date: "01/05/1951",
      image: null,
    },
    {
      id: 5,
      titre: "L'Étranger",
      auteur: "Albert Camus",
      type: "Roman",
      date: "15/06/1942",
      image: null,
    },
    {
      id: 6,
      titre: "Le Horla",
      auteur: "Guy de Maupassant",
      type: "Nouvelle",
      date: "01/05/1887",
      image: null,
    },
    {
      id: 7,
      titre: "Une vie",
      auteur: "Simone Veil",
      type: "Autobiographie",
      date: "31/10/2007",
      image: null,
    },
    {
      id: 8,
      titre: "Dune",
      auteur: "Frank Herbert",
      type: "Science Fiction",
      date: "01/08/1965",
      image: null,
    },
    {
      id: 9,
      titre: "La Métamorphose",
      auteur: "Franz Kafka",
      type: "Nouvelle",
      date: "15/10/1915",
      image: null,
    },
    {
      id: 10,
      titre: "Les Misérables",
      auteur: "Victor Hugo",
      type: "Roman",
      date: "03/04/1862",
      image: null,
    },
    {
      id: 11,
      titre: "Le Meilleur des mondes",
      auteur: "Aldous Huxley",
      type: "Science Fiction",
      date: "01/01/1932",
      image: null,
    },
    {
      id: 12,
      titre: "Steve Jobs",
      auteur: "Walter Isaacson",
      type: "Autobiographie",
      date: "24/10/2011",
      image: null,
    },
    {
      id: 13,
      titre: "Le Loup et l'Agneau",
      auteur: "Jean de La Fontaine",
      type: "Nouvelle",
      date: "01/03/1668",
      image: null,
    },
    {
      id: 14,
      titre: "Neuromancien",
      auteur: "William Gibson",
      type: "Science Fiction",
      date: "01/07/1984",
      image: null,
    },
    {
      id: 15,
      titre: "Journal",
      auteur: "Anne Frank",
      type: "Autobiographie",
      date: "25/06/1947",
      image: null,
    },
    {
      id: 16,
      titre: "L'Alchimiste",
      auteur: "Paulo Coelho",
      type: "Roman",
      date: "01/01/1988",
      image: null,
    },
    {
      id: 17,
      titre: "La Machine à explorer le temps",
      auteur: "H.G. Wells",
      type: "Science Fiction",
      date: "01/01/1895",
      image: null,
    },
    {
      id: 18,
      titre: "Chère Ijeawele",
      auteur: "Chimamanda Ngozi Adichie",
      type: "Nouvelle",
      date: "07/03/2017",
      image: null,
    },
    {
      id: 19,
      titre: "Mémoires d'une jeune fille rangée",
      auteur: "Simone de Beauvoir",
      type: "Autobiographie",
      date: "01/10/1958",
      image: null,
    },
    {
      id: 20,
      titre: "Fahrenheit 451",
      auteur: "Ray Bradbury",
      type: "Science Fiction",
      date: "19/10/1953",
      image: null,
    },
    {
      id: 21,
      titre: "Big Happy : La Culture du Code",
      auteur: "L'Équipe Design",
      type: "Roman",
      date: "01/02/2026",
      image: null,
    },
  ]);

  const [newBook, setNewBook] = useState({
    titre: "",
    auteur: "",
    type: "Roman",
    date: "",
    image: "",
  });

  const handleAddBook = (e) => {
    e.preventDefault();
    setBooks([{ ...newBook, id: Date.now() }, ...books]);
    setShowModal(false);
    setNewBook({ titre: "", auteur: "", type: "Roman", date: "", image: "" });
  };

  const deleteBook = (id) => setBooks(books.filter((b) => b.id !== id));

  const filteredBooks =
    filter === "Tous" ? books : books.filter((b) => b.type === filter);

  return (
    <div className="biblio-container">
      <h1 className="title">
        📚 Bibliothèque <span className="brand">Big Happy</span>
      </h1>

      <div className="controls">
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Tous">Toutes les catégories</option>
          <option value="Roman">Roman</option>
          <option value="Nouvelle">Nouvelle</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Autobiographie">Autobiographie</option>
        </select>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Ajouter un livre
        </button>
      </div>

      <div className="book-grid">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-img">
              {book.image ? (
                <img src={book.image} alt="couverture" />
              ) : (
                <span className="no-img">No Image</span>
              )}
            </div>
            <div className="book-info">
              <h3>{book.titre}</h3>
              <p>
                <strong>Auteur:</strong> {book.auteur}
              </p>
              <p>
                <strong>Type:</strong> {book.type}
              </p>
              <p>
                <strong>Paru le:</strong> {book.date}
              </p>
            </div>
            <button className="del-btn" onClick={() => deleteBook(book.id)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <button className="nav-button back-btn" onClick={onBack}>
        ← Retour au Recrutement
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Ajouter un livre</h2>
            <form onSubmit={handleAddBook}>
              <input
                type="text"
                placeholder="Titre"
                required
                onChange={(e) =>
                  setNewBook({ ...newBook, titre: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Auteur"
                required
                onChange={(e) =>
                  setNewBook({ ...newBook, auteur: e.target.value })
                }
              />
              <select
                onChange={(e) =>
                  setNewBook({ ...newBook, type: e.target.value })
                }
              >
                <option value="Roman">Roman</option>
                <option value="Nouvelle">Nouvelle</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Autobiographie">Autobiographie</option>
              </select>
              <input
                type="text"
                placeholder="Date (ex: 10/02/2025)"
                required
                onChange={(e) =>
                  setNewBook({ ...newBook, date: e.target.value })
                }
              />
              <label className="file-label">
                <span>📷 Image locale</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewBook({
                      ...newBook,
                      image: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
              </label>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="confirm-btn">
                  Confirmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bibliotheque;
