function Players() {
    return (
        <div>
            <h3>player</h3>
        </div>
    );
}

export default Players;
// const [players, setPlayers] = useState([]);

// const [loadingPlayers, setLoadingPlayers] = useState(true);

// 🟩 FETCH PLAYERS
// useEffect(() => {
//     const fetchPlayers = async () => {
//         try {
//             const res = await fetch(`${apiURL}/characters`);
//             const data = await res.json();
//             setPlayers(data);
//         } catch (err) {
//             console.error('❌ Lỗi khi tải người chơi:', err);
//         } finally {
//             setLoadingPlayers(false);
//         }
//     };
//     fetchPlayers();
// }, []);

// {/* <h1>🎮 BẢNG TRẠNG THÁI NGƯỜI CHƠI</h1>

//                 {/* ========== PLAYERS ========== */}
//                 {loadingPlayers ? (
//                     <p>⏳ Đang tải người chơi...</p>
//                 ) : players.length === 0 ? (
//                     <p>❌ Không có người chơi nào.</p>
//                 ) : (
//                     players.map((p, index) => (
//                         <div key={index} className={cx('player-card')}>
//                             <h2>{p.name || '?'}</h2>
//                             <p>
//                                 ⚧ {p.gender || '?'} — 🎂 {p.age || '?'} tuổi
//                             </p>

//                             {p.stats && (
//                                 <ul>
//                                     <li>💪 Sức mạnh: {p.stats.strength}</li>
//                                     <li>🧠 Trí tuệ: {p.stats.intelligence}</li>
//                                     <li>❤️ Thể lực: {p.stats.stamina}</li>
//                                     <li>⚡ Tốc độ: {p.stats.speed}</li>
//                                     <li>✨ Mỹ lực: {p.stats.charm}</li>
//                                 </ul>
//                             )}
//                         </div>
//                     ))
//                 )}

//                 <hr /> */}
