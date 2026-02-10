import React, { useState, useEffect } from "react";

function Bibliotheque({ onBack }) {
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // État pour le Pop-up Historique
  const [filter, setFilter] = useState("Tous");
  const [isEditing, setIsEditing] = useState(null);

  const initialBooks = [
    {
      id: 1,
      titre: "Mohamed le développeur",
      auteur: "Mohamed EL FILALI",
      type: "Autobiographie",
      date: "2025-02-10",
      image: null,
    },
    {
      id: 2,
      titre: "1984",
      auteur: "George Orwell",
      type: "Science Fiction",
      date: "1949-06-08",
      image: null,
    },
    {
      id: 3,
      titre: "Le Petit Prince",
      auteur: "Antoine de Saint-Exupéry",
      type: "Roman",
      date: "1943-04-06",
      image: null,
    },
    {
      id: 4,
      titre: "Fondation",
      auteur: "Isaac Asimov",
      type: "Science Fiction",
      date: "1951-05-01",
      image: null,
    },
    {
      id: 5,
      titre: "L'Étranger",
      auteur: "Albert Camus",
      type: "Roman",
      date: "1942-06-15",
      image: null,
    },
    {
      id: 6,
      titre: "Le Horla",
      auteur: "Guy de Maupassant",
      type: "Nouvelle",
      date: "1887-05-01",
      image: null,
    },
    {
      id: 7,
      titre: "Une vie",
      auteur: "Simone Veil",
      type: "Autobiographie",
      date: "2007-10-31",
      image: null,
    },
    {
      id: 8,
      titre: "Dune",
      auteur: "Frank Herbert",
      type: "Science Fiction",
      date: "1965-08-01",
      image: null,
    },
    {
      id: 9,
      titre: "La Métamorphose",
      auteur: "Franz Kafka",
      type: "Nouvelle",
      date: "1915-10-15",
      image: null,
    },
    {
      id: 10,
      titre: "Les Misérables",
      auteur: "Victor Hugo",
      type: "Roman",
      date: "1862-04-03",
      image: null,
    },
    {
      id: 11,
      titre: "Le Meilleur des mondes",
      auteur: "Aldous Huxley",
      type: "Science Fiction",
      date: "1932-01-01",
      image: null,
    },
    {
      id: 12,
      titre: "Steve Jobs",
      auteur: "Walter Isaacson",
      type: "Autobiographie",
      date: "2011-10-24",
      image: null,
    },
    {
      id: 13,
      titre: "Le Loup et l'Agneau",
      auteur: "Jean de La Fontaine",
      type: "Nouvelle",
      date: "1668-03-01",
      image: null,
    },
    {
      id: 14,
      titre: "Neuromancien",
      auteur: "William Gibson",
      type: "Science Fiction",
      date: "1984-07-01",
      image: null,
    },
    {
      id: 15,
      titre: "Journal",
      auteur: "Anne Frank",
      type: "Autobiographie",
      date: "1947-06-25",
      image: null,
    },
    {
      id: 16,
      titre: "L'Alchimiste",
      auteur: "Paulo Coelho",
      type: "Roman",
      date: "1988-01-01",
      image: null,
    },
    {
      id: 17,
      titre: "La Machine à explorer le temps",
      auteur: "H.G. Wells",
      type: "Science Fiction",
      date: "1895-01-01",
      image: null,
    },
    {
      id: 18,
      titre: "Chère Ijeawele",
      auteur: "Chimamanda Ngozi Adichie",
      type: "Nouvelle",
      date: "2017-03-07",
      image: null,
    },
    {
      id: 19,
      titre: "Mémoires d'une jeune fille rangée",
      auteur: "Simone de Beauvoir",
      type: "Autobiographie",
      date: "1958-10-01",
      image: null,
    },
    {
      id: 20,
      titre: "Fahrenheit 451",
      auteur: "Ray Bradbury",
      type: "Science Fiction",
      date: "1953-10-19",
      image: null,
    },
    {
      id: 21,
      titre: "Big Happy : La Culture du Code",
      auteur: "L'Équipe Design",
      type: "Roman",
      date: "2026-02-01",
      image: null,
    },
  ];

  // État des livres actifs
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("bh_library_data");
    return saved ? JSON.parse(saved) : initialBooks;
  });

  // État de l'historique (Corbeille)
  const [deletedBooks, setDeletedBooks] = useState(() => {
    const saved = localStorage.getItem("bh_history_data");
    return saved ? JSON.parse(saved) : [];
  });

  const [newBook, setNewBook] = useState({
    titre: "",
    auteur: "",
    type: "Roman",
    date: "",
    image: "",
  });

  // Sauvegarde dans le localStorage
  useEffect(() => {
    localStorage.setItem("bh_library_data", JSON.stringify(books));
    localStorage.setItem("bh_history_data", JSON.stringify(deletedBooks));
  }, [books, deletedBooks]);

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing) {
      setBooks(
        books.map((b) =>
          b.id === isEditing ? { ...newBook, id: isEditing } : b,
        ),
      );
    } else {
      setBooks([{ ...newBook, id: Date.now() }, ...books]);
    }
    closeModal();
  };

  const openEdit = (book) => {
    setIsEditing(book.id);
    setNewBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(null);
    setNewBook({ titre: "", auteur: "", type: "Roman", date: "", image: "" });
  };

  // --- NOUVELLE LOGIQUE : SUPPRESSION VERS HISTORIQUE ---
  const deleteToHistory = (id) => {
    const bookToMove = books.find((b) => b.id === id);
    setDeletedBooks([bookToMove, ...deletedBooks]); // Ajouter à l'historique
    setBooks(books.filter((b) => b.id !== id)); // Retirer de la liste active
  };

  // --- NOUVELLE LOGIQUE : RESTAURATION ---
  const restoreFromHistory = (id) => {
    const bookToRestore = deletedBooks.find((b) => b.id === id);
    setBooks([bookToRestore, ...books]);
    setDeletedBooks(deletedBooks.filter((b) => b.id !== id));
  };

  // Suppression définitive
  const finalDelete = (id) => {
    if (window.confirm("Supprimer définitivement de l'historique ?")) {
      setDeletedBooks(deletedBooks.filter((b) => b.id !== id));
    }
  };

  const filtered =
    filter === "Tous" ? books : books.filter((b) => b.type === filter);

  return (
    <div className="biblio-wrapper">
      <header className="biblio-header">
        <h1 className="title">
          📚 Bibliothèque <span className="brand">Big Happy</span>
        </h1>
        <div className="toolbar">
          <select
            className="neon-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Tous">Toutes les catégories</option>
            <option value="Roman">Roman</option>
            <option value="Nouvelle">Nouvelle</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Autobiographie">Autobiographie</option>
          </select>
          <button className="btn-add-glow" onClick={() => setShowModal(true)}>
            + Ajouter
          </button>
          <button
            className="btn-history-toggle"
            onClick={() => setShowHistory(true)}
          >
            🕒 Historique ({deletedBooks.length})
          </button>
        </div>
      </header>

      <div className="scroll-area">
        <div className="book-grid-modern">
          {filtered.map((book) => (
            <div key={book.id} className="glass-card">
              <div className="card-thumb">
                {book.image ? (
                  <img src={book.image} alt="cover" />
                ) : (
                  <div className="placeholder-img">📖</div>
                )}
              </div>
              <div className="card-body">
                <h3>{book.titre}</h3>
                <p className="meta">
                  <span>{book.auteur}</span> • {book.type}
                </p>
                <p className="date-tag">Paru le {book.date}</p>
                <div className="card-footer">
                  <button className="btn-edit" onClick={() => openEdit(book)}>
                    Modifier
                  </button>
                  <button
                    className="btn-del"
                    onClick={() => deleteToHistory(book.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="nav-button-fixed" onClick={onBack}>
        ← Retour au Jeu
      </button>

      {/* MODAL AJOUT / EDITION */}
      {showModal && (
        <div className="modal-overlay-glass">
          <div className="modal-panel">
            <h2>{isEditing ? "Édition du livre" : "Nouveau chef-d'œuvre"}</h2>
            <form onSubmit={handleSave} className="neon-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Titre</label>
                  <input
                    type="text"
                    value={newBook.titre}
                    required
                    onChange={(e) =>
                      setNewBook({ ...newBook, titre: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Auteur</label>
                  <input
                    type="text"
                    value={newBook.auteur}
                    required
                    onChange={(e) =>
                      setNewBook({ ...newBook, auteur: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Catégorie</label>
                  <select
                    value={newBook.type}
                    onChange={(e) =>
                      setNewBook({ ...newBook, type: e.target.value })
                    }
                  >
                    <option value="Roman">Roman</option>
                    <option value="Nouvelle">Nouvelle</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Autobiographie">Autobiographie</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date de parution</label>
                  <input
                    type="date"
                    value={newBook.date}
                    required
                    onChange={(e) =>
                      setNewBook({ ...newBook, date: e.target.value })
                    }
                    style={{ colorScheme: "dark" }}
                  />
                </div>
              </div>
              <div className="form-group upload-section">
                <label className="custom-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files[0] &&
                      setNewBook({
                        ...newBook,
                        image: URL.createObjectURL(e.target.files[0]),
                      })
                    }
                  />
                  {newBook.image
                    ? "✅ Image chargée"
                    : "📷 Téléverser une couverture"}
                </label>
                {newBook.image && (
                  <img
                    src={newBook.image}
                    alt="prev"
                    className="mini-preview"
                  />
                )}
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={closeModal}
                >
                  Annuler
                </button>
                <button type="submit" className="btn-confirm">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POP-UP HISTORIQUE */}
      {showHistory && (
        <div className="modal-overlay-glass">
          <div className="modal-panel history-panel">
            <h2>🕒 Historique des suppressions</h2>
            <div className="history-list">
              {deletedBooks.length === 0 ? (
                <p className="empty-msg">Aucun livre dans la corbeille.</p>
              ) : (
                deletedBooks.map((book) => (
                  <div key={book.id} className="history-item">
                    <div className="history-info">
                      <span className="h-titre">{book.titre}</span>
                      <span className="h-auteur">{book.auteur}</span>
                    </div>
                    <div className="history-actions">
                      <button
                        className="btn-restore"
                        onClick={() => restoreFromHistory(book.id)}
                      >
                        Restaurer
                      </button>
                      <button
                        className="btn-final-del"
                        onClick={() => finalDelete(book.id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button
              className="btn-close-history"
              onClick={() => setShowHistory(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bibliotheque;
