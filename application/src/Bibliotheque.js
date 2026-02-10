import React, { useState, useEffect } from "react";

function Bibliotheque({ onBack }) {
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filter, setFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("Recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  const initialBooks = [
    {
      id: 1,
      titre: "Mohamed le développeur",
      auteur: "Mohamed EL FILALI",
      type: "Autobiographie",
      date: "2025-02-10",
      image: null,
      favori: true,
      note: 5,
      resume: "L'ascension fulgurante d'un génie du code.",
    },
    {
      id: 2,
      titre: "1984",
      auteur: "George Orwell",
      type: "Science Fiction",
      date: "1949-06-08",
      image: null,
      favori: false,
      note: 4,
      resume: "",
    },
    {
      id: 3,
      titre: "Le Petit Prince",
      auteur: "Antoine de Saint-Exupéry",
      type: "Roman",
      date: "1943-04-06",
      image: null,
      favori: false,
      note: 5,
      resume: "",
    },
  ];

  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("bh_library_data");
    return saved ? JSON.parse(saved) : initialBooks;
  });

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
    favori: false,
    note: 0,
    resume: "",
  });

  useEffect(() => {
    localStorage.setItem("bh_library_data", JSON.stringify(books));
    localStorage.setItem("bh_history_data", JSON.stringify(deletedBooks));
  }, [books, deletedBooks]);

  // --- STATISTIQUES ---
  const totalBooks = books.length;
  const favoriteCount = books.filter((b) => b.favori).length;
  const mostCommonType = books.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});
  const topGenre =
    Object.keys(mostCommonType).length > 0
      ? Object.keys(mostCommonType).reduce((a, b) =>
          mostCommonType[a] > mostCommonType[b] ? a : b,
        )
      : "Aucun";

  // --- ACTIONS ---
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

  const toggleFavori = (id, e) => {
    e.stopPropagation();
    setBooks(books.map((b) => (b.id === id ? { ...b, favori: !b.favori } : b)));
  };

  const handleRating = (id, rating) => {
    setBooks(books.map((b) => (b.id === id ? { ...b, note: rating } : b)));
    if (selectedBook && selectedBook.id === id) {
      setSelectedBook({ ...selectedBook, note: rating });
    }
  };

  const saveResume = (id, text) => {
    setBooks(books.map((b) => (b.id === id ? { ...b, resume: text } : b)));
    if (selectedBook && selectedBook.id === id) {
      setSelectedBook({ ...selectedBook, resume: text });
    }
  };

  const deleteToHistory = (id, e) => {
    e.stopPropagation();
    const bookToMove = books.find((b) => b.id === id);
    setDeletedBooks([bookToMove, ...deletedBooks]);
    setBooks(books.filter((b) => b.id !== id));
  };

  const restoreFromHistory = (id) => {
    const bookToRestore = deletedBooks.find((b) => b.id === id);
    setBooks([bookToRestore, ...books]);
    setDeletedBooks(deletedBooks.filter((b) => b.id !== id));
  };

  const finalDelete = (id) => {
    if (window.confirm("Supprimer définitivement de l'historique ?")) {
      setDeletedBooks(deletedBooks.filter((b) => b.id !== id));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(null);
    setNewBook({
      titre: "",
      auteur: "",
      type: "Roman",
      date: "",
      image: "",
      favori: false,
      note: 0,
      resume: "",
    });
  };

  // --- FILTRAGE ET TRI ---
  const filtered = books
    .filter((b) => {
      const matchType =
        filter === "Tous"
          ? true
          : filter === "Favoris"
            ? b.favori
            : b.type === filter;
      const matchSearch =
        b.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.auteur.toLowerCase().includes(searchTerm.toLowerCase());
      return matchType && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "Alpha") return a.titre.localeCompare(b.titre);
      if (sortBy === "Note") return (b.note || 0) - (a.note || 0);
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <div className="biblio-wrapper">
      {/* TABLEAU DE BORD STATS */}
      <div className="stats-dashboard">
        <div className="stat-card">
          <span>📚 Total</span>
          <strong>{totalBooks}</strong>
        </div>
        <div className="stat-card">
          <span>❤️ Favoris</span>
          <strong>{favoriteCount}</strong>
        </div>
        <div className="stat-card">
          <span>🔥 Top Genre</span>
          <strong>{topGenre}</strong>
        </div>
      </div>

      <header className="biblio-header">
        {/* TITRE RE-INTÉGRÉ ICI */}
        <h1 className="title neon-title">
          📚 Bibliothèque <span className="brand">Big Happy</span>
        </h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher un titre, un auteur..."
            className="neon-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="toolbar">
          <div className="select-group">
            <label>Catégorie :</label>
            <select
              className="neon-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="Tous">Toutes</option>
              <option value="Favoris">⭐ Favoris</option>
              <option value="Roman">Roman</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Autobiographie">Autobiographie</option>
            </select>
          </div>
          <div className="select-group">
            <label>Tri :</label>
            <select
              className="neon-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Recent">Plus récents</option>
              <option value="Alpha">Alphabétique</option>
              <option value="Note">Meilleures notes</option>
            </select>
          </div>
          <button className="btn-add-glow" onClick={() => setShowModal(true)}>
            + Ajouter
          </button>
          <button
            className="btn-history-toggle"
            onClick={() => setShowHistory(true)}
          >
            🕒 {deletedBooks.length}
          </button>
        </div>
      </header>

      <div className="scroll-area">
        <div className="book-grid-modern">
          {filtered.map((book) => (
            <div
              key={book.id}
              className={`glass-card ${book.favori ? "gold-border" : ""}`}
              onClick={() => setSelectedBook(book)}
            >
              <div className="card-thumb">
                <button
                  className={`fav-icon ${book.favori ? "active" : ""}`}
                  onClick={(e) => toggleFavori(book.id, e)}
                >
                  ❤
                </button>
                {book.image ? (
                  <img src={book.image} alt="cover" />
                ) : (
                  <div className="placeholder-img">📖</div>
                )}
              </div>
              <div className="card-body">
                <h3>{book.titre}</h3>
                <div className="stars">{"⭐".repeat(book.note || 0)}</div>
                <p className="meta">{book.auteur}</p>
                <div className="card-footer">
                  <button
                    className="btn-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEdit(book);
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn-del"
                    onClick={(e) => deleteToHistory(book.id, e)}
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

      {/* MODAL LECTURE */}
      {selectedBook && (
        <div
          className="modal-overlay-glass"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="modal-panel detail-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-header">
              {selectedBook.image ? (
                <img
                  src={selectedBook.image}
                  className="detail-cover"
                  alt="cover"
                />
              ) : (
                <div className="detail-cover-placeholder">📖</div>
              )}
              <div>
                <h2>{selectedBook.titre}</h2>
                <p className="brand">{selectedBook.auteur}</p>
                <div className="rating-select">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(selectedBook.id, star)}
                      style={{
                        cursor: "pointer",
                        fontSize: "1.5rem",
                        opacity: (selectedBook.note || 0) >= star ? 1 : 0.2,
                      }}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <textarea
              placeholder="Résumé..."
              value={selectedBook.resume || ""}
              onChange={(e) => saveResume(selectedBook.id, e.target.value)}
            />
            <button
              className="btn-confirm"
              onClick={() => setSelectedBook(null)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* MODAL AJOUT / EDITION */}
      {showModal && (
        <div className="modal-overlay-glass">
          <div className="modal-panel">
            <h2>{isEditing ? "Édition" : "Nouveau Livre"}</h2>
            <form onSubmit={handleSave} className="neon-form">
              <input
                type="text"
                placeholder="Titre"
                value={newBook.titre}
                required
                onChange={(e) =>
                  setNewBook({ ...newBook, titre: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Auteur"
                value={newBook.auteur}
                required
                onChange={(e) =>
                  setNewBook({ ...newBook, auteur: e.target.value })
                }
              />
              <input
                type="date"
                value={newBook.date}
                required
                onChange={(e) =>
                  setNewBook({ ...newBook, date: e.target.value })
                }
                style={{ colorScheme: "dark" }}
              />
              <select
                value={newBook.type}
                onChange={(e) =>
                  setNewBook({ ...newBook, type: e.target.value })
                }
              >
                <option value="Roman">Roman</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Autobiographie">Autobiographie</option>
                <option value="Nouvelle">Nouvelle</option>
              </select>
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

      {/* MODAL HISTORIQUE */}
      {showHistory && (
        <div
          className="modal-overlay-glass"
          onClick={() => setShowHistory(false)}
        >
          <div
            className="modal-panel history-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>🕒 Historique</h2>
            <div className="history-list">
              {deletedBooks.length === 0 ? (
                <p>Corbeille vide</p>
              ) : (
                deletedBooks.map((book) => (
                  <div key={book.id} className="history-item">
                    <span>{book.titre}</span>
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
