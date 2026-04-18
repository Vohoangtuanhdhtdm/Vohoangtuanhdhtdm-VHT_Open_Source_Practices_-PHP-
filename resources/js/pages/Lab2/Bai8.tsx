import axios from 'axios';
import React, { useState } from 'react';

export default function Bai8() {
    const [chuoiMang, setChuoiMang] = useState('');
    const [ketQua, setKetQua] = useState({
        mangTang: '',
        mangGiam: '',
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSapXep = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const response = await axios.post('/api/bai8/sap-xep', {
                chuoiMang: chuoiMang,
            });

            setKetQua({
                mangTang: response.data.mangTang,
                mangGiam: response.data.mangGiam,
            });
        } catch (error: any) {
            setErrorMsg(
                'Vui lòng nhập đúng định dạng. Dãy số cách nhau bằng dấu phẩy (,).',
            );
            setKetQua({ mangTang: '', mangGiam: '' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-fuchsia-50 font-sans">
            <div className="w-[550px] rounded-xl border border-fuchsia-100 bg-white p-8 shadow-md">
                <h2 className="mb-6 border-b-2 border-fuchsia-100 pb-4 text-center text-2xl font-bold tracking-wider text-fuchsia-700 uppercase">
                    Sắp Xếp Mảng
                </h2>

                {errorMsg && (
                    <div className="mb-4 rounded-md bg-red-100 p-3 text-center text-sm font-medium text-red-600">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSapXep} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 rounded-lg border border-fuchsia-100 bg-fuchsia-50 p-5">
                        <label className="text-sm font-semibold text-gray-700">
                            Nhập mảng:
                        </label>
                        <input
                            type="text"
                            placeholder="VD: 3, 1, 7, 4, 8, 5, 9, 1, 2, 6"
                            className="w-full rounded-md border border-gray-300 p-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-fuchsia-400"
                            value={chuoiMang}
                            onChange={(e) => setChuoiMang(e.target.value)}
                            required
                        />
                        <p className="mt-1 text-xs text-fuchsia-500 italic">
                            (*) Các số được nhập cách nhau bằng dấu ","
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-fuchsia-600 px-8 py-2.5 font-semibold text-white shadow-sm transition-all hover:bg-fuchsia-700 disabled:bg-fuchsia-300"
                        >
                            {loading ? 'Đang xử lý...' : 'Sắp xếp Tăng / Giảm'}
                        </button>
                    </div>

                    <div className="mt-2 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <label className="w-24 text-right text-sm font-medium text-gray-700">
                                Tăng dần:
                            </label>
                            <input
                                type="text"
                                className="flex-1 cursor-not-allowed rounded-md border border-fuchsia-200 bg-white p-2 font-mono font-bold text-fuchsia-700 shadow-inner outline-none"
                                value={ketQua.mangTang}
                                readOnly
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="w-24 text-right text-sm font-medium text-gray-700">
                                Giảm dần:
                            </label>
                            <input
                                type="text"
                                className="flex-1 cursor-not-allowed rounded-md border border-fuchsia-200 bg-white p-2 font-mono font-bold text-fuchsia-700 shadow-inner outline-none"
                                value={ketQua.mangGiam}
                                readOnly
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
