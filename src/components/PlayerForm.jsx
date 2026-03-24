import { useState as useStateReact, useEffect as useEffectReact } from 'react';
import { POSITIONS } from "../utils/constants";
import { X } from "lucide-react";

export default function PlayerForm({ player, onSubmit, onClose }) {
  const [formData, setFormData] = useStateReact({
    name: "",
    position: POSITIONS[0],
    team: "",
    goals: 0,
    jerseyNumber: 1
  });

  useEffectReact(() => {
    if (player) {
      setFormData(player);
    }
  }, [player]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'goals' || name === 'jerseyNumber' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{player ? 'Edit Player' : 'Add New Player'}</h2>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Player Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Lionel Messi"
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position</label>
            <select
              id="position"
              name="position"
              className="form-control"
              value={formData.position}
              onChange={handleChange}
              required
            >
              {POSITIONS.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="team">Team</label>
            <input
              type="text"
              id="team"
              name="team"
              className="form-control"
              value={formData.team}
              onChange={handleChange}
              required
              placeholder="e.g. Inter Miami CF"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="goals">Goals</label>
              <input
                type="number"
                id="goals"
                name="goals"
                className="form-control"
                value={formData.goals}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="jerseyNumber">Jersey Number</label>
              <input
                type="number"
                id="jerseyNumber"
                name="jerseyNumber"
                className="form-control"
                value={formData.jerseyNumber}
                onChange={handleChange}
                min="1"
                max="99"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {player ? 'Update Player' : 'Save Player'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
