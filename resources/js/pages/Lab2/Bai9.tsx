import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Định nghĩa kiểu dữ liệu (TypeScript) cho mảng 2 chiều
interface DiaDanh {
    ma: string;
    ten: string;
    hinh: string;
}

export default function Bai9() {
    const [danhSach, setDanhSach] = useState<DiaDanh[]>([]);
    const [loading, setLoading] = useState(true);

    // Dùng useEffect để tự động lấy dữ liệu ngay khi vừa mở trang (không cần bấm nút)
    useEffect(() => {
        const fetchDiaDanh = async () => {
            try {
                const response = await axios.post('/api/bai9/dia-danh');
                setDanhSach(response.data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiaDanh();
    }, []);

    // Hàm xử lý cuộn mượt mà đến hình ảnh
    const scrollToTarget = (maDiaDanh: string) => {
        const element = document.getElementById(maDiaDanh);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Hàm quay về đầu trang
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center font-sans">
                Đang tải cảnh đẹp...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white shadow-sm">
                <h1 className="py-4 text-center text-2xl font-bold tracking-widest text-blue-700 uppercase">
                    Danh Lam Thắng Cảnh Việt Nam
                </h1>
            </div>

            <div className="mx-auto mt-8 flex max-w-6xl gap-8 px-4">
                {/* Menu Bên Trái (Cố định khi cuộn) */}
                <div className="w-1/3">
                    <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <h2 className="mb-4 border-b pb-2 text-lg font-bold text-slate-800">
                            Danh sách địa danh
                        </h2>
                        <ul className="flex flex-col gap-2">
                            {danhSach.map((item) => (
                                <li key={item.ma}>
                                    <button
                                        onClick={() => scrollToTarget(item.ma)}
                                        className="w-full rounded-lg px-3 py-2 text-left font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        ✈️ {item.ten}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Nội Dung Bên Phải (Khu vực cuộn) */}
                <div className="flex w-2/3 flex-col gap-12">
                    {danhSach.map((item) => (
                        <div
                            key={item.ma}
                            id={item.ma}
                            className="scroll-mt-24 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                        >
                            <img
                                src={item.hinh}
                                alt={item.ten}
                                className="h-[400px] w-full object-cover"
                            />
                            <div className="flex items-center justify-between bg-slate-50 p-4">
                                <h3 className="text-xl font-bold text-slate-800">
                                    {item.ten}
                                </h3>
                                <button
                                    onClick={scrollToTop}
                                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    ↑ Quay về đầu trang
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
