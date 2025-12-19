import React, { useState } from 'react';
import axios from 'axios';
import { FileText, Image, FileSpreadsheet, Presentation, Globe, RefreshCw } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

const ConversionTools: React.FC = () => {
    const [loading, setLoading] = useState<string | null>(null); // Track specific endpoint loading
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'to_pdf' | 'from_pdf'>('from_pdf');

    const handleConversion = async (e: React.FormEvent<HTMLFormElement>, endpoint: string, outputName: string) => {
        e.preventDefault();
        setLoading(endpoint);
        setMessage(null);
        const formData = new FormData(e.currentTarget);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/tools/${endpoint}`, formData, {
                responseType: 'blob'
            });
            const filename = response.headers['content-disposition']?.split('filename=')[1]?.replace(/"/g, '') || outputName;
            downloadFile(response.data, filename);
            setMessage({ type: 'success', text: 'Conversion successful!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Conversion failed.' });
            console.error(error);
        } finally {
            setLoading(null);
        }
    };

    const downloadFile = (data: Blob, filename: string) => {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <div className="p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-700 to-cyan-700 bg-clip-text text-transparent mb-2">Conversion Tools</h2>
                <p className="text-gray-500">Transform your documents with ease</p>
            </div>

            {message && (
                <div className={`p-4 mb-6 rounded-xl shadow-lg ${message.type === 'success' ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200' : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200'} animate-scale-in`}>
                    {message.text}
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-6 mb-8 border-b border-sky-100">
                <button
                    onClick={() => setActiveTab('from_pdf')}
                    className={`pb-4 px-6 font-semibold transition-all duration-300 relative ${activeTab === 'from_pdf' ? 'text-sky-700' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Convert From PDF
                    {activeTab === 'from_pdf' && <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 to-cyan-600 rounded-full" />}
                </button>
                <button
                    onClick={() => setActiveTab('to_pdf')}
                    className={`pb-4 px-6 font-semibold transition-all duration-300 relative ${activeTab === 'to_pdf' ? 'text-sky-700' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Convert To PDF
                    {activeTab === 'to_pdf' && <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 to-cyan-600 rounded-full" />}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab === 'to_pdf' ? (
                    <>
                        {/* Word to PDF */}
                        <div className="card-interactive bg-white p-6 rounded-2xl shadow-lg border border-purple-100/50 hover:border-purple-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl text-blue-600 shadow-md">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">Word to PDF</h3>
                            </div>
                            <form onSubmit={(e) => handleConversion(e, 'word-to-pdf', 'converted.pdf')} className="space-y-4">
                                <input type="file" name="file" accept=".docx,.doc" required className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-50 file:to-blue-100 file:text-blue-700 hover:file:from-blue-100 hover:file:to-blue-200 file:transition-all file:cursor-pointer" />
                                <button type="submit" disabled={!!loading} className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">
                                    {loading === 'word-to-pdf' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Converting...</> : 'Convert to PDF'}
                                </button>
                            </form>
                        </div>

                        {/* Excel to PDF */}
                        <div className="card-interactive bg-white p-6 rounded-2xl shadow-lg border border-green-100/50 hover:border-green-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl text-green-600 shadow-md">
                                    <FileSpreadsheet className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">Excel to PDF</h3>
                            </div>
                            <form onSubmit={(e) => handleConversion(e, 'excel-to-pdf', 'converted.pdf')} className="space-y-4">
                                <input type="file" name="file" accept=".xlsx,.xls" required className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-green-50 file:to-green-100 file:text-green-700 hover:file:from-green-100 hover:file:to-green-200 file:transition-all file:cursor-pointer" />
                                <button type="submit" disabled={!!loading} className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:-translate-y-0.5">
                                    {loading === 'excel-to-pdf' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Converting...</> : 'Convert to PDF'}
                                </button>
                            </form>
                        </div>

                        {/* PPT to PDF */}
                        <div className="card-interactive bg-white p-6 rounded-2xl shadow-lg border border-orange-100/50 hover:border-orange-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl text-orange-600 shadow-md">
                                    <Presentation className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">PPT to PDF</h3>
                            </div>
                            <form onSubmit={(e) => handleConversion(e, 'ppt-to-pdf', 'converted.pdf')} className="space-y-4">
                                <input type="file" name="file" accept=".pptx,.ppt" required className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-orange-50 file:to-orange-100 file:text-orange-700 hover:file:from-orange-100 hover:file:to-orange-200 file:transition-all file:cursor-pointer" />
                                <button type="submit" disabled={!!loading} className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5">
                                    {loading === 'ppt-to-pdf' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Converting...</> : 'Convert to PDF'}
                                </button>
                            </form>
                        </div>

                        {/* Image to PDF */}
                        <div className="card-interactive bg-white p-6 rounded-2xl shadow-lg border border-purple-100/50 hover:border-purple-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl text-purple-600 shadow-md">
                                    <Image className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">Image to PDF</h3>
                            </div>
                            <form onSubmit={(e) => handleConversion(e, 'img-to-pdf', 'converted.pdf')} className="space-y-4">
                                <input type="file" name="file" accept="image/*" required className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-50 file:to-purple-100 file:text-purple-700 hover:file:from-purple-100 hover:file:to-purple-200 file:transition-all file:cursor-pointer" />
                                <button type="submit" disabled={!!loading} className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5">
                                    {loading === 'img-to-pdf' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Converting...</> : 'Convert to PDF'}
                                </button>
                            </form>
                        </div>

                        {/* HTML to PDF */}
                        <div className="card-interactive bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:border-gray-400">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl text-gray-600 shadow-md">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">HTML to PDF</h3>
                            </div>
                            <form onSubmit={(e) => handleConversion(e, 'html-to-pdf', 'converted.pdf')} className="space-y-4">
                                <input type="file" name="file" accept=".html,.htm" required className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-gray-50 file:to-gray-100 file:text-gray-700 hover:file:from-gray-100 hover:file:to-gray-200 file:transition-all file:cursor-pointer" />
                                <button type="submit" disabled={!!loading} className="w-full py-3 px-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50 hover:-translate-y-0.5">
                                    {loading === 'html-to-pdf' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Converting...</> : 'Convert to PDF'}
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <>
                        {/* PDF to Word */}
                        <div className="card-interactive bg-white p-6 rounded-2xl shadow-lg border border-blue-100/50 hover:border-blue-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl text-blue-600 shadow-md">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">PDF to Word</h3>
                            </div>
                            <form onSubmit={(e) => handleConversion(e, 'pdf-to-word', 'converted.docx')} className="space-y-4">
                                <input type="file" name="file" accept=".pdf" required className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-50 file:to-blue-100 file:text-blue-700 hover:file:from-blue-100 hover:file:to-blue-200 file:transition-all file:cursor-pointer" />
                                <button type="submit" disabled={!!loading} className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">
                                    {loading === 'pdf-to-word' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Converting...</> : 'Convert to Word'}
                                </button>
                            </form>
                        </div>

                        {/* PDF to Excel */}
                        <div className="card-interactive bg-white p-6 rounded-2xl shadow-lg border border-green-100/50 hover:border-green-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl text-green-600 shadow-md">
                                    <FileSpreadsheet className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">PDF to Excel</h3>
                            </div>
                            <form onSubmit={(e) => handleConversion(e, 'pdf-to-excel', 'converted.xlsx')} className="space-y-4">
                                <input type="file" name="file" accept=".pdf" required className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-green-50 file:to-green-100 file:text-green-700 hover:file:from-green-100 hover:file:to-green-200 file:transition-all file:cursor-pointer" />
                                <button type="submit" disabled={!!loading} className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:-translate-y-0.5">
                                    {loading === 'pdf-to-excel' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Converting...</> : 'Convert to Excel'}
                                </button>
                            </form>
                        </div>

                        {/* PDF to PPT */}
                        <div className="card-interactive bg-white p-6 rounded-2xl shadow-lg border border-orange-100/50 hover:border-orange-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl text-orange-600 shadow-md">
                                    <Presentation className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">PDF to PPT</h3>
                            </div>
                            <form onSubmit={(e) => handleConversion(e, 'pdf-to-ppt', 'converted.pptx')} className="space-y-4">
                                <input type="file" name="file" accept=".pdf" required className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-orange-50 file:to-orange-100 file:text-orange-700 hover:file:from-orange-100 hover:file:to-orange-200 file:transition-all file:cursor-pointer" />
                                <button type="submit" disabled={!!loading} className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5">
                                    {loading === 'pdf-to-ppt' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Converting...</> : 'Convert to PPT'}
                                </button>
                            </form>
                        </div>

                        {/* PDF to JPG */}
                        <div className="card-interactive bg-white p-6 rounded-2xl shadow-lg border border-purple-100/50 hover:border-purple-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl text-purple-600 shadow-md">
                                    <Image className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">PDF to JPG</h3>
                            </div>
                            <form onSubmit={(e) => handleConversion(e, 'pdf-to-jpg', 'converted.zip')} className="space-y-4">
                                <input type="file" name="file" accept=".pdf" required className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-50 file:to-purple-100 file:text-purple-700 hover:file:from-purple-100 hover:file:to-purple-200 file:transition-all file:cursor-pointer" />
                                <button type="submit" disabled={!!loading} className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5">
                                    {loading === 'pdf-to-jpg' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Converting...</> : 'Convert to Images'}
                                </button>
                            </form>
                        </div>

                        {/* PDF to PDF/A */}
                        <div className="card-interactive bg-white p-6 rounded-2xl shadow-lg border border-red-100/50 hover:border-red-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-xl text-red-600 shadow-md">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800">PDF to PDF/A</h3>
                            </div>
                            <form onSubmit={(e) => handleConversion(e, 'pdf-to-pdfa', 'converted_pdfa.pdf')} className="space-y-4">
                                <input type="file" name="file" accept=".pdf" required className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-red-50 file:to-red-100 file:text-red-700 hover:file:from-red-100 hover:file:to-red-200 file:transition-all file:cursor-pointer" />
                                <button type="submit" disabled={!!loading} className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5">
                                    {loading === 'pdf-to-pdfa' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Converting...</> : 'Convert to PDF/A'}
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ConversionTools;
