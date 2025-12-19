import React, { useState } from 'react';
import axios from 'axios';
import { FilePlus, Scissors, Layers, RotateCw, Hash, Download } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

const ManipulationTools: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleMerge = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading('merge');
    setMessage(null);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/tools/merge`, formData, {
        responseType: 'blob'
      });
      const filename = response.headers['content-disposition']?.split('filename=')[1]?.replace(/"/g, '') || 'merged.pdf';
      downloadFile(response.data, filename);
      setMessage({ type: 'success', text: 'PDFs merged successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to merge PDFs.' });
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const handleSplit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading('split');
    setMessage(null);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/tools/split`, formData, {
        responseType: 'blob'
      });
      const filename = response.headers['content-disposition']?.split('filename=')[1]?.replace(/"/g, '') || 'split.zip';
      downloadFile(response.data, filename);
      setMessage({ type: 'success', text: 'PDF split successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to split PDF.' });
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const handleOrganize = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading('organize');
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    // Convert page_order string "1,2,3" to JSON string "[1,2,3]" because backend expects list
    const pageOrderStr = formData.get('page_order') as string;
    if (pageOrderStr) {
      const orderList = pageOrderStr.split(',').map(num => parseInt(num.trim()));
      formData.set('page_order', JSON.stringify(orderList));
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/tools/organize`, formData, {
        responseType: 'blob'
      });
      const filename = response.headers['content-disposition']?.split('filename=')[1]?.replace(/"/g, '') || 'organized.pdf';
      downloadFile(response.data, filename);
      setMessage({ type: 'success', text: 'PDF organized successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to organize PDF.' });
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const handleRotate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading('rotate');
    setMessage(null);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/tools/rotate`, formData, {
        responseType: 'blob'
      });
      const filename = response.headers['content-disposition']?.split('filename=')[1]?.replace(/"/g, '') || 'rotated.pdf';
      downloadFile(response.data, filename);
      setMessage({ type: 'success', text: 'PDF rotated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to rotate PDF.' });
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const handlePageNumbers = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading('page-numbers');
    setMessage(null);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/tools/page-numbers`, formData, {
        responseType: 'blob'
      });
      const filename = response.headers['content-disposition']?.split('filename=')[1]?.replace(/"/g, '') || 'numbered.pdf';
      downloadFile(response.data, filename);
      setMessage({ type: 'success', text: 'Page numbers added successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add page numbers.' });
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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manipulation Tools</h2>

      {message && (
        <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Merge PDF */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <FilePlus className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Merge PDF</h3>
          </div>
          <form onSubmit={handleMerge} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDFs</label>
              <input type="file" name="files" multiple accept=".pdf" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
            <button type="submit" disabled={!!loading} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading === 'merge' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Processing...</> : <><Layers className="w-4 h-4" /> Merge Files</>}
            </button>
          </form>
        </div>

        {/* Split PDF */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Split PDF</h3>
          </div>
          <form onSubmit={handleSplit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF</label>
              <input type="file" name="file" accept=".pdf" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Ranges</label>
              <input type="text" name="page_ranges" placeholder="e.g., 1-3,5,7-9" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
            </div>
            <button type="submit" disabled={!!loading} className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading === 'split' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Processing...</> : <><Download className="w-4 h-4" /> Split PDF</>}
            </button>
          </form>
        </div>

        {/* Organize PDF */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Organize PDF</h3>
          </div>
          <form onSubmit={handleOrganize} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF</label>
              <input type="file" name="file" accept=".pdf" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Page Order</label>
              <input type="text" name="page_order" placeholder="e.g., 3,1,2" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <button type="submit" disabled={!!loading} className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading === 'organize' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Processing...</> : <><Layers className="w-4 h-4" /> Reorder Pages</>}
            </button>
          </form>
        </div>

        {/* Rotate PDF */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <RotateCw className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Rotate PDF</h3>
          </div>
          <form onSubmit={handleRotate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF</label>
              <input type="file" name="file" accept=".pdf" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rotation Angle</label>
              <select name="rotation" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="90">90 Degrees</option>
                <option value="180">180 Degrees</option>
                <option value="270">270 Degrees</option>
              </select>
            </div>
            <button type="submit" disabled={!!loading} className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading === 'rotate' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Processing...</> : <><RotateCw className="w-4 h-4" /> Rotate PDF</>}
            </button>
          </form>
        </div>

        {/* Page Numbers */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
              <Hash className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Page Numbers</h3>
          </div>
          <form onSubmit={handlePageNumbers} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF</label>
              <input type="file" name="file" accept=".pdf" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <select name="position" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500">
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
              </select>
            </div>
            <button type="submit" disabled={!!loading} className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading === 'page-numbers' ? <><RefreshCw className="w-4 h-4 animate-spin" /> Processing...</> : <><Hash className="w-4 h-4" /> Add Numbers</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManipulationTools;
