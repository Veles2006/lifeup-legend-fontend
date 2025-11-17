import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [players, setPlayers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);
    const [loadingTasks, setLoadingTasks] = useState(true);

    const apiURL = import.meta.env.VITE_LIFEUP_API;

    // 🟩 FETCH PLAYERS
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await fetch(`${apiURL}/characters`);
                const data = await res.json();
                setPlayers(data);
            } catch (err) {
                console.error('❌ Lỗi khi tải người chơi:', err);
            } finally {
                setLoadingPlayers(false);
            }
        };
        fetchPlayers();
    }, []);

    // 🟦 FETCH TASKS
    const loadTasks = async () => {
        try {
            const res = await fetch(`${apiURL}/tasks`);
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error("❌ Lỗi tải nhiệm vụ:", err);
        } finally {
            setLoadingTasks(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    // 🟧 API: cập nhật trạng thái
    const updateTaskStatus = async (id, status) => {
        try {
            await fetch(`${apiURL}/tasks/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            loadTasks(); // tải lại danh sách
        } catch (err) {
            console.error("❌ Lỗi cập nhật trạng thái:", err);
        }
    };

    // 🟥 API: xoá nhiệm vụ
    const deleteTask = async (id) => {
        try {
            await fetch(`${apiURL}/tasks/${id}`, {
                method: "DELETE",
            });
            loadTasks(); // tải lại sau khi xoá
        } catch (err) {
            console.error("❌ Lỗi xoá nhiệm vụ:", err);
        }
    };

    return (
        <div className="container">
            <h1>🎮 BẢNG TRẠNG THÁI NGƯỜI CHƠI</h1>

            {/* ========== PLAYERS ========== */}
            {loadingPlayers ? (
                <p>⏳ Đang tải người chơi...</p>
            ) : players.length === 0 ? (
                <p>❌ Không có người chơi nào.</p>
            ) : (
                players.map((p, index) => (
                    <div key={index} className="player-card">
                        <h2>{p.name || '?'}</h2>
                        <p>⚧ {p.gender || '?'} — 🎂 {p.age || '?'} tuổi</p>

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

            <hr />

            {/* ========== TASKS ========== */}
            <h1>📝 DANH SÁCH NHIỆM VỤ</h1>

            {loadingTasks ? (
                <p>⏳ Đang tải nhiệm vụ...</p>
            ) : tasks.length === 0 ? (
                <p>❌ Không có nhiệm vụ nào.</p>
            ) : (
                tasks.map((task) => (
                    <div key={task._id} className="task-card">
                        <h2>📌 {task.name}</h2>
                        <p>📘 Loại: {task.type}</p>
                        <p>📝 Mô tả: {task.short_desc}</p>
                        <p>📄 Chi tiết: {task.full_desc}</p>

                        <ul>
                            <li>🎯 Yêu cầu: {task.requirement}</li>
                            <li>🏆 Phần thưởng: {task.reward}</li>
                            <li>⚠️ Hình phạt: {task.penalty}</li>
                            <li>⏰ Hạn: {task.deadline}</li>
                            <li>📅 Ngày: {task.date}</li>
                            <li>📌 Trạng thái: <b>{task.status}</b></li>
                            <li>🔥 Độ khó: {task.difficulty}</li>
                        </ul>

                        {/* ====== NÚT HÀNH ĐỘNG ====== */}
                        <div className="btn-group">
                            <button
                                className="done-btn"
                                onClick={() => updateTaskStatus(task._id, "hoàn thành")}
                            >
                                ✅ Hoàn thành
                            </button>

                            <button
                                className="undo-btn"
                                onClick={() => updateTaskStatus(task._id, "chưa hoàn thành")}
                            >
                                ↩️ Chưa hoàn thành
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => deleteTask(task._id)}
                            >
                                🗑️ Xoá
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default App;
