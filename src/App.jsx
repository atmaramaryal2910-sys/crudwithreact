import { useState } from 'react'
import { Plus, Users } from 'lucide-react'
import { INITIAL_PLAYERS } from './utils/constants'
import PlayerCard from './components/PlayerCard'
import PlayerForm from './components/PlayerForm'

function App() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const handleAddPlayer = () => {
    setEditingPlayer(null);
    setIsModalOpen(true);
  };

  const handleEditPlayer = (player) => {
    setEditingPlayer(player);
    setIsModalOpen(true);
  };

  const handleDeletePlayer = (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const handleSubmitForm = (playerData) => {
    if (editingPlayer) {
      // Update existing
      setPlayers(players.map(p => p.id === playerData.id ? playerData : p));
    } else {
      // Create new
      const newPlayer = {
        ...playerData,
        id: Date.now().toString()
      };
      setPlayers([...players, newPlayer]);
    }
    setIsModalOpen(false);
    setEditingPlayer(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlayer(null);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>
          <Users color="var(--primary)" size={32} />
          Football Roster
        </h1>
        <button onClick={handleAddPlayer} className="btn btn-primary">
          <Plus size={20} />
          Add Player
        </button>
      </header>

      <main>
        {players.length === 0 ? (
          <div className="empty-state">
            <Users size={48} color="var(--text-muted)" style={{ margin: '0 auto' }} />
            <h3>No players found</h3>
            <p>Get started by adding your first football player to the roster.</p>
            <button onClick={handleAddPlayer} className="btn btn-primary">
              <Plus size={20} />
              Add First Player
            </button>
          </div>
        ) : (
          <div className="players-grid">
            {players.map(player => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                onEdit={handleEditPlayer}
                onDelete={handleDeletePlayer}
              />
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <PlayerForm 
          player={editingPlayer} 
          onSubmit={handleSubmitForm} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  )
}

export default App
