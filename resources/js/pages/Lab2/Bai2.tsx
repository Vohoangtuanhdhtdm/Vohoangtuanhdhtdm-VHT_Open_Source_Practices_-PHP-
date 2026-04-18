import axios from 'axios';
import React, { useState } from 'react';

export default function Bai2() {
    const [chieuDai, setChieuDai] = useState('');
    const [chieuRong, setChieuRong] = useState('');
    const [dienTich, setDienTich] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTinhToan = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/api/bai2/tinh-dien-tich', {
                chieuDai: parseFloat(chieuDai) || 0,
                chieuRong: parseFloat(chieuRong) || 0,
            });

            setDienTich(response.data.dienTich);
        } catch (error) {
            alert('Vui lòng nhập đúng định dạng số!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
            <div className="w-96 rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-center text-xl font-bold tracking-wider text-gray-900 uppercase">
                    Diện Tích Hình Chữ Nhật
                </h2>

                <form onSubmit={handleTinhToan} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-900">
                            Chiều dài:
                        </label>
                        <input
                            type="number"
                            className="rounded-md border p-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                            value={chieuDai}
                            onChange={(e) => setChieuDai(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-900">
                            Chiều rộng:
                        </label>
                        <input
                            type="number"
                            className="rounded-md border p-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                            value={chieuRong}
                            onChange={(e) => setChieuRong(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-900">
                            Diện tích:
                        </label>
                        <input
                            type="text"
                            className="cursor-not-allowed rounded-md border bg-gray-100 p-2 font-bold text-gray-900 text-red-500 outline-none"
                            value={dienTich}
                            readOnly // Không cho phép chỉnh sửa theo đúng yêu cầu đề bài
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 rounded-md bg-black p-2 font-semibold text-white transition-all hover:bg-gray-800 disabled:bg-gray-400"
                    >
                        {loading ? 'Đang tính...' : 'Tính'}
                    </button>
                </form>
            </div>
        </div>
    );
}
