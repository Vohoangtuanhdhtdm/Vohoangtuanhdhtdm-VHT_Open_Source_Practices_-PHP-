import axios from 'axios';
import React, { useState } from 'react';

export default function Bai6() {
    const [chuoiMang, setChuoiMang] = useState('');
    const [soCanTim, setSoCanTim] = useState('');

    const [ketQua, setKetQua] = useState({
        mangOld: '',
        thongBao: '',
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleTimKiem = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const response = await axios.post('/api/bai6/tim-kiem', {
                chuoiMang: chuoiMang,
                soCanTim: Number(soCanTim),
            });

            setKetQua({
                mangOld: response.data.mangOld,
                thongBao: response.data.ketQua,
            });
        } catch (error: any) {
            setErrorMsg(
                'Vui lòng nhập đúng định dạng. Dãy số cách nhau bằng dấu phẩy (,).',
            );
            setKetQua({ mangOld: '', thongBao: '' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-indigo-50 font-sans">
            <div className="rounded-xl border border-indigo-100 bg-white p-8 shadow-md">
                <h2 className="mb-6 border-b-2 border-indigo-100 pb-4 text-center text-2xl font-bold tracking-wider text-indigo-700 uppercase">
                    Tìm Kiếm Trong Mảng
                </h2>

                {errorMsg && (
                    <div className="mb-4 rounded-md bg-red-100 p-3 text-center text-sm font-medium text-red-600">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleTimKiem} className="flex flex-col gap-5">
                    {/* Phần Nhập Liệu */}
                    <div className="flex flex-col gap-3 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
                        <div className="flex items-center gap-4">
                            <label className="w-32 text-sm font-semibold text-gray-700">
                                Nhập mảng:
                            </label>
                            <input
                                type="text"
                                placeholder="VD: 1, 3, 5, 7, 9, 10"
                                className="flex-1 rounded-md border border-gray-300 p-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400"
                                value={chuoiMang}
                                onChange={(e) => setChuoiMang(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-32 text-sm font-semibold text-gray-700">
                                Nhập số cần tìm:
                            </label>
                            <input
                                type="number"
                                className="flex-1 rounded-md border border-gray-300 p-2 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400"
                                value={soCanTim}
                                onChange={(e) => setSoCanTim(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-indigo-600 px-8 py-2.5 font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 disabled:bg-indigo-300"
                        >
                            {loading ? 'Đang tìm...' : 'Tìm Kiếm'}
                        </button>
                    </div>

                    {/* Phần Hiển Thị Kết Quả */}
                    <div className="mt-2 flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <label className="w-32 text-sm font-medium text-gray-700">
                                Mảng hiện tại:
                            </label>
                            <input
                                type="text"
                                className="flex-1 cursor-not-allowed rounded-md border bg-gray-50 p-2 font-mono text-indigo-700 outline-none"
                                value={ketQua.mangOld}
                                readOnly
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-32 text-sm font-medium text-gray-700">
                                Kết quả:
                            </label>
                            <input
                                type="text"
                                className={`flex-1 cursor-not-allowed rounded-md border p-2 font-bold outline-none ${ketQua.thongBao.includes('Không') ? 'border-red-200 bg-red-50 text-red-600' : 'border-green-200 bg-green-50 text-green-600'}`}
                                value={ketQua.thongBao}
                                readOnly
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
