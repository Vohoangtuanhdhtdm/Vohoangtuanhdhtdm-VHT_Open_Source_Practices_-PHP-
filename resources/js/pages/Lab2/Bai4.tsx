import axios from 'axios';
import React, { useState } from 'react';

export default function Bai4() {
    const [tenChuHo, setTenChuHo] = useState('');
    const [chiSoCu, setChiSoCu] = useState('');
    const [chiSoMoi, setChiSoMoi] = useState('');
    const [donGia, setDonGia] = useState('2000'); // Mặc định là 2000 theo đề bài
    const [soTien, setSoTien] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleTinhToan = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(''); // Xóa lỗi cũ

        try {
            const response = await axios.post('/api/bai4/tinh-tien-dien', {
                tenChuHo: tenChuHo,
                chiSoCu: Number(chiSoCu),
                chiSoMoi: Number(chiSoMoi),
                donGia: Number(donGia),
            });

            // Định dạng tiền tệ VNĐ (ví dụ: 200000 -> 200.000)
            const formattedMoney = new Intl.NumberFormat('vi-VN').format(
                response.data.soTienThanhToan,
            );
            setSoTien(formattedMoney);
        } catch (error: any) {
            // Hiển thị lỗi tùy chỉnh từ Laravel nếu có
            if (error.response?.data?.errors?.chiSoMoi) {
                setErrorMsg(error.response.data.errors.chiSoMoi[0]);
            } else {
                setErrorMsg('Vui lòng kiểm tra lại số liệu nhập vào!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-yellow-50 font-sans">
            <div className="rounded-xl border border-yellow-200 bg-white p-8 shadow-md">
                <h2 className="mb-6 border-b-2 border-yellow-200 pb-4 text-center text-2xl font-bold tracking-wider text-yellow-700 uppercase">
                    Thanh Toán Tiền Điện
                </h2>

                {errorMsg && (
                    <div className="mb-4 rounded-md bg-red-100 p-3 text-center text-sm font-medium text-red-600">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleTinhToan} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <label className="w-32 text-sm font-medium text-gray-700">
                            Tên chủ hộ:
                        </label>
                        <input
                            type="text"
                            className="flex-1 rounded-md border border-gray-300 p-2 text-gray-700 outline-none focus:ring-2 focus:ring-yellow-400"
                            value={tenChuHo}
                            onChange={(e) => setTenChuHo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-32 text-sm font-medium text-gray-700">
                            Chỉ số cũ:
                        </label>
                        <input
                            type="number"
                            className="flex-1 rounded-md border border-gray-300 p-2 text-gray-700 outline-none focus:ring-2 focus:ring-yellow-400"
                            value={chiSoCu}
                            onChange={(e) => setChiSoCu(e.target.value)}
                            min="0"
                            required
                        />
                        <span className="w-12 text-gray-500">(Kw)</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-32 text-sm font-medium text-gray-700">
                            Chỉ số mới:
                        </label>
                        <input
                            type="number"
                            className="flex-1 rounded-md border border-gray-300 p-2 text-gray-700 outline-none focus:ring-2 focus:ring-yellow-400"
                            value={chiSoMoi}
                            onChange={(e) => setChiSoMoi(e.target.value)}
                            min="0"
                            required
                        />
                        <span className="w-12 text-gray-500">(Kw)</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-32 text-sm font-medium text-gray-700">
                            Đơn giá:
                        </label>
                        <input
                            type="number"
                            className="flex-1 rounded-md border border-gray-300 p-2 text-gray-700 outline-none focus:ring-2 focus:ring-yellow-400"
                            value={donGia}
                            onChange={(e) => setDonGia(e.target.value)}
                            min="0"
                            required
                        />
                        <span className="w-12 text-gray-500">(VNĐ)</span>
                    </div>

                    <div className="mt-2 flex items-center gap-4">
                        <label className="w-32 text-sm font-medium text-red-600">
                            Số tiền thanh toán:
                        </label>
                        <input
                            type="text"
                            className="flex-1 cursor-not-allowed rounded-md border border-red-200 bg-red-50 p-2 font-bold text-gray-700 text-red-600 outline-none"
                            value={soTien}
                            readOnly
                        />
                        <span className="w-12 text-gray-500">(VNĐ)</span>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-yellow-500 px-8 py-2 font-semibold text-gray-700 shadow-sm transition-all hover:bg-yellow-600 disabled:bg-yellow-300"
                        >
                            {loading ? 'Đang tính...' : 'Tính'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
