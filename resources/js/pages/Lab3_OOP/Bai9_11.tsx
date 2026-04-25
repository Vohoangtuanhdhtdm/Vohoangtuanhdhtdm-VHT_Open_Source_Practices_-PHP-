import axios from 'axios';
import React, { useState } from 'react';

export default function Bai9_11() {
    const [banKinh, setBanKinh] = useState('5');
    const [soLuongSV, setSoLuongSV] = useState('3');
    const [soTien, setSoTien] = useState('1500000');

    const [ketQua, setKetQua] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/oop/bai9-11', {
                banKinh: Number(banKinh),
                soLuongSV: Number(soLuongSV),
                soTien: Number(soTien),
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
                    Thành Phần Dùng Chung (Bài 9 → 11)
                </h2>
                <p className="mb-8 border-b pb-4 text-center text-slate-500">
                    Hằng số (Const) — Thuộc tính Tĩnh (Static Property) — Phương
                    thức Tĩnh (Static Method)
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-3 gap-6">
                        {/* Bài 9 */}
                        <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-5">
                            <h3 className="mb-3 border-b border-cyan-200 pb-2 font-bold text-cyan-700">
                                Bài 9: Const
                            </h3>
                            <label className="mb-1 block text-sm font-semibold text-cyan-800">
                                Bán kính hình tròn:
                            </label>
                            <input
                                type="number"
                                className="w-full rounded border p-2 outline-none focus:ring-2 focus:ring-cyan-400"
                                value={banKinh}
                                onChange={(e) => setBanKinh(e.target.value)}
                                required
                            />
                        </div>

                        {/* Bài 10 */}
                        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-5">
                            <h3 className="mb-3 border-b border-indigo-200 pb-2 font-bold text-indigo-700">
                                Bài 10: Static Property
                            </h3>
                            <label className="mb-1 block text-sm font-semibold text-indigo-800">
                                Tạo bao nhiêu SV?
                            </label>
                            <input
                                type="number"
                                className="w-full rounded border p-2 outline-none focus:ring-2 focus:ring-indigo-400"
                                value={soLuongSV}
                                onChange={(e) => setSoLuongSV(e.target.value)}
                                required
                            />
                        </div>

                        {/* Bài 11 */}
                        <div className="rounded-lg border border-orange-200 bg-orange-50 p-5">
                            <h3 className="mb-3 border-b border-orange-200 pb-2 font-bold text-orange-700">
                                Bài 11: Static Method
                            </h3>
                            <label className="mb-1 block text-sm font-semibold text-orange-800">
                                Nhập số tiền:
                            </label>
                            <input
                                type="number"
                                className="w-full rounded border p-2 outline-none focus:ring-2 focus:ring-orange-400"
                                value={soTien}
                                onChange={(e) => setSoTien(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-slate-800 px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-slate-700"
                        >
                            {loading
                                ? 'Đang gọi Logic...'
                                : 'Thực thi các lệnh Static / Const'}
                        </button>
                    </div>

                    {/* Hiển thị Kết quả */}
                    {ketQua && (
                        <div className="mt-4 grid grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2 rounded-lg border border-cyan-300 bg-white p-4 text-sm text-cyan-900 shadow-sm">
                                <p>
                                    Giá trị{' '}
                                    <code className="rounded bg-cyan-100 px-1">
                                        HinhTron::PI
                                    </code>{' '}
                                    là: <b>{ketQua.giaTriPI}</b>
                                </p>
                                <p>
                                    Diện tích: <b>{ketQua.dienTich}</b>
                                </p>
                            </div>

                            <div className="flex items-center rounded-lg border border-indigo-300 bg-white p-4 text-sm text-indigo-900 shadow-sm">
                                Đã đếm được:{' '}
                                <b className="mx-2 text-lg text-indigo-600">
                                    {ketQua.tongSV}
                                </b>{' '}
                                sinh viên.
                            </div>

                            <div className="flex items-center justify-center rounded-lg border border-orange-300 bg-white p-4 text-lg font-semibold text-orange-800 shadow-sm">
                                {ketQua.tienTe}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
