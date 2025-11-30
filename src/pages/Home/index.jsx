// import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './../../App.css';

function Home() {
    const { user, logout, loading } = useAuth();

    if (loading) return <div>Đang kiểm tra đăng nhập...</div>;

    return (
        <div>
            {user ? (
                <>
                    <h1>Xin chào, {user.username} (LifeUp Legend)</h1>
                    <button onClick={logout}>Đăng xuất</button>

                    {/* Ví dụ gọi API cần auth:
              axios đã tự gắn token, chỉ cần api.get('/tasks') v.v. */}
                </>
            ) : (
                <div style={{ display: 'flex', gap: 32 }}>
                    <LoginForm />
                    <RegisterForm />
                </div>
            )}
        </div>

        // <div
        //     style={{
        //         width: '100%',
        //         height: '100%',
        //         background:
        //             "url('https://i.pinimg.com/736x/f9/20/1c/f9201c7f906beb67f01dec966417d52e.jpg') center center / cover no-repeat",
        //     }}
        // ></div>
    );
}

export default Home;
