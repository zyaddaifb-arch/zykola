'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Search, Download, ChevronDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

interface GuestListProps {
  guests: any[];
}

export const GuestList: React.FC<GuestListProps> = ({ guests }) => {
  const { isRtl } = useLanguage();
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayGuests = showAll ? filteredGuests : filteredGuests.slice(0, 20);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + "Name,Status,Companions,Date\n"
      + guests.map(e => `${e.name},${e.status},${e.companions_count || 0},${new Date(e.created_at).toLocaleDateString()}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "guests_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'declined') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  const getStatusText = (status: string) => {
    if (status === 'confirmed') return isRtl ? 'سيحضر ✓' : 'Will Attend ✓';
    if (status === 'declined') return isRtl ? 'اعتذر ✗' : 'Declined ✗';
    return isRtl ? 'لم يرد ⏳' : 'No Reply ⏳';
  };

  const getStatusBg = (status: string) => {
    if (status === 'confirmed') return 'bg-green-500';
    if (status === 'declined') return 'bg-red-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="flex flex-col gap-5 w-full mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 start-0 pl-3 rtl:pr-3 rtl:pl-0 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full bg-[#FDF5F5] border border-[#E8D5D5] rounded-xl py-3 pl-10 rtl:pr-10 rtl:pl-4 pr-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[#2D2D2D] min-h-[52px]"
            placeholder={isRtl ? 'ابحث عن ضيف...' : 'Search for a guest...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 bg-white border-2 border-[#E8D5D5] text-[#2D2D2D] px-5 min-h-[52px] rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors shrink-0 w-full sm:w-auto justify-center shadow-sm"
        >
          <Download className="h-4 w-4" />
          <span>{isRtl ? 'تصدير القائمة' : 'Export List'}</span>
        </button>
      </div>

      <div className="bg-white border border-[#E8D5D5] rounded-2xl overflow-hidden shadow-sm">
        <div className="flex flex-col divide-y divide-[#E8D5D5]">
          {displayGuests.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center gap-2">
              <span className="text-3xl">🔍</span>
              <p className="text-gray-500 font-semibold text-sm">
                {isRtl ? 'لا يوجد ضيوف هنا' : 'No guests found'}
              </p>
            </div>
          ) : (
            displayGuests.map((guest) => (
              <div key={guest.id} className="p-4 sm:px-6 flex items-center gap-4 hover:bg-[#FDF5F5] transition-colors">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm ${getStatusBg(guest.status)}`}>
                  {guest.name.charAt(0).toUpperCase()}
                </div>
                
                <div className="flex-1 flex flex-col min-w-0">
                  <h4 className="font-bold text-[#2D2D2D] truncate text-base">{guest.name}</h4>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-medium text-gray-500">
                    <span dir="auto" className="bg-gray-100 px-2 py-0.5 rounded-md">
                      {guest.companions_count > 0 ? `+${guest.companions_count} ${isRtl ? 'مرافقين' : 'companions'}` : (isRtl ? 'بدون مرافقين' : 'No companions')}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="opacity-80">
                      {formatDistanceToNow(new Date(guest.created_at), { addSuffix: true, locale: isRtl ? ar : enUS })}
                    </span>
                  </div>
                </div>

                <div className={`px-2.5 py-1 rounded-full text-xs font-bold border shrink-0 ${getStatusColor(guest.status)}`}>
                  {getStatusText(guest.status)}
                </div>
              </div>
            ))
          )}
        </div>
        
        {!showAll && filteredGuests.length > 20 && (
          <button 
            onClick={() => setShowAll(true)}
            className="w-full py-4 bg-gray-50 text-primary font-bold text-sm border-t border-[#E8D5D5] hover:bg-gray-100 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>{isRtl ? 'عرض المزيد' : 'Show More'}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
