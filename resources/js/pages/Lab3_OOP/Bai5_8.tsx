import axios from 'axios';
import React, { useState } from 'react';

export default function Bai5_8() {
    // Dữ liệu Bài 5-6
    const [username, setUsername] = useState('VoHoangTuan');
    const [email, setEmail] = useState('tuan@tdmu.edu.vn');

    // Dữ liệu Bài 7
    const [password, setPassword] = useState('123');

    // Dữ liệu Bài 8
    const [tenSP, setTenSP] = useState('Chuột không dây');
    const [giaSP, setGiaSP] = useState('350000');

    const [ketQua, setKetQua] = useState({
        logVongDoi: '',
        ketQuaMatKhau: '',
        thongTinSP: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/oop/bai5-8', {
                username,
                email,
                password,
                tenSP,
                giaSP: Number(giaSP),
            });
            setKetQua(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 font-sans text-black">
            <div className="w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
                <h2 className="mb-2 text-center text-2xl font-bold text-slate-800 uppercase">
                    Thực Hành OOP Nâng Cao (Bài 5 → 8)
                </h2>
                <p className="mb-8 border-b pb-4 text-center text-slate-500">
                    Vòng đời đối tượng — Đóng gói (Private) — Getter/Setter
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-3 gap-6">
                        {/* Cột 1: Vòng Đời (Bài 5 & 6) */}
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                            <h3 className="mb-3 flex items-center justify-between border-b border-emerald-200 pb-2 font-bold text-emerald-700">
                                Bài 5 & 6{' '}
                                <span className="rounded bg-emerald-200 px-2 py-1 text-xs text-emerald-800">
                                    __construct / __destruct
                                </span>
                            </h3>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="rounded border p-2 outline-none focus:ring-2 focus:ring-emerald-400"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="rounded border p-2 outline-none focus:ring-2 focus:ring-emerald-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Cột 2: Đóng gói (Bài 7) */}
                        <div className="rounded-lg border border-rose-200 bg-rose-50 p-5">
                            <h3 className="mb-3 flex items-center justify-between border-b border-rose-200 pb-2 font-bold text-rose-700">
                                Bài 7{' '}
                                <span className="rounded bg-rose-200 px-2 py-1 text-xs text-rose-800">
                                    private / setter validate
                                </span>
                            </h3>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Nhập mật khẩu..."
                                    className="rounded border p-2 outline-none focus:ring-2 focus:ring-rose-400"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                                <p className="text-xs text-rose-500 italic">
                                    Thử nhập dưới 6 ký tự để xem lỗi bảo mật.
                                </p>
                            </div>
                        </div>

                        {/* Cột 3: Getter/Setter (Bài 8) */}
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
                            <h3 className="mb-3 flex items-center justify-between border-b border-amber-200 pb-2 font-bold text-amber-700">
                                Bài 8{' '}
                                <span className="rounded bg-amber-200 px-2 py-1 text-xs text-amber-800">
                                    Getter / Setter Chuẩn
                                </span>
                            </h3>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Tên sản phẩm"
                                    className="rounded border p-2 outline-none focus:ring-2 focus:ring-amber-400"
                                    value={tenSP}
                                    onChange={(e) => setTenSP(e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Giá tiền"
                                    className="rounded border p-2 outline-none focus:ring-2 focus:ring-amber-400"
                                    value={giaSP}
                                    onChange={(e) => setGiaSP(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-slate-800 px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-slate-700"
                        >
                            {loading
                                ? 'Đang thực thi Logic OOP...'
                                : 'Chạy toàn bộ Mô phỏng OOP'}
                        </button>
                    </div>

                    {/* Hiển thị Kết quả */}
                    {ketQua.logVongDoi && (
                        <div className="mt-4 grid grid-cols-3 gap-6">
                            <div
                                className="rounded-lg border border-emerald-300 bg-white p-4 text-sm shadow-sm"
                                dangerouslySetInnerHTML={{
                                    __html: ketQua.logVongDoi,
                                }}
                            />

                            <div
                                className={`flex items-center rounded-lg border p-4 text-sm font-medium shadow-sm ${ketQua.ketQuaMatKhau.includes('Lỗi') ? 'border-red-300 bg-red-50 text-red-600' : 'border-green-300 bg-green-50 text-green-700'}`}
                            >
                                {ketQua.ketQuaMatKhau}
                            </div>

                            <div className="flex items-center rounded-lg border border-amber-300 bg-white p-4 text-sm font-semibold text-amber-800 shadow-sm">
                                {ketQua.thongTinSP}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
