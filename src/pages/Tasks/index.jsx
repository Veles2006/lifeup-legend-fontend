import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Tasks.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(true);

    const apiURL = import.meta.env.VITE_LIFEUP_API;


    // 🟦 FETCH TASKS
    const loadTasks = async () => {
        try {
            const res = await fetch(`${apiURL}/tasks`);
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error('❌ Lỗi tải nhiệm vụ:', err);
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
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            loadTasks(); // tải lại danh sách
        } catch (err) {
            console.error('❌ Lỗi cập nhật trạng thái:', err);
        }
    };

    // 🟥 API: xoá nhiệm vụ
    const deleteTask = async (id) => {
        try {
            await fetch(`${apiURL}/tasks/${id}`, {
                method: 'DELETE',
            });
            loadTasks(); // tải lại sau khi xoá
        } catch (err) {
            console.error('❌ Lỗi xoá nhiệm vụ:', err);
        }
    };

    return (
        <div className={cx('tasks')}>
            <div className={cx('container')}>
                

                {/* ========== TASKS ========== */}
                <h1>📝 DANH SÁCH NHIỆM VỤ</h1>

                {loadingTasks ? (
                    <p>⏳ Đang tải nhiệm vụ...</p>
                ) : tasks.length === 0 ? (
                    <p>❌ Không có nhiệm vụ nào.</p>
                ) : (
                    tasks.map((task) => (
                        <div key={task._id} className={cx('task-card')}>
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
                                <li>
                                    📌 Trạng thái: <b>{task.status}</b>
                                </li>
                                <li>🔥 Độ khó: {task.difficulty}</li>
                            </ul>

                            {/* ====== NÚT HÀNH ĐỘNG ====== */}
                            <div className={cx('btn-group')}>
                                <button
                                    className={cx('done-btn')}
                                    onClick={() =>
                                        updateTaskStatus(task._id, 'hoàn thành')
                                    }
                                >
                                    ✅ Hoàn thành
                                </button>

                                <button
                                    className={cx('undo-btn')}
                                    onClick={() =>
                                        updateTaskStatus(
                                            task._id,
                                            'chưa hoàn thành'
                                        )
                                    }
                                >
                                    ↩️ Chưa hoàn thành
                                </button>

                                <button
                                    className={cx('delete-btn')}
                                    onClick={() => deleteTask(task._id)}
                                >
                                    🗑️ Xoá
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Tasks;
