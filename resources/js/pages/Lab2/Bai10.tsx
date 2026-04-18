import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface DiaDanh {
    ma: string;
    ten: string;
    hinh: string;
}

export default function Bai10() {
    const [danhSach, setDanhSach] = useState<DiaDanh[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiaDanh = async () => {
            try {
                // Gọi API của Bài 10 (Mảng đã được Backend sắp xếp sẵn)
                const response = await axios.post(
                    '/api/bai10/dia-danh-sap-xep',
                );
                setDanhSach(response.data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiaDanh();
    }, []);

    const scrollToTarget = (maDiaDanh: string) => {
        const element = document.getElementById(maDiaDanh);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center font-sans font-bold text-teal-600">
                Đang tải và sắp xếp danh sách...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-teal-100 bg-white shadow-sm">
                <h1 className="py-4 text-center text-2xl font-bold tracking-widest text-teal-700 uppercase">
                    Danh Lam Thắng Cảnh (Mở Rộng)
                </h1>
                <div className="pb-3 text-center text-sm font-medium text-teal-600">
                    <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1">
                        ✨ Danh sách đã được tự động sắp xếp theo Alphabet (A-Z)
                    </span>
                </div>
            </div>

            <div className="mx-auto mt-6 flex max-w-6xl gap-8 px-4">
                {/* Menu Bên Trái */}
                <div className="w-1/3">
                    <div className="sticky top-32 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <h2 className="mb-4 flex items-center justify-between border-b pb-2 text-lg font-bold text-slate-800">
                            <span>Địa danh</span>
                            <span className="rounded bg-slate-100 px-2 py-1 text-xs font-normal text-slate-400">
                                A-Z
                            </span>
                        </h2>
                        <ul className="flex flex-col gap-2">
                            {danhSach.map((item, index) => (
                                <li key={item.ma}>
                                    <button
                                        onClick={() => scrollToTarget(item.ma)}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-medium text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-700"
                                    >
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500">
                                            {index + 1}
                                        </span>
                                        {item.ten}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Nội Dung Bên Phải */}
                <div className="flex w-2/3 flex-col gap-12">
                    {danhSach.map((item) => (
                        <div
                            key={item.ma}
                            id={item.ma}
                            className="scroll-mt-32 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                        >
                            <img
                                src={item.hinh}
                                alt={item.ten}
                                className="h-[400px] w-full object-cover"
                            />
                            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 p-4">
                                <h3 className="text-xl font-bold text-teal-800">
                                    {item.ten}
                                </h3>
                                <button
                                    onClick={scrollToTop}
                                    className="flex items-center gap-1 rounded-md bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-600 transition-colors hover:text-teal-800 hover:underline"
                                >
                                    ↑ Về đầu trang
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
