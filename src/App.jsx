import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔄 Gọi API lấy danh sách người chơi
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await fetch('http://localhost:10000/characters');
                const data = await res.json();
                setPlayers(data);
            } catch (err) {
                console.error('❌ Lỗi khi tải người chơi:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlayers();
    }, []);

    return (
        <div className="container">
            <h1>🎮 BẢNG TRẠNG THÁI NGƯỜI CHƠI</h1>
            {loading ? (
                <p>⏳ Đang tải dữ liệu...</p>
            ) : players.length === 0 ? (
                <p>❌ Không có người chơi nào trong hệ thống.</p>
            ) : (
                players.map((p, index) => (
                    <div key={index} className="player-card">
                        <h2>{p.name || '?'}</h2>
                        <p>
                            ⚧ {p.gender || '?'} — 🎂 {p.age || '?'} tuổi
                        </p>
                        {p.stats && (
                            <ul>
                                <li>💪 Sức mạnh: {p.stats.strength}</li>
                                <li>🧠 Trí tuệ: {p.stats.intelligence}</li>
                                <li>❤️ Thể lực: {p.stats.stamina}</li>
                                <li>⚡ Tốc độ: {p.stats.speed}</li>
                                <li>✨ Mỹ lực: {p.stats.charm}</li>
                            </ul>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default App;
