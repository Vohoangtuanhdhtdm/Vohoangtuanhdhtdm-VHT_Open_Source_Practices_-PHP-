import axios from 'axios';
import React, { useState } from 'react';

export default function Bai5() {
    const [soPhanTu, setSoPhanTu] = useState('');
    const [ketQua, setKetQua] = useState({
        chuoiMang: '',
        max: '',
        min: '',
        tong: '',
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handlePhatSinh = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const response = await axios.post('/api/bai5/phat-sinh-mang', {
                soPhanTu: Number(soPhanTu),
            });

            // Cập nhật toàn bộ object kết quả
            setKetQua(response.data);
        } catch (error: any) {
            if (error.response?.data?.errors?.soPhanTu) {
                setErrorMsg(error.response.data.errors.soPhanTu[0]);
            } else {
                setErrorMsg('Vui lòng nhập số hợp lệ!');
            }
            // Reset kết quả nếu có lỗi
            setKetQua({ chuoiMang: '', max: '', min: '', tong: '' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-emerald-50 font-sans">
            <div className="w-[500px] rounded-xl border border-emerald-100 bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-xl font-bold tracking-wider text-emerald-700 uppercase">
                    Phát Sinh Mảng Và Tính Toán
                </h2>

                {errorMsg && (
                    <div className="mb-4 rounded-md bg-red-100 p-3 text-center text-sm font-medium text-red-600">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handlePhatSinh} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                        <label className="w-32 text-sm font-semibold text-gray-700">
                            Nhập số phần tử:
                        </label>
                        <input
                            type="number"
                            className="flex-1 rounded-md border border-gray-300 p-2 text-gray-900 outline-none focus:ring-2 focus:ring-emerald-400"
                            value={soPhanTu}
                            onChange={(e) => setSoPhanTu(e.target.value)}
                            min="1"
                            required
                        />
                    </div>

                    <div className="my-2 flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-emerald-500 px-6 py-2 font-semibold text-white shadow-sm transition-all hover:bg-emerald-600 disabled:bg-emerald-300"
                        >
                            {loading
                                ? 'Đang xử lý...'
                                : 'Phát sinh và tính toán'}
                        </button>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <label className="w-40 text-sm font-medium text-gray-700">
                                Mảng sinh ra:
                            </label>
                            <input
                                type="text"
                                className="flex-1 cursor-not-allowed rounded-md border bg-gray-50 p-2 font-mono text-emerald-700 outline-none"
                                value={ketQua.chuoiMang}
                                readOnly
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-40 text-sm font-medium text-gray-700">
                                GTLN (MAX) trong mảng:
                            </label>
                            <input
                                type="text"
                                className="flex-1 cursor-not-allowed rounded-md border bg-gray-50 p-2 font-bold text-red-500 outline-none"
                                value={ketQua.max}
                                readOnly
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-40 text-sm font-medium text-gray-700">
                                GTNN (MIN) trong mảng:
                            </label>
                            <input
                                type="text"
                                className="flex-1 cursor-not-allowed rounded-md border bg-gray-50 p-2 font-bold text-blue-500 outline-none"
                                value={ketQua.min}
                                readOnly
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-40 text-sm font-medium text-gray-700">
                                Tổng mảng:
                            </label>
                            <input
                                type="text"
                                className="flex-1 cursor-not-allowed rounded-md border bg-gray-50 p-2 font-bold text-emerald-600 outline-none"
                                value={ketQua.tong}
                                readOnly
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
