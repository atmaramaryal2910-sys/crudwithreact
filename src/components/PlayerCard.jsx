import { Edit2, Trash2, User, HelpCircle } from "lucide-react";

export default function PlayerCard({ player, onEdit, onDelete }) {
  return (
    <div className="player-card">
      <div className="card-header">
        <div>
          <h3 className="player-name">{player.name}</h3>
          <span className="player-position">{player.position}</span>
        </div>
        <div className="jersey-badge">{player.jerseyNumber}</div>
      </div>
      
      <div className="card-body">
        <div className="stat-row">
          <User size={16} />
          <span>Team: {player.team}</span>
        </div>
        <div className="stat-row">
          <HelpCircle size={16} />
          <span>Goals: <strong style={{color: 'var(--text)'}}>{player.goals}</strong></span>
        </div>
      </div>

      <div className="card-actions">
        <button 
          onClick={() => onEdit(player)}
          className="btn-icon" 
          title="Edit Player"
        >
          <Edit2 size={18} />
        </button>
        <button 
          onClick={() => onDelete(player.id)}
          className="btn-icon danger" 
          title="Delete Player"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
