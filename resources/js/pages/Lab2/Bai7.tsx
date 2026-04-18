import axios from 'axios';
import React, { useState } from 'react';

export default function Bai7() {
    const [gio, setGio] = useState('');
    const [loiChao, setLoiChao] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChao = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setLoiChao(''); // Xóa lời chào cũ khi bắt đầu tính mới

        try {
            const response = await axios.post('/api/bai7/chao-theo-gio', {
                gio: Number(gio),
            });

            // Cập nhật lời chào
            setLoiChao(response.data.loiChao);
        } catch (error: any) {
            // Hiển thị lỗi tùy chỉnh (VD: người dùng nhập số 25)
            if (error.response?.data?.errors?.gio) {
                setErrorMsg(error.response.data.errors.gio[0]);
            } else {
                setErrorMsg('Vui lòng nhập giờ hợp lệ!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-sky-50 font-sans">
            <div className="w-[400px] rounded-xl border border-sky-100 bg-white p-8 shadow-md">
                <h2 className="mb-6 border-b-2 border-sky-100 pb-4 text-center text-2xl font-bold tracking-wider text-sky-600 uppercase">
                    Chào Theo Giờ
                </h2>

                {errorMsg && (
                    <div className="mb-4 rounded-md bg-red-100 p-3 text-center text-sm font-medium text-red-600 shadow-sm">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleChao} className="flex flex-col gap-5">
                    <div className="flex items-center gap-4 rounded-lg border border-sky-100 bg-sky-50 p-4">
                        <label className="w-24 text-sm font-semibold text-gray-700">
                            Nhập giờ:
                        </label>
                        <input
                            type="number"
                            className="flex-1 rounded-md border border-gray-300 p-2 text-gray-900 outline-none focus:ring-2 focus:ring-sky-400"
                            value={gio}
                            onChange={(e) => setGio(e.target.value)}
                            required
                        />
                    </div>

                    {/* Chỉ hiển thị hộp kết quả khi có lời chào */}
                    {loiChao && (
                        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center shadow-inner">
                            <span className="text-lg font-bold text-green-700">
                                {loiChao}
                            </span>
                        </div>
                    )}

                    <div className="mt-2 flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-sky-500 px-10 py-2.5 font-semibold text-white shadow-sm transition-all hover:bg-sky-600 disabled:bg-sky-300"
                        >
                            {loading ? 'Đang xử lý...' : 'Chào'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
