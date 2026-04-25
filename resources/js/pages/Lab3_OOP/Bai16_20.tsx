import axios from 'axios';
import React, { useState } from 'react';

export default function Bai16_20() {
    const [ketQua, setKetQua] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/oop/bai16-20');
            setKetQua(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 p-6 font-sans">
            <div className="w-full max-w-4xl rounded-xl border border-slate-700 bg-slate-800 p-8 text-slate-200 shadow-2xl">
                <h2 className="mb-2 text-center text-3xl font-bold tracking-wider text-emerald-400 uppercase">
                    Kiến Trúc Hệ Thống (Bài 16 → 20)
                </h2>
                <p className="mb-8 border-b border-slate-600 pb-4 text-center text-slate-400">
                    Abstract — Interface — Magic Methods — Trait
                </p>

                <div className="mb-8 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded-md bg-emerald-500 px-10 py-3 font-bold text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all hover:bg-emerald-400"
                    >
                        {loading
                            ? 'Đang biên dịch...'
                            : '⚡ Kích hoạt Toàn bộ Hệ Thống'}
                    </button>
                </div>

                {ketQua && (
                    <div className="grid grid-cols-2 gap-6">
                        {/* Box Trái */}
                        <div className="flex flex-col gap-4">
                            <div className="rounded-lg border-l-4 border-blue-400 bg-slate-700 p-4">
                                <h4 className="mb-1 font-bold text-blue-300">
                                    Bài 16: Abstract Class
                                </h4>
                                <p className="text-sm">{ketQua.bai16}</p>
                            </div>
                            <div className="rounded-lg border-l-4 border-pink-400 bg-slate-700 p-4">
                                <h4 className="mb-1 font-bold text-pink-300">
                                    Bài 17 & 18: Interfaces (Đa kế thừa)
                                </h4>
                                <p className="mb-1 text-sm">
                                    💳 {ketQua.bai17}
                                </p>
                                <p className="text-sm">📱 {ketQua.bai18}</p>
                            </div>
                            <div className="rounded-lg border-l-4 border-yellow-400 bg-slate-700 p-4">
                                <h4 className="mb-1 font-bold text-yellow-300">
                                    Bài 19: Nạp chồng (__call)
                                </h4>
                                <p className="font-mono text-sm text-yellow-100">
                                    {ketQua.bai19}
                                </p>
                            </div>
                        </div>

                        {/* Box Phải - Trùm Cuối */}
                        <div className="flex flex-col justify-between rounded-lg border border-emerald-500 bg-gradient-to-br from-slate-700 to-slate-800 p-5 shadow-inner">
                            <div>
                                <h4 className="mb-3 border-b border-emerald-500/30 pb-2 text-lg font-bold text-emerald-400">
                                    🏆 Bài 20: Kho Hàng Đa Tầng
                                </h4>
                                <div className="space-y-3">
                                    <div className="rounded bg-slate-900/50 p-2 font-mono text-xs text-emerald-200">
                                        {ketQua.bai20.log}
                                    </div>
                                    <p className="text-sm">
                                        <span className="text-slate-400">
                                            Giá Dell (Sau khi -10% và +10% VAT):
                                        </span>
                                        <br />
                                        <b className="text-lg text-amber-400">
                                            {ketQua.bai20.giaDellThue}
                                        </b>
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 border-t border-slate-600 pt-4">
                                <p className="text-sm tracking-wider text-slate-400 uppercase">
                                    Tổng giá trị tài sản (Static):
                                </p>
                                <p className="text-3xl font-bold text-white">
                                    {ketQua.bai20.tongTaiSan}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
