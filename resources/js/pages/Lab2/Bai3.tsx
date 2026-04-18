import React, { useState } from 'react';
import axios from 'axios';

export default function Bai3() {
    const [banKinh, setBanKinh] = useState('');
    const [dienTich, setDienTich] = useState('');
    const [chuVi, setChuVi] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTinhToan = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/api/bai3/tinh-hinh-tron', {
                banKinh: banKinh,
            });

            // Cập nhật kết quả
            setDienTich(response.data.dienTich);
            setChuVi(response.data.chuVi);
        } catch (error) {
            alert('Vui lòng nhập số hợp lệ!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-orange-50 font-sans">
            <div className="w-96 rounded-xl border border-orange-100 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-center text-xl font-bold tracking-wider text-gray-900 uppercase">
                    Diện Tích & Chu Vi Hình Tròn
                </h2>

                <form onSubmit={handleTinhToan} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-900">
                            Bán kính:
                        </label>
                        <input
                            type="number"
                            step="any" // Cho phép nhập số thập phân
                            className="rounded-md border p-2 text-gray-900 outline-none focus:ring-2 focus:ring-orange-400"
                            value={banKinh}
                            onChange={(e) => setBanKinh(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-900">
                            Diện tích:
                        </label>
                        <input
                            type="text"
                            className="cursor-not-allowed rounded-md border bg-gray-100 p-2 font-bold text-gray-900 outline-none"
                            value={dienTich}
                            readOnly // Không cho phép chỉnh sửa
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-900">
                            Chu vi:
                        </label>
                        <input
                            type="text"
                            className="cursor-not-allowed rounded-md border bg-gray-100 p-2 font-bold text-gray-900 outline-none"
                            value={chuVi}
                            readOnly // Không cho phép chỉnh sửa
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 rounded-md bg-orange-500 p-2 font-semibold text-gray-900 transition-all hover:bg-orange-600 disabled:bg-orange-300"
                    >
                        {loading ? 'Đang tính...' : 'Tính'}
                    </button>
                </form>
            </div>
        </div>
    );
}
