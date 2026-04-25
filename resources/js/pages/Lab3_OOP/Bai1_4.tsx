import axios from 'axios';
import React, { useState } from 'react';

export default function Bai1_4() {
    // Dữ liệu cho Cuốn sách 1
    const [ten1, setTen1] = useState('Lập trình PHP');
    const [tg1, setTg1] = useState('Nguyễn Văn A');
    const [nam1, setNam1] = useState('2023');

    // Dữ liệu cho Cuốn sách 2
    const [ten2, setTen2] = useState('Cơ sở dữ liệu');
    const [tg2, setTg2] = useState('Trần Thị B');
    const [nam2, setNam2] = useState('2021');
    const [namMoi2, setNamMoi2] = useState(''); // Để test tính năng cập nhật Bài 4

    const [ketQua, setKetQua] = useState({ sach1_info: '', sach2_info: '' });
    const [loading, setLoading] = useState(false);

    const handleKhoiTao = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/oop/bai1-4', {
                ten1,
                tg1,
                nam1,
                ten2,
                tg2,
                nam2,
                namMoi2,
            });
            setKetQua(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white p-6 font-sans text-black">
            <div className="w-full max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
                <h2 className="mb-2 text-center text-2xl font-bold text-slate-800 uppercase">
                    Bài 1 → 4: Lớp Sách & Khởi Tạo Đối Tượng
                </h2>
                <p className="mb-6 border-b pb-4 text-center text-slate-500">
                    Thực hành từ khóa <b>class</b>, <b>new</b>, và <b>$this</b>
                </p>

                <form onSubmit={handleKhoiTao} className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-8">
                        {/* Cột Sách 1 */}
                        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
                            <h3 className="mb-4 border-b border-blue-200 pb-2 font-bold text-blue-700">
                                Cuốn Sách 1
                            </h3>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Tên sách"
                                    className="rounded border p-2"
                                    value={ten1}
                                    onChange={(e) => setTen1(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Tác giả"
                                    className="rounded border p-2"
                                    value={tg1}
                                    onChange={(e) => setTg1(e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Năm xuất bản"
                                    className="rounded border p-2"
                                    value={nam1}
                                    onChange={(e) => setNam1(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Cột Sách 2 */}
                        <div className="rounded-lg border border-purple-100 bg-purple-50 p-5">
                            <h3 className="mb-4 border-b border-purple-200 pb-2 font-bold text-purple-700">
                                Cuốn Sách 2
                            </h3>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Tên sách"
                                    className="rounded border p-2"
                                    value={ten2}
                                    onChange={(e) => setTen2(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Tác giả"
                                    className="rounded border p-2"
                                    value={tg2}
                                    onChange={(e) => setTg2(e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Năm xuất bản (Cũ)"
                                    className="rounded border bg-white p-2"
                                    value={nam2}
                                    onChange={(e) => setNam2(e.target.value)}
                                    required
                                />

                                {/* Form test bài 4 */}
                                <div className="mt-2 border-t border-purple-200 pt-2">
                                    <label className="mb-1 block text-xs font-semibold text-purple-600">
                                        Bài 4: Test cập nhật Năm XB mới:
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Nhập năm mới nếu muốn đổi..."
                                        className="w-full rounded border border-purple-300 p-2 focus:ring-purple-500"
                                        value={namMoi2}
                                        onChange={(e) =>
                                            setNamMoi2(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-slate-800 px-8 py-3 font-bold text-white shadow-md hover:bg-slate-700"
                        >
                            {loading
                                ? 'Đang xử lý OOP...'
                                : 'Tạo Đối Tượng (new) & Xem kết quả'}
                        </button>
                    </div>

                    {/* Hiển thị kết quả (Bài 3) */}
                    {ketQua.sach1_info && (
                        <div className="bg-slate-80 mt-4 flex flex-col gap-2 rounded-lg border border-slate-300 bg-gray-50 p-5 font-mono text-sm text-slate-800 shadow-inner">
                            <div className="flex items-center gap-2">
                                <span className="rounded bg-blue-200 px-2 py-1 text-xs font-bold text-blue-800">
                                    {'$sach1->hienThiThongTin()'}
                                </span>
                                <span>{ketQua.sach1_info}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="rounded bg-purple-200 px-2 py-1 text-xs font-bold text-purple-800">
                                    {'$sach2->hienThiThongTin()'}
                                </span>
                                <span>{ketQua.sach2_info}</span>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
