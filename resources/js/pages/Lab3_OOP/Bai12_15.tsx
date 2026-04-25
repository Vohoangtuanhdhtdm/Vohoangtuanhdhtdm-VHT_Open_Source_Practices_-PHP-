import axios from 'axios';
import React, { useState } from 'react';

export default function Bai12_15() {
    const [tenCho, setTenCho] = useState('Milu');
    const [canNangCho, setCanNangCho] = useState('15');
    const [tenMeo, setTenMeo] = useState('Mimi');
    const [canNangMeo, setCanNangMeo] = useState('4');

    const [ketQua, setKetQua] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/oop/bai12-15', {
                tenCho,
                canNangCho,
                tenMeo,
                canNangMeo,
            });
            setKetQua(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-black">
            <div className="w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-indigo-700 uppercase">
                    Kế Thừa & Đa Hình (Bài 12 → 15)
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                            <h3 className="mb-2 font-bold text-blue-700">
                                🐕 Lớp Con: ConCho
                            </h3>
                            <input
                                type="text"
                                className="mb-2 w-full rounded border p-2"
                                value={tenCho}
                                onChange={(e) => setTenCho(e.target.value)}
                                placeholder="Tên chó"
                            />
                            <input
                                type="number"
                                className="w-full rounded border p-2"
                                value={canNangCho}
                                onChange={(e) => setCanNangCho(e.target.value)}
                                placeholder="Cân nặng"
                            />
                        </div>
                        <div className="rounded-lg border border-pink-200 bg-pink-50 p-4">
                            <h3 className="mb-2 font-bold text-pink-700">
                                🐈 Lớp Con: ConMeo
                            </h3>
                            <input
                                type="text"
                                className="mb-2 w-full rounded border p-2"
                                value={tenMeo}
                                onChange={(e) => setTenMeo(e.target.value)}
                                placeholder="Tên mèo"
                            />
                            <input
                                type="number"
                                className="w-full rounded border p-2"
                                value={canNangMeo}
                                onChange={(e) => setCanNangMeo(e.target.value)}
                                placeholder="Cân nặng"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded bg-indigo-600 py-3 font-bold text-white transition-all hover:bg-indigo-700"
                    >
                        {loading
                            ? 'Đang gọi thú cưng...'
                            : 'Thực thi Kế thừa & Đa hình'}
                    </button>

                    {ketQua && (
                        <div className="mt-4 space-y-4">
                            <div className="rounded border bg-gray-50 p-3 text-sm">
                                <b>Bài 12 (Kế thừa):</b> {ketQua.bai12_keThua}{' '}
                                (Lấy biến <code>$ten</code> từ Cha)
                            </div>
                            <div className="rounded border bg-gray-50 p-3 text-sm">
                                <b>Bài 13 (Protected):</b>{' '}
                                {ketQua.bai13_protected} (Truy cập{' '}
                                <code>$canNang</code> thành công)
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded border border-green-200 bg-green-50 p-3">
                                    <h4 className="font-bold text-green-700">
                                        Bài 14: Override
                                    </h4>
                                    <p className="text-sm">
                                        Chó: {ketQua.bai14_override.cho}
                                    </p>
                                    <p className="text-sm">
                                        Mèo: {ketQua.bai14_override.meo}
                                    </p>
                                </div>
                                <div className="rounded border border-purple-200 bg-purple-50 p-3">
                                    <h4 className="font-bold text-purple-700">
                                        Bài 15: Đa hình
                                    </h4>
                                    <p className="text-sm">
                                        Kết quả gọi qua hàm dùng chung:
                                    </p>
                                    <ul className="ml-4 list-disc text-xs">
                                        <li>{ketQua.bai15_daHinh.goiCho}</li>
                                        <li>{ketQua.bai15_daHinh.goiMeo}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
